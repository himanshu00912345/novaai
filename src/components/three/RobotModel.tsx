'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const MODEL_URL = '/models/nova-robot.glb';
const TARGET_HEIGHT = 2.52;

interface RobotModelProps {
  pulseKey?: number;
  animate?: boolean;
}

interface PreparedModel {
  object: THREE.Object3D;
  materials: THREE.Material[];
  textures: THREE.Texture[];
  glowMaterials: THREE.MeshStandardMaterial[];
}

function recolorOrangeTexture(source: THREE.Texture): THREE.Texture | null {
  if (typeof document === 'undefined') return null;

  const image = source.image as {
    width?: number;
    height?: number;
    naturalWidth?: number;
    naturalHeight?: number;
  };
  const width = image.naturalWidth || image.width || 0;
  const height = image.naturalHeight || image.height || 0;
  if (!width || !height) return null;

  try {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) return null;

    context.drawImage(source.image as CanvasImageSource, 0, 0, width, height);
    const pixels = context.getImageData(0, 0, width, height);
    let changed = false;

    for (let offset = 0; offset < pixels.data.length; offset += 4) {
      const red = pixels.data[offset];
      const green = pixels.data[offset + 1];
      const blue = pixels.data[offset + 2];

      if (red > green * 1.17 && green > blue * 1.3 && red > 80 && green > 35) {
        const brightness = Math.max(red, green, blue);
        pixels.data[offset] = Math.round(brightness * 0.63);
        pixels.data[offset + 1] = Math.round(brightness * 0.34);
        pixels.data[offset + 2] = Math.round(brightness * 0.94);
        changed = true;
      }
    }

    if (!changed) return null;
    context.putImageData(pixels, 0, 0);
    const recolored = source.clone();
    recolored.image = canvas;
    recolored.needsUpdate = true;
    return recolored;
  } catch {
    return null;
  }
}

function prepareModel(source: THREE.Group): PreparedModel {
  const object = source.clone(true);
  const ownedMaterials = new Set<THREE.Material>();
  const ownedTextures = new Set<THREE.Texture>();
  const glowMaterials: THREE.MeshStandardMaterial[] = [];

  object.traverse((node) => {
    const mesh = node as THREE.Mesh;
    if (!mesh.isMesh) return;

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    const cloneMaterial = (material: THREE.Material) => {
      const copy = material.clone();
      ownedMaterials.add(copy);

      if (copy instanceof THREE.MeshStandardMaterial) {
        const lowerName = copy.name.toLowerCase();
        if (lowerName.includes('glow_orange')) {
          copy.color.set('#7050a6');
          copy.emissive.set('#a875ff');
        }
        if (copy.map && lowerName.includes('body_pbr')) {
          const recolored = recolorOrangeTexture(copy.map);
          if (recolored) {
            copy.map = recolored;
            ownedTextures.add(recolored);
          }
        }
        if (copy.emissive.r > 0 || copy.emissive.g > 0 || copy.emissive.b > 0) {
          copy.userData.baseEmissiveIntensity = copy.emissiveIntensity;
          glowMaterials.push(copy);
        }
      }

      return copy;
    };

    mesh.material = Array.isArray(mesh.material)
      ? mesh.material.map(cloneMaterial)
      : cloneMaterial(mesh.material);
  });

  const bounds = new THREE.Box3().setFromObject(object);
  const size = bounds.getSize(new THREE.Vector3());
  if (!Number.isFinite(size.y) || size.y <= 0.001 || size.lengthSq() <= 0.001) {
    Array.from(ownedMaterials).forEach((material) => material.dispose());
    Array.from(ownedTextures).forEach((texture) => texture.dispose());
    throw new Error('The NovaAI GLB does not contain renderable 3D geometry.');
  }

  object.scale.setScalar(TARGET_HEIGHT / size.y);
  const normalizedBounds = new THREE.Box3().setFromObject(object);
  const center = normalizedBounds.getCenter(new THREE.Vector3());
  object.position.sub(center);

  return {
    object,
    materials: Array.from(ownedMaterials),
    textures: Array.from(ownedTextures),
    glowMaterials,
  };
}

interface RobotPlatformProps {
  animate?: boolean;
}

export function RobotPlatform({ animate = true }: RobotPlatformProps) {
  const platformRef = useRef<THREE.Group>(null);
  const rimRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state, delta) => {
    if (!animate || !platformRef.current || !rimRef.current) return;
    const time = state.clock.getElapsedTime();
    platformRef.current.rotation.y += delta * 0.035;
    rimRef.current.opacity = 0.22 + (Math.sin(time * 1.2) + 1) * 0.045;
  });

  return (
    <group ref={platformRef} position={[0, -1.305, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.035, 0]} receiveShadow>
        <cylinderGeometry args={[0.98, 0.98, 0.045, 72]} />
        <meshStandardMaterial color="#111a31" metalness={0.74} roughness={0.3} transparent opacity={0.78} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.08, 0.012, 8, 96]} />
        <meshBasicMaterial ref={rimRef} color="#63eaff" transparent opacity={0.24} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.012, 0]}>
        <torusGeometry args={[0.84, 0.006, 6, 96]} />
        <meshBasicMaterial color="#9872ff" transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

export function RobotModel({ pulseKey = 0, animate = true }: RobotModelProps) {
  const motionRef = useRef<THREE.Group>(null);
  const previousPulseRef = useRef(pulseKey);
  const pulseRemainingRef = useRef(0);
  const { scene } = useGLTF(MODEL_URL);
  const prepared = useMemo(() => prepareModel(scene), [scene]);

  useEffect(() => {
    return () => {
      prepared.materials.forEach((material) => material.dispose());
      prepared.textures.forEach((texture) => texture.dispose());
    };
  }, [prepared]);

  useEffect(() => {
    if (previousPulseRef.current !== pulseKey) {
      previousPulseRef.current = pulseKey;
      pulseRemainingRef.current = 1.15;
    }
  }, [pulseKey]);

  // This CC0 model has no animation clips. Only the parent transform moves;
  // no animation names or unsupported rig controls are assumed.
  useFrame((state, delta) => {
    if (!animate) return;
    const motion = motionRef.current;
    if (!motion) return;

    const time = state.clock.getElapsedTime();
    motion.position.y = Math.sin(time * 1.15) * 0.035;
    motion.rotation.y = THREE.MathUtils.damp(motion.rotation.y, state.pointer.x * 0.13, 3.4, delta);
    motion.rotation.x = THREE.MathUtils.damp(motion.rotation.x, -state.pointer.y * 0.045, 3.4, delta);

    const camera = state.camera;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, state.pointer.x * 0.075, 2.6, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 0.12 + state.pointer.y * 0.035, 2.6, delta);
    camera.lookAt(0, 0, 0);

    if (pulseRemainingRef.current > 0) {
      pulseRemainingRef.current = Math.max(0, pulseRemainingRef.current - delta);
      const progress = 1 - pulseRemainingRef.current / 1.15;
      const pulse = Math.sin(progress * Math.PI) * 0.75;
      prepared.glowMaterials.forEach((material) => {
        const baseIntensity = material.userData.baseEmissiveIntensity as number;
        material.emissiveIntensity = baseIntensity + pulse;
      });
    }
  });

  return (
    <group ref={motionRef} scale={1.02}>
      <primitive object={prepared.object} dispose={null} />
    </group>
  );
}

'use client';

import React, { Component, ErrorInfo, ReactNode, Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { PerspectiveCamera, useProgress } from '@react-three/drei';
import { RobotModel, RobotPlatform } from './RobotModel';
import { SceneFallback } from './SceneFallback';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('NovaAI robot preview entered safe mode:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

interface ModelErrorBoundaryProps {
  children: ReactNode;
  onError: () => void;
}

class ModelErrorBoundary extends Component<ModelErrorBoundaryProps, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('NovaAI robot model could not be loaded:', error);
    this.props.onError();
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

function ModelLoadingVisual() {
  const { invalidate } = useThree();

  useEffect(() => {
    invalidate();
  }, [invalidate]);

  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.16, 32, 32]} />
        <meshBasicMaterial color="#a6f4ff" transparent opacity={0.72} />
      </mesh>
      <mesh rotation={[Math.PI / 2.5, 0.2, 0]}>
        <torusGeometry args={[0.55, 0.009, 8, 80]} />
        <meshBasicMaterial color="#5ae7ff" transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[-Math.PI / 2.8, 0.4, 0]}>
        <torusGeometry args={[0.7, 0.007, 8, 80]} />
        <meshBasicMaterial color="#ad83ff" transparent opacity={0.34} />
      </mesh>
      <pointLight color="#62eaff" intensity={1.4} distance={2.5} />
    </group>
  );
}

interface RobotSceneProps {
  pulseKey?: number;
}

export function RobotScene({ pulseKey = 0 }: RobotSceneProps) {
  const prefersReducedMotion = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [modelFailed, setModelFailed] = useState(false);
  const { active } = useProgress();

  useEffect(() => {
    const query = window.matchMedia('(max-width: 639px)');
    const updateSmallScreen = () => setIsSmallScreen(query.matches);
    updateSmallScreen();
    query.addEventListener('change', updateSmallScreen);

    const nav = navigator as Navigator & { deviceMemory?: number };
    setIsLowPower(
      (typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 4) ||
      (typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4),
    );

    return () => query.removeEventListener('change', updateSmallScreen);
  }, []);

  useEffect(() => {
    const element = frameRef.current;
    if (!element || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: '80px 0px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const motionEnabled = !isSmallScreen && !isLowPower && !prefersReducedMotion;

  return (
    <div
      ref={frameRef}
      className="relative flex h-[390px] w-full items-center justify-center overflow-hidden sm:h-[460px] lg:h-[690px]"
      aria-label="NovaAI robot model preview"
    >
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.11] blur-[100px]" />
      <div aria-hidden="true" className="pointer-events-none absolute left-[58%] top-[42%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.12] blur-[90px]" />

      {modelFailed ? (
        <SceneFallback
          isError
          message="The local robot model could not be loaded. The page is continuing in static mode."
        />
      ) : (
        <>
          <div className="absolute right-4 top-4 z-20 hidden items-center gap-2 rounded-full border border-cyan-300/20 bg-slate-950/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-cyan-100/80 backdrop-blur-md sm:flex">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
            Nova model · local GLB
          </div>
          <div className="absolute bottom-4 left-4 z-20 hidden rounded-full border border-white/[0.08] bg-slate-950/60 px-3 py-1.5 font-mono text-[10px] text-slate-400 backdrop-blur-md xl:block">
            Pointer parallax · CTA energy pulse
          </div>

          {active && (
            <div role="status" className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/10 bg-slate-950/70 px-3 py-1.5 text-[11px] text-slate-300 backdrop-blur-md">
              Loading robot model…
            </div>
          )}

          <WebGLErrorBoundary
            fallback={<SceneFallback isError message="The 3D preview is unavailable. The static visual is ready instead." />}
          >
            <Canvas
              className="h-full w-full"
              dpr={isLowPower || isSmallScreen ? 1 : [1, 1.35]}
              frameloop={isInView && motionEnabled ? 'always' : 'demand'}
              shadows={!isLowPower && !isSmallScreen}
              gl={{
                alpha: true,
                antialias: !isLowPower && !isSmallScreen,
                powerPreference: isLowPower || isSmallScreen ? 'low-power' : 'high-performance',
              }}
              camera={{ position: [0, 0.12, 5.2], fov: 36 }}
              style={{ touchAction: 'pan-y' }}
            >
              <PerspectiveCamera makeDefault position={[0, 0.12, 5.2]} fov={36} />

              <ambientLight intensity={0.62} />
              <hemisphereLight args={['#d7edff', '#11162e', 1.05]} />
              <directionalLight
                position={[3.4, 4.5, 4]}
                intensity={2.4}
                color="#f0f5ff"
                castShadow={!isLowPower}
              />
              <directionalLight position={[-3.8, 1.2, -2.8]} intensity={1.8} color="#aa72ff" />
              <pointLight position={[2.5, 0.4, 2.5]} intensity={1.35} color="#55e9ff" distance={6} />
              <pointLight position={[-2, -0.8, -1.2]} intensity={1.1} color="#9563ff" distance={6} />

              <Suspense fallback={<ModelLoadingVisual />}>
                <ModelErrorBoundary onError={() => setModelFailed(true)}>
                  <RobotModel pulseKey={pulseKey} animate={motionEnabled} />
                </ModelErrorBoundary>
                <RobotPlatform animate={motionEnabled} />
              </Suspense>
            </Canvas>
          </WebGLErrorBoundary>
        </>
      )}
    </div>
  );
}

export default RobotScene;

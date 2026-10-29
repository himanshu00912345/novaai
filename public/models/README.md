# NovaAI robot model

The hero loads \`/models/nova-robot.glb\` locally with React Three Fiber and Drei.
It is a static, non-rigged model and contains no animation clips. The scene adds
small wrapper-level idle float, pointer parallax, camera drift, and a short
CTA-triggered emissive pulse; it does not refer to or invent animation names.

## Current asset and license

- Model: Repair Bot, from the Cozy Sci-Fi Base Kit
- Source: https://grab3d.com/models/sci-fi/repair-bot/
- License: CC0 1.0 (public domain dedication), so attribution is not required.
- Format: self-contained GLB with embedded PBR materials and textures.

The orange glow accent is recolored violet in a cloned material at runtime so the
source GLB stays untouched. Original geometry and embedded textures are retained.

## Replacing the model

Place a self-contained GLB at \`public/models/nova-robot.glb\`. Keep its PBR
materials in the file for best results. The scene automatically centers and
scales the model from its bounding box. The current scene moves the whole model;
a replacement with a rig may add inspected, verified node or animation controls
in \`src/components/three/RobotModel.tsx\`. If loading or geometry validation
fails, the scene shows the static CSS visual instead of taking down the page.

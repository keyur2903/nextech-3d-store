import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const CameraRig = ({ active, basePos }) => {
  const vec = new THREE.Vector3();
  useFrame((state) => {
    if (active) {
      // Calculate target position based on mouse
      const targetX = basePos[0] + (state.mouse.x * 1.5);
      const targetY = basePos[1] + (state.mouse.y * 1.5);

      // Smoothly move camera to target
      state.camera.position.lerp(vec.set(targetX, targetY, basePos[2]), 0.05);

      // Keep camera looking at center
      state.camera.lookAt(0, 0, 0);
    }
  });
  return null;
};

const Scene = ({ children, cameraPos = [0, 0, 5], controls = false }) => {
  return (
    <div className="canvas-container">
      <Canvas shadows={{ type: THREE.PCFShadowMap }}>
        <PerspectiveCamera makeDefault position={cameraPos} fov={50} />
        <CameraRig active={!controls} basePos={cameraPos} />

        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, 10]} intensity={1} color="#bd00ff" />
        <pointLight position={[10, 0, -10]} intensity={1} color="#00f3ff" />

        <Suspense fallback={null}>
          {children}
          <Environment preset="city" />
          <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} color="#00f3ff" />
        </Suspense>

        {controls && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.8}
            maxPolarAngle={Math.PI / 2 + 0.2}
            minPolarAngle={Math.PI / 2 - 0.5}
          />
        )}
      </Canvas>
    </div>
  );
};

export default Scene;

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, RoundedBox } from '@react-three/drei';

import { MathUtils } from 'three';

const TechModel = ({ color = '#00f3ff', distort = 0.4 }) => {
  const groupRef = useRef();
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    timeRef.current += delta;
    const t = timeRef.current;
    if (groupRef.current) {
      // Base slow rotation
      const baseRotationY = t * 0.2;
      const baseRotationZ = Math.sin(t * 0.5) * 0.2;
      
      // Cursor interaction
      const targetX = (state.pointer.x * Math.PI) / 4;
      const targetY = (state.pointer.y * Math.PI) / 4;
      
      // Smoothly interpolate to the cursor target
      groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, baseRotationY + targetX, 0.05);
      groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
      groupRef.current.rotation.z = MathUtils.lerp(groupRef.current.rotation.z, baseRotationZ, 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <group ref={groupRef}>
        {/* Core Inner Sphere */}
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial 
            color={color} 
            envMapIntensity={2} 
            clearcoat={1} 
            clearcoatRoughness={0.1} 
            metalness={0.8} 
            roughness={0.2}
            distort={distort} 
            speed={4} 
          />
        </mesh>

        {/* Outer Tech Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.5, 0.05, 16, 100]} />
          <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.1} emissive="#bd00ff" emissiveIntensity={0.5} />
        </mesh>

        {/* Floating tech bits */}
        <RoundedBox args={[0.2, 0.2, 0.2]} position={[1.2, 1, 0]} radius={0.05}>
          <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
        </RoundedBox>
        <RoundedBox args={[0.15, 0.3, 0.15]} position={[-1.3, -0.8, 0.5]} radius={0.05}>
          <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
        </RoundedBox>
      </group>
    </Float>
  );
};

export default TechModel;

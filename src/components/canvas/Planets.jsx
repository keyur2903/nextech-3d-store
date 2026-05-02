import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const Planet = ({ position, size, color, speed, wireframe }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += speed;
      meshRef.current.rotation.x += speed * 0.5;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2} position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          wireframe={wireframe}
          transparent={true}
          opacity={0.8}
          emissive={color}
          emissiveIntensity={0.2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

const Planets = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Smoothly rotate the entire planet group based on cursor position
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, (state.mouse.x * Math.PI) / 6, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, (-state.mouse.y * Math.PI) / 6, 0.05);
      // Slight translation for deeper parallax
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, state.mouse.x * 1.5, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, state.mouse.y * 1.5, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Left side planets */}
      <Planet position={[-6, 2, -5]} size={1.2} color="#bd00ff" speed={0.005} wireframe={true} />
      <Planet position={[-8, -3, -8]} size={0.8} color="#00f3ff" speed={0.01} wireframe={false} />
      <Planet position={[-4, -2, -3]} size={0.4} color="#ff0055" speed={0.02} wireframe={true} />

      {/* Right side planets */}
      <Planet position={[7, 3, -6]} size={1.5} color="#00f3ff" speed={-0.004} wireframe={false} />
      <Planet position={[5, -2, -4]} size={0.9} color="#bd00ff" speed={-0.01} wireframe={true} />
      <Planet position={[9, 0, -10]} size={2} color="#00ff88" speed={0.002} wireframe={true} />
    </group>
  );
};

export default Planets;

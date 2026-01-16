import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, OrbitControls, Stars } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

const LunaCore = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.3;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = -state.clock.elapsedTime * 0.2;
      outerRingRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group>
        {/* Main Luna Orb */}
        <Sphere ref={meshRef} args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#a855f7"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            emissive="#7c3aed"
            emissiveIntensity={0.5}
          />
        </Sphere>

        {/* Inner Glow */}
        <Sphere args={[1.02, 32, 32]}>
          <meshBasicMaterial
            color="#c084fc"
            transparent
            opacity={0.3}
            side={THREE.BackSide}
          />
        </Sphere>

        {/* Outer Glow Aura */}
        <Sphere args={[1.3, 32, 32]}>
          <meshBasicMaterial
            color="#a855f7"
            transparent
            opacity={0.1}
            side={THREE.BackSide}
          />
        </Sphere>

        {/* Orbiting Ring 1 */}
        <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.5, 0.02, 16, 100]} />
          <meshBasicMaterial color="#c084fc" transparent opacity={0.6} />
        </mesh>

        {/* Orbiting Ring 2 */}
        <mesh ref={outerRingRef} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
          <torusGeometry args={[1.8, 0.015, 16, 100]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.4} />
        </mesh>

        {/* Particle Orbs */}
        {[...Array(6)].map((_, i) => (
          <Float key={i} speed={3 + i * 0.5} floatIntensity={0.5}>
            <mesh
              position={[
                Math.sin((i / 6) * Math.PI * 2) * 2,
                Math.cos((i / 6) * Math.PI * 2) * 0.5,
                Math.cos((i / 6) * Math.PI * 2) * 2,
              ]}
            >
              <sphereGeometry args={[0.05 + Math.random() * 0.05, 16, 16]} />
              <meshBasicMaterial
                color={i % 2 === 0 ? "#c084fc" : "#60a5fa"}
                transparent
                opacity={0.8}
              />
            </mesh>
          </Float>
        ))}
      </group>
    </Float>
  );
};

const LunaAvatar3D = () => {
  return (
    <div className="w-full h-[400px] lg:h-[500px] relative">
      {/* Glow Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 rounded-full bg-primary/30 blur-[80px] animate-pulse" />
      </div>
      
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          {/* Ambient Lighting */}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#a855f7" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#60a5fa" />
          <spotLight
            position={[0, 5, 0]}
            angle={0.3}
            penumbra={1}
            intensity={0.5}
            color="#c084fc"
          />

          {/* Stars Background */}
          <Stars
            radius={50}
            depth={50}
            count={1000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />

          {/* Main Luna Avatar */}
          <LunaCore />

          {/* Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default LunaAvatar3D;

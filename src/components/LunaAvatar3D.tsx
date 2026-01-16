import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Stars } from "@react-three/drei";
import { useRef, Suspense, useState, useEffect, useMemo } from "react";
import * as THREE from "three";

interface MouseState {
  x: number;
  y: number;
}

interface LunaCoreProps {
  mouse: MouseState;
  isHovered: boolean;
}

const LunaCore = ({ mouse, isHovered }: LunaCoreProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  // Smooth mouse following
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  
  // Animation state
  const scaleRef = useRef(1);
  const distortRef = useRef(0.3);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Update target rotation based on mouse
    targetRotation.current.x = mouse.y * 0.5;
    targetRotation.current.y = mouse.x * 0.5;
    
    // Smooth interpolation
    currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.05;
    currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.05;
    
    // Apply to group
    if (groupRef.current) {
      groupRef.current.rotation.x = currentRotation.current.x;
      groupRef.current.rotation.y = currentRotation.current.y + time * 0.1;
    }
    
    // Hover scale effect
    const targetScale = isHovered ? 1.15 : 1;
    scaleRef.current += (targetScale - scaleRef.current) * 0.1;
    
    if (groupRef.current) {
      groupRef.current.scale.setScalar(scaleRef.current);
    }
    
    // Distortion effect on hover
    const targetDistort = isHovered ? 0.5 : 0.3;
    distortRef.current += (targetDistort - distortRef.current) * 0.1;
    
    if (meshRef.current && meshRef.current.material) {
      (meshRef.current.material as any).distort = distortRef.current;
    }
    
    // Ring animations with mouse influence
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.3 + mouse.x * 0.2;
      ringRef.current.rotation.x = Math.sin(time * 0.5) * 0.2 + mouse.y * 0.1;
    }
    
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = -time * 0.2 - mouse.x * 0.15;
      outerRingRef.current.rotation.y = Math.cos(time * 0.3) * 0.3 + mouse.y * 0.1;
    }
    
    // Glow pulse effect
    if (glowRef.current && glowRef.current.material) {
      const pulseIntensity = isHovered ? 0.25 : 0.1;
      const pulse = Math.sin(time * 2) * 0.05 + pulseIntensity;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = pulse;
    }
  });

  // Memoize particle positions to prevent regeneration
  const particlePositions = useMemo(() => {
    return [...Array(8)].map((_, i) => ({
      position: [
        Math.sin((i / 8) * Math.PI * 2) * 2,
        Math.cos((i / 8) * Math.PI * 2) * 0.5,
        Math.cos((i / 8) * Math.PI * 2) * 2,
      ] as [number, number, number],
      size: 0.04 + (i * 0.01),
      color: i % 2 === 0 ? "#c084fc" : "#60a5fa",
      speed: 3 + i * 0.3,
    }));
  }, []);

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={groupRef}>
        {/* Main Luna Orb */}
        <Sphere ref={meshRef} args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#a855f7"
            attach="material"
            distort={0.3}
            speed={isHovered ? 4 : 2}
            roughness={0.2}
            metalness={0.8}
            emissive="#7c3aed"
            emissiveIntensity={isHovered ? 0.8 : 0.5}
          />
        </Sphere>

        {/* Inner Glow */}
        <Sphere args={[1.02, 32, 32]}>
          <meshBasicMaterial
            color="#c084fc"
            transparent
            opacity={isHovered ? 0.5 : 0.3}
            side={THREE.BackSide}
          />
        </Sphere>

        {/* Outer Glow Aura */}
        <Sphere ref={glowRef} args={[1.4, 32, 32]}>
          <meshBasicMaterial
            color="#a855f7"
            transparent
            opacity={0.1}
            side={THREE.BackSide}
          />
        </Sphere>

        {/* Orbiting Ring 1 */}
        <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.5, isHovered ? 0.03 : 0.02, 16, 100]} />
          <meshBasicMaterial color="#c084fc" transparent opacity={isHovered ? 0.8 : 0.6} />
        </mesh>

        {/* Orbiting Ring 2 */}
        <mesh ref={outerRingRef} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
          <torusGeometry args={[1.8, isHovered ? 0.025 : 0.015, 16, 100]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={isHovered ? 0.6 : 0.4} />
        </mesh>

        {/* Third Ring - appears on hover */}
        {isHovered && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2.1, 0.01, 16, 100]} />
            <meshBasicMaterial color="#60a5fa" transparent opacity={0.4} />
          </mesh>
        )}

        {/* Particle Orbs */}
        {particlePositions.map((particle, i) => (
          <Float key={i} speed={particle.speed} floatIntensity={isHovered ? 0.8 : 0.5}>
            <mesh position={particle.position}>
              <sphereGeometry args={[isHovered ? particle.size * 1.5 : particle.size, 16, 16]} />
              <meshBasicMaterial
                color={particle.color}
                transparent
                opacity={isHovered ? 1 : 0.8}
              />
            </mesh>
          </Float>
        ))}

        {/* Extra particles on hover */}
        {isHovered && [...Array(4)].map((_, i) => (
          <Float key={`extra-${i}`} speed={4 + i * 0.5} floatIntensity={1}>
            <mesh
              position={[
                Math.sin((i / 4) * Math.PI * 2 + 0.5) * 2.5,
                Math.cos((i / 4) * Math.PI * 2) * 1,
                Math.cos((i / 4) * Math.PI * 2 + 0.5) * 2.5,
              ]}
            >
              <sphereGeometry args={[0.03, 16, 16]} />
              <meshBasicMaterial color="#fbbf24" transparent opacity={0.9} />
            </mesh>
          </Float>
        ))}
      </group>
    </Float>
  );
};

// Component to handle mouse tracking inside Canvas
const MouseTracker = ({ onMouseMove }: { onMouseMove: (x: number, y: number) => void }) => {
  const { size, viewport } = useThree();
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position to -1 to 1
      const x = (event.clientX / size.width) * 2 - 1;
      const y = -(event.clientY / size.height) * 2 + 1;
      onMouseMove(x, y);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [size, onMouseMove]);
  
  return null;
};

const LunaAvatar3D = () => {
  const [mouse, setMouse] = useState<MouseState>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (x: number, y: number) => {
    setMouse({ x, y });
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-[400px] lg:h-[500px] relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow Background - reactive to hover */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          className={`rounded-full bg-primary/30 blur-[80px] transition-all duration-500 ${
            isHovered ? "w-80 h-80 bg-primary/50" : "w-64 h-64"
          }`}
          style={{
            transform: `translate(${mouse.x * 20}px, ${-mouse.y * 20}px)`,
          }}
        />
      </div>
      
      {/* Secondary glow on hover */}
      {isHovered && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div 
            className="w-48 h-48 rounded-full bg-accent/20 blur-[60px] animate-pulse"
            style={{
              transform: `translate(${-mouse.x * 30}px, ${mouse.y * 30}px)`,
            }}
          />
        </div>
      )}
      
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          {/* Mouse Tracker */}
          <MouseTracker onMouseMove={handleMouseMove} />
          
          {/* Ambient Lighting */}
          <ambientLight intensity={isHovered ? 0.7 : 0.5} />
          <pointLight 
            position={[10 + mouse.x * 5, 10 + mouse.y * 5, 10]} 
            intensity={isHovered ? 1.5 : 1} 
            color="#a855f7" 
          />
          <pointLight 
            position={[-10 - mouse.x * 5, -10 - mouse.y * 5, -10]} 
            intensity={isHovered ? 0.8 : 0.5} 
            color="#60a5fa" 
          />
          <spotLight
            position={[mouse.x * 3, 5 + mouse.y * 2, 3]}
            angle={0.3}
            penumbra={1}
            intensity={isHovered ? 0.8 : 0.5}
            color="#c084fc"
          />

          {/* Stars Background */}
          <Stars
            radius={50}
            depth={50}
            count={isHovered ? 1500 : 1000}
            factor={4}
            saturation={0}
            fade
            speed={isHovered ? 2 : 1}
          />

          {/* Main Luna Avatar */}
          <LunaCore mouse={mouse} isHovered={isHovered} />
        </Suspense>
      </Canvas>
      
      {/* Hover hint */}
      <div 
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground transition-opacity duration-300 ${
          isHovered ? "opacity-0" : "opacity-50"
        }`}
      >
        Hover to interact
      </div>
    </div>
  );
};

export default LunaAvatar3D;

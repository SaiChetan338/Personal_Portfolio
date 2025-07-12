import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";

function Stars(props: any) {
  const ref = useRef<any>();
  const [sphere] = useMemo(() => {
    try {
      const sphereData = random.inSphere(new Float32Array(5000), { radius: 1.5 });
      // Validate the generated data to ensure no NaN values
      for (let i = 0; i < sphereData.length; i++) {
        if (isNaN(sphereData[i])) {
          sphereData[i] = 0;
        }
      }
      return [sphereData];
    } catch (error) {
      console.warn("Error generating sphere data:", error);
      // Fallback to a simple sphere generation
      const fallbackSphere = new Float32Array(5000 * 3);
      for (let i = 0; i < 5000; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = 1.5;
        fallbackSphere[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        fallbackSphere[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        fallbackSphere[i * 3 + 2] = radius * Math.cos(phi);
      }
      return [fallbackSphere];
    }
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#ffa0e0"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

const Hyperspeed: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars />
      </Canvas>
    </div>
  );
};

export default Hyperspeed;

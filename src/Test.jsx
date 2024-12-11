import React from "react";
import { Canvas } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";

const BlinkingSphere = () => {
  const { opacity } = useSpring({
    loop: true,
    from: { opacity: 0 },
    to: async (next) => {
      while (1) {
        await next({ opacity: 1 });
        await next({ opacity: 0 });
      }
    },
    config: { duration: 1000 }, // Duration for fade in/out
  });

  return (
    <animated.mesh>
      <Sphere args={[1, 32, 32]}>
        <animated.meshStandardMaterial
          transparent
          opacity={opacity}
          color="red"
        />
      </Sphere>
    </animated.mesh>
  );
};

const Test = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <BlinkingSphere />
    </Canvas>
  );
};

export default Test;

import React from "react";
import { Canvas } from "@react-three/fiber";
import { Sphere, Sparkles, OrbitControls } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

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
    <>
      <Sparkles count={100} scale={2} size={1} speed={0.5} />
      <animated.mesh>
        <Sphere args={[1, 32, 32]}>
          <animated.meshStandardMaterial
            transparent
            opacity={opacity}
            color="red"
          />
        </Sphere>
      </animated.mesh>
    </>
  );
};

const Test = () => {
  return (
    <Canvas style={{ background: "black" }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          height={300}
          intensity={1}
        />
      </EffectComposer>
      <BlinkingSphere />
      <OrbitControls />
    </Canvas>
  );
};

export default Test;

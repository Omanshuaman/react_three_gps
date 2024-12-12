import { useFrame, extend, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { Mesh, Vector3 } from "three";
import { create } from "zustand";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

export const useSun = create((set) => {
  const store = {
    sunDirection: new Vector3(),
    sunPosition: new Vector3(),
    setSunDirection: (direction) => {
      store.sunDirection.copy(direction);
      store.sunPosition.copy(direction).multiplyScalar(10);
    },
  };

  return store;
});

export const Sun = () => {
  const meshRef = useRef(null);
  const composerRef = useRef();

  const sunPosition = useSun((state) => state.sunPosition);
  const setSunDirection = useSun((state) => state.setSunDirection);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.1;
    const x = Math.sin(t);
    const z = Math.cos(t);
    setSunDirection(new Vector3(-x, 0, z).normalize());

    if (meshRef.current) {
      meshRef.current.position.copy(sunPosition);
    }

    if (composerRef.current) {
      composerRef.current.render();
    }
  });

  return (
    <>
      <mesh ref={meshRef} position={sunPosition}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial />
      </mesh>
      <EffectComposer ref={composerRef}>
        <Bloom luminanceThreshold={0.1} luminanceSmoothing={1} height={300} />
      </EffectComposer>
    </>
  );
};

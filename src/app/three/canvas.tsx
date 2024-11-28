"use client";

import { useSearchParams } from "next/navigation";
import { Canvas, useFrame } from "@react-three/fiber";
import { MainScene } from "./main-scene";
import { Leva } from "leva";
import { useApp } from "@/store";
import { Debug } from "./debug";
import {
  Environment,
  Grid,
  Html,
  OrbitControls,
  Stage,
  useGLTF,
} from "@react-three/drei";
import { Suspense, useRef } from "react";
import {
  EffectComposer,
  Bloom,
  ToneMapping,
} from "@react-three/postprocessing";
import { easing } from "maath";

export const WebGl: React.FC = () => {
  const params = useSearchParams();
  const isDebug = params.get("debug") !== null;
  return (
    <div className="canvas-container">
      <Leva hidden={!isDebug} />
      <GlCanvas />
    </div>
  );
};
function Loading() {
  return (
    <Html
      fullscreen
      style={{
        backgroundColor: "black",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <h2>Loading textures</h2>
    </Html>
  );
}
export const GlCanvas = () => {
  const params = useSearchParams();
  const isDebug = params.get("debug") !== null;

  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: true,
      }}
      ref={(canvas) => {
        if (canvas) {
          useApp.setState({ canvas });
        }
      }}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "visible",
      }}>
      {/* <PrimaryScene /> */}
      <Suspense fallback={<Loading />}>
        <Stage
          intensity={0.5}
          environment="city"
          shadows={{ type: "accumulative", bias: -0.001, intensity: Math.PI }}
          adjustCamera={false}>
          <MainScene />
          <Debug />
        </Stage>
      </Suspense>

      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={2} mipmapBlur />
        <ToneMapping />
      </EffectComposer>
    </Canvas>
    // <Canvas flat shadows camera={{ position: [-15, 0, 10], fov: 25 }}>
    //   <fog attach="fog" args={["black", 15, 22.5]} />
    //   <Stage
    //     intensity={0.5}
    //     environment="city"
    //     shadows={{ type: "accumulative", bias: -0.001, intensity: Math.PI }}
    //     adjustCamera={false}>
    //     <Kamdo rotation={[0, Math.PI, 0]} />
    //   </Stage>
    //   <Grid
    //     renderOrder={-1}
    //     position={[0, -1.85, 0]}
    //     infiniteGrid
    //     cellSize={0.6}
    //     cellThickness={0.6}
    //     sectionSize={3.3}
    //     sectionThickness={1.5}
    //     sectionColor={[0.5, 0.5, 10]}
    //     fadeDistance={30}
    //   />
    //   <OrbitControls
    //     autoRotate
    //     autoRotateSpeed={0.05}
    //     enableZoom={false}
    //     makeDefault
    //     minPolarAngle={Math.PI / 2}
    //     maxPolarAngle={Math.PI / 2}
    //   />
    //   <EffectComposer disableNormalPass>
    //     <Bloom luminanceThreshold={2} mipmapBlur />
    //     <ToneMapping />
    //   </EffectComposer>
    //   <Environment background preset="sunset" blur={0.8} />
    // </Canvas>
  );
};
function Kamdo(props) {
  const head = useRef();
  const stripe = useRef();
  const light = useRef();
  const { nodes, materials } = useGLTF("/models/kamdo.glb");
  useFrame((state, delta) => {
    const t = (1 + Math.sin(state.clock.elapsedTime * 2)) / 2;
    stripe.current.color.setRGB(2 + t * 20, 2, 20 + t * 50);
    easing.dampE(
      head.current.rotation,
      [0, state.pointer.x * (state.camera.position.z > 1 ? 1 : -1), 0],
      0.4,
      delta
    );
    light.current.intensity = 1 + t * 4;
  });
  return (
    <group {...props} scale={1}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.body001.geometry}
        material={materials.Body}
      />
      <group ref={head}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.head001.geometry}
          material={materials.Head}
        />
        <mesh castShadow receiveShadow geometry={nodes.stripe001.geometry}>
          <meshBasicMaterial ref={stripe} toneMapped={false} />
          <pointLight
            ref={light}
            intensity={1}
            color={[10, 2, 5]}
            distance={2.5}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/models/kamdo.glb");

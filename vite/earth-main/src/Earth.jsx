import {
  Environment,
  OrbitControls,
  Stars,
  ContactShadows,
  Stage,
  TrackballControls,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
  ToneMapping,
} from "@react-three/postprocessing";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import TWEEN from "@tweenjs/tween.js";

import { Globe } from "./globe";
import Annotation from "./Annotation";
function Tween() {
  useFrame(() => {
    TWEEN.update();
  });
}
const Earth = () => {
  const ref = useRef(null);

  return (
    <Canvas shadows camera={{ position: [0, 1, 7], fov: 30 }}>
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      <ambientLight intensity={0.2} />
      <ContactShadows
        resolution={1024}
        frames={1}
        position={[0, -1.16, 0]}
        scale={10}
        blur={3}
        opacity={1}
        far={10}
      />
      <Tween />

      <color attach="background" args={["#15151a"]} />
      <Suspense>
        {/* <Environment preset="city" /> */}
        {/* <TrackballControls ref={ref} rotateSpeed={4} /> */}
        <OrbitControls ref={ref} />

        <Stage
          intensity={10}
          environment="city"
          shadows={{ type: "accumulative", bias: -0.001, intensity: Math.PI }}
          adjustCamera={false}>
          <Globe controls={ref}></Globe>
          <Annotation controls={ref} />
        </Stage>
        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.5} height={100} />
          <Noise opacity={0.02} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
          <ToneMapping />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
};

export default Earth;

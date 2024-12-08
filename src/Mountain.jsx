import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import {
  Sparkles,
  Shadow,
  ContactShadows,
  Billboard,
  Environment,
  BakeShadows,
  OrbitControls,
  Stage,
} from "@react-three/drei";
import { LayerMaterial, Depth } from "lamina";
import {
  Bloom,
  EffectComposer,
  ToneMapping,
} from "@react-three/postprocessing";
import { Kamdo } from "./Kamdo";
import { Suspense } from "react";
const Mountain = () => {
  return (
    <Canvas camera={{ position: [0, 0, 12], fov: 30 }}>
      <ContactShadows
        resolution={1024}
        frames={1}
        position={[0, -1.16, 0]}
        scale={10}
        blur={3}
        opacity={1}
        far={10}
      />
      <Suspense>
        <hemisphereLight intensity={0.5} color="white" groundColor="black" />
        <Environment
          files="../assets/snow_field_2k.hdr"
          ground={{ height: 6, radius: 40, scale: 40 }}
        />

        <Kamdo rotation={[0, Math.PI, 0]} position={[0, 0, 0]} />

        <OrbitControls
          autoRotateSpeed={0.85}
          zoomSpeed={0.75}
          maxPolarAngle={Math.PI / 2.1}
        />
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={2} mipmapBlur />
          <ToneMapping />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
};

export default Mountain;

const Sphere = ({
  size = 1,
  amount = 50,
  color = "white",
  emissive,
  glow,
  ...props
}) => (
  <mesh {...props}>
    <sphereGeometry args={[size, 64, 64]} />
    <meshPhysicalMaterial
      roughness={0}
      color={color}
      emissive={emissive || color}
      envMapIntensity={0.2}
    />
    <Glow scale={size * 1.2} near={-25} color={glow || emissive || color} />
    <Sparkles count={amount} scale={size * 2} size={6} speed={0.4} />
    <Shadow
      rotation={[-Math.PI / 2, 0, 0]}
      scale={size * 1.5}
      position={[0, -size, 0]}
      color="black"
      opacity={1}
    />
  </mesh>
);

const Glow = ({ color, scale = 0.5, near = -2, far = 1.4 }) => (
  <Billboard>
    <mesh>
      <circleGeometry args={[2 * scale, 16]} />
      <LayerMaterial
        transparent
        depthWrite={false}
        blending={THREE.CustomBlending}
        blendEquation={THREE.AddEquation}
        blendSrc={THREE.SrcAlphaFactor}
        blendDst={THREE.DstAlphaFactor}>
        <Depth
          colorA={color}
          colorB="black"
          alpha={1}
          mode="normal"
          near={near * scale}
          far={far * scale}
          origin={[0, 0, 0]}
        />
        <Depth
          colorA={color}
          colorB="black"
          alpha={0.5}
          mode="add"
          near={-40 * scale}
          far={far * 1.2 * scale}
          origin={[0, 0, 0]}
        />
        <Depth
          colorA={color}
          colorB="black"
          alpha={1}
          mode="add"
          near={-15 * scale}
          far={far * 0.7 * scale}
          origin={[0, 0, 0]}
        />
        <Depth
          colorA={color}
          colorB="black"
          alpha={1}
          mode="add"
          near={-10 * scale}
          far={far * 0.68 * scale}
          origin={[0, 0, 0]}
        />
      </LayerMaterial>
    </mesh>
  </Billboard>
);

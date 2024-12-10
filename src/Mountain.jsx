import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Sparkles,
  Shadow,
  ContactShadows,
  Billboard,
  Environment,
  BakeShadows,
  OrbitControls,
  Stage,
  useProgress,
  Html,
} from "@react-three/drei";
import { LayerMaterial, Depth } from "lamina";
import {
  Bloom,
  EffectComposer,
  Outline,
  Selection,
  ToneMapping,
} from "@react-three/postprocessing";
import { Kamdo } from "./Kamdo";
import { Suspense } from "react";
function Loader() {
  const { progress } = useProgress();
  const roundedProgress = Math.floor(progress);
  return (
    <Html center>
      <div className="flex items-center justify-center bg-gray-900 w-screen h-screen">
        <img
          src="../assets/211003_Metakosmos_Logo_HOZ.png"
          // src="https://images.pexels.com/photos/541484/sun-flower-blossom-bloom-pollen-541484.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Loading"
          className="animate-fade-in-out object-cover"
        />
      </div>
    </Html>
  );
}
const Mountain = () => {
  return (
    <Canvas
      camera={{
        position: [-11.78464723440229, 0.8967611230370984, 2.077957903545101],
        fov: 30,
      }}>
      <ContactShadows
        resolution={1024}
        frames={1}
        position={[0, -1.16, 0]}
        scale={10}
        blur={3}
        opacity={1}
        far={10}
      />
      <Suspense fallback={<Loader />}>
        <hemisphereLight intensity={0.5} color="white" groundColor="black" />
        <Environment
          files="/snow_field_2k.hdr"
          ground={{ height: 6, radius: 40, scale: 40 }}
        />

        <OrbitControls
          autoRotateSpeed={0.85}
          zoomSpeed={0.75}
          maxPolarAngle={Math.PI / 2.1}
        />
        <Selection>
          <EffectComposer disableNormalPass>
            <Bloom luminanceThreshold={2} mipmapBlur />
            <Outline
              blur
              visibleEdgeColor="red"
              edgeStrength={100}
              width={1000}
            />

            <ToneMapping />
          </EffectComposer>
          <Kamdo rotation={[0, Math.PI, 0]} position={[0, 0, -3]} />
        </Selection>
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

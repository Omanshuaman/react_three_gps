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
  Plane,
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
import { Astrowalk } from "./Astrowalk";
import { Astronaut } from "./Astronaut";
function Loader() {
  const { progress } = useProgress();
  const roundedProgress = Math.floor(progress);
  return (
    <Html center>
      <div className="flex items-center justify-center bg-gray-900 w-screen h-screen">
        <img
          src="/211003_Metakosmos_Logo_HOZ.png"
          // src="https://images.pexels.com/photos/541484/sun-flower-blossom-bloom-pollen-541484.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Loading"
          className="animate-fade-in-out object-cover"
        />
      </div>
    </Html>
  );
}
const Suit = () => {
  return (
    <Canvas
      camera={{
        position: [-2.104239111996178, 1.6354561820354738, 10.354541977271428],
        fov: 30,
      }}
      shadows>
      <directionalLight
        position={[-5, 5, 5]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        intensity={1}
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
        <group position={[0, 0, 0]}>
          <Astrowalk />
          {/* <Astronaut /> */}
          {/* <Kamdo rotation={[0, Math.PI, 0]} position={[0, 0, -3]} /> */}
        </group>
        <mesh
          rotation={[-0.5 * Math.PI, 0, 0]}
          position={[0, 0, 0]}
          receiveShadow>
          <planeGeometry args={[10, 10, 1, 1]} />
          <shadowMaterial transparent opacity={0.3} />
        </mesh>
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={2} mipmapBlur />

          <ToneMapping />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
};

export default Suit;

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

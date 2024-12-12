import { useFrame, useThree } from "@react-three/fiber";
import {
  Billboard,
  Html,
  Shadow,
  Sparkles,
  useGLTF,
  Sphere,
} from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { easing } from "maath";
import * as THREE from "three";
import { useSpring, animated } from "@react-spring/three";

import {
  Selection,
  Select,
  EffectComposer,
  Outline,
} from "@react-three/postprocessing";
import { LayerMaterial, Depth } from "lamina";

import Test from "./Test";
import Dashboard from "./Dashboard";

export const Kamdo = ({ ...props }) => {
  const head = useRef();
  const stripe = useRef();
  const light = useRef();
  const { nodes, materials } = useGLTF("/kamdo.glb");
  const { camera } = useThree();
  const [hovered, hover] = useState(null);

  // useFrame(() => {
  //   console.log("camera position", camera?.position);
  // });
  useEffect(() => {
    console.log(hovered);
  }, [hovered]);

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
    <group {...props} scale={0.5}>
      <SphereComp
        size={0.25}
        amount={10}
        color="red"
        glow="yellow"
        emissive="red"
        position={[0, 4.5, 0]}
      />

      <Select enabled={hovered}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body001.geometry}
          material={materials.Body}
          onClick={() => hover(true)}
          onPointerOut={() => hover(false)}
        />
      </Select>
      <group ref={head}>
        <Select enabled={hovered}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.head001.geometry}
            material={materials.Head}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
          />
        </Select>
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
      <Shadow
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.5}
        position={[0, 0, 0]}
        color="black"
        opacity={1}
      />
      <Html
        className="w-[1000px] -bottom-64 left-20"
        style={{ transform: "scale(0.65)", opacity: "0.7" }}>
        <Dashboard />
      </Html>
    </group>
  );
};

const SphereComp = ({
  size = 1,
  amount = 50,
  color,
  emissive,
  glow,
  ...props
}) => {
  const { opacity } = useSpring({
    loop: true,
    from: { opacity: 0 },
    to: async (next) => {
      while (1) {
        await next({ opacity: 1 });
        await next({ opacity: 0 });
      }
    },
    config: { duration: 1000 },
  });

  return (
    <animated.mesh {...props}>
      <Sphere args={[size, 64, 64]}>
        <animated.meshStandardMaterial
          roughness={0}
          color={color}
          opacity={opacity}
          emissive={emissive || color}
          envMapIntensity={0.2}
          transparent
        />
      </Sphere>

      <Glow scale={size * 1.2} near={-25} color={glow || emissive || color} />
      <Sparkles
        count={amount}
        scale={size * 2}
        size={1}
        speed={0.4}
        color="yellow"
      />
    </animated.mesh>
  );
};
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
useGLTF.preload("/kamdo.glb");

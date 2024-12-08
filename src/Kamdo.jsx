import { useFrame, useThree } from "@react-three/fiber";
import { Html, Shadow, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { easing } from "maath";
import Test from "./Test";
import Dashboard from "./Dashboard";

export const Kamdo = ({ ...props }) => {
  const head = useRef();
  const stripe = useRef();
  const light = useRef();
  const { nodes, materials } = useGLTF("public/kamdo.glb");
  const { camera } = useThree();
  useFrame(() => {
    //@ts-ignore
    console.log("camera postion", camera?.position);
  });
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
      <Shadow
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.5}
        position={[0, 0, 0]}
        color="black"
        opacity={1}
      />
      <Html
        // position={[3, 5, 3]}
        className="w-[1000px] -bottom-64 left-20"
        style={{ transform: "scale(0.65)", opacity: "0.7" }}>
        <Dashboard />
      </Html>
    </group>
  );
};

useGLTF.preload("public/kamdo.glb");

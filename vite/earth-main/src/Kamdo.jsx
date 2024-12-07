import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";

export const Kamdo = ({ ...props }) => {
  const head = useRef();
  const stripe = useRef();
  const light = useRef();
  const { nodes, materials } = useGLTF("../assets/kamdo.glb");

  const handleClick = () => {
    console.log("Red dot clicked! State is now true.");
  };
  return (
    <group
      {...props}
      scale={0.03}
      rotation={[0, 0, -1.4]}
      onClick={handleClick}>
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
          {/* <pointLight
            ref={light}
            intensity={1}
            color={[10, 2, 5]}
            distance={2.5}
          /> */}
        </mesh>
      </group>
    </group>
  );
};

useGLTF.preload("../assets/kamdo.glb");

import { useRef } from "react";
import { Sparkles, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import clouds from "../assets/earth_clouds_diffuseOriginal.jpg";
import map from "../assets/earth_diffuseOriginal.png";
import normalMap from "../assets/earth_normal.jpg";
import displacementMap from "../assets/earth_height.jpg";
import aoMap from "../assets/earth_ao.jpg";
import { Points } from "./Points";
import { Kamdo } from "./Kamdo";
import { Vector3 } from "three";
import Annotation from "./Annotation";

export const Globe = ({
  displacementScale = 0.025,
  size = 1,
  amount = 50,
  color = "white",
  emissive,
  glow,
  controls,
  ...props
}) => {
  const groupRef = useRef();

  // useFrame(() => {
  //   groupRef.current.rotation.y += 0.0005;
  // });
  const kamdoPosition = new Vector3(1.1, 0, 0); // X-axis on the surface of the sphere

  return (
    <group {...props}>
      {/* <Annotation controls={controls} /> */}

      <group ref={groupRef} rotation={[0, -Math.PI / 8, 0]}>
        <Earth />
        <Points controls={controls} />
        <Clouds />
      </group>
    </group>
  );
};

export const Earth = () => {
  const maps = useTexture({
    map,
    normalMap,
    displacementMap,
    aoMap,
  });

  return (
    <group>
      <mesh>
        <sphereGeometry args={[1, 100, 100]} />
        {maps && <meshStandardMaterial {...maps} />}
      </mesh>
    </group>
  );
};

export const Clouds = () => {
  const ref = useRef();
  const map = useTexture(clouds);
  useFrame(() => {
    ref.current.rotation.y += 0.00005;
    ref.current.rotation.x += 0.00005;
    ref.current.rotation.z += 0.0000275;
  });

  return (
    <mesh ref={ref} scale={[1.075, 1.075, 1.075]}>
      <sphereGeometry args={[1, 100, 100]} />
      <meshPhongMaterial
        map={map}
        color={0xffffff}
        transparent={true}
        opacity={0.075}
      />
      {/* <Kamdo /> */}
    </mesh>
  );
};

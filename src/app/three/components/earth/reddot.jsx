import { Sphere } from "@react-three/drei";
import { SRGBColorSpace, TextureLoader, Vector3 } from "three";
import { GroupProps, useFrame, useLoader } from "@react-three/fiber";
import { earthFragmentShader, earthVertexShader } from "./shaders";
import { useRef, useState } from "react";
import { Atmosphere } from "../atmosphere";
import { useSun } from "../sun";
import { Kamdo } from "../kamdo";

const verteces = Math.pow(2, 9);

export const Reddot = ({ ...props }) => {
  const sunDirection = useSun((state) => state.sunDirection);

  const [earthDayTexture, nightTexture, cloudTexture] = useLoader(
    TextureLoader,
    [
      "/experiment-earth-assets/8k_earth_daymap.jpg",
      "/experiment-earth-assets/8k_earth_nightmap.jpg",
      "/experiment-earth-assets/8k_earth_clouds.jpg",
    ]
  );

  earthDayTexture.colorSpace =
    nightTexture.colorSpace =
    cloudTexture.colorSpace =
      SRGBColorSpace;

  const uniformsRef = useRef({
    dayMap: { value: earthDayTexture },
    nightMap: { value: nightTexture },
    cloudMap: { value: cloudTexture },
    uTime: { value: 0 },
    lightDirection: { value: sunDirection },
  });

  useFrame((_, delta) => {
    uniformsRef.current.lightDirection.value.copy(sunDirection);
    uniformsRef.current.uTime.value += delta;
  });
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(true);
    console.log("Red dot clicked! State is now true.");
  };
  const redDotPosition = new Vector3(1.08, 0, 0); // X-axis on the surface of the sphere
  const kamdoPosition = new Vector3(1.001, 0, 0); // X-axis on the surface of the sphere

  return (
    <group {...props} scale={3} onClick={handleClick}>
      <Sphere
        args={[0.02, 16, 16]}
        position={redDotPosition}
        onClick={handleClick}>
        <meshStandardMaterial color={isActive ? "green" : "red"} />
      </Sphere>
    </group>
  );
};

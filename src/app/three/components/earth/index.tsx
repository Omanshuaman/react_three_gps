import { Sphere } from "@react-three/drei";
import { SRGBColorSpace, TextureLoader, Vector3 } from "three";
import { GroupProps, useFrame, useLoader } from "@react-three/fiber";

import { earthFragmentShader, earthVertexShader } from "./shaders";
import { useRef } from "react";
import { Atmosphere } from "../atmosphere";
import { useSun } from "../sun";
import { Kamdo } from "../kamdo";

const verteces = Math.pow(2, 9);

export interface EarthProps {}

export const Earth = ({ ...props }: EarthProps & GroupProps) => {
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

  // Position the red dot on the sphere surface
  const redDotPosition = new Vector3(1.01, 0, 0); // X-axis on the surface of the sphere

  return (
    <group {...props} scale={3}>
      {/* Earth Sphere */}
      <Sphere args={[1, verteces, verteces]}>
        <shaderMaterial
          vertexShader={earthVertexShader}
          fragmentShader={earthFragmentShader}
          uniforms={uniformsRef.current}
        />
        <Atmosphere />
      </Sphere>

      {/* <meshStandardMaterial color="red" /> */}
      <Kamdo position={redDotPosition} />
    </group>
  );
};

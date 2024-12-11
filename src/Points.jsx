import { useMemo, useState } from "react";
import { Html, Sphere } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import TWEEN from "@tweenjs/tween.js";
import { useFrame } from "@react-three/fiber";
import Battery from "./Battery";
import { useSpring, animated } from "@react-spring/three";

const data = [
  {
    lat: 51.5072,
    lon: -0.1276,
    color: "green",
    name: "london, uk",
  },
  {
    lat: -82.8628,
    lon: 135.0,
    color: "red",
    name: "antarctica (research stations)",
    camPos: {
      x: 0.3313066157017256,
      y: -2.4081344780017715,
      z: -0.11496029189037765,
    },
    lookAt: {
      x: 0.33130668396516944,
      y: -1.244008249611388e-7,
      z: -0.11496269914734415,
    },
    goback: {
      x: 0,
      y: 1.0000000000000004,
      z: 7.000000000000006,
    },
    lookback: {
      x: 0,
      y: 0,
      z: 0,
    },
  },

  {
    lat: 28.6139,
    lon: 77.209,
    population: 32000000,
    name: "delhi, india",
  },
];

// offset the point to sit more on the surface of the sphere.
const RADIUS_ADJUSTMENT = 1.07;

// @NOTE: this assumes that the texture's x axis was moved 90 degrees
function calcPosFromLatLonRad(lat, lon) {
  var phi = lat * (Math.PI / 180);
  var theta = (90 + lon) * (Math.PI / 180);
  let z = RADIUS_ADJUSTMENT * (Math.cos(phi) * Math.cos(theta));
  let x = RADIUS_ADJUSTMENT * (Math.cos(phi) * Math.sin(theta));
  let y = RADIUS_ADJUSTMENT * Math.sin(phi);
  return [x, y, z];
}

export const Points = ({ controls }) => {
  const positions = useMemo(() => {
    return data.map((point) => calcPosFromLatLonRad(point.lat, point.lon));
  });

  return (
    <group>
      {positions &&
        positions.map((pos, i) => (
          <Point
            key={i}
            pos={pos}
            name={data.length > 0 && data[i].name}
            data={data[i]}
            controls={controls}
            color={data.length > 0 && data[i].color}
          />
        ))}
    </group>
  );
};

const Point = ({ pos, name, data, controls, color }) => {
  const [clicked, setClicked] = useState(false);
  const { camera } = useThree();
  console.log("positioj", pos, name);
  useFrame(() => {
    //@ts-ignore
    console.log("lookat", controls.current.target);
    console.log("camera postion", camera?.position);
  });
  const handleClick = () => {
    // Toggle the clicked state
    setClicked(!clicked);

    if (!clicked) {
      // Move camera and controls to the clicked point's position and target
      new TWEEN.Tween(controls.current.target)
        .to(
          {
            x: data.lookAt.x,
            y: data.lookAt.y,
            z: data.lookAt.z,
          },
          1000
        )
        .easing(TWEEN.Easing.Cubic.Out)
        .start();

      new TWEEN.Tween(camera.position)
        .to(
          {
            x: data.camPos.x,
            y: data.camPos.y,
            z: data.camPos.z,
          },
          1000
        )
        .easing(TWEEN.Easing.Cubic.Out)
        .start();
    } else {
      // Move camera and controls back to the initial position
      new TWEEN.Tween(controls.current.target)
        .to(
          {
            x: data.lookback.x,
            y: data.lookback.y,
            z: data.lookback.z,
          },
          2000
        )
        .easing(TWEEN.Easing.Cubic.Out)
        .start();

      new TWEEN.Tween(camera.position)
        .to(
          {
            x: data.goback.x,
            y: data.goback.y,
            z: data.goback.z,
          },
          2000
        )
        .easing(TWEEN.Easing.Cubic.Out)
        .start();
    }
  };

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
    <animated.mesh
      position={pos}
      scale={clicked ? 1.5 : 1}
      onClick={handleClick}>
      <Sphere args={[0.0125, 16, 16]}>
        <animated.meshStandardMaterial
          transparent
          opacity={opacity}
          color={color}
        />
      </Sphere>
      {clicked && (
        <Html
          distanceFactor={4}
          className="w-[800px]"
          style={{ transform: "scale(0.7)", opacity: "0.8" }}
          position={[-0.7, 3, 0.6]}>
          <Battery />
        </Html>
      )}
    </animated.mesh>
  );
};

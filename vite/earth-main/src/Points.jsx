import { useMemo, useState } from "react";
import { Html, Sphere } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import TWEEN from "@tweenjs/tween.js";

const data = [
  {
    lat: 30.266666,
    lon: -97.73333,
    population: 965872,
    name: "austin, tx, us",
  },
  {
    lat: 24.555059,
    lon: -81.779984,
    population: 24495,
    name: "key west, florida, us",
  },
  {
    lat: 51.5072,
    lon: -0.1276,
    population: 8982000,
    name: "london, uk",
  },
  {
    lat: -33.8688,
    lon: 151.2093,
    population: 53123000,
    name: "sydney, au",
  },
  {
    lat: -82.8628,
    lon: 135.0,
    population: 1106,
    name: "antarctica (research stations)",
    camPos: {
      x: 1.2180728574289914,
      y: -1.552033044337705,
      z: -4.993948284315608,
    },
    lookAt: {
      x: 0,
      y: 0,
      z: 0,
    },
    goback: {
      x: 0,
      y: 5.000000000000002,
      z: 10,
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
const RADIUS_ADJUSTMENT = 1.05;

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
          />
        ))}
    </group>
  );
};

const Point = ({ pos, name, data, controls }) => {
  const [clicked, setClicked] = useState(false);
  const { camera } = useThree();
  console.log("positioj", pos, name);
  const handleClick = () => {
    setClicked(!clicked);

    // Assuming `animationTarget` contains `lookAt` and `camPos` for this point
    // Animate the controls target
    new TWEEN.Tween(controls.current.target)
      .to(
        {
          x: data.lookAt.x,
          y: data.lookAt.y,
          z: data.lookAt.z,
        },
        2800
      )
      .easing(TWEEN.Easing.Cubic.Out)
      .start();

    // Animate the camera position
    new TWEEN.Tween(camera.position)
      .to(
        {
          x: data.camPos.x,
          y: data.camPos.y,
          z: data.camPos.z,
        },
        2800
      )
      .easing(TWEEN.Easing.Cubic.Out)
      .start();
  };

  return (
    <mesh position={pos} scale={clicked ? 1.5 : 1} onClick={handleClick}>
      <Sphere args={[0.0125, 16, 16]} color="red" />
      <meshStandardMaterial
        color={0xff0000}
        emissiveIntensity={5}
        emissive={0x0000ff}
      />
      {clicked && (
        <Html distanceFactor={4}>
          <h4 style={{ margin: 0, padding: 0, color: "white" }}>{name}</h4>
        </Html>
      )}
    </mesh>
  );
};

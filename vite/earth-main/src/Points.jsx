import { useMemo, useState } from "react";
import { Html } from "@react-three/drei";

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

export const Points = () => {
  const positions = useMemo(() => {
    return data.map((point) => calcPosFromLatLonRad(point.lat, point.lon));
  });

  return (
    <group>
      {positions &&
        positions.map((pos, i) => (
          <Point key={i} pos={pos} name={data.length > 0 && data[i].name} />
        ))}
    </group>
  );
};

const Point = ({ pos, name }) => {
  const [clicked, click] = useState(false);

  return (
    <mesh
      position={pos}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}>
      {/* <planeGeometry args={[0.0125, 16, 16]} /> */}
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

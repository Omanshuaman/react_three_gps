import "./App.css";
import "maplibre-gl/dist/maplibre-gl.css";
import Map from "react-map-gl/maplibre";
import { Canvas } from "react-three-map/maplibre";
import React, { useRef, useState } from "react";
import { Environment } from "@react-three/drei";

import { useFrame } from "@react-three/fiber";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <Map
          antialias
          initialViewState={{
            latitude: 51,
            longitude: 0,
            zoom: 13,
            pitch: 60,
          }}
          mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json">
          <Canvas latitude={51} longitude={0}>
            <Environment preset="park" />

            <object3D scale={500}>
              <Box position={[-1.2, 0, 0]} />
              <Box position={[1.2, 0, 0]} />
            </object3D>
            <axesHelper args={[5000000]} />
          </Canvas>
        </Map>
      </div>
    </>
  );
}
function Box(props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (meshRef.current.rotation.x += delta));
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}
export default App;

import React, { useEffect, useRef } from "react";
import {
  useGLTF,
  useAnimations,
  Html,
  Billboard,
  Shadow,
  Sparkles,
  Sphere,
} from "@react-three/drei";
import { LoopRepeat } from "three";
import Dashboard from "./Dashboard";
import { LayerMaterial, Depth } from "lamina";
import { useSpring, animated } from "@react-spring/three";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useModel } from "./contexts/ModelContext";

export function Astrowalk(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/Astrowalk.glb");
  const { actions } = useAnimations(animations, group);
  const { isModelOpen, toggleModel } = useModel();
  console.log("isModelOpen", isModelOpen);
  useEffect(() => {
    const action = actions["Walk"];
    if (action) {
      action.setLoop(LoopRepeat);
      action.timeScale = 0.2; // Slow down the animation to half speed

      action.play();
    }
  }, [actions]);
  const { camera } = useThree();
  useFrame(() => {
    //@ts-ignore
    console.log("camera postion", camera?.position);
  });
  const clone1 = useRef();
  const clone2 = useRef();

  return (
    <>
      <group position={[-3, 0, 0]}>
        <SphereComp
          size={0.06}
          amount={10}
          color="#ff1100" // Darker red color
          glow="yellow"
          emissive="#ff1100" // Darker red emissive
          position={[0, 2.1, 0]}
        />
        <group ref={group} {...props} dispose={null} scale={10.5}>
          <group name="Scene">
            <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
              <skinnedMesh
                name="Suit_no_tent_Combined_Mesh"
                geometry={nodes.Suit_no_tent_Combined_Mesh.geometry}
                material={materials.lambert1}
                skeleton={nodes.Suit_no_tent_Combined_Mesh.skeleton}
                castShadow></skinnedMesh>
              <primitive object={nodes.mixamorigHips} />
            </group>
          </group>
        </group>
        <Html
          className="w-[1100px] -bottom-72 left-0"
          style={{
            transform: "scale(0.7)",
            opacity: "0.8",
          }}>
          <div className={`${!isModelOpen ? "" : "animate-tvClose"}`}>
            <div className="flex justify-between px-1">
              <div></div>
              <button
                type="button"
                onClick={toggleModel}
                class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 w-fit">
                <span class="sr-only">Close menu</span>
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <Dashboard />
          </div>
        </Html>
      </group>
      <group position={[-8, 0, -20]}>
        <SphereComp
          size={0.08}
          amount={10}
          color="green"
          glow="yellow"
          emissive="green"
          position={[0, 2.1, 0]}
        />
        <mesh
          ref={clone1}
          scale={10.5}
          geometry={nodes.Suit_no_tent_Combined_Mesh.geometry.clone()}
          material={materials.lambert1}
          skeleton={nodes.Suit_no_tent_Combined_Mesh.skeleton}></mesh>
      </group>
      <group position={[-2, 0, -35]}>
        <SphereComp
          size={0.08}
          amount={10}
          color="green"
          glow="yellow"
          emissive="green"
          position={[0, 2.1, 0]}
        />
        <mesh
          ref={clone2}
          scale={10.5}
          geometry={nodes.Suit_no_tent_Combined_Mesh.geometry.clone()}
          material={materials.lambert1}
          skeleton={nodes.Suit_no_tent_Combined_Mesh.skeleton}></mesh>
      </group>
    </>
  );
}
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
        await next({ opacity: 0.5 });
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
useGLTF.preload("/Astrowalk.glb");

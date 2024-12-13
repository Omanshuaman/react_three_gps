import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { LoopRepeat } from "three";

export function Astrowalk(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/Astrowalk.glb");
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    const action = actions["Walk"];
    if (action) {
      action.setLoop(LoopRepeat);
      action.play();
    }
  }, [actions]);
  return (
    <group ref={group} {...props} dispose={null} scale={20}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <skinnedMesh
            name="Suit_no_tent_Combined_Mesh"
            geometry={nodes.Suit_no_tent_Combined_Mesh.geometry}
            material={materials.lambert1}
            skeleton={nodes.Suit_no_tent_Combined_Mesh.skeleton}
            castShadow
          />
          <primitive object={nodes.mixamorigHips} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/Astrowalk.glb");

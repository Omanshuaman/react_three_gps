import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { LoopRepeat } from "three";

export function Astronaut(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/tripo_astronaut_2_stylized_and_animated.glb"
  );
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    const action = actions["2467009006928_TempMotion"];
    if (action) {
      action.setLoop(LoopRepeat);
      action.play();
    }
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null} scale={2}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="7112eee7004a496e95bc290f49540a77fbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={
                      materials.tripo_material_1d02f448_ca75_4397_b2d7_65f54112abe1
                    }
                    skeleton={nodes.Object_7.skeleton}
                    morphTargetDictionary={nodes.Object_7.morphTargetDictionary}
                    morphTargetInfluences={nodes.Object_7.morphTargetInfluences}
                    castShadow
                  />
                  <skinnedMesh
                    castShadow
                    name="Object_9"
                    geometry={nodes.Object_9.geometry}
                    material={
                      materials.tripo_material_1d02f448_ca75_4397_b2d7_65f54112abe1
                    }
                    skeleton={nodes.Object_9.skeleton}
                    morphTargetDictionary={nodes.Object_9.morphTargetDictionary}
                    morphTargetInfluences={nodes.Object_9.morphTargetInfluences}
                  />
                  <skinnedMesh
                    castShadow
                    name="Object_11"
                    geometry={nodes.Object_11.geometry}
                    material={
                      materials.tripo_material_684f35f5_3fcb_41b2_8d11_3a5ab789537d
                    }
                    skeleton={nodes.Object_11.skeleton}
                    morphTargetDictionary={
                      nodes.Object_11.morphTargetDictionary
                    }
                    morphTargetInfluences={
                      nodes.Object_11.morphTargetInfluences
                    }
                  />
                  <skinnedMesh
                    castShadow
                    name="Object_13"
                    geometry={nodes.Object_13.geometry}
                    material={
                      materials.tripo_material_d8a3da82_93e5_421e_8f12_646a146621c9
                    }
                    skeleton={nodes.Object_13.skeleton}
                    morphTargetDictionary={
                      nodes.Object_13.morphTargetDictionary
                    }
                    morphTargetInfluences={
                      nodes.Object_13.morphTargetInfluences
                    }
                  />
                  <skinnedMesh
                    castShadow
                    name="Object_15"
                    geometry={nodes.Object_15.geometry}
                    material={
                      materials.tripo_material_bff6a5a4_829f_4a12_bfb7_46279d9f097e
                    }
                    skeleton={nodes.Object_15.skeleton}
                    morphTargetDictionary={
                      nodes.Object_15.morphTargetDictionary
                    }
                    morphTargetInfluences={
                      nodes.Object_15.morphTargetInfluences
                    }
                  />
                  <skinnedMesh
                    castShadow
                    name="Object_17"
                    geometry={nodes.Object_17.geometry}
                    material={
                      materials.tripo_material_b12c32a9_c015_4f05_9e8c_ca9a2446ac0c
                    }
                    skeleton={nodes.Object_17.skeleton}
                    morphTargetDictionary={
                      nodes.Object_17.morphTargetDictionary
                    }
                    morphTargetInfluences={
                      nodes.Object_17.morphTargetInfluences
                    }
                  />
                  <group name="Object_6" rotation={[-Math.PI / 2, 0, 0]} />
                  <group name="Object_8" rotation={[-Math.PI / 2, 0, 0]} />
                  <group name="Object_10" rotation={[-Math.PI / 2, 0, 0]} />
                  <group name="Object_12" rotation={[-Math.PI / 2, 0, 0]} />
                  <group name="Object_14" rotation={[-Math.PI / 2, 0, 0]} />
                  <group name="Object_16" rotation={[-Math.PI / 2, 0, 0]} />
                  <group name="arm___left" rotation={[-Math.PI / 2, 0, 0]} />
                  <group name="arm___right" rotation={[-Math.PI / 2, 0, 0]} />
                  <group name="head" rotation={[-Math.PI / 2, 0, 0]} />
                  <group name="leg___left" rotation={[-Math.PI / 2, 0, 0]} />
                  <group name="leg___right" rotation={[-Math.PI / 2, 0, 0]} />
                  <group name="torso" rotation={[-Math.PI / 2, 0, 0]} />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/tripo_astronaut_2_stylized_and_animated.glb");

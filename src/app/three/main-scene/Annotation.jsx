import React, { useState } from "react";
import { useConfigurator } from "../../contexts/Configurator";
import TWEEN from "@tweenjs/tween.js";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";

const Annotation = ({ controls }) => {
  const { mode } = useConfigurator();
  const { camera } = useThree();

  const carpet = [
    {
      title: "Carpet",
      selectItem: 1,

      description: "<p>Bathroom Sink is good for washing your hands</p>",
      camPos: {
        x: -10.80364304032025,
        y: 2.8194067488070083,
        z: -8.227558303494892,
      },
      lookAt: {
        x: -9.707815725788404,
        y: -18.536888752802906,
        z: -9.889681708783487,
      },
      goback: {
        x: 16.02797595419996,
        y: 0.6098065515298132,
        z: 14.8151131763851,
      },
      lookback: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
  ];

  return (
    <>
      {carpet.map((a, i) => (
        <Html key={i} position={[2, 0, 0]}>
          <div
            className="-z-50 h-10 w-fit bg-black bg-opacity-30 backdrop-blur-md hover:border hover:border-sky-500 rounded-md justify-center items-center flex px-3 cursor-pointer"
            onPointerUp={() => {
              new TWEEN.Tween(controls.current.target)
                .to(
                  {
                    x: a.lookAt.x,
                    y: a.lookAt.y,
                    z: a.lookAt.z,
                  },
                  800
                )
                .easing(TWEEN.Easing.Cubic.Out)
                .start();

              new TWEEN.Tween(camera.position)
                .to(
                  {
                    x: a.camPos.x,
                    y: a.camPos.y,
                    z: a.camPos.z,
                  },

                  800
                )
                .easing(TWEEN.Easing.Cubic.Out)
                .start();
            }}></div>
        </Html>
      ))}
    </>
  );
};

export default Annotation;

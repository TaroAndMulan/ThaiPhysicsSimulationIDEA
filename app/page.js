"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import Projectile from "@/component/projectile";
import { KeyboardControls } from "@react-three/drei/web";
import "./globals.css";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-32">


      <div className="border-red-600 border-4 rounded-lg w-1/2 mx-auto  bg-red-200">
          <div className="text-7xl text-red-600 text-center">TaroMulan</div>
          <div className="text-lg text-black text-center">Digitize and Modernize teaching material for school</div>
          
        </div>




        <div className=" border-4 rounded-lg  bg-red-200 mt-48 flex items-center justify-center p-20 flex-col">
          <div className="text-3xl font-mono font-bold pb-16">
            An excercise from Thailand highschool physics book (สสวท)
          </div>
          <Image
            src="/images/problemsswt.png"
            width={616}
            height={294}
            alt="problem"
          />

          <div className="text-sm mt-5">
            Translation: Object A is launched from the ground at an angle of 30
            degrees with the horizontal and an initial speed of 40 m/s. Suppose
            that we want to launch object B straight upward at the same time.
            What initial speed should we give object B so that both objects would
            collide mid-air?
          </div>
        </div>

        <div className=" border-4 rounded-lg  bg-red-200 mt-48 flex items-center justify-center p-20 flex-col">
          <div className="text-3xl font-mono font-bold pb-16">
            The solution from the book
          </div>
          <Image
            src="/images/sol.png"
            width={617}
            height={750}
            alt="problem"
          />

          <div className="text-lg mt-10 font-bold">
           This is an official solution written in the book. We have to launch object B with the speed of 20m/s to hit object A.
           <br/><br/><br/>
           The solution look boring right? There is no fun in calculation if we do not get to see it for real !!   
          </div>
        </div>

        <div className=" border-4 rounded-lg  bg-red-200 mt-48 flex items-center justify-center p-20 flex-col">


        <div className="text-3xl font-mono font-bold pb-16">
            We can turn this problem into an interactive simulation
          </div>

          <div className="w-11/12 h-[60rem]">

          <KeyboardControls
            map={[
              { name: "start", keys: ["KeyS"] },
              { name: "reset", keys: ["KeyR"] },
              { name: "slow", keys: ["KeyP"] },
            ]}
          >
            <Canvas
              shadows
              camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 10, 100] }}
            >
              <Projectile />
            </Canvas>
          </KeyboardControls>
          </div>
     

          <div className="text-lg mt-5 font-bold">

            This is a 3D scene, you can zoom in and move around like in video game. ( R=reset , S=shoot)
           <br/><br/><br/>

           Try it yourself, set the speed to 20 m/s to make the objects collides.
           <br/><br/><br/>

           Change the speed to something else and see what happen.
           <br/><br/><br/>

           We put an elephant in the scene as a comparison to show student how fast it is to move with these speeds
           <br/><br/><br/>
               
           Tick gridOn to turn on the grid, this can be use as a ruler to analyzes the motion of the object. 
           <br/><br/><br/>
          </div>



        </div>


      </div>
    </>
  );
}

/*


import { memo } from 'react'
import { Canvas } from '@react-three/fiber'
import { Grid, Center, GizmoHelper, GizmoViewport, AccumulativeShadows, RandomizedLight, OrbitControls, Environment, useGLTF } from '@react-three/drei'
import { useControls } from 'leva'

  

    <Canvas shadows camera={{ position: [10, 12, 12], fov: 25 }}>
 
          <mesh castShadow>
            <sphereGeometry args={[0.5, 64, 64]} />
            <meshStandardMaterial color="#9d4b4b" />
          </mesh>
          <mesh castShadow rotation={[0, Math.PI / 4, 0]}>
            <boxGeometry args={[0.7, 0.7, 0.7]} />
            <meshStandardMaterial color="#9d4b4b" />
          </mesh>
      
        <Grid position={[0, -0.01, 0]} args={gridSize} {...gridConfig} />
      <Environment preset="city" />
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} labelColor="white" />
      </GizmoHelper>
    </Canvas>

*/

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { SphereGeometry, GridHelper } from "three";
import {
  OrbitControls,
  Sphere,
  Plane,
  Environment,
  Grid,
  Box,
  Sky,
  useKeyboardControls,
  GizmoHelper,
  GizmoViewport,
  useFBX,
  Text,
} from "@react-three/drei";
import { Clock, Vector3 } from "three";
import { Physics, RigidBody, MeshCollider, CuboidCollider, Debug,useSphericalJoint } from "@react-three/rapier";
import { Perf } from "r3f-perf";
import { useControls, button } from "leva";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { KeyboardControls } from "@react-three/drei/web";

import Arrow from "./arrow";
const g = new Vector3(0, -9.8, 0);
let v = new Vector3(0, 0, 0);
let v2 = new Vector3(40 * Math.cos(Math.PI / 6), 40 * Math.cos(Math.PI / 6), 0);
let v3 = new Vector3(0, 40 * Math.cos(Math.PI / 6), 0);

function Pivot(prop){
    return (
    <RigidBody type="fixed" {...prop}>
        <Box color="pink">
        <meshPhongMaterial color="red"  />

        </Box>

    </RigidBody>
    )
}
function Ball(prop){
    return (
        <RigidBody ref={ball} position={[5, 0, 0]}>
          <Sphere args={[0.2]}>
            <meshPhysicalMaterial />
          </Sphere>
 
        </RigidBody>
    )

}






const Jointed = () => {
    const ball = useRef()
    const pivot = useRef()
    useSphericalJoint(pivot, ball, [
      // Position of the joint in bodyA's local space
      [0, 0, 0],
      // Position of the joint in bodyB's local space
      [0, 5, 0]
    ]);
  
    useEffect( ()=> {
        if(ball.current){
            ball.current.setTranslation({x:3,y:-4,z:0},true)
            ball.current.setLinvel({x:0,y:0,z:-10},true)
        }
    },[]

    )
    return (
        <group>
           <RigidBody type="fixed" ref={pivot} color="red"/>
        <RigidBody ref={ball}>
          <Sphere args={[0.2]}>
            <meshPhysicalMaterial />
          </Sphere>
 
        </RigidBody>
        </group>

    );
  };

function SceneBody() {


  const [subscribeKeys, getKeys] = useKeyboardControls();
  const [gridOn,setGridOn] = useState(true)
  const ball = useRef()
  const period = 5
  const w = 2*Math.PI/period
  useFrame((state) => {
    let t= state.clock.elapsedTime
    ball.current.position.set(5*Math.sin(w*t),0,5*Math.cos(w*t),0)
  });

  return (
    <>
      <Text color="black" position={[0, 30, 0]} scale={10}>
        Circular motion
      </Text>

      <Text color="black" position={[0, 50, 0]} scale={10}>
        Press R to reset simulation
      </Text>

      <gridHelper
        visible={gridOn}
        rotation-x={[Math.PI / 2]}
        args={[300, 300, "teal", "teal"]}
      ></gridHelper>
      <ambientLight args={[0x404040, 10]}></ambientLight>
      <OrbitControls makeDefault />

      <mesh ref={ball}>
        <sphereGeometry args={[1]}/>
        <meshBasicMaterial color="black"></meshBasicMaterial>

    </mesh>

    <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport
            axisColors={["#9d4b4b", "#2f7f4f", "#3b5b9d"]}
            labelColor="white"
          />
        </GizmoHelper>

    </>
  );
}

export default function Circular2() {
  

  return (
    <>
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
          <SceneBody />
        </Canvas>
      </KeyboardControls>
    </>
  );
}

/*<Ball radius={1} position={[0,0,0]} velocity={v2}/>
<Ball radius={1} position={[50,0,0]} velocity={v3}/>
      <Perf position={"top-left"} />

    <Grid position={[0, -0.01, 0]} args={gridSize} {...gridConfig} />
       
     



*/

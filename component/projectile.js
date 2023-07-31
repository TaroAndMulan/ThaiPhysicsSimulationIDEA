import { Canvas, useFrame,useLoader } from "@react-three/fiber";
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
  GizmoViewport, useFBX,Text
} from "@react-three/drei";
import { Clock, Vector3 } from "three";
import { Physics, RigidBody, CuboidCollider,Debug } from "@react-three/rapier";
import { Perf } from "r3f-perf";
import { useControls,button } from "leva";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Arrow from "./arrow";
const g = new Vector3(0, -9.8, 0);
let v = new Vector3(0, 0, 0);
let v2 = new Vector3(40 * Math.cos(Math.PI / 6), 40 * Math.cos(Math.PI / 6), 0);
let v3 = new Vector3(0, 40 * Math.cos(Math.PI / 6), 0);


export default function Projectile() {
  const gltf = useLoader(GLTFLoader,'elephant/scene.gltf')
  const [isPause,setIspause] = useState(false)
  const [arrvisible,setArrvisible] = useState(true)
  const [arrvisibleCannon,setArrvisibleCannon] = useState(true)
  const [isshot,setIsshot] = useState(false)

  const { gridOn,speed } = useControls({
    gridOn:false,
    speed: { value: 20, min: 0, max: 100, step: 1},
  });



  let player = useRef();
  let cannon = useRef();
  let elephant = useRef();
  let phys = useRef()
  let arr=  useRef(null)
  const [subscribeKeys, getKeys] = useKeyboardControls();

  useFrame((state, delta) => {
    const { start,reset,slow } = getKeys();
    if (start || isshot) {


      console.log("reset")
      cannon.current.setTranslation({x:-70,y:0,z:0})
      player.current.setTranslation({x:20,y:0,z:0})
      cannon.current.setLinvel({x:0,y:0,z:0})
      player.current.setLinvel({x:0,y:0,z:0})
      setArrvisible(true)
      setArrvisibleCannon(true)
      //console.log("translateion: ",cannon.current.translation())

      //cannon.current.setLinvel({x:0,y:10,z:0})
      //cannon.current.setTranslation({x:0,y:5,z:0})
      //console.log("current:  ",cannon.current)
      console.log("start")
      cannon.current.setLinvel({x:40*Math.cos(Math.PI/6),y:40*Math.sin(Math.PI/6),z:0})
      player.current.setLinvel({x:0,y:speed,z:0})
      setArrvisible(false)
      setArrvisibleCannon(false)
      setIsshot(false)
      //cannon.current.children[0].scale = 2
      
    }
    if (reset){
      console.log("reset")
      cannon.current.setTranslation({x:-70,y:0,z:0})
      player.current.setTranslation({x:20,y:0,z:0})
      cannon.current.setLinvel({x:0,y:0,z:0})
      player.current.setLinvel({x:0,y:0,z:0})
      setArrvisible(true)
      setArrvisibleCannon(true)
    }
    if(slow){
      setIspause(true)
      console.log(phys.current)
      console.log(elephant.current)
      //phys.current.timeStep = 0.006
    }
  });

  return (
    <>

<Text color="black" position={[0,30,0]} scale={10}>
  Press S to shoot

</Text>


<Text color="black" position={[0,50,0]} scale={10}>
Press R to reset simulation

</Text>

    <mesh visible={false }position= {[0,0,speed]}>
      <boxGeometry></boxGeometry>
      <meshStandardMaterial></meshStandardMaterial>
    </mesh>
    <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={80} rayleigh={0.1} azimuth={50} />
    <primitive ref={elephant} scale={15} rotation={[0,Math.PI/2,0]} position={[0,-1,0]} object={gltf.scene} />

    <Arrow visible={arrvisible} start={[20,1,0]} magnitude={2}/>
    <Arrow visible={arrvisibleCannon} start={[-69,1,0]} magnitude={2} rotation={[0,0,-Math.PI/3]}/>
      <gridHelper visible={gridOn} rotation-x={[Math.PI/2]} args={[300,300,"teal","teal"]}></gridHelper>
      <ambientLight args={[0x404040, 10]}></ambientLight>
      <OrbitControls makeDefault />
      <Physics ref={phys} paused={isPause} >
        <Environment preset="city" />
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport
            axisColors={["#9d4b4b", "#2f7f4f", "#3b5b9d"]}
            labelColor="white"
          />
        </GizmoHelper>

        <RigidBody position={[-70, 0, 0]} ref={cannon}>
          <mesh castShadow >
            <sphereGeometry castShadow args={[1]} />
            <meshPhysicalMaterial
              color={"red"}
              transmission={1}
              roughness={0}
              thickness={1}
              envMapIntensity={0.5}
            />
          </mesh>
        </RigidBody>

        <RigidBody position={[20, 0, 0]} ref={player}>
          <mesh castShadow >
            <sphereGeometry castShadow args={[1]} />
            <meshPhysicalMaterial
              color={"purple"}
              transmission={1}
              roughness={0}
              thickness={3}
              envMapIntensity={0.5}
            />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed" restitution={1}>
          <Box receiveShadow args={[180, 1000, 10]} position={[0, -501, 0]}>
            <meshPhysicalMaterial
              color={"lawngreen"}
              transmission={1}
              roughness={0}
              thickness={3}
              envMapIntensity={0.1}
            />
          </Box>
        </RigidBody>
      </Physics>
      </>
  );
}

/*<Ball radius={1} position={[0,0,0]} velocity={v2}/>
<Ball radius={1} position={[50,0,0]} velocity={v3}/>
      <Perf position={"top-left"} />

    <Grid position={[0, -0.01, 0]} args={gridSize} {...gridConfig} />
       
     



*/

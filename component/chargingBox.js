
import { Canvas,useFrame } from "@react-three/fiber";
import { useRef } from "react";
function ChargingBox() {
    let box = useRef()
    
    let i=0
    useFrame((state,delta)=>{
      if (i==0)
      console.log(state)
      i++
      box.current.rotation.x += delta
      box.current.position.x = 1*Math.sin(state.clock.elapsedTime)
      box.current.position.y = 1*Math.cos(state.clock.elapsedTime)
      box.current.position.z = 10*Math.tan(3*state.clock.elapsedTime)
    })
  
  
    return (
      <mesh ref={box}>
        <boxGeometry />
        <meshBasicMaterial color={"red"} />
      </mesh>
    );
  }
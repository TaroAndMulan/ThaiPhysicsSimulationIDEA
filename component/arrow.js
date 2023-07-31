
export default function Arrow({start,magnitude, visible,rotation=[0,0,0]}){
    return (<group castShadow={false} visible={visible} position={start} rotation={rotation}>
    <mesh>
        <cylinderGeometry args={[0.1,0.1,magnitude]}/>
        <meshStandardMaterial color="green"/>
    </mesh>
    <mesh position={[0,magnitude-0.5,0]}>
    <coneGeometry args={[0.3,1]}/>
        <meshStandardMaterial color="green"/>
    </mesh>
    
    </group>)
}
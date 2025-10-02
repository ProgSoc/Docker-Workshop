import {Canvas, useFrame} from "@react-three/fiber"
import {useRef, useState} from "react"
import { Mesh } from "three"

const VirtualCube = () => {
    return (
        <Canvas className="!h-[500px]">
            <ambientLight />
            <pointLight position={[10, 10, 1]} intensity={1000}/>
            <Box position={[0, 0, 0]} />
        </Canvas>
    )

}

function Box(props: any) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<Mesh>(null!)
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
        meshRef.current.rotation.x += delta
        meshRef.current.rotation.y += delta
  })
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'yellow'} />
    </mesh>
  )
}

export default VirtualCube

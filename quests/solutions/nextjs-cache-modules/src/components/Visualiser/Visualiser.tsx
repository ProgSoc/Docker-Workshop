import {useRubiksCube} from "@/hooks/useRubiksCube"
import Face from "./Face"
import { useEffect } from "react";

const Visualiser = ({scramble, controls=false}: {scramble: string, controls?: boolean}) => {
    const {rubiksCube: cube, performScramble, turn, resetCube} = useRubiksCube(); 

    useEffect(() => {
      performScramble(scramble);
    }, [scramble])

    return (
    <>
      <div className='grid grid-cols-4 gap-2'>
        <div className='sm:w-20 sm:h-20 w-16 h-16'/>
        <Face stickers={cube.UFace} />
        <div className='sm:w-20 sm:h-20 w-16 h-16'/>
        <div className='sm:w-20 sm:h-20 w-16 h-16'/>
        <Face stickers={cube.LFace}/>
        <Face stickers={cube.FFace}/>
        <Face stickers={cube.RFace}/>
        <Face stickers={cube.BFace}/>
        <div className='sm:w-20 sm:h-20 w-16 h-16'/>
        <Face stickers={cube.DFace}/>
        <div className='sm:w-20 sm:h-20 w-16 h-16'/>
        <div className='sm:w-20 sm:h-20 w-16 h-16'/>
      </div>
      {controls && ( 
      <>
      <div className="grid grid-cols-6 gap-2 mt-8">
        <button className='border w-[100px] h-[40px] border-slate-500 rounded-lg bg-slate-300' onClick={() => turn("F")}>F</button>
        <button className='border w-[100px] h-[40px] border-slate-500 rounded-lg bg-slate-300' onClick={() => turn("R")}>R</button>
        <button className='border w-[100px] h-[40px] border-slate-500 rounded-lg bg-slate-300' onClick={() => turn("U")}>U</button>
        <button className='border w-[100px] h-[40px] border-slate-500 rounded-lg bg-slate-300' onClick={() => turn("L")}>L</button>
        <button className='border w-[100px] h-[40px] border-slate-500 rounded-lg bg-slate-300' onClick={() => turn("D")}>D</button>
        <button className='border w-[100px] h-[40px] border-slate-500 rounded-lg bg-slate-300' onClick={() => turn("B")}>B</button>
        <button className='border w-[100px] h-[40px] border-slate-500 rounded-lg bg-slate-300' onClick={() => turn("F'")}>{`F'`}</button>
        <button className='border w-[100px] h-[40px] border-slate-500 rounded-lg bg-slate-300' onClick={() => turn("R'")}>{`R'`}</button>
        <button className='border w-[100px] h-[40px] border-slate-500 rounded-lg bg-slate-300' onClick={() => turn("U'")}>{`U'`}</button>
        <button className='border w-[100px] h-[40px] border-slate-500 rounded-lg bg-slate-300' onClick={() => turn("L'")}>{`L'`}</button>
        <button className='border w-[100px] h-[40px] border-slate-500 rounded-lg bg-slate-300' onClick={() => turn("D'")}>{`D'`}</button>
        <button className='border w-[100px] h-[40px] border-slate-500 rounded-lg bg-slate-300' onClick={() => turn("B'")}>{`B'`}</button>
      </div> 
        <button className='mt-8 border w-[100px] h-[40px] border-slate-500 rounded-lg bg-slate-300' onClick={() => resetCube()}>Reset</button>
	</>
      )}
    </>
    )
}

export default Visualiser

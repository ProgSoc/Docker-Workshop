import {useEffect, useState} from "react"

const MOVES = ["R", "L", "U", "D", "F", "B", "R'", "L'", "U'", "D'", "F'", "B'", "R2", "L2", "U2", "D2", "F2", "B2"]
const OPPOSITES = {
    R: "L",
    U: "D",
    F: "B",
    L: "R",
    D: "U",
    B: "F",
}

export const generateScramble = () => {
        let prevMove = ""
        let prevPrevMove = ""
        return Array(20).fill("").map((move, idx, scrambleArr) => {
            let newMove = ""
            do {
                newMove = MOVES[Math.floor(Math.random()*MOVES.length)];
            //@ts-ignore
            } while (newMove[0] === prevMove[0] || (newMove[0] === prevPrevMove[0] && newMove[0] === OPPOSITES[prevMove[0]]))
            prevPrevMove = prevMove
            prevMove = newMove
            return newMove
        }).join(" ")
}


const ScrambleHeader = ({ latestSolve, scramble }: { latestSolve: number | undefined, scramble: string }) => {

    return (
        <h1 className="mt-5 md:text-3xl text-md text-center">{scramble}</h1>
    )
}

export default ScrambleHeader;

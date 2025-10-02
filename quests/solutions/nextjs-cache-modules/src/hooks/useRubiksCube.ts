import {useState} from "react";

export enum Colours {
    WHITE,
    ORANGE,
    GREEN,
    RED,
    BLUE,
    YELLOW,
}

export type RubiksCube = {
    UFace: Colours[],
    LFace: Colours[],
    FFace: Colours[],
    RFace: Colours[],
    BFace: Colours[],
    DFace: Colours[],
}


const solvedCube = {
     UFace: Array(9).fill(Colours.WHITE),
     LFace: Array(9).fill(Colours.ORANGE),
     FFace: Array(9).fill(Colours.GREEN),
     RFace: Array(9).fill(Colours.RED),
     BFace: Array(9).fill(Colours.BLUE),
     DFace: Array(9).fill(Colours.YELLOW),
}

const layerConnections = {
    UFace: {
        top: {face: "BFace", connectedStickers: [2, 1, 0]},
        left: {face: "LFace", connectedStickers: [2, 1, 0]},
        bottom: {face: "FFace", connectedStickers: [2, 1, 0]},
        right: {face: "RFace", connectedStickers: [2, 1, 0]},
    },
    LFace: {
        top: {face: "UFace", connectedStickers: [0, 3, 6]},
        left: {face: "BFace", connectedStickers: [8, 5, 2]},
        bottom: {face: "DFace", connectedStickers: [0, 3, 6]},
        right: {face: "FFace", connectedStickers: [0, 3, 6]},
    },
    FFace: {
        top: {face: "UFace", connectedStickers: [6, 7, 8]},
        left: {face: "LFace", connectedStickers: [8, 5, 2]},
        bottom: {face: "DFace", connectedStickers: [2, 1, 0]},
        right: {face: "RFace", connectedStickers: [0, 3, 6]},
    },
    RFace: {
        top: {face: "UFace", connectedStickers: [2, 5, 8]},
        left: {face: "FFace", connectedStickers: [2, 5, 8]},
        bottom: {face: "DFace", connectedStickers: [2, 5, 8]},
        right: {face: "BFace", connectedStickers: [6, 3, 0]},
    },
    BFace: {
        top: {face: "UFace", connectedStickers: [2, 1, 0]},
        right: {face: "LFace", connectedStickers: [0, 3, 6]},
        bottom: {face: "DFace", connectedStickers: [6, 7, 8]},
        left: {face: "RFace", connectedStickers: [8, 5, 2]},
    },
    DFace: {
        top: {face: "FFace", connectedStickers: [6, 7, 8]},
        left: {face: "LFace", connectedStickers: [6, 7, 8]},
        bottom: {face: "BFace", connectedStickers: [6, 7, 8]},
        right: {face: "RFace", connectedStickers: [6, 7, 8]},
    },
}

export function useRubiksCube(initialCube?: RubiksCube) {
    const [rubiksCube, setRubiksCube] = useState<RubiksCube>(initialCube || solvedCube);

    const resetCube = () => {
      setRubiksCube(solvedCube)
    }

    const turn = (move: string, cube?: RubiksCube): RubiksCube => {
	let currentCube = cube || structuredClone(rubiksCube)
        const face = `${move[0]}Face`
        const anticlockwise = move.includes("'")
        const double = move.includes("2")

        const rotatedFace = rotateFace(currentCube, face, anticlockwise, double)
        const updatedCube = rotateAdjacent(currentCube, face, anticlockwise, double, rotatedFace)

	if (!cube) {
	  setRubiksCube(updatedCube)
	}

	return updatedCube

    }

    const performScramble = (scramble: string) => {
      if (!scramble) return
      let moves = scramble.split(" ")
      let cube = structuredClone(solvedCube)
      moves.forEach((move) => {
	  cube = turn(move, cube);
      });
      setRubiksCube(cube)
    }

    const rotateFace = (cube: RubiksCube, face: string, anticlockwise: boolean, double: boolean) => {
        // cbbs
        //@ts-ignore
        const currentFace = structuredClone(cube[face])
        let newFace: Colours[];
        if (anticlockwise)  {
            newFace = [currentFace[2], currentFace[5], currentFace[8], currentFace[1], currentFace[4], currentFace[7], currentFace[0], currentFace[3], currentFace[6]]
        } else if (double) {
            newFace = currentFace.reverse()
        }
        else {
            newFace = [currentFace[6], currentFace[3], currentFace[0], currentFace[7], currentFace[4], currentFace[1], currentFace[8], currentFace[5], currentFace[2]]
        }

        return newFace
        
    }

    const rotateAdjacent = (cube: RubiksCube, face: string, anticlockwise: boolean, double: boolean, rotatedFace: Colours[]): RubiksCube => {
        //@ts-ignore
        const adjacentConnections = layerConnections[face]
        let editedFaces = structuredClone(cube)
        //@ts-ignore
        editedFaces[face] = rotatedFace


        if (anticlockwise) {
            for (let i = 0; i < 3; i++) {
                // quality code
                //@ts-ignore
                editedFaces[adjacentConnections.left.face][adjacentConnections.left.connectedStickers[i]] = cube[adjacentConnections.top.face][adjacentConnections.top.connectedStickers[i]]
                //@ts-ignore
                editedFaces[adjacentConnections.bottom.face][adjacentConnections.bottom.connectedStickers[i]] = cube[adjacentConnections.left.face][adjacentConnections.left.connectedStickers[i]]
                //@ts-ignore
                editedFaces[adjacentConnections.right.face][adjacentConnections.right.connectedStickers[i]] = cube[adjacentConnections.bottom.face][adjacentConnections.bottom.connectedStickers[i]]
                //@ts-ignore
                editedFaces[adjacentConnections.top.face][adjacentConnections.top.connectedStickers[i]] = cube[adjacentConnections.right.face][adjacentConnections.right.connectedStickers[i]]
            }
        } else if (double) {
            for (let i = 0; i < 3; i++) {
                //@ts-ignore
                editedFaces[adjacentConnections.right.face][adjacentConnections.right.connectedStickers[i]] = cube[adjacentConnections.left.face][adjacentConnections.left.connectedStickers[i]]
                //@ts-ignore
                editedFaces[adjacentConnections.bottom.face][adjacentConnections.bottom.connectedStickers[i]] = cube[adjacentConnections.top.face][adjacentConnections.top.connectedStickers[i]]
                //@ts-ignore
                editedFaces[adjacentConnections.left.face][adjacentConnections.left.connectedStickers[i]] = cube[adjacentConnections.right.face][adjacentConnections.right.connectedStickers[i]]
                //@ts-ignore
                editedFaces[adjacentConnections.top.face][adjacentConnections.top.connectedStickers[i]] = cube[adjacentConnections.bottom.face][adjacentConnections.bottom.connectedStickers[i]]
            }
        } else {

            for (let i = 0; i < 3; i++) {
                //@ts-ignore
                editedFaces[adjacentConnections.right.face][adjacentConnections.right.connectedStickers[i]] = cube[adjacentConnections.top.face][adjacentConnections.top.connectedStickers[i]]
                //@ts-ignore
                editedFaces[adjacentConnections.bottom.face][adjacentConnections.bottom.connectedStickers[i]] = cube[adjacentConnections.right.face][adjacentConnections.right.connectedStickers[i]]
                //@ts-ignore
                editedFaces[adjacentConnections.left.face][adjacentConnections.left.connectedStickers[i]] = cube[adjacentConnections.bottom.face][adjacentConnections.bottom.connectedStickers[i]]
                //@ts-ignore
                editedFaces[adjacentConnections.top.face][adjacentConnections.top.connectedStickers[i]] = cube[adjacentConnections.left.face][adjacentConnections.left.connectedStickers[i]]
            }

        }
	
	return editedFaces
        //setRubiksCube(editedFaces)
    }

    return {
        rubiksCube,
        turn,
	performScramble,
	resetCube,
    }
}

import * as readline from 'node:readline/promises'
import { stdin, stdout } from 'node:process'



export const chooseStartingPlayer = () => {
    return 'RED'
}

export const getBoard = (cols = 7, rows = 6) => {
    const board = []
    for (let i = 0; i < rows; i++) {
        board.push(new Array(cols).fill(null))
    }    
    return board
}

const promptPlayer = async (rl, player) => {
    const move = await rl.question(`It is ${player}'s turn. Type 1 - 7 and hit ENTER. `)
    console.log(move)
    // rl.close()
}

export const start = () => {
    const rl = readline.createInterface({
        input: stdin,
        output: stdout,
    })

    console.info('The game has begun!')
    promptPlayer(rl, chooseStartingPlayer())
}

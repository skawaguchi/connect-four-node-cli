import * as readline from 'node:readline/promises'
import { stdin, stdout } from 'node:process'

const chooseStartingPlayer = () => {
    return 'RED'
}

export const getBoard = (cols = 7, rows = 6) => {
    const board = []
    for (let i = 0; i < rows; i++) {
        board.push(new Array(cols).fill(null))
    }    
    return board
}

const processMove = (rl, player, index) => {

}

const promptPlayer = async (rl, player) => {
    let moveInput
    try {
        moveInput = await rl.question(`It is ${player}'s turn. Type 1 - 7 and hit ENTER. `)
    } catch(error) {
        throw new Error(error)
    }

    if (isNaN(moveInput)) {
        console.error(`Invalid input: ${moveInput}`)
    } 
    // const index = parseInt(moveInput) - 1
}

export const start = () => {
    const rl = readline.createInterface({
        input: stdin,
        output: stdout,
    })

    console.info('The game has begun!')
    promptPlayer(rl, chooseStartingPlayer())
}

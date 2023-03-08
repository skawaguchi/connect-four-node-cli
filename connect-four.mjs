import * as readline from 'node:readline'
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

const printBoard = (board) => {
    let output = ``
     for (let i = 0; i < board.length; i++) {
        const row = board[i]
        output += '|'
        for (let j = 0; j < row.length; j++) {
            const spot = row[j]
            let char
            if (!spot) {
                char = '   '
            } else {
                char = ` ${spot.substring(0, 1)} `
            }
            output += char + '|'
        }
        output += '\n'
    }
    console.info(output)
}

const processMove = (rl, board, moveInput, player) => {
    if (isNaN(moveInput)) {
        console.error(`Invalid input: "${moveInput}". Try again.`)
        promptPlayer(rl, player)
        return 
    } 

    const index = parseInt(moveInput) - 1

    let isPlaced = false
    for (let i = board.length - 1; i >= 0; i--) {
        const row = board[i]
        if (!row[index]) {
            row[index] = player
            isPlaced = true
            break
        }
    }

    printBoard(board)

    // if (!isPlaced) {
    //     console.error(`Invalid input: "${moveInput}". Try again.`)
    // }
}

const promptPlayer = async (rl, board, player) => {
    rl.question(`It is ${player}'s turn. Type 1 - 7 and hit ENTER.`, (moveInput) => {
        processMove(rl, board, moveInput, player)
    })
   
}

export const start = () => {
    const rl = readline.createInterface({
        input: stdin,
        output: stdout,
    })
    const board = getBoard()

    console.info('The game has begun!')
    promptPlayer(rl, board, chooseStartingPlayer())
}

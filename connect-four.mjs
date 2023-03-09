import * as readline from 'node:readline'
import { stdin, stdout } from 'node:process'
import { once } from 'events'

const WIN_CONDITION = 4

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
const isBoardFull = (board) => {
    return board.every((row) => {
        return row.every((slot) => {
            return slot !== null
        })
    })
}

const processWin = (rl, player) => {
    console.info(`Whoa! Player ${player} won. Congratulations!`)
    rl.close()
    return
}

const checkForWin = (rl, board, player) => {
    const rows = board.length
    const cols = board[0].length

    // Build a grid to start tracking wins again
    const dp = []
    for (let i = 0; i < rows; i++) {
        dp.push([])
        for (let j = 0; j < cols; j++) {
            dp[i].push({
                horizontal: 0,
                vertical: 0,
                forwardSlash: 0,
                backSlash: 0,
            })
        }
    }

    // Check wins
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // skip empty
            if (!board[i][j]) {
                continue
            }

            // horizontal
            if (j > 0 && board[i][j - 1] === board[i][j]) {
                dp[i][j].horizontal = dp[i][j - 1].horizontal + 1
            } else {
                dp[i][j].horizontal = 1
            }

            // vertical
            if (i > 0 && board[i - 1][j] === board[i][j]) {
                dp[i][j].vertical = dp[i - 1][j].vertical + 1
            } else {
                dp[i][j].vertical = 1
            }

            // backslash
            if (i > 0 && j > 0 && board[i - 1][j - 1] === board[i][j]) {
                dp[i][j].backSlash = dp[i - 1][j - 1].backSlash + 1
            } else {
                dp[i][j].backSlash = 1
            }

            // forwardSlash
            if (i > 0 && j < cols - 1 && board[i - 1][j + 1] === board[i][j]) {
                dp[i][j].forwardSlash = dp[i - 1][j + 1].forwardSlash + 1
            } else {
                dp[i][j].forwardSlash = 1
            }

            if (
                dp[i][j].horizontal >= WIN_CONDITION ||
                dp[i][j].vertical >= WIN_CONDITION ||
                dp[i][j].forwardSlash >= WIN_CONDITION ||
                dp[i][j].backSlash >= WIN_CONDITION
            ) {
                return true
            }
        }
    }
    return false
}

const processTurnOver = (rl, board, player) => {
    const nextPlayer = player === 'RED' ? 'YELLOW' : 'RED'

    if (isBoardFull(board)) {
        console.info('It is a tie! Game over.')
        rl.close()
        return
    }

    promptPlayer(rl, board, nextPlayer)

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

    if (!isPlaced) {
        console.error('Invalid move. You cannot place a piece in a full column. Try again.')
        promptPlayer(rl, board, player)
        return
    }

    printBoard(board)

    const isWin = checkForWin(rl, board, player)

    if (isWin) {
        processWin(rl, player)
        return
    }

    processTurnOver(rl, board, player)
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

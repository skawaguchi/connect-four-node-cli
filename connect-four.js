const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
})

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



export const start = () => {
    console.info('The game has begun!')
    return 2
}

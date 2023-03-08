import { beforeEach } from 'vitest'
import {
    getBoard,
    start
} from './connect-four.mjs'
import * as readline from 'node:readline/promises'

vi.mock('node:readline/promises')

const readlineMock = {
    close: vi.fn(),
    question: vi.fn(),
}
readline.createInterface.mockReturnValue(readlineMock)

describe('Connect Four', () => {
    const consoleInfoStub = vi.spyOn(console, 'info').mockImplementation(() => {})
    const consoleErrorStub = vi.spyOn(console, 'error').mockImplementation(() => {})

    beforeEach(() => {
        consoleInfoStub.mockClear()
        consoleErrorStub.mockClear()
        readlineMock.question.mockReset()
    })
    it('should build a board with a default of 7 columns and 6 rows with an empty value', () => {
        const board = getBoard()

        expect(board.length).toEqual(6)

        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < 7; col++) {
                expect(board[row][col]).toBe(null)
            }
        }
    })

    it('should start the game and display a welcome message', async () => {
        await start()

        expect(consoleInfoStub).toHaveBeenCalledWith(expect.any(String))
        expect(readlineMock.question).toHaveBeenCalledWith(expect.stringContaining('RED'))
    })

    it('should exit the game on bad input ', async () => {
        readlineMock.question.mockReturnValueOnce('abc')
        
        await start()
        
        expect(consoleErrorStub).toHaveBeenCalledWith('Invalid input: abc')
    })
})

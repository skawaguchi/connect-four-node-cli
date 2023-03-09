import { beforeEach } from 'vitest'
import {
    getBoard,
    start
} from './connect-four.mjs'
import * as readline from 'node:readline'

vi.mock('node:readline')

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

        expect(readlineMock.question).toHaveBeenCalledWith(expect.stringContaining('RED'), expect.any(Function))
    })

    it('should exit the game on bad input ', async () => {
        
        await start()

        readlineMock.question.calls[0][1]('abc')
        
        expect(consoleErrorStub).toHaveBeenCalledWith('Invalid input: "abc". Try again.')
    })

    it('should place a piece in an empty slot', async () => {
        
        await start()

        readlineMock.question.calls[0][1]('1')
        
        expect(consoleInfoStub).toHaveBeenCalledWith(expect.stringContaining('| R |'))
    })

    it('should switch to the next player', async () => {
        
        await start()

        readlineMock.question.calls[0][1]('1')
        
        expect(readlineMock.question).toHaveBeenCalledWith(expect.stringContaining('It is YELLOW\'s turn.'), expect.any(Function))
    })

    it('should prevent placing a piece in a full column', async () => {
        
        await start()

        for (let i = 1; i <= 7; i++) {
            readlineMock.question.calls[0][1]('1')
        }
        
        expect(consoleErrorStub).toHaveBeenCalledWith(expect.stringContaining('Invalid move. You cannot place a piece in a full column.'))

        expect(readlineMock.question).toHaveBeenCalledWith(expect.stringContaining('It is RED\'s turn.'), expect.any(Function))
    })

    const getLatestCall = () => {
        return  readlineMock.question.calls[readlineMock.question.calls.length - 1]
    }
    it('should be a tie if all places are full', async () => {
        
        await start()
        
        getLatestCall()[1]('1')
        getLatestCall()[1]('1')
        getLatestCall()[1]('1')
        getLatestCall()[1]('1')
        getLatestCall()[1]('1')
        getLatestCall()[1]('1')
        getLatestCall()[1]('2')
        getLatestCall()[1]('2')
        getLatestCall()[1]('2')
        getLatestCall()[1]('2')
        getLatestCall()[1]('2')
        getLatestCall()[1]('2')
        getLatestCall()[1]('3')
        getLatestCall()[1]('3')
        getLatestCall()[1]('3')
        getLatestCall()[1]('3')
        getLatestCall()[1]('3')
        getLatestCall()[1]('3')
        getLatestCall()[1]('7')
        getLatestCall()[1]('7')
        getLatestCall()[1]('7')
        getLatestCall()[1]('7')
        getLatestCall()[1]('7')
        getLatestCall()[1]('7')
        getLatestCall()[1]('6')
        getLatestCall()[1]('6')
        getLatestCall()[1]('6')
        getLatestCall()[1]('6')
        getLatestCall()[1]('6')
        getLatestCall()[1]('6')
        getLatestCall()[1]('5')
        getLatestCall()[1]('5')
        getLatestCall()[1]('5')
        getLatestCall()[1]('5')
        getLatestCall()[1]('5')
        getLatestCall()[1]('4')
        getLatestCall()[1]('4')
        getLatestCall()[1]('4')
        getLatestCall()[1]('4')
        getLatestCall()[1]('4')
        getLatestCall()[1]('4')
        getLatestCall()[1]('5')
        
        expect(consoleInfoStub).toHaveBeenCalledWith(expect.stringContaining('It is a tie! Game over.'))
    })

    it('should show a vertical win', async () => {
        
        await start()

        for (let i = 1; i <= 6; i++) {
            readlineMock.question.calls[0][1]('1')
            readlineMock.question.calls[0][1]('2')
            readlineMock.question.calls[0][1]('1')
            readlineMock.question.calls[0][1]('2')
            readlineMock.question.calls[0][1]('1')
            readlineMock.question.calls[0][1]('3')
            readlineMock.question.calls[0][1]('1')
        }
        
        expect(consoleInfoStub).toHaveBeenCalledWith(expect.stringContaining('RED won'))
    })

    it('should show a horizontal win', async () => {
        
        await start()

        for (let i = 1; i <= 6; i++) {
            readlineMock.question.calls[0][1]('1')
            readlineMock.question.calls[0][1]('1')
            readlineMock.question.calls[0][1]('2')
            readlineMock.question.calls[0][1]('2')
            readlineMock.question.calls[0][1]('3')
            readlineMock.question.calls[0][1]('3')
            readlineMock.question.calls[0][1]('4')
        }
        
        expect(consoleInfoStub).toHaveBeenCalledWith(expect.stringContaining('RED won'))

        expect(readlineMock.close).toHaveBeenCalled()
    })

    it('should show a forward slash win', async () => {
        
        await start()

        for (let i = 1; i <= 6; i++) {
            readlineMock.question.calls[0][1]('1')
            readlineMock.question.calls[0][1]('2')
            readlineMock.question.calls[0][1]('2')
            readlineMock.question.calls[0][1]('2')
            readlineMock.question.calls[0][1]('3')
            readlineMock.question.calls[0][1]('3')
            readlineMock.question.calls[0][1]('3')
            readlineMock.question.calls[0][1]('4')
            readlineMock.question.calls[0][1]('4')
            readlineMock.question.calls[0][1]('4')
            readlineMock.question.calls[0][1]('4')
        }
        
        expect(consoleInfoStub).toHaveBeenCalledWith(expect.stringContaining('RED won'))
    })

    it('should show a backslash win', async () => {
        
        await start()

        for (let i = 1; i <= 6; i++) {
            readlineMock.question.calls[0][1]('4')
            readlineMock.question.calls[0][1]('3')
            readlineMock.question.calls[0][1]('3')
            readlineMock.question.calls[0][1]('3')
            readlineMock.question.calls[0][1]('2')
            readlineMock.question.calls[0][1]('2')
            readlineMock.question.calls[0][1]('2')
            readlineMock.question.calls[0][1]('1')
            readlineMock.question.calls[0][1]('1')
            readlineMock.question.calls[0][1]('1')
            readlineMock.question.calls[0][1]('1')
        }
        
        expect(consoleInfoStub).toHaveBeenCalledWith(expect.stringContaining('RED won'))
    })
})

import { beforeEach } from 'vitest'
import {
    chooseStartingPlayer,
    getBoard,
    start
} from './connect-four'

vi.mock('readline')

describe('Connect Four', () => {
    const consoleInfoStub = vi.spyOn(console, 'info').mockImplementation(() => {})

    beforeEach(() => {
        consoleInfoStub.mockClear()
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

    it('should choose "red" as the starting player', () => {
        expect(chooseStartingPlayer()).toEqual('RED')
    })

    it('should start the game with a message', () => {
        start()

        expect(consoleInfoStub).toHaveBeenCalledWith(expect.any(String))
    })
})

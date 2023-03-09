# connect-four-node-cli

Requirements
- 6 rows, 7 cols
- 7 cols are slots for users
- 2 players - yellow or red
    - ID players by color
- randomize color + who goes first
- hotseat game
- gravity - pieces always drop to the bottom-most unoccupied slot
- win conditions: diagonally, horizontally, vertically
- if all slots are filled with no winner, tie
- can't put more pieces than the column slots available

Design
- Board - configurable grid (default 6 x 7)
- Designate color to players + turn order
- Number slots 1 - length (7)
- CLI to take input
    - prompt the correct player when it's their turn
- Player drops piece
    - check for valid move
    - calculate the position
    - check for a win
    - if no win pass control to other player
    - on an invalid move 

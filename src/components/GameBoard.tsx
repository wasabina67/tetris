import React from 'react'
import type { Tetromino } from '../types/game'
import { COLORS, BOARD_WIDTH, BOARD_HEIGHT } from '../types/game'
import { TETROMINO_SHAPES } from '../utils/tetrominos'

interface GameBoardProps {
  board: number[][]
  currentPiece: Tetromino | null
}

const GameBoard: React.FC<GameBoardProps> = ({ board, currentPiece }) => {
  // Create a copy of the board to overlay the current piece
  const displayBoard = board.map(row => [...row])

  // Add current piece to display board
  if (currentPiece) {
    const shape = TETROMINO_SHAPES[currentPiece.type][currentPiece.rotation % 4]
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0) {
          const boardX = currentPiece.position.x + x
          const boardY = currentPiece.position.y + y
          if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
            displayBoard[boardY][boardX] = shape[y][x]
          }
        }
      }
    }
  }

  return (
    <div className="game-board">
      {displayBoard.map((row, y) => (
        <div key={y} className="board-row">
          {row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className="board-cell"
              style={{
                backgroundColor: COLORS[cell as keyof typeof COLORS]
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default GameBoard
import React from 'react'
import type { Tetromino } from '../types/game'
import { COLORS } from '../types/game'
import { TETROMINO_SHAPES } from '../utils/tetrominos'

interface NextPieceProps {
  piece: Tetromino | null
}

const NextPiece: React.FC<NextPieceProps> = ({ piece }) => {
  if (!piece) return null

  const shape = TETROMINO_SHAPES[piece.type][0]

  return (
    <div className="next-piece">
      <h3>Next Piece</h3>
      <div className="next-piece-display">
        {shape.map((row, y) => (
          <div key={y} className="next-piece-row">
            {row.map((cell, x) => (
              <div
                key={`${y}-${x}`}
                className={`next-piece-cell ${cell !== 0 ? 'filled' : 'empty'}`}
                style={{
                  backgroundColor: cell !== 0 ? COLORS[cell as keyof typeof COLORS] : 'transparent'
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default NextPiece

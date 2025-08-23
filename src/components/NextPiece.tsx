import React from 'react'
import type { Tetromino } from '../types/game'
import { COLORS } from '../types/game'
import { TETROMINO_SHAPES } from '../utils/tetrominos'

interface NextPieceProps {
  piece: Tetromino | null
}

const NextPiece: React.FC<NextPieceProps> = ({ piece }) => {
  if (!piece) {
    return (
      <div className="next-piece">
        <h3>次のピース</h3>
        <div className="next-piece-preview">
          <div className="next-piece-grid">
            {Array(4).fill(null).map((_, y) => (
              <div key={y} className="next-piece-row">
                {Array(4).fill(null).map((_, x) => (
                  <div
                    key={`${x}-${y}`}
                    className="next-piece-cell"
                    style={{ backgroundColor: COLORS[0] }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const shape = TETROMINO_SHAPES[piece.type][0] // Always show first rotation

  return (
    <div className="next-piece">
      <h3>次のピース</h3>
      <div className="next-piece-preview">
        <div className="next-piece-grid">
          {shape.map((row, y) => (
            <div key={y} className="next-piece-row">
              {row.map((cell, x) => (
                <div
                  key={`${x}-${y}`}
                  className="next-piece-cell"
                  style={{
                    backgroundColor: COLORS[cell as keyof typeof COLORS]
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NextPiece
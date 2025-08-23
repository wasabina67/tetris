import React from 'react'

interface GameInfoProps {
  score: number
  level: number
  lines: number
}

const GameInfo: React.FC<GameInfoProps> = ({ score, level, lines }) => {
  return (
    <div className="game-info">
      <h3>ゲーム情報</h3>
      <div className="info-item">
        <span className="info-label">スコア:</span>
        <span className="info-value">{score}</span>
      </div>
      <div className="info-item">
        <span className="info-label">レベル:</span>
        <span className="info-value">{level}</span>
      </div>
      <div className="info-item">
        <span className="info-label">ライン:</span>
        <span className="info-value">{lines}</span>
      </div>
    </div>
  )
}

export default GameInfo
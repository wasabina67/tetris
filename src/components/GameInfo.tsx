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
        <label>スコア:</label>
        <span>{score.toLocaleString()}</span>
      </div>
      <div className="info-item">
        <label>レベル:</label>
        <span>{level}</span>
      </div>
      <div className="info-item">
        <label>ライン:</label>
        <span>{lines}</span>
      </div>
    </div>
  )
}

export default GameInfo

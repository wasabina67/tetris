import React from 'react'

interface GameControlsProps {
  gameStatus: 'menu' | 'playing' | 'paused' | 'gameOver'
  onStart: () => void
  onPause: () => void
  onRestart: () => void
}

const GameControls: React.FC<GameControlsProps> = ({
  gameStatus,
  onStart,
  onPause,
  onRestart
}) => {
  return (
    <div className="game-controls">
      <h3>操作</h3>
      <div className="control-buttons">
        {gameStatus === 'menu' && (
          <button onClick={onStart}>スタート</button>
        )}
        {(gameStatus === 'playing' || gameStatus === 'paused') && (
          <>
            <button onClick={onPause}>
              {gameStatus === 'playing' ? 'ポーズ' : '再開'}
            </button>
            <button onClick={onRestart}>リスタート</button>
          </>
        )}
        {gameStatus === 'gameOver' && (
          <button onClick={onRestart}>もう一度</button>
        )}
      </div>
      <div className="control-instructions">
        <h4>キー操作</h4>
        <ul>
          <li>← → : 左右移動</li>
          <li>↓ : 高速落下</li>
          <li>↑ : 回転</li>
          <li>Space : ドロップ</li>
          <li>P : ポーズ</li>
          <li>R : リスタート</li>
        </ul>
      </div>
    </div>
  )
}

export default GameControls
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
      <h3>Controls</h3>
      <div className="control-buttons">
        {gameStatus === 'menu' && (
          <button onClick={onStart}>Start</button>
        )}
        {(gameStatus === 'playing' || gameStatus === 'paused') && (
          <>
            <button onClick={onPause}>
              {gameStatus === 'playing' ? 'Pause' : 'Resume'}
            </button>
            <button onClick={onRestart}>Restart</button>
          </>
        )}
        {gameStatus === 'gameOver' && (
          <button onClick={onRestart}>Play Again</button>
        )}
      </div>
      <div className="control-instructions">
        <h4>Key Controls</h4>
        <ul>
          <li>← → : Move Left/Right</li>
          <li>↓ : Fast Drop</li>
          <li>↑ : Rotate</li>
          <li>Space : Drop</li>
          <li>P : Pause</li>
          <li>R : Restart</li>
        </ul>
      </div>
    </div>
  )
}

export default GameControls

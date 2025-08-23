import React, { useCallback } from 'react'
import GameBoard from './GameBoard'
import GameInfo from './GameInfo'
import NextPiece from './NextPiece'
import GameControls from './GameControls'
import { useGameState } from '../hooks/useGameState'
import { useGameLoop } from '../hooks/useGameLoop'
import { useKeyboard } from '../hooks/useKeyboard'

const Tetris: React.FC = () => {
  const {
    gameState,
    movePiece,
    rotatePiece,
    dropPiece,
    lockPiece,
    startGame,
    pauseGame,
    restartGame
  } = useGameState()

  const handleTick = useCallback(() => {
    const moved = movePiece(0, 1)
    if (!moved) {
      lockPiece()
    }
  }, [movePiece, lockPiece])

  useGameLoop({
    gameStatus: gameState.gameStatus,
    level: gameState.level,
    onTick: handleTick
  })

  useKeyboard({
    onMoveLeft: () => movePiece(-1, 0),
    onMoveRight: () => movePiece(1, 0),
    onMoveDown: () => movePiece(0, 1),
    onRotate: rotatePiece,
    onDrop: dropPiece,
    onPause: pauseGame,
    onRestart: restartGame,
    gameStatus: gameState.gameStatus
  })

  return (
    <div className="tetris-container">
      <div className="tetris-game">
        <div className="game-main">
          <GameBoard
            board={gameState.board}
            currentPiece={gameState.currentPiece}
          />
        </div>
        <div className="game-sidebar">
          <NextPiece piece={gameState.nextPiece} />
          <GameInfo
            score={gameState.score}
            level={gameState.level}
            lines={gameState.lines}
          />
          <GameControls
            gameStatus={gameState.gameStatus}
            onStart={startGame}
            onPause={pauseGame}
            onRestart={restartGame}
          />
        </div>
      </div>
      {gameState.gameStatus === 'menu' && (
        <div className="game-overlay">
          <div className="menu-screen">
            <h1>TETRIS</h1>
            <button onClick={startGame}>Start</button>
          </div>
        </div>
      )}
      {gameState.gameStatus === 'paused' && (
        <div className="game-overlay">
          <div className="pause-screen">
            <h2>Paused</h2>
            <button onClick={pauseGame}>Resume</button>
            <button onClick={restartGame}>Restart</button>
          </div>
        </div>
      )}
      {gameState.gameStatus === 'gameOver' && (
        <div className="game-overlay">
          <div className="game-over-screen">
            <h2>Game Over</h2>
            <p>Score: {gameState.score}</p>
            <p>Level: {gameState.level}</p>
            <p>Lines: {gameState.lines}</p>
            <button onClick={restartGame}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Tetris

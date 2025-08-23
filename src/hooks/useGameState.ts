import { useState, useCallback } from 'react'
import type { GameState } from '../types/game'
import {
  createInitialGameState,
  createTetromino,
  isValidPosition,
  placeTetromino,
  clearLines,
  calculateScore,
  calculateLevel,
  isGameOver
} from '../utils/gameLogic'
import { TETROMINO_SHAPES } from '../utils/tetrominos'

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState())

  const movePiece = useCallback((dx: number, dy: number): boolean => {
    if (!gameState.currentPiece || gameState.gameStatus !== 'playing') {
      return false
    }

    const newPosition = {
      x: gameState.currentPiece.position.x + dx,
      y: gameState.currentPiece.position.y + dy
    }

    if (isValidPosition(gameState.board, gameState.currentPiece, newPosition)) {
      setGameState(prev => ({
        ...prev,
        currentPiece: prev.currentPiece ? {
          ...prev.currentPiece,
          position: newPosition
        } : null
      }))
      return true
    }
    return false
  }, [gameState.board, gameState.currentPiece, gameState.gameStatus])

  const rotatePiece = useCallback(() => {
    if (!gameState.currentPiece || gameState.gameStatus !== 'playing') {
      return
    }

    const newRotation = (gameState.currentPiece.rotation + 1) % 4

    if (isValidPosition(gameState.board, gameState.currentPiece, gameState.currentPiece.position, newRotation)) {
      setGameState(prev => ({
        ...prev,
        currentPiece: prev.currentPiece ? {
          ...prev.currentPiece,
          rotation: newRotation,
          shape: TETROMINO_SHAPES[prev.currentPiece.type][newRotation]
        } : null
      }))
    }
  }, [gameState.board, gameState.currentPiece, gameState.gameStatus])

  const dropPiece = useCallback(() => {
    if (!gameState.currentPiece || gameState.gameStatus !== 'playing') {
      return
    }

    let newY = gameState.currentPiece.position.y
    while (isValidPosition(gameState.board, gameState.currentPiece, {
      x: gameState.currentPiece.position.x,
      y: newY + 1
    })) {
      newY++
    }

    setGameState(prev => ({
      ...prev,
      currentPiece: prev.currentPiece ? {
        ...prev.currentPiece,
        position: { ...prev.currentPiece.position, y: newY }
      } : null
    }))
  }, [gameState.board, gameState.currentPiece, gameState.gameStatus])

  const lockPiece = useCallback(() => {
    if (!gameState.currentPiece) return

    const newBoard = placeTetromino(gameState.board, gameState.currentPiece)
    const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard)

    const newLines = gameState.lines + linesCleared
    const newLevel = calculateLevel(newLines)
    const newScore = gameState.score + calculateScore(linesCleared, gameState.level)

    const nextPiece = gameState.nextPiece || createTetromino()
    const newCurrentPiece = createTetromino()

    setGameState(prev => ({
      ...prev,
      board: clearedBoard,
      currentPiece: nextPiece,
      nextPiece: newCurrentPiece,
      score: newScore,
      level: newLevel,
      lines: newLines
    }))

    if (isGameOver(clearedBoard, nextPiece)) {
      setGameState(prev => ({
        ...prev,
        gameStatus: 'gameOver'
      }))
    }
  }, [gameState])

  const startGame = useCallback(() => {
    setGameState(prev => {
      const newState = prev.gameStatus === 'menu' ? {
        ...prev,
        currentPiece: createTetromino(),
        nextPiece: createTetromino(),
        gameStatus: 'playing' as const
      } : {
        ...prev,
        gameStatus: 'playing' as const
      }
      return newState
    })
  }, [])

  const pauseGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gameStatus: prev.gameStatus === 'playing' ? 'paused' : 'playing'
    }))
  }, [])

  const restartGame = useCallback(() => {
    const initialState = createInitialGameState()
    setGameState({
      ...initialState,
      currentPiece: createTetromino(),
      nextPiece: createTetromino(),
      gameStatus: 'playing'
    })
  }, [])

  return {
    gameState,
    movePiece,
    rotatePiece,
    dropPiece,
    lockPiece,
    startGame,
    pauseGame,
    restartGame
  }
}
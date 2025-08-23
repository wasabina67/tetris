import type { Tetromino, Position, GameState, TetrominoType } from '../types/game'
import { TETROMINO_SHAPES, getRandomTetromino } from './tetrominos'
import { BOARD_WIDTH, BOARD_HEIGHT } from '../types/game'

export const createEmptyBoard = (): number[][] => {
  return Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0))
}

export const createTetromino = (type?: string): Tetromino => {
  const tetrominoType = (type as TetrominoType) || getRandomTetromino()
  return {
    type: tetrominoType,
    shape: TETROMINO_SHAPES[tetrominoType][0],
    position: { x: Math.floor(BOARD_WIDTH / 2) - 2, y: 0 },
    rotation: 0
  }
}

export const isValidPosition = (
  board: number[][],
  tetromino: Tetromino,
  position: Position,
  rotation?: number
): boolean => {
  const currentRotation = rotation !== undefined ? rotation : tetromino.rotation
  const shape = TETROMINO_SHAPES[tetromino.type][currentRotation % 4]

  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x] !== 0) {
        const newX = position.x + x
        const newY = position.y + y

        if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
          return false
        }

        if (newY >= 0 && board[newY][newX] !== 0) {
          return false
        }
      }
    }
  }
  return true
}

export const placeTetromino = (
  board: number[][],
  tetromino: Tetromino
): number[][] => {
  const newBoard = board.map(row => [...row])
  const shape = TETROMINO_SHAPES[tetromino.type][tetromino.rotation % 4]

  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x] !== 0) {
        const boardX = tetromino.position.x + x
        const boardY = tetromino.position.y + y
        if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
          newBoard[boardY][boardX] = shape[y][x]
        }
      }
    }
  }
  return newBoard
}

export const clearLines = (board: number[][]): { newBoard: number[][], linesCleared: number } => {
  const newBoard = []
  let linesCleared = 0

  for (let y = 0; y < board.length; y++) {
    if (!board[y].every(cell => cell !== 0)) {
      newBoard.push([...board[y]])
    } else {
      linesCleared++
    }
  }

  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(0))
  }

  return { newBoard, linesCleared }
}

export const calculateScore = (linesCleared: number, level: number): number => {
  const scoreMultipliers = [0, 100, 300, 500, 800]
  return scoreMultipliers[linesCleared] * level
}

export const calculateLevel = (totalLines: number): number => {
  return Math.floor(totalLines / 10) + 1
}

export const getDropSpeed = (level: number): number => {
  return Math.max(50, 1000 - (level - 1) * 50)
}

export const isGameOver = (board: number[][], tetromino: Tetromino): boolean => {
  return !isValidPosition(board, tetromino, tetromino.position)
}

export const createInitialGameState = (): GameState => {
  return {
    board: createEmptyBoard(),
    currentPiece: null,
    nextPiece: null,
    score: 0,
    level: 1,
    lines: 0,
    gameStatus: 'menu'
  }
}
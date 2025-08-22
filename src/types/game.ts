export type TetrominoType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L'

export interface Position {
  x: number
  y: number
}

export interface Tetromino {
  type: TetrominoType
  shape: number[][]
  position: Position
  rotation: number
}

export interface GameState {
  board: number[][]
  currentPiece: Tetromino | null
  nextPiece: Tetromino | null
  score: number
  level: number
  lines: number
  gameStatus: 'menu' | 'playing' | 'paused' | 'gameOver'
}

export const BOARD_WIDTH = 10
export const BOARD_HEIGHT = 20

export const COLORS = {
  0: '#000000', // Empty
  1: '#00FFFF', // I - Cyan
  2: '#FFFF00', // O - Yellow
  3: '#800080', // T - Purple
  4: '#00FF00', // S - Green
  5: '#FF0000', // Z - Red
  6: '#0000FF', // J - Blue
  7: '#FFA500', // L - Orange
}

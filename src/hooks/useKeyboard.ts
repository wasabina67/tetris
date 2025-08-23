import { useEffect, useCallback } from 'react'

interface UseKeyboardProps {
  onMoveLeft: () => void
  onMoveRight: () => void
  onMoveDown: () => void
  onRotate: () => void
  onDrop: () => void
  onPause: () => void
  onRestart: () => void
  gameStatus: 'menu' | 'playing' | 'paused' | 'gameOver'
}

export const useKeyboard = ({
  onMoveLeft,
  onMoveRight,
  onMoveDown,
  onRotate,
  onDrop,
  onPause,
  onRestart,
  gameStatus
}: UseKeyboardProps) => {
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (gameStatus === 'menu' || gameStatus === 'gameOver') {
      return
    }

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        onMoveLeft()
        break
      case 'ArrowRight':
        event.preventDefault()
        onMoveRight()
        break
      case 'ArrowDown':
        event.preventDefault()
        onMoveDown()
        break
      case 'ArrowUp':
        event.preventDefault()
        onRotate()
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        onDrop()
        break
      case 'p':
      case 'P':
        event.preventDefault()
        onPause()
        break
      case 'r':
      case 'R':
        event.preventDefault()
        onRestart()
        break
      default:
        break
    }
  }, [
    gameStatus,
    onMoveLeft,
    onMoveRight,
    onMoveDown,
    onRotate,
    onDrop,
    onPause,
    onRestart
  ])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])
}
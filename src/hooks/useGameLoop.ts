import { useEffect, useRef, useCallback } from 'react'
import { getDropSpeed } from '../utils/gameLogic'

interface UseGameLoopProps {
  gameStatus: 'menu' | 'playing' | 'paused' | 'gameOver'
  level: number
  onTick: () => void
}

export const useGameLoop = ({ gameStatus, level, onTick }: UseGameLoopProps) => {
  const intervalRef = useRef<number | null>(null)

  const startLoop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    if (gameStatus === 'playing') {
      const dropSpeed = getDropSpeed(level)
      intervalRef.current = setInterval(() => {
        onTick()
      }, dropSpeed)
    }
  }, [gameStatus, level, onTick])

  const stopLoop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    if (gameStatus === 'playing') {
      startLoop()
    } else {
      stopLoop()
    }

    return () => stopLoop()
  }, [gameStatus, level, startLoop, stopLoop])

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return { startLoop, stopLoop }
}
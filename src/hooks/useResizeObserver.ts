import { RefObject, useCallback, useEffect, useState } from 'react'

type Size = {
  width: number
  height: number
}

const initialState: Size = {
  width: 0,
  height: 0,
}

const useResizeObserver = (ref: RefObject<HTMLElement>): Size => {
  const [size, setSize] = useState<Size>(initialState)

  const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
    if (Array.isArray(entries)) {
      const { width, height } = entries[0].contentRect
      setSize({ width, height })
    }
  }, [])

  useEffect(() => {
    if (!ref.current) return

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(ref.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [ref, handleResize])

  return size
}

export default useResizeObserver

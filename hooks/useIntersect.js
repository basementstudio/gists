import { useEffect, useState, useRef } from "react"

export function useIntersect(options) {
  const [observerEntry, setEntry] = useState({})
  const elementRef = useRef()
  const observer = useRef(
    new IntersectionObserver(([entry]) => setEntry(entry), options)
  )

  useEffect(() => {
    const { current: currentObserver } = observer
    currentObserver.disconnect()

    if (elementRef.current) {
      currentObserver.observe(elementRef.current)
    }

    return () => currentObserver.disconnect()
  }, [elementRef])

  return { observerEntry, elementRef }
}

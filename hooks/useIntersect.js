import { useEffect, useState, useRef } from "react"

export function useIntersect(options) {
  const [observerEntry, setEntry] = useState({})
  const elementRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => setEntry(entries[0]),
      options
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [elementRef, options])

  return { observerEntry, elementRef }
}

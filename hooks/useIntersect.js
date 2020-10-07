import { useEffect, useRef, useState } from "react"

/***
How to Use:
  
  import { useEffect, useRef } from "react"
  import useIntersect from "hooks/useIntersect"

  const component = () => {
    const singleElementRef = useRef(null)
    const [observer, setElements, entries] = useIntersect({
      threshold: 0.25,  
      root: null
    })
    
    useEffect(() => {
      setElements(singleElementRef.current)
    }, [setElements])

    useEffect(() => {
      if (entries.length && entries[0].isIntersecting) {
        ... IS INTERSECTING ...
      } else {
        ... NOT INTERSECTING ...
      }
    }, [entries, observer])
    
    return (
      <p ref={singleElementRef}>test</p>
    )
}
***/


const useIntersect = (options) => {
  const [elements, setElements] = useState([])
  const [entries, setEntries] = useState([])
  const observer = useRef(null)

  useEffect(() => {
    observer.current = new IntersectionObserver((observedEntries) => {
      setEntries(observedEntries)
    }, options)
  }, [options])

  useEffect(() => {
    const currentObserver = observer.current

    currentObserver.disconnect()

    if (Array.isArray(elements)) {
      elements.forEach((element) => currentObserver.observe(element))
    } else {
      currentObserver.observe(elements)
    }

    return () => (currentObserver ? currentObserver.disconnect() : null)
  }, [elements])

  return [observer.current, setElements, entries]
}

export default useIntersect

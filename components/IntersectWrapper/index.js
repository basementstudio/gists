import { useEffect, cloneElement } from "react"
import { useIntersect } from "@hooks/useIntersect"

const IntersectWrapper = ({
  id,
  children,
  whenIntersecting = () => {
    console.log("is intersecting")
  }
}) => {
  const { observerEntry, elementRef } = useIntersect({ threshold: 1 })

  useEffect(() => {
    if (observerEntry.intersectionRatio === 0.5) {
      whenIntersecting()
    }
  }, [observerEntry.intersectionRatio, whenIntersecting])

  return cloneElement(children, { id, ref: elementRef })
}

export default IntersectWrapper

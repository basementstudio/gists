import { useState, useEffect } from "react"

const useScroll = () => {
  const [scroll, setScroll] = useState({
    x: typeof window === "undefined" || window.scrollX,
    y: typeof window === "undefined" || window.scrollY,
    direction: "",
  })

  const listener = (e) => {
    setScroll((prev) => ({
      x: window.scrollX,
      y: -window.scrollY,
      direction: prev.y > -window.scrollY ? "up" : "down",
    }))
  }

  useEffect(() => {
    window.addEventListener("scroll", listener)
    return () => window.removeEventListener("scroll", listener)
  }, [])

  return scroll
}

export default useScroll

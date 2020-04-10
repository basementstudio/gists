import { useEffect, useState, useRef, useCallback } from "react"

const Cursor = () => {
  const [width, setWidth] = useState()
  const [height, setHeight] = useState()
  const mouse = useRef({ x: 0, y: 0 })
  const circle = useRef({
    radius: 10,
    lastX: 0,
    lastY: 0,
  })
  const ctx = useRef()
  const canvasRef = useRef()

  const lerp = (a, b, n) => {
    return (1 - n) * a + n * b
  }

  const onResize = () => {
    canvasRef.current.width = window.innerWidth
    setWidth(canvasRef.current.width)
    canvasRef.current.height = window.innerHeight
    setHeight(canvasRef.current.height)
  }

  const renderer = useCallback(() => {
    circle.current.lastX = lerp(circle.current.lastX, mouse.current.x, 0.25)
    circle.current.lastY = lerp(circle.current.lastY, mouse.current.y, 0.25)

    ctx.current.clearRect(0, 0, width, height)

    ctx.current.beginPath()
    ctx.current.arc(
      circle.current.lastX,
      circle.current.lastY,
      circle.current.radius,
      0,
      Math.PI * 2,
      false
    )
    ctx.current.fillStyle = "#000000"
    ctx.current.fill()
    ctx.current.closePath()

    requestAnimationFrame(renderer)
  }, [height, width])

  useEffect(() => {
    canvasRef.current.width = window.innerWidth
    setWidth(canvasRef.current.width)
    circle.current.lastX = mouse.current.x = canvasRef.current.width / 2

    canvasRef.current.height = window.innerHeight
    setHeight(canvasRef.current.height)
    mouse.current.y = canvasRef.current.height / 2
    circle.current.lastY = mouse.current.y = canvasRef.current.height / 2

    ctx.current = canvasRef.current.getContext("2d")

    requestAnimationFrame(renderer)
  }, [renderer])

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      mouse.current.x = e.pageX
      mouse.current.y = e.pageY
    })

    window.addEventListener("resize", onResize, false)
  }, [])

  return (
    <canvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        padding: 0,
        margin: 0,
        zIndex: 3,
        pointerEvents: "none",
        mixBlendMode: "difference",
      }}
      ref={canvasRef}
    />
  )
}

export default Cursor

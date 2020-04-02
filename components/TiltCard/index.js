import Tilt from "vanilla-tilt"
import { useRef, useEffect } from "react"
import styles from "./tiltcard.module.css"
import px from "@lib/to-pixels"

const TiltableCard = ({ width, height, image }) => {
  const imageRef = useRef()

  useEffect(() => {
    let img

    if (imageRef.current) {
      Tilt.init(imageRef.current, {
        glare: true,
        "max-glare": 0.8
      })

      img = imageRef.current
    }

    return () => {
      if (img?.vanillaTilt) {
        img.vanillaTilt.destroy()
      }
    }
  }, [imageRef])

  return (
    <div
      ref={imageRef}
      className={styles.image}
      style={{
        "--height": px(height),
        "--width": px(width),
        backgroundImage: image
      }}
    ></div>
  )
}

export default TiltableCard

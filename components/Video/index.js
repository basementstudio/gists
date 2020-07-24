import { useRef, useEffect } from "react"
import { dispatch } from "hooks/useEventBus"

import styles from "./video.module.css"

const Video = ({ height, src, poster }) => {
  const videoRef = useRef()

  const loaded = (video) => {
    dispatch({ type: "update-scroll" })
    video.style.opacity = 1
  }

  useEffect(() => {
    if (videoRef.current.readyState >= 3) {
      loaded(videoRef.current)
    }
  }, [videoRef?.current?.readyState])

  return (
    <div className={styles.container} style={{ "--bg-image": poster, height }}>
      <video
        ref={videoRef}
        className={styles.video}
        playsInline
        muted
        autoPlay
        loop
        preload="none"
        width="100%"
        height={height}
      >
        {src.mp4 && <source id="mp4" src={src.mp4} type="video/mp4" />}
        {src.webm && <source id="mp4" src={src.webm} type="video/webm" />}
        {src.ogv && <source id="mp4" src={src.ogv} type="video/ogg" />}
        <p>Your user agent does not support the HTML5 Video element.</p>
      </video>
    </div>
  )
}

export default Video

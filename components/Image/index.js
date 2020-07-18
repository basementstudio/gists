import { useRef, useEffect } from "react"
import { dispatch } from "hooks/useEventBus"
import Link from "next/link"

import styles from "./image.module.css"

const Image = ({ src, alt = "", to = false, anxious }) => {
  const imgRef = useRef()

  const loaded = () => dispatch({ type: "UPDATE_SCROLL" })

  useEffect(() => {
    if (imgRef.current.complete) {
      loaded()
    } else {
      imgRef.current.addEventListener("load", loaded)
    }
  }, [])

  return to ? (
    <Link href={to}>
      <a className={styles["image-wrapper"]}>
        <picture className={styles.image}>
          <source
            srcSet={require(`../../images/${src}?webp`)}
            type="image/webp"
          />
          <source srcSet={require(`../../images/${src}`)} type="image/jpeg" />
          <img
            ref={imgRef}
            src={require(`../../images/${src}`)}
            alt={alt}
            loading={anxious ? "eager" : "lazy"}
          />
        </picture>
      </a>
    </Link>
  ) : (
    <picture className={styles.image}>
      <source srcSet={require(`../../images/${src}?webp`)} type="image/webp" />
      <source srcSet={require(`../../images/${src}`)} type="image/jpeg" />
      <img
        ref={imgRef}
        src={require(`../../images/${src}`)}
        alt={alt}
        loading={anxious ? "eager" : "lazy"}
      />
    </picture>
  )
}

export default Image

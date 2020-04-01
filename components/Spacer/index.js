import { memo } from "react"
import styles from "./spacer.module.css"

export const Spacer = ({
  x = 1,
  y = 1,
  expand,
  className,
  inline,
  padding
}) => {
  return (
    <span
      className={`${styles.spacer} ${className || ""} ${
        inline ? styles.inline : ""
      } ${padding ? styles.padding : ""}`}
      style={{
        flex: expand ? "1" : undefined,
        marginLeft: x !== 1 ? `${x * 50}px` : undefined,
        marginTop: y !== 1 && !inline ? `${y * 50}px` : undefined,
        paddingLeft: padding ? `${x * 50}px` : undefined,
        paddingTop: padding && !inline ? `${y * 50}px` : undefined
      }}
    />
  )
}

export default memo(Spacer)

import styles from "./marquee.module.css"

const Marquee = ({ text = "SOME COOL TEXT", light = false }) => {
  return (
    <div className={`${styles.wrapper} ${light ? styles.light : ""}`}>
      <div className={styles.marquee}>
        <h4 className={styles.text} data-text={text}>
          {text}
        </h4>
        <h4 className={styles.text} data-text={text}>
          {text}
        </h4>
      </div>
    </div>
  )
}

export default Marquee

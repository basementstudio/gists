import styles from "./slider.module.css"

/*
<Slider duration={15}>
  <img src="" alt=""/>
  <img src="" alt=""/>
  <img src="" alt=""/>
  <img src="" alt=""/>
</Slider>
*/

const Slider = ({ duration, children }) => {
  const isF = typeof children === "function"

  const child = (num) => (isF ? children(num) : children)

  return (
    <div className={styles["slider-container"]}>
      <div
        className={styles["slider-content-wrapper"]}
        style={{ "--duration": duration && `${duration * 2}s` }}
      >
        <div>{child(1)}</div>
        <div>{child(2)}</div>
      </div>
    </div>
  )
}

export default Slider

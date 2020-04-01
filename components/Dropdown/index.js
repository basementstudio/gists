import { useState, useEffect, useCallback, useRef } from "react"
import styles from "./select.module.css"

const Caret = props => (
  <svg
    {...props}
    className={styles.caret}
    width="0.8em"
    viewBox="0 0 104 54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M102 2L52 52"
      stroke="black"
      strokeWidth="var(--elt-border-size)"
      strokeLinecap="square"
    />
    <path
      d="M52 52L2 2"
      stroke="black"
      strokeWidth="var(--elt-border-size)"
      strokeLinecap="square"
    />
  </svg>
)

const Select = ({ activeOption = false, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false)
  const listElement = useRef()

  const handleClick = useCallback(
    e => {
      if (listElement.current.contains(e.target)) {
        onChange(JSON.parse(e.target.getAttribute("data-value")))
        setIsOpen(false)
      } else {
        setIsOpen(false)
      }
    },
    [onChange]
  )

  useEffect(() => {
    document.addEventListener("mousedown", handleClick, false)

    return () => document.removeEventListener("mousedown", handleClick, false)
  }, [handleClick])

  return (
    <div className={`${styles.dropdown} ${isOpen ? styles.open : ""}`}>
      <label
        data-value={
          activeOption ? options[activeOption].value : options[0].value
        }
        onClick={() => setIsOpen(!isOpen)}
      >
        {activeOption ? options[activeOption].text : options[0].text}
      </label>
      <Caret onClick={() => setIsOpen(!isOpen)} />
      <ul ref={listElement}>
        {options.map((option, index) => (
          <li key={`option-${index}`} data-value={option.value}>
            {option.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Select

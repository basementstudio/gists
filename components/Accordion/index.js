import { useEffect, useState } from "react"
import styles from "./accordion.module.css"

const Item = ({ label, isOpen, onClick, children }) => {
  const _onClick = () => {
    onClick(label)
  }

  return (
    <>
      <div onClick={_onClick} className={styles.item}>
        {label}
        <svg
          style={{ "--rotation": isOpen ? "rotate(45deg)" : "rotate(0)" }}
          className={styles.icon}
          viewBox="0 0 47 47"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.5 0V47"
            stroke="var(--black)"
            strokeWidth="var(--stroke-width)"
          />
          <path
            d="M47 23.5L0 23.5"
            stroke="var(--black)"
            strokeWidth="var(--stroke-width)"
          />
        </svg>
      </div>
      {isOpen && children}
    </>
  )
}

const Accordion = ({ children, allowMultipleOpen }) => {
  const [openSections, setOpensections] = useState([])

  useEffect(() => {
    children?.forEach((child) => {
      if (child.props.isOpen) {
        openSections[child.props.label] = true
      }
    })
  }, [children, openSections])

  const _onClick = (label) => {
    const isOpen = !!openSections[label]

    if (allowMultipleOpen) {
      setOpensections({
        ...openSections,
        [label]: !isOpen
      })
    } else {
      setOpensections({
        [label]: !isOpen
      })
    }
  }

  return (
    <>
      {children?.map((child) => (
        <Item
          isOpen={!!openSections[child.props.label]}
          label={child.props.label}
          onClick={_onClick}
        >
          <div className={styles.inner}>{child.props.children}</div>
        </Item>
      ))}
    </>
  )
}

export default Accordion

// Inspired by https://zeit.co/design/tooltip

import styles from './tooltip.module.css'
import { useState, useRef } from 'react'
import uid from '@utils/uid'

export default ({ children, text, withTip = true }) => {
  const [focused, setFocused] = useState(false)
  const { current: componentId } = useRef(uid())
  const containerRef = useRef()

  function handleClickWhileFocused({ target }) {
    if (target.closest(`span[data-tip-id='${componentId}']`) !== null) return
    setFocused(false)
    document.removeEventListener('click', handleClickWhileFocused)
  }

  function handleClick() {
    if (focused === false) {
      setFocused(true)
      document.addEventListener('click', handleClickWhileFocused)
    }
  }

  return (
    <div
      className={styles.container}
      onClick={handleClick}
      ref={containerRef}
      data-tip-id={componentId}
    >
      {children}
      <span
        data-tip-id={componentId}
        className={styles.tooltip}
        style={{
          opacity: focused ? 1 : undefined,
          pointerEvents: focused ? 'auto' : 'none',
          userSelect: focused ? 'auto' : 'none',
        }}
      >
        {withTip && (
          <svg
            className={styles.tip}
            width="11"
            height="6"
            viewBox="0 0 11 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.50049 0L10.2636 6L0.737349 6L5.50049 0Z"
              fill="#282828"
            />
          </svg>
        )}
        {text}
      </span>
    </div>
  )
}

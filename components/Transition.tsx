// Conditionally render a component
// But applying a className for each state
// And giving it some time before the component is unmount, for the transition to happen

import { forwardRef, useEffect, useState } from 'react'

type Props = {
  children?: React.ReactNode
  duration: number
  show: boolean
  className?: string
  classNameShow?: string
  classNameHide?: string
} & React.ComponentPropsWithRef<'div'>

const Transition = forwardRef<HTMLDivElement, Props>(
  (
    { children, show, duration, classNameShow, classNameHide, ...restProps },
    ref
  ) => {
    const [render, setRender] = useState(false)

    useEffect(() => {
      if (show) {
        setRender(true)
      } else {
        const timeoutId = window.setTimeout(() => setRender(false), duration)
        return () => clearTimeout(timeoutId)
      }
    }, [duration, show])

    if (!render) return null
    return (
      <div
        {...restProps}
        className={`${restProps.className} ${
          show ? classNameShow : classNameHide
        }`}
        // @ts-ignore
        style={{ '--transition-duration': `${duration}ms`, ...restProps.style }}
        ref={ref}
      >
        {children}
      </div>
    )
  }
)

export default Transition

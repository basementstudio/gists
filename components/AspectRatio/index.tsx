import { forwardRef } from 'react'

import styles from './styles.module.css'

type Props = React.ComponentPropsWithRef<'div'> & {
  ratio?: number
  containerProps?: React.ComponentPropsWithoutRef<'div'>
}

const AspectRatio = forwardRef<HTMLDivElement, Props>(
  ({ ratio = 16 / 9, children, containerProps, ...restProps }, ref) => (
    <div
      {...containerProps}
      style={{ '--ratio': `${100 / ratio}%`, ...containerProps?.style }}
      className={cn(styles.container, containerProps?.className)}
    >
      <div
        {...restProps}
        ref={ref}
        className={cn(styles.children, restProps?.className)}
      >
        {children}
      </div>
    </div>
  )
)

export default AspectRatio

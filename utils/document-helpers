/**
* 
* Problem: `offsetTop` only returns offset to parent element
* Solution: Iterate through all parent elements and sum all offsets
*/
const getPageOffsetTop = (elem: HTMLElement | null) => {
  if (!elem) return
  let distance = 0
  do {
    distance += elem.offsetTop
    elem = elem.offsetParent as HTMLElement | null
  } while (elem)
  return distance < 0 ? 0 : distance
}

/**
* 
* Problem: `offsetLeft` only returns offset to parent element
* Solution: Iterate through all parent elements and sum all offsets
*/
const getPageOffsetLeft = (elem: HTMLElement | null) => {
  if (!elem) return
  let distance = 0
  do {
    distance += elem.offsetLeft
    elem = elem.offsetParent as HTMLElement | null
  } while (elem)
  return distance < 0 ? 0 : distance
}

/** Gets mouse position relative to element passed */
const getMousePosition = (
  mouseEvent: React.MouseEvent | MouseEvent,
  elem: HTMLElement
) => {
  const rect = elem.getBoundingClientRect()
  return {
    x: mouseEvent.clientX - rect.left,
    y: mouseEvent.clientY - rect.top
  }
}

export { getPageOffsetTop, getPageOffsetLeft, getMousePosition }

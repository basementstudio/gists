// This is to get the max lines an text element (like an excerpt in a blogpost card) can have.
// It serves to use alongside some line-clamp css.
// Such as:
// text-overflow: ellipsis;
// -webkit-line-clamp: ${MAX LINES HERE};
// -webkit-box-orient: vertical;
// overflow: hidden;
// display: ${excerptMaxLines <= 0 ? "none" : "-webkit-box"};

/**
 * Gets line height of element
 * Credits: https://stackoverflow.com/a/4515470
 */
function getLineHeight(el: HTMLElement) {
  const temp = document.createElement(el.nodeName);
  temp.setAttribute(
    "style",
    `margin:0; padding:0;font-family:${
      el.style.fontFamily || "inherit"
    };font-size:${el.style.fontSize || "inherit"};`
  );
  temp.innerHTML = "A";

  el.parentNode.appendChild(temp);
  const { clientHeight: lineHeight } = temp;
  temp.parentNode.removeChild(temp);

  return lineHeight;
}

/**
 * Gets the max lines an text element (like an excerpt in a blogpost card) can have.
 * @param element The element you want to clip. Tipically an excerpt in a card
 * @param height The height available for that element
 */
function getMaxLines(element: HTMLElement, height: number) {
  const lineHeight = getLineHeight(element);
  if (lineHeight <= 0) return 0;
  return Math.floor(height / lineHeight);
}

export default getMaxLines;
export { getLineHeight };

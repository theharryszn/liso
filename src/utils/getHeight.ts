const getHeight = (el: HTMLElement) => {
  const computedStyle = getComputedStyle(el)

  let elementHeight = el.clientHeight
  elementHeight -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom)
  return elementHeight
}

export default getHeight

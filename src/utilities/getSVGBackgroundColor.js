import { getSVGFromEncodedURI } from "./getSVGFromEncodedURI"

export const getSVGBackgroundColor = (svg) => {
  const htmlObject = document.createElement('div')
  htmlObject.innerHTML = svg;
  const fill = htmlObject.getElementsByTagName('rect')[0].getAttribute('fill')
  return fill
}
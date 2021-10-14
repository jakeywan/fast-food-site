export const getSVGBackgroundColor = (tokenMetadata) => {
  let base64Prelude = 'data:application/json;base64,'
  let decodedMetadata = atob(tokenMetadata.replace(base64Prelude, ''))
  let jsonifiedMetadata = JSON.parse(decodedMetadata)
  let image = jsonifiedMetadata.image
  let base64SVGPreview = 'data:image/svg+xml;base64,'
  let decodedSVG = atob(jsonifiedMetadata.image.replace(base64SVGPreview, ''))
  // now grab fill color from svg tag
  const htmlObject = document.createElement('div')
  htmlObject.innerHTML = decodedSVG;
  const fill = htmlObject.getElementsByTagName('rect')[0].getAttribute('fill');
  return fill
}
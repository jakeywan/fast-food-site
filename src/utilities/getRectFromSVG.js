export const getRectFromSVG = (svg) => {
  let bg = '<rect width="100%" height="100%" fill="#e1d7d5" />'
  let svgWithoutBg = svg.replace(bg, '')
  var doc = new DOMParser().parseFromString(svgWithoutBg, 'application/xml')
  let tag = doc.getElementsByTagName('svg')[0]
  return tag.innerHTML
}
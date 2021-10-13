import { clothes } from '../clothes'

// takes the tokenMetadata, decodes it, cross checks it with strings of clothes
// we know this noun is wearing, and removes them from the SVG to achieve the
// base Noun. we could also hit the NounDescriptor, but this is easier
export const removeClothesFromSVG = (tokenMetadata, clothingIds) => {
  let base64Prelude = 'data:application/json;base64,'
  let decodedMetadata = atob(tokenMetadata.replace(base64Prelude, ''))
  let jsonifiedMetadata = JSON.parse(decodedMetadata)
  let image = jsonifiedMetadata.image
  let base64SVGPreview = 'data:image/svg+xml;base64,'
  let decodedSVG = atob(jsonifiedMetadata.image.replace(base64SVGPreview, ''))
  // now remove clothes from decoded SVG
  let newSVG = decodedSVG
  clothingIds.forEach(id => {
    newSVG = newSVG.replace(clothes[id].svg, '')
  })
  return newSVG
}
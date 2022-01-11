export const getNameFromEncodedURI = (tokenMetadata) => {
  let base64Prelude = 'data:application/json;base64,'
  let decodedMetadata = atob(tokenMetadata.replace(base64Prelude, ''))
  let jsonifiedMetadata = JSON.parse(decodedMetadata)
  return jsonifiedMetadata.name
}
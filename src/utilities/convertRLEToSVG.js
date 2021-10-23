import { buildSVG } from '@nouns/sdk'
import { nounsWearables } from '../wearables/nounsWearables'

export const convertRLEToSVG = (data) => {
  return buildSVG([ data ], nounsWearables.palette, nounsWearables.bgcolors[0])
}

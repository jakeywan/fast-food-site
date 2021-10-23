import { buildSVG } from '@nouns/sdk'
import { nounsWearables } from '../wearables/nounsWearables'
import { customWearables } from '../wearables/customWearables'

export const convertRLEToSVG = (data) => {
  return buildSVG([ data ], customWearables.palette, nounsWearables.bgcolors[0])
}

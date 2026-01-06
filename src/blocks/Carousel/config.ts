import type {Block} from 'payload'


export const Carousel: Block = {
  slug: 'carousel',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}

import type {Block} from 'payload'

export const Hero: Block = {
  slug: 'hero',
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

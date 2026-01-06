import type {Block} from 'payload'


export const Content: Block = {
  slug: 'content',
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

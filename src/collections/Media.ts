import type { CollectionConfig } from 'payload'
import { revalidateHooks, HOME, ABOUT } from '../hooks/revalidate'

export const Media: CollectionConfig = {
  slug: 'media',
  hooks: revalidateHooks([HOME, ABOUT]),
  folders: true,
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    imageSizes: [
      {
        name: 'portrait',
        width: 400,
        height: 400,
        position: 'centre',
      }
    ],
    crop: true
  }
}

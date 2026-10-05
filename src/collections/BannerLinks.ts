import type { CollectionConfig } from 'payload'
import { revalidateHooks, HOME, ABOUT, LINKS } from '../hooks/revalidate'

export const BannerLinks: CollectionConfig = {
  slug: 'bannerLinks',
  hooks: revalidateHooks([HOME, ABOUT, LINKS]),
  admin: {
    useAsTitle: 'Text'
  },
  fields: [
    {
        name: 'Link',
        type: 'text',
        required: true,
    },
    {
        name: 'Text',
        type: 'text',
        required: true,
    },
    {
      name: 'visible',
      label: 'Enabled',
      type: 'checkbox',
      required: true,
      defaultValue: true
    },
    {
        name: 'Icon Type',
        type: 'select',
        options: [
        {
          label: 'Form',
          value: 'form-icon',
        },
        {
          label: 'Game',
          value: 'game-icon',
        },
      ],
      defaultValue: 'form-icon',
    }
  ],
}

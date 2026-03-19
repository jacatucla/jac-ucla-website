import type { CollectionConfig } from 'payload'

export const BannerLinks: CollectionConfig = {
  slug: 'bannerLinks',
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

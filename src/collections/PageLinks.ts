import type { CollectionConfig } from 'payload'
import { revalidateHooks, LINKS } from '../hooks/revalidate'

export const PageLinks: CollectionConfig = {
  slug: 'pageLinks',
  labels: {
    singular: 'Links Page Link',
    plural: 'Links Page Links',
  },
  hooks: revalidateHooks([LINKS]),
  admin: {
    useAsTitle: 'Text',
    defaultColumns: ['Text', 'Link', 'order', 'visible'],
    description:
      'Links shown only on the /links page. Enabled Banner Links, Discord and Instagram are added below these automatically.',
  },
  defaultSort: 'order',
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
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Lower numbers appear first.',
      },
    },
    {
        name: 'Icon Type',
        type: 'select',
        options: [
        {
          label: 'Link',
          value: 'link-icon',
        },
        {
          label: 'Form',
          value: 'form-icon',
        },
        {
          label: 'Game',
          value: 'game-icon',
        },
      ],
      defaultValue: 'link-icon',
    }
  ],
}

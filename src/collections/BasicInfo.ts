import type { CollectionConfig } from 'payload'

export const BasicInfo: CollectionConfig = {
  slug: 'basic',
  admin: {
    useAsTitle: 'Name'
  },
  fields: [
    {
      name: 'Name',
      type: 'text',
      required: true
    },
    {
        name: 'Location',
        type: 'text',
        required: true,
    },
    {
        name: 'Quarter',
        type: 'text',
        required: true
    },
    {
        name: 'Day',
        type: 'text',
        required: true
    },
    {
        name: 'Time',
        type: 'text',
        required: true,
    }
  ],
}

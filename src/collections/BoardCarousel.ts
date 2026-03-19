import type { CollectionConfig } from 'payload'

export const BoardCarousel: CollectionConfig = {
  slug: 'boardMembers',
  admin: {
    useAsTitle:'Member Name'
  },
  fields: [
    {
        name: 'Member Name',
        type: 'text',
        required: true,
    },
    {
        name: 'Role',
        type: 'text',
        required: true,
    },
    {
        name: 'Year',
        type: 'text',
        required: true,
    },
    {
        name: 'Major',
        type: 'text',
        required: true,
    },
    {
      name: 'Picture',
      type: 'upload', // Use the upload field type
      relationTo: 'media', // Relate it to the 'media' collection
      required: true
    }
  ],
}

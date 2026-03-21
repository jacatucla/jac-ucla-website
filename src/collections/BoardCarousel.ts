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
      type: 'select',
      options: [
      {
        label: 'President',
        value: 'President',
      },
      {
        label: 'Vice President',
        value: 'Vice President',
      },
      {
        label: 'EVP',
        value: 'EVP'
      },
      {
        label: 'Screener',
        value: 'Screener'
      },
      {
        label: 'Webmaster',
        value: 'Webmaster'
      },
      {
        label: 'Stashmaster',
        value: 'Stashmaster'
      },
      {
        label: 'Treasurer',
        value: 'Treasurer'
      },
      {
        label: 'Secretary',
        value: 'Secretary'
      },
      {
        label: 'Discord Manager',
        value: 'Discord Manager'
      },
      {
        label: 'General Officer',
        value: 'General Officer'
      }
    ],
    defaultValue: 'General Officer',
    },
    {
      name: 'Year',
      type: 'select',
      options: [
      {
        label: 'Freshman',
        value: 'Freshman',
      },
      {
        label: 'Sophomore',
        value: 'Sophomore',
      },
      {
        label: 'Junior',
        value: 'Junior'
      },
      {
        label: 'Senior',
        value: 'Senior'
      }
    ],
    defaultValue: 'Junior',
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
    },
    {
      name: 'BackgroundImage',
      label: 'Background Image',
      relationTo: 'media',
      type: 'upload'
    }
  ],
}

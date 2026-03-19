import type { CollectionConfig } from 'payload'

export const HeroCarousel: CollectionConfig = {
  slug: 'carouselSlide',
  admin:{
    useAsTitle: 'Title'
  },
  fields: [
    {
        name: 'Featured Image',
        type: 'upload', // Use the upload field type
        relationTo: 'media', // Relate it to the 'media' collection
        required: true
    },
    {
        name: 'Title',
        type: 'text',
        required: true,
    },
    {
      name: 'Page Type',
      type: 'select',
      options: [
      {
        label: 'Default',
        value: 'default',
      },
      {
        label: 'Home',
        value: 'home',
      },
    ],
    defaultValue: 'default',
    },
    {
        name: 'Subheading',
        type: 'text',
        required: false,
    },
    {
        name: 'Button Link',
        type: 'text',
        required: false,
    },
    {
        name: 'Button Text',
        type: 'text',
        required: false,
    },
    
  ],
}

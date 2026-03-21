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
      type: 'select',
      options: [
      {
        label: 'Fall',
        value: 'Fall',
      },
      {
        label: 'Winter',
        value: 'Winter',
      },
      {
        label: 'Spring',
        value: 'Spring'
      }
    ],
    defaultValue: 'Fall',
    },
    {
      name: 'Day',
      type: 'select',
      options: [
      {
        label: 'Monday',
        value: 'Monday',
      },
      {
        label: 'Tuesday',
        value: 'Tuesday',
      },
      {
        label: 'Wednesday',
        value: 'Wednesday',
      },
      {
        label: 'Thursday',
        value: 'Thursday',
      },
      {
        label: 'Friday',
        value: 'Friday',
      },
      {
        label: 'Saturday',
        value: 'Saturday',
      },
      {
        label: 'Sunday',
        value: 'Sunday',
      }
    ],
    defaultValue: 'Thursday',
    },
    {
        name: 'Time',
        type: 'text',
        required: true,
    },
    {
      name: 'bgImage',
      label: 'Main Background Image',
      type: 'upload',
      relationTo: 'media',
      required: true
    }
  ],
}

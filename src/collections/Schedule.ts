import type { CollectionConfig } from 'payload'

export const Schedule: CollectionConfig = {
  slug: 'event',
  admin:
  {
    useAsTitle: 'Name'
  },
  fields: [
    {
        name: 'Name',
        type: 'text',
        required: true
    },
    {
        name: 'Week 1',
        type: 'group',
        fields: [
            // Nest your fields here
            {
              name: 'Thursday',
              type: 'text',
            },
            {
              name: 'Saturday',
              type: 'text',
            },
        ]
    },
    {
        name: 'Week 2',
        type: 'group',
        fields: [
            // Nest your fields here
            {
              name: 'Thursday',
              type: 'text',
            },
            {
              name: 'Saturday',
              type: 'text',
            },
        ]
    },
    {
        name: 'Week 3',
        type: 'group',
        fields: [
            // Nest your fields here
            {
              name: 'Thursday',
              type: 'text',
            },
            {
              name: 'Saturday',
              type: 'text',
            },
        ]
    },
    {
        name: 'Week 4',
        type: 'group',
        fields: [
            // Nest your fields here
            {
              name: 'Thursday',
              type: 'text',
            },
            {
              name: 'Saturday',
              type: 'text',
            },
        ]
    },
    {
        name: 'Week 5',
        type: 'group',
        fields: [
            // Nest your fields here
            {
              name: 'Thursday',
              type: 'text',
            },
            {
              name: 'Saturday',
              type: 'text',
            },
        ]
    },
    {
        name: 'Week 6',
        type: 'group',
        fields: [
            // Nest your fields here
            {
              name: 'Thursday',
              type: 'text',
            },
            {
              name: 'Saturday',
              type: 'text',
            },
        ]
    },
    {
        name: 'Week 7',
        type: 'group',
        fields: [
            // Nest your fields here
            {
              name: 'Thursday',
              type: 'text',
            },
            {
              name: 'Saturday',
              type: 'text',
            },
        ]
    },
    {
        name: 'Week 8',
        type: 'group',
        fields: [
            // Nest your fields here
            {
              name: 'Thursday',
              type: 'text',
            },
            {
              name: 'Saturday',
              type: 'text',
            },
        ]
    },
    {
        name: 'Week 9',
        type: 'group',
        fields: [
            // Nest your fields here
            {
              name: 'Thursday',
              type: 'text',
            },
            {
              name: 'Saturday',
              type: 'text',
            },
        ]
    },
    {
        name: 'Week 10',
        type: 'group',
        fields: [
            // Nest your fields here
            {
              name: 'Thursday',
              type: 'text',
            },
            {
              name: 'Saturday',
              type: 'text',
            },
        ]
    },
  ],
}

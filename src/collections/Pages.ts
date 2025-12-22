import type { CollectionConfig } from 'payload'

import { slugField } from 'payload'
import { Hero } from '../blocks/Hero/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { Content } from '@/blocks/Content/config'
import { Carousel } from '@/blocks/Carousel/config'



export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    
  },
  fields: [
        {
        name: 'title',
        type: 'text',
        required: true,
        },
        {
        type: 'tabs',
        tabs: [
            {
            fields: [
                {
                name: 'Blocks',
                type: 'blocks',
                blocks: [Hero, Content, MediaBlock, Carousel],
                required: true,
                admin: {
                    initCollapsed: true,
                },
                },
            ],
            label: 'Content',
            },
        ],
        },
        {
        name: 'publishedAt',
        type: 'date',
        admin: {
            position: 'sidebar',
        },
        },
        slugField(),
    ],
versions: {
        drafts: {
        autosave: {
            interval: 100, // We set this interval for optimal live preview
        },
        schedulePublish: true,
        },
        maxPerDoc: 50,
    }
}

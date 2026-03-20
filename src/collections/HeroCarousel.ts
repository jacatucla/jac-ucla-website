import type { CollectionConfig } from 'payload'

const SLIDE_TYPES = [
  { label: 'Default (title card)',        value: 'default' },
  { label: 'Image Only',                  value: 'image-only' },
  { label: 'Image + Text Card',           value: 'image-text-card' },
  { label: 'Image + Text Card (Bottom)',  value: 'image-text-card-bottom' },
  { label: 'Image + Text + Link (no subtitles)',         value: 'image-text-link' },
  { label: 'Image + Text Card + Button',  value: 'image-text-card-button' },
]

const SLIDE_WIDTHS = [
  { label: 'Extra Small', value: 'max-w-xs'},
  { label: 'Small',       value: 'max-w-sm' },
  { label: 'Medium (default)',      value: 'max-w-md' },
  { label: 'Large',       value: 'max-w-lg' },
  { label: 'Extra Large', value: 'max-w-xl' },
]

// Slide types that show a card (i.e. everything except image-only)
const hasCard = (_: any, { type }: { type?: string }) => type !== 'image-only' && !!type

export const HeroCarousel: CollectionConfig = {
  slug: 'carouselSlide',
  admin: {
    useAsTitle: 'name',
    description: 'Each document is one slide in the hero carousel.',
  },
  fields: [
    // ── Present on every slide ──────────────────────────────────────
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true
    },
    {
      name: 'bgImage',
      label: 'Background Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'type',
      label: 'Slide Type',
      type: 'select',
      options: SLIDE_TYPES,
      defaultValue: 'image-only',
      required: true,
    },

    // ── Card width (all slides except image-only) ───────────────────
    {
      name: 'width',
      label: 'Card Width',
      type: 'select',
      options: SLIDE_WIDTHS,
      defaultValue: 'max-w-md',
      admin: {
        condition: hasCard,
        description: 'Controls the maximum width of the overlay card.',
      },
    },

    // ── Centre-card text (non-default slides) ───────────────────────
    {
      name: 'text',
      label: 'Card Heading',
      type: 'text',
      admin: {
        condition: (_, s) => ['image-text-card', 'image-text-card-bottom', 'image-text-link', 'image-text-card-button'].includes(s?.type),
        description: 'Main heading shown on the card overlay.',
      },
    },
    {
      name: 'description',
      label: 'Description Line 1',
      type: 'text',
      admin: {
        condition: (_, s) => ['image-text-card', 'image-text-card-bottom', 'image-text-card-button'].includes(s?.type),
      },
    },
    {
      name: 'description2',
      label: 'Description Line 2',
      type: 'text',
      admin: {
        condition: (_, s) => ['image-text-card', 'image-text-card-bottom', 'image-text-card-button'].includes(s?.type),
      },
    },

    // ── Link + button (link/button slides) ──────────────────────────
    {
      name: 'link',
      label: 'Button URL',
      type: 'text',
      admin: {
        condition: (_, s) => ['image-text-link', 'image-text-card-button'].includes(s?.type),
        description: 'Full URL the button should open (opens in a new tab).',
      },
    },
    {
      name: 'buttonText',
      label: 'Button Label',
      type: 'text',
      admin: {
        condition: (_, s) => ['image-text-link', 'image-text-card-button'].includes(s?.type),
      },
    },

    // ── Default slide fields ────────────────────────────────────────
    {
      name: 'title',
      label: 'Title Lines',
      type: 'array',
      admin: {
        condition: (_, s) => s?.type === 'default',
        description: 'Each row becomes one line of the large stacked title.',
      },
      fields: [
        {
          name: 'line',
          label: 'Line',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'text',
      admin: {
        condition: (_, s) => s?.type === 'default',
        description: 'Smaller text appended to the last title line (e.g. "@ UCLA").',
      },
    },
    {
      name: 'details',
      label: 'Detail Rows',
      type: 'array',
      admin: {
        condition: (_, s) => s?.type === 'default',
        description: 'Icon + text rows shown below the title (time, location, etc.).',
      },
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Clock',    value: 'clock' },
            { label: 'Location', value: 'location' },
            { label: 'Calendar', value: 'calendar' },
            { label: 'Users',    value: 'users' },
            { label: 'Message',  value: 'message' },
            { label: 'Mail',     value: 'mail' },
          ],
        },
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
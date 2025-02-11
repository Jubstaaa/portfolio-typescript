import { CollectionConfig } from 'payload/types';

export const Social: CollectionConfig = {
  slug: 'socials',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'icon', 'order'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'icon',
      type: 'text',
      required: true,
    },
    {
      name: 'color',
      type: 'text',
      required: true,
    },
    {
      name: 'username',
      type: 'text',
    },
    {
      name: 'url',
      type: 'text',
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
};
import { CollectionConfig } from 'payload/types';

export const Stack: CollectionConfig = {
  slug: 'stacks',
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
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
};
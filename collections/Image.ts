import { CollectionConfig } from 'payload/types';

export const Image: CollectionConfig = {
  slug: 'images',
  admin: {
    useAsTitle: 'url',
    defaultColumns: ['url', 'order'],
  },
  upload: {
    staticURL: '/images',
    staticDir: 'images',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'medium',
        width: 800,
        height: 600,
        position: 'centre',
      },
    ],
    mimeTypes: ['image/*'],
  },
  fields: [
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
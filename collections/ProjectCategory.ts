import { CollectionConfig } from 'payload/types';

export const ProjectCategory: CollectionConfig = {
  slug: 'projectCategories',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
};
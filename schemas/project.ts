import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Portraits', value: 'PORTRAITS' },
          { title: 'Sports', value: 'SPORTS' },
          { title: 'Family', value: 'FAMILY' },
          { title: 'B & W', value: 'B & W' },
          { title: 'Lifestyle', value: 'LIFESTYLE' },
          { title: 'Weddings', value: 'WEDDINGS' },
          { title: 'Events', value: 'EVENTS' },
          { title: 'Editorial', value: 'EDITORIAL' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show in the marquee slider',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'mainImage',
    },
    prepare({ title, category, media }) {
      return {
        title,
        subtitle: category,
        media,
      };
    },
  },
});

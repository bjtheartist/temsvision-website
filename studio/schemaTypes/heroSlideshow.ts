import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'heroSlideshow',
  title: 'Hero Slideshow',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Hero Slideshow',
      hidden: true,
    }),
    defineField({
      name: 'images',
      title: 'Slideshow Images',
      type: 'array',
      description: 'The 3 images that rotate in the hero section at the top of the website. Drag to reorder.',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Describe the image for accessibility',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'interval',
      title: 'Slide Duration (seconds)',
      type: 'number',
      description: 'How long each image shows before transitioning (default: 5 seconds)',
      initialValue: 5,
      validation: (Rule) => Rule.min(2).max(15),
    }),
  ],
  preview: {
    select: {
      images: 'images',
      media: 'images.0',
    },
    prepare(selection) {
      const {images, media} = selection
      const count = images?.length || 0
      return {
        title: 'Hero Slideshow',
        subtitle: `${count} image${count !== 1 ? 's' : ''}`,
        media,
      }
    },
  },
})

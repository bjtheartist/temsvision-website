import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'TemsVision',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'PHOTOGRAPHER, CREATIVE DIRECTOR & VISUAL STORYTELLER',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Each line of the hero text (e.g., "CAPTURING", "MOMENTS THAT", "TRANSCEND")',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram Handle',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'facebook', title: 'Facebook URL', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
        { name: 'pinterest', title: 'Pinterest URL', type: 'url' },
      ],
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'preloaderAnimation',
      title: 'Preloader Animation',
      type: 'file',
      options: {
        accept: '.webp,.gif,.mp4',
      },
      description: 'Animated webp or gif for the loading screen',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
});

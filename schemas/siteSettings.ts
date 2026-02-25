import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'hero', title: 'Hero Section' },
    { name: 'about', title: 'About Me' },
    { name: 'contact', title: 'Contact & Social' },
  ],
  fields: [
    // General Settings
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'TemsVision',
      group: 'general',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'PHOTOGRAPHER, CREATIVE DIRECTOR & VISUAL STORYTELLER',
      group: 'general',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      group: 'general',
    }),

    // Hero Section
    defineField({
      name: 'heroTagline',
      title: 'Hero Tagline',
      type: 'string',
      description: 'Small text above the headline (e.g., "Photography & Visual Storytelling")',
      initialValue: 'Photography & Visual Storytelling',
      group: 'hero',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Each line of the headline (e.g., "CAPTURING", "MOMENTS THAT", "TRANSCEND")',
      group: 'hero',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 2,
      description: 'The paragraph below the headline',
      initialValue: 'Atlanta-based photographer specializing in creative sessions, editorial & fashion, sports, lifestyle, and maternity photography.',
      group: 'hero',
    }),

    // About Section
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      initialValue: 'Temilade Amire Quadri',
      group: 'about',
    }),
    defineField({
      name: 'headshot',
      title: 'Headshot Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Your professional headshot for the About section',
      group: 'about',
    }),
    defineField({
      name: 'bioIntro',
      title: 'Bio Introduction',
      type: 'text',
      rows: 2,
      description: 'Opening statement about yourself',
      initialValue: "Hi, I'm Temilade Amire Quadri, a Nigerian-American photographer based in Atlanta, Georgia.",
      group: 'about',
    }),
    defineField({
      name: 'bioBackground',
      title: 'Bio Background',
      type: 'text',
      rows: 2,
      description: 'What shapes your approach',
      initialValue: 'My multicultural background shapes my approach to photography, allowing me to create work that is intentional, expressive, and story-driven.',
      group: 'about',
    }),
    defineField({
      name: 'bioStory',
      title: 'Your Story',
      type: 'text',
      rows: 4,
      description: 'How you started and the meaning behind TemsVision',
      group: 'about',
    }),
    defineField({
      name: 'bioPhilosophy',
      title: 'Philosophy',
      type: 'text',
      rows: 4,
      description: 'Your photography philosophy and what you specialize in',
      group: 'about',
    }),
    defineField({
      name: 'bioApproach',
      title: 'Approach',
      type: 'text',
      rows: 3,
      description: 'How you approach each project',
      group: 'about',
    }),

    // Contact & Social
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      group: 'contact',
      fields: [
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'facebook', title: 'Facebook URL', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
        { name: 'pinterest', title: 'Pinterest URL', type: 'url' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'Edit your website content here',
      };
    },
  },
});

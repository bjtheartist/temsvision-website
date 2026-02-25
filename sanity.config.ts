import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { presentationTool } from 'sanity/presentation';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'temsvision-studio',
  title: 'TemsVision CMS',

  projectId: 'ul99syn2',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S, context) => {
        return S.list()
          .title('Content')
          .items([
            // Site Settings - singleton
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            // Services with drag-and-drop ordering
            orderableDocumentListDeskItem({
              type: 'service',
              title: 'Services',
              icon: () => '🛠️',
              S,
              context,
            }),
            // Gallery Categories with drag-and-drop ordering
            orderableDocumentListDeskItem({
              type: 'galleryCategory',
              title: 'Gallery Categories',
              icon: () => '🖼️',
              S,
              context,
            }),
            // Projects
            S.documentTypeListItem('project').title('Projects'),
          ]);
      },
    }),
    presentationTool({
      previewUrl: process.env.SANITY_STUDIO_PREVIEW_URL || 'https://temsvision-website.vercel.app',
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});

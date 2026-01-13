import {StructureBuilder} from 'sanity/structure'
import {ImageIcon, ImagesIcon, CogIcon, UserIcon, BlockContentIcon} from '@sanity/icons'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('TemsVision Content')
    .items([
      // Gallery Section
      S.listItem()
        .title('Gallery')
        .icon(ImagesIcon)
        .child(
          S.list()
            .title('Gallery')
            .items([
              S.listItem()
                .title('Photo Categories')
                .icon(ImagesIcon)
                .schemaType('galleryCategory')
                .child(
                  S.documentTypeList('galleryCategory')
                    .title('Photo Categories')
                    .defaultOrdering([{field: 'order', direction: 'asc'}])
                ),
              S.listItem()
                .title('Hero Slideshow')
                .icon(ImageIcon)
                .child(
                  S.document()
                    .schemaType('heroSlideshow')
                    .documentId('heroSlideshow')
                    .title('Hero Slideshow')
                ),
            ])
        ),

      S.divider(),

      // Services
      S.listItem()
        .title('Services')
        .icon(BlockContentIcon)
        .schemaType('service')
        .child(S.documentTypeList('service').title('Services')),

      // About
      S.listItem()
        .title('About')
        .icon(UserIcon)
        .child(
          S.document()
            .schemaType('about')
            .documentId('about')
            .title('About Section')
        ),

      S.divider(),

      // Settings
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),
    ])

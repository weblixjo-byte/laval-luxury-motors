import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import vehicle from './schemas/vehicle';
import brand from './schemas/brand';
import category from './schemas/category';
import siteSettings from './schemas/siteSettings';

export default defineConfig({
  name: 'default',
  title: 'Laval Luxury Motors | Admin Dashboard',

  projectId: 'nyiie8qw', 
  dataset: 'production',

  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Website Content')
          .items([
            // Singleton for Site Settings
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) => !['siteSettings'].includes(listItem.getId())
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: [vehicle, brand, category, siteSettings],
  },
});

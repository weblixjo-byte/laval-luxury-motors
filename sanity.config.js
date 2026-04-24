import { defineConfig, buildLegacyTheme } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import vehicle from './schemas/vehicle';
import brand from './schemas/brand';
import category from './schemas/category';
import siteSettings from './schemas/siteSettings';
import pageAbout from './schemas/pageAbout';
import pageFinancing from './schemas/pageFinancing';
import pageServices from './schemas/pageServices';

const props = {
  '--laval-white': '#ffffff',
  '--laval-black': '#101112',
  '--laval-gold': '#C5A059',
  '--laval-light-grey': '#f4f4f5',
};

export const myTheme = buildLegacyTheme({
  '--black': props['--laval-black'],
  '--white': props['--laval-white'],
  '--gray': '#666',
  '--gray-base': '#666',
  '--component-bg': props['--laval-white'],
  '--component-text-color': props['--laval-black'],
  '--brand-primary': props['--laval-gold'],
  '--default-button-color': '#666',
  '--default-button-primary-color': props['--laval-gold'],
  '--default-button-success-color': '#0f9d58',
  '--default-button-warning-color': '#f4b400',
  '--default-button-danger-color': '#db4437',
  '--state-info-color': props['--laval-gold'],
  '--state-success-color': '#0f9d58',
  '--state-warning-color': '#f4b400',
  '--state-danger-color': '#db4437',
  '--main-navigation-color': props['--laval-black'],
  '--main-navigation-color--inverted': props['--laval-white'],
  '--focus-color': props['--laval-gold'],
});

export default defineConfig({
  name: 'default',
  title: 'Laval Luxury Motors | Admin',
  theme: myTheme,

  projectId: 'nyiie8qw', 
  dataset: 'production',
  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Website Content')
          .items([
            // Site Settings Singleton
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            
            S.divider(),
            
            // Page Singletons
            S.listItem()
              .title('About Page Content')
              .id('pageAbout')
              .child(S.document().schemaType('pageAbout').documentId('pageAbout')),
            S.listItem()
              .title('Financing Page Content')
              .id('pageFinancing')
              .child(S.document().schemaType('pageFinancing').documentId('pageFinancing')),
            S.listItem()
              .title('Services Page Content')
              .id('pageServices')
              .child(S.document().schemaType('pageServices').documentId('pageServices')),
            
            S.divider(),

            // Collections
            S.documentTypeListItem('vehicle').title('Vehicles (Inventory)'),
            S.documentTypeListItem('brand').title('Brands'),
            S.documentTypeListItem('category').title('Categories'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: [vehicle, brand, category, siteSettings, pageAbout, pageFinancing, pageServices],
  },
});

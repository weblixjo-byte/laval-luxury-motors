import { defineConfig, buildLegacyTheme } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import vehicle from './schemas/vehicle';
import brand from './schemas/brand';
import pageAbout from './schemas/pageAbout';
import pageFinancing from './schemas/pageFinancing';
import pageServices from './schemas/pageServices';
import siteSettings from './schemas/siteSettings';
import richText from './schemas/richText';

const props = {
  '--laval-white': '#ffffff',
  '--laval-black': '#000000',
  '--laval-grey': '#f8f9fa',
  '--laval-accent': '#101112',
};

export const myTheme = buildLegacyTheme({
  /* Base theme colors */
  '--black': props['--laval-black'],
  '--white': props['--laval-white'],

  '--gray': '#999',
  '--gray-base': '#999',

  '--component-bg': props['--laval-white'],
  '--component-text-color': props['--laval-black'],

  /* Brand */
  '--brand-primary': props['--laval-accent'],

  /* Default button */
  '--default-button-color': '#666',
  '--default-button-primary-color': props['--laval-accent'],
  '--default-button-success-color': '#4caf50',
  '--default-button-warning-color': '#ff9800',
  '--default-button-danger-color': '#f44336',

  /* State */
  '--state-info-color': props['--laval-accent'],
  '--state-success-color': '#4caf50',
  '--state-warning-color': '#ff9800',
  '--state-danger-color': '#f44336',

  /* Navbar */
  '--main-navigation-color': props['--laval-white'],
  '--main-navigation-color--inverted': props['--laval-black'],

  '--focus-color': props['--laval-accent'],
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
          .title('Website Management')
          .items([
            S.listItem()
              .title('Global Settings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            S.listItem()
              .title('Inventory')
              .child(
                S.list()
                  .title('Inventory')
                  .items([
                    S.documentTypeListItem('vehicle').title('Vehicles'),
                    S.documentTypeListItem('brand').title('Brands'),
                  ])
              ),
            S.divider(),
            S.listItem()
              .title('Pages')
              .child(
                S.list()
                  .title('Pages')
                  .items([
                    S.documentTypeListItem('pageAbout').title('About Us'),
                    S.documentTypeListItem('pageServices').title('Services'),
                    S.documentTypeListItem('pageFinancing').title('Financing'),
                  ])
              ),
          ]),
    }),
    presentationTool({
      previewUrl: {
        origin: 'http://localhost:5173',
        previewMode: {
          enable: '/api/draft',
        },
      },
    }),
  ],

  schema: {
    types: [vehicle, brand, pageAbout, pageFinancing, pageServices, siteSettings, richText],
  },
});






import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import vehicle from './schemas/vehicle';
import brand from './schemas/brand';
import category from './schemas/category';
import siteSettings from './schemas/siteSettings';

export default defineConfig({
  name: 'default',
  title: 'Laval Luxury Motors | Admin',

  projectId: 'nyiie8qw', 
  dataset: 'production',

  basePath: '/studio',

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: [vehicle, brand, category, siteSettings],
  },
});

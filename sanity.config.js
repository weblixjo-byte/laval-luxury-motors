import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import vehicle from './schemas/vehicle';
import brand from './schemas/brand';

export default defineConfig({
  name: 'default',
  title: 'Laval Luxury Motors Admin',

  // IMPORTANT: Successfully linked to your project
  projectId: 'nyiie8qw', 
  dataset: 'production',

  basePath: '/studio', // This is where the admin panel will live in your URL

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: [vehicle, brand],
  },
});

import { defineConfig, buildLegacyTheme } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import vehicle from './schemas/vehicle';
import brand from './schemas/brand';
import category from './schemas/category';
import siteSettings from './schemas/siteSettings';

// Custom Theme Colors (Laval Luxury Motors Brand)
const props = {
  '--laval-white': '#fff',
  '--laval-black': '#000',
  '--laval-gold': '#C5A059',
  '--laval-grey': '#151515',
};

export const myTheme = buildLegacyTheme({
  /* Base theme colors */
  '--black': props['--laval-black'],
  '--white': props['--laval-white'],

  '--gray': '#666',
  '--gray-base': '#666',

  '--component-bg': props['--laval-grey'],
  '--component-text-color': props['--laval-white'],

  /* Brand */
  '--brand-primary': props['--laval-gold'],

  /* Default button */
  '--default-button-color': '#666',
  '--default-button-primary-color': props['--laval-gold'],
  '--default-button-success-color': '#0f9d58',
  '--default-button-warning-color': '#f4b400',
  '--default-button-danger-color': '#db4437',

  /* State */
  '--state-info-color': props['--laval-gold'],
  '--state-success-color': '#0f9d58',
  '--state-warning-color': '#f4b400',
  '--state-danger-color': '#db4437',

  /* Navbar */
  '--main-navigation-color': props['--laval-black'],
  '--main-navigation-color--inverted': props['--laval-white'],

  '--focus-color': props['--laval-gold'],
});

export default defineConfig({
  name: 'default',
  title: 'Laval Luxury Motors | Admin',
  theme: myTheme, // Apply the custom gold theme

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

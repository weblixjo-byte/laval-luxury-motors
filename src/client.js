import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'nyiie8qw',
  dataset: 'production',
  useCdn: true, // `false` if you want to ensure fresh data every time
  apiVersion: '2023-05-03', // Use today's date
});

const builder = imageUrlBuilder(client);

// Optimized image helper
export const urlFor = (source) => builder.image(source).auto('format');

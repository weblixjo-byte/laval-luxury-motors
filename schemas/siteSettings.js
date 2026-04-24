export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'Laval Luxury Motors'
    },
    {
      name: 'navbarLinks',
      title: 'Navbar Categories/Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navbarLink',
          title: 'Navbar Link',
          fields: [
            { name: 'title', title: 'Link Title', type: 'string' },
            { name: 'path', title: 'Path (e.g. /inventory?brand=Ferrari or /about)', type: 'string' }
          ]
        }
      ],
      description: 'Categories and links appearing in the top navigation.'
    },
    {
      name: 'featuredCollection',
      title: 'Featured Collection (Home Page)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'vehicle' }] }],
      description: 'Select vehicles to show in the "Featured Collection" on the Home page.'
    },
    {
      name: 'featuredBrands',
      title: 'Featured Brands (Brands Section)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'brand' }] }],
      description: 'Select brands to show in the "Popular Makes" section.'
    },
    {
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        { name: 'email', title: 'Email', type: 'string' },
        { name: 'phone', title: 'Phone', type: 'string' },
        { name: 'address', title: 'Address', type: 'string' }
      ]
    }
  ]
}

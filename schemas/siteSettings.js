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
    },
    {
      name: 'homeHero',
      title: 'Home Hero Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Hero Title', type: 'string' },
        { name: 'subtitle', title: 'Hero Subtitle', type: 'string' },
        { name: 'image', title: 'Hero Image', type: 'image', options: { hotspot: true } }
      ]
    },
    {
      name: 'featuredCollection',
      title: 'Featured Collection (Home Page)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'vehicle' }] }],
    },
    {
      name: 'featuredBrands',
      title: 'Featured Brands (Brands Section)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'brand' }] }],
    },
    {
      name: 'homeHeritage',
      title: 'Home Heritage Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'text', title: 'Text', type: 'text' },
        { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }
      ]
    },
    {
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        { name: 'generalEmail', title: 'General Email', type: 'string', initialValue: 'Help@lavalmotors.com' },
        { name: 'directEmail', title: 'Direct Email', type: 'string', initialValue: 'Mike@lavalmotors.com' },
        { name: 'salesPhone', title: 'Sales Phone', type: 'string', initialValue: '+1 (404) 790-8336' },
        { name: 'servicePhone', title: 'Service Phone', type: 'string', initialValue: '+1 (229) 237-4046' },
        { name: 'address', title: 'Showroom Address', type: 'string', initialValue: '1530 Iris Dr SW, Conyers Ga 30092' }
      ]
    },
    {
      name: 'footerText',
      title: 'Footer Copyright Text',
      type: 'string',
      initialValue: '© 2026 Laval Luxury Motors. All rights reserved.'
    }
  ]
}

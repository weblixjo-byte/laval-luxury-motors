export default {
  name: 'pageAbout',
  title: 'About Page',
  type: 'document',
  fields: [
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Main Title', type: 'string' },
        { name: 'subtitle', title: 'Subtitle', type: 'string' },
        { name: 'image', title: 'Hero Image', type: 'image', options: { hotspot: true } }
      ]
    },
    {
      name: 'values',
      title: 'Core Values',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Value Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' }
          ]
        }
      ]
    },
    {
      name: 'story',
      title: 'Our Story Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'text', title: 'Text', type: 'text' },
        { name: 'image', title: 'Section Image', type: 'image', options: { hotspot: true } }
      ]
    }
  ]
}

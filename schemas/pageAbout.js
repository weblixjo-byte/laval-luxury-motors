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
        { name: 'title', title: 'Main Title', type: 'richText' },
        { name: 'subtitle', title: 'Subtitle', type: 'richText' },
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
            { name: 'title', title: 'Value Title', type: 'richText' },
            { name: 'description', title: 'Description', type: 'richText' }
          ]
        }
      ]
    },
    {
      name: 'story',
      title: 'Our Story Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'richText' },
        { name: 'text', title: 'Text', type: 'richText' },
        { name: 'image', title: 'Section Image', type: 'image', options: { hotspot: true } }
      ]
    }

  ]
}

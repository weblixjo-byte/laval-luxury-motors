export default {
  name: 'pageServices',
  title: 'Services Page',
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
      name: 'serviceBlocks',
      title: 'Service Blocks',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Service Title', type: 'richText' },
            { name: 'subtitle', title: 'Small Subtitle', type: 'richText' },
            { name: 'description', title: 'Description', type: 'richText' },
            { name: 'image', title: 'Service Image', type: 'image', options: { hotspot: true } },
            { name: 'features', title: 'Feature List', type: 'array', of: [{ type: 'richText' }] }
          ]
        }
      ]
    }

  ]
}

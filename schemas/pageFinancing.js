export default {
  name: 'pageFinancing',
  title: 'Financing Page',
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
      name: 'advantages',
      title: 'The Advantage Section',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'richText' },
            { name: 'description', title: 'Description', type: 'richText' }
          ]
        }
      ]
    },
    {
      name: 'solutions',
      title: 'Financial Solutions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Solution Name', type: 'richText' },
            { name: 'description', title: 'Description', type: 'richText' }
          ]
        }
      ]
    }

  ]
}

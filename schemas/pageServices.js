export default {
  name: 'pageServices',
  title: 'Services Page',
  type: 'document',
  fields: [
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Mastery & Preservation'
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string'
    },
    {
      name: 'introQuote',
      title: 'Intro Quote',
      type: 'string'
    },
    {
      name: 'services',
      title: 'Services List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Service Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'image', title: 'Service Image', type: 'image', options: { hotspot: true } },
            { name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] }
          ]
        }
      ]
    }
  ]
}

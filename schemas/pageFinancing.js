export default {
  name: 'pageFinancing',
  title: 'Financing Page',
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
      initialValue: 'Tailored Financing'
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string'
    },
    {
      name: 'philosophyTitle',
      title: 'Philosophy Title',
      type: 'string'
    },
    {
      name: 'philosophyText',
      title: 'Philosophy Text',
      type: 'text'
    },
    {
      name: 'services',
      title: 'Financing Services',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Service Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] }
          ]
        }
      ]
    }
  ]
}

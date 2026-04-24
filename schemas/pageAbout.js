export default {
  name: 'pageAbout',
  title: 'About Page',
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
      title: 'Title',
      type: 'string',
      initialValue: 'The Art of Driving'
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string'
    },
    {
      name: 'historyTitle',
      title: 'History Section Title',
      type: 'string'
    },
    {
      name: 'historyText',
      title: 'History Section Text',
      type: 'text'
    },
    {
      name: 'philosophyTitle',
      title: 'Philosophy Section Title',
      type: 'string'
    },
    {
      name: 'philosophyText',
      title: 'Philosophy Section Text',
      type: 'text'
    },
    {
      name: 'craftsmanshipImage',
      title: 'Craftsmanship Image',
      type: 'image',
      options: { hotspot: true }
    }
  ]
}

export default {
  name: 'vehicle',
  title: 'Vehicle',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name (Make & Model)',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'brand',
      title: 'Brand',
      type: 'reference',
      to: [{ type: 'brand' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'e.g. $1,200,000 or "Price on Request"',
      validation: Rule => Rule.required()
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: Rule => Rule.required()
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }]
    },
    {
      name: 'specs',
      title: 'Technical Specifications',
      type: 'object',
      fields: [
        { name: 'engine', title: 'Engine', type: 'string' },
        { name: 'power', title: 'Horsepower', type: 'string' },
        { name: 'accel', title: '0-100 km/h (s)', type: 'string' },
        { name: 'topSpeed', title: 'Top Speed (km/h)', type: 'string' }
      ]
    },
    {
      name: 'isFeatured',
      title: 'Featured on Home Page?',
      type: 'boolean',
      initialValue: false,
      description: 'If enabled, this car will appear in the Featured Collection section on the home page.'
    },

    {
      name: 'description',
      title: 'Description',
      type: 'text'
    }
  ],
  preview: {
    select: {
      title: 'name',
      brand: 'brand.name',
      year: 'year',
      media: 'mainImage'
    },
    prepare(selection) {
      const { title, brand, year, media } = selection;
      return {
        title: title,
        subtitle: `${brand ? brand : 'No Brand'} | ${year}`,
        media: media
      }
    }
  }
}


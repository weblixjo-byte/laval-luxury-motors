export default {
  name: 'vehicle',
  title: 'Vehicles',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      description: 'e.g. 2024 Mercedes-Benz S-Class',
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
      name: 'model',
      title: 'Model',
      type: 'string',
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
    },
    {
      name: 'isNewArrival',
      title: 'Show in New Arrivals?',
      type: 'boolean',
      description: 'If toggled, this vehicle will appear in the New Arrivals section on the home page.',
      initialValue: false
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    },
    {
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }]
    },
    {
      name: 'specifications',
      title: 'Specifications',
      type: 'object',
      fields: [
        { name: 'mileage', title: 'Mileage (km)', type: 'number' },
        { name: 'transmission', title: 'Transmission', type: 'string', options: { list: ['Automatic', 'Manual'] } },
        { name: 'fuelType', title: 'Fuel Type', type: 'string' },
        { name: 'engine', title: 'Engine Details', type: 'string' },
        { name: 'exteriorColor', title: 'Exterior Color', type: 'string' },
        { name: 'interiorColor', title: 'Interior Color', type: 'string' }
      ]
    },
    {
      name: 'description',
      title: 'Detailed Description',
      type: 'text',
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'mainImage'
    }
  }
}

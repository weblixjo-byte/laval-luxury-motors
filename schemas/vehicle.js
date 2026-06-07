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
      name: 'isSold',
      title: 'Mark as Sold?',
      type: 'boolean',
      description: 'If toggled, this vehicle will be marked as SOLD on the website.',
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
      description: 'You can upload multiple images at once by dragging them here or using the "Upload" button and selecting multiple files.',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      options: {
        layout: 'grid'
      }
    },
    {
      name: 'specifications',
      title: 'Specifications',
      type: 'object',
      fields: [
        { name: 'mileage', title: 'Mileage (mi)', type: 'number' },
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
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Enter the price of the vehicle (numerical value).',
      hidden: ({ document }) => document?.priceDisplayMode !== 'fixed'
    },
    {
      name: 'priceDisplayMode',
      title: 'Price Display Mode',
      type: 'string',
      options: {
        list: [
          { title: 'Show Fixed Price', value: 'fixed' },
          { title: 'Price on Request (Default)', value: 'request' }
        ]
      },
      initialValue: 'request'
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'mainImage'
    }
  }
}

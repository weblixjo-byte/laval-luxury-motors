export default {
  name: 'richText',
  title: 'Rich Text',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Underline', value: 'underline' },
          { title: 'Strike', value: 'strike-through' },
        ],
        annotations: [
          {
            name: 'color',
            title: 'Text Color',
            type: 'object',
            fields: [
              {
                name: 'hex',
                title: 'Color',
                type: 'string',
                options: {
                  list: [
                    { title: 'White', value: '#ffffff' },
                    { title: 'Black', value: '#000000' },
                    { title: 'Gold', value: '#D4AF37' },
                    { title: 'Grey', value: '#808080' },
                    { title: 'Light Grey', value: '#F3F4F6' },
                  ],
                },
              },
            ],
          },
          {
            name: 'fontSize',
            title: 'Font Size',
            type: 'object',
            fields: [
              {
                name: 'size',
                title: 'Size',
                type: 'string',
                options: {
                  list: [
                    { title: 'Small', value: '0.875rem' },
                    { title: 'Normal', value: '1rem' },
                    { title: 'Large', value: '1.25rem' },
                    { title: 'XL', value: '1.5rem' },
                    { title: '2XL', value: '2rem' },
                    { title: '3XL', value: '3rem' },
                    { title: '4XL', value: '4rem' },
                  ],
                },
              },
            ],
          },
          {
            name: 'fontFamily',
            title: 'Font Family',
            type: 'object',
            fields: [
              {
                name: 'family',
                title: 'Font',
                type: 'string',
                options: {
                  list: [
                    { title: 'Serif (Premium)', value: 'serif' },
                    { title: 'Sans (Modern)', value: 'sans-serif' },
                    { title: 'Mono (Technical)', value: 'monospace' },
                    { title: 'Cursive (Signature)', value: 'cursive' },
                  ],
                },
              },
            ],
          },
        ],
      },
    },
  ],
};


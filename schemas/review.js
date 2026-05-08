export default {
  name: 'review',
  title: 'Customer Reviews',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
    },
    {
      name: 'comment',
      title: 'Comment',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Review Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'isApproved',
      title: 'Approved',
      type: 'boolean',
      description: 'Show this review on the website',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'rating',
    },
    prepare({ title, subtitle }) {
      return {
        title: `${title} - ${subtitle} Stars`,
      };
    },
  },
};

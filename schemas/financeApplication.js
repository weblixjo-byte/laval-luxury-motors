export default {
  name: 'financeApplication',
  title: 'Credit Applications',
  type: 'document',
  fields: [
    {
      name: 'fullName',
      title: 'Applicant Full Name',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'vehicleName',
      title: 'Vehicle of Interest',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'submittedAt',
      title: 'Submission Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    },
    {
      name: 'printUrl',
      title: 'Print Application (Click to Print on 1 Page)',
      type: 'url',
      description: 'Opens the bank-ready 1-page A4 application document print desk.',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'vehicleName',
      date: 'submittedAt',
    },
    prepare({ title, subtitle, date }) {
      const formattedDate = date ? new Date(date).toLocaleDateString('en-US') : '';
      return {
        title: title || 'Anonymous Application',
        subtitle: `${subtitle || 'General Pre-Approval'} - ${formattedDate}`,
      };
    },
  },
};

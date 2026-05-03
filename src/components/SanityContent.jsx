import { PortableText } from '@portabletext/react';
import React from 'react';

const SanityContent = ({ value }) => {
  if (!value) return null;

  const components = {
    marks: {
      color: ({ children, value }) => {
        return (
          <span style={{ color: value?.hex }}>
            {children}
          </span>
        );
      },
      fontSize: ({ children, value }) => {
        return (
          <span style={{ fontSize: value?.size }}>
            {children}
          </span>
        );
      },
    },
    block: {
      h1: ({ children }) => <h1 className="text-4xl font-bold my-4">{children}</h1>,
      h2: ({ children }) => <h2 className="text-3xl font-bold my-3">{children}</h2>,
      h3: ({ children }) => <h3 className="text-2xl font-bold my-2">{children}</h3>,
      normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
          {children}
        </blockquote>
      ),
    },
  };

  return <PortableText value={value} components={components} />;
};

export default SanityContent;

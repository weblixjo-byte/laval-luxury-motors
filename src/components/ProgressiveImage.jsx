import React, { useState } from 'react';

const ProgressiveImage = ({ 
  src, 
  placeholder, 
  alt, 
  className = '', 
  srcSet, 
  sizes, 
  loading = 'lazy', 
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {placeholder && (
        <img
          src={placeholder}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover blur-xl scale-110 transition-opacity duration-1000 ${
            isLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          aria-hidden="true"
        />
      )}
      <img
        {...props}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      />
    </div>
  );
};

export default ProgressiveImage;

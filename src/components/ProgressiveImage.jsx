import React, { useState, useEffect } from 'react';

const ProgressiveImage = ({ src, placeholder, alt, className, ...props }) => {
  const [imgSrc, setImgSrc] = useState(placeholder || src);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
      setIsLoaded(true);
    };
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {placeholder && !isLoaded && (
        <img
          src={placeholder}
          alt={alt}
          className={`w-full h-full object-cover blur-lg scale-110 transition-opacity duration-1000 ${className}`}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      )}
      <img
        {...props}
        src={imgSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        loading="lazy"
      />
    </div>
  );
};

export default ProgressiveImage;

import React, { useState, useEffect } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fallbackText,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (!src || hasError) {
    const initial = (fallbackText || alt || '?').trim().charAt(0).toUpperCase();
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-900 text-neutral-400 select-none ${className}`}
        aria-label={alt}
      >
        {fallbackText ? (
          <span className="font-bold text-xs">{initial}</span>
        ) : (
          <ImageIcon className="w-5 h-5 opacity-50" />
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      crossOrigin="anonymous"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      {...rest}
    />
  );
};

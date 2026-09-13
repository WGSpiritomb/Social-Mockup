import React from 'react';
import { VerifiedBadge } from '../../types';
import { Check } from 'lucide-react';

export const TwitterBadge: React.FC<{ type: VerifiedBadge; className?: string }> = ({ type, className = 'w-4 h-4' }) => {
  if (type === 'none') return null;

  if (type === 'gold') {
    return (
      <svg viewBox="0 0 22 22" className={`${className} inline-block shrink-0 fill-[#e5a93c]`}>
        <path d="M20.396 11a8.396 8.396 0 00-.783-3.487l-.99-1.98a1.2 1.2 0 010-1.074l.99-1.98A8.396 8.396 0 0016.126.783l-1.98.99a1.2 1.2 0 01-1.074 0l-1.98-.99A8.396 8.396 0 007.605.783l-.99 1.98a1.2 1.2 0 01-1.074 0l-1.98-.99A8.396 8.396 0 00.783 5.474l.99 1.98a1.2 1.2 0 010 1.074l-.99 1.98A8.396 8.396 0 00.783 14.01l1.98.99a1.2 1.2 0 010 1.074l-.99 1.98a8.396 8.396 0 003.487 2.834l1.98-.99a1.2 1.2 0 011.074 0l1.98.99a8.396 8.396 0 003.487-.783l.99-1.98a1.2 1.2 0 011.074 0l1.98.99a8.396 8.396 0 002.834-3.487l-.99-1.98a1.2 1.2 0 010-1.074l.99-1.98a8.396 8.396 0 00.783-3.487zM9.684 15.316l-3.5-3.5 1.414-1.414 2.086 2.086 5.895-5.895 1.414 1.414-7.309 7.309z" />
      </svg>
    );
  }

  if (type === 'gray') {
    return (
      <svg viewBox="0 0 24 24" className={`${className} inline-block shrink-0 fill-[#829aab]`}>
        <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.79-4-4-4-.495 0-.965.084-1.4.238C14.55 2.475 13.18 1.6 11.6 1.6c-1.58 0-2.95.875-3.6 2.148-.435-.154-.905-.238-1.4-.238-2.21 0-4 1.79-4 4 0 .495.084.965.238 1.4C1.575 9.55.7 10.92.7 12.5c0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.79 4 4 4 .495 0 .965-.084 1.4-.238 1.05 1.273 2.42 2.148 4 2.148 1.58 0 2.95-.875 3.6-2.148.435.154.905.238 1.4.238 2.21 0 4-1.79 4-4 0-.495-.084-.965-.238-1.4 1.273-1.05 2.148-2.42 2.148-4zM10.2 16.5l-4-4 1.4-1.4 2.6 2.6 6.6-6.6 1.4 1.4-8 8z" />
      </svg>
    );
  }

  // Blue badge
  return (
    <svg viewBox="0 0 24 24" className={`${className} inline-block shrink-0 fill-[#1d9bf0]`}>
      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.79-4-4-4-.495 0-.965.084-1.4.238C14.55 2.475 13.18 1.6 11.6 1.6c-1.58 0-2.95.875-3.6 2.148-.435-.154-.905-.238-1.4-.238-2.21 0-4 1.79-4 4 0 .495.084.965.238 1.4C1.575 9.55.7 10.92.7 12.5c0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.79 4 4 4 .495 0 .965-.084 1.4-.238 1.05 1.273 2.42 2.148 4 2.148 1.58 0 2.95-.875 3.6-2.148.435.154.905.238 1.4.238 2.21 0 4-1.79 4-4 0-.495-.084-.965-.238-1.4 1.273-1.05 2.148-2.42 2.148-4zM10.2 16.5l-4-4 1.4-1.4 2.6 2.6 6.6-6.6 1.4 1.4-8 8z" />
    </svg>
  );
};

export const InstagramBadge: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 24 24" className={`${className} inline-block shrink-0 fill-[#0095f6]`}>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.4 14.6l-3.9-3.9 1.4-1.4 2.5 2.5 5.9-5.9 1.4 1.4-7.3 7.3z" />
  </svg>
);

export const TikTokBadge: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <span className={`${className} inline-flex items-center justify-center bg-[#20D5EC] text-black rounded-full shrink-0 p-[2px]`}>
    <Check className="w-full h-full stroke-[3]" />
  </span>
);

export const YouTubeBadge: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <span className={`${className} inline-flex items-center justify-center bg-neutral-500/80 text-white rounded-full shrink-0 p-[2px]`}>
    <Check className="w-full h-full stroke-[3]" />
  </span>
);

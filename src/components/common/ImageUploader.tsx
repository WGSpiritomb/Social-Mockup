import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (dataUrl: string) => void;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
  helperText?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  value,
  onChange,
  aspectRatio = 'square',
  helperText,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFile = (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select an image file (PNG, JPG, WebP, GIF).');
      return;
    }
    setErrorMsg(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        onChange(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setErrorMsg(null);
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const aspectClass =
    aspectRatio === 'square'
      ? 'w-14 h-14 rounded-full'
      : aspectRatio === 'video'
      ? 'w-28 h-16 rounded-lg'
      : aspectRatio === 'portrait'
      ? 'w-14 h-20 rounded-lg'
      : 'w-16 h-16 rounded-lg';

  return (
    <div className="space-y-1.5 text-xs">
      <div className="flex items-center justify-between">
        <label className="font-semibold text-neutral-300">{label}</label>
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="text-neutral-400 hover:text-red-400 transition-colors flex items-center space-x-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Remove</span>
          </button>
        )}
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border border-dashed rounded-lg p-2.5 cursor-pointer transition-colors flex items-center gap-3 ${
          isDragging
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-neutral-700 hover:border-neutral-500 bg-neutral-800/60'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFile(e.target.files[0]);
            }
          }}
        />

        {value ? (
          <div className="flex items-center gap-3 w-full">
            <div className={`overflow-hidden border border-neutral-700 bg-neutral-900 shrink-0 ${aspectClass}`}>
              <img
                src={value}
                alt={label}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-neutral-200 font-medium truncate">Image Loaded</p>
              <p className="text-neutral-400 text-[11px]">Click or drag to replace</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 w-full py-0.5">
            <div className="w-10 h-10 rounded-lg bg-neutral-700/60 flex items-center justify-center text-neutral-400 shrink-0">
              <Upload className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-neutral-200 font-medium">Upload Image</p>
              <p className="text-neutral-400 text-[11px]">
                {helperText || 'PNG, JPG, WebP'}
              </p>
            </div>
          </div>
        )}
      </div>

      {errorMsg && (
        <p className="text-[11px] text-rose-400 font-medium">{errorMsg}</p>
      )}
    </div>
  );
};

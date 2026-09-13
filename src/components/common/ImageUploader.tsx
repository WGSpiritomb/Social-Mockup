import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (dataUrl: string) => void;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
  helperText?: string;
  sampleOptions?: Array<{ label: string; url: string }>;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  value,
  onChange,
  aspectRatio = 'square',
  helperText,
  sampleOptions,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!file) return;
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WebP, etc.)');
      return;
    }

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
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const aspectClass =
    aspectRatio === 'square'
      ? 'w-16 h-16 rounded-full'
      : aspectRatio === 'video'
      ? 'w-full h-28 rounded-lg'
      : aspectRatio === 'portrait'
      ? 'w-24 h-32 rounded-lg'
      : 'w-24 h-24 rounded-lg';

  return (
    <div className="space-y-1.5 text-xs">
      <div className="flex items-center justify-between">
        <label className="font-semibold text-neutral-300">{label}</label>
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="text-neutral-400 hover:text-red-400 transition-colors flex items-center space-x-1"
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
        className={`relative border-2 border-dashed rounded-lg p-2.5 cursor-pointer transition-all flex items-center gap-3 ${
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
                alt="Preview"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-neutral-200 font-medium truncate">Custom Image Loaded</p>
              <p className="text-neutral-500 text-[11px]">Click or drag to change image</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 w-full py-1">
            <div className="w-10 h-10 rounded-lg bg-neutral-700/60 flex items-center justify-center text-neutral-400 shrink-0">
              <Upload className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-neutral-200 font-medium">Upload Image</p>
              <p className="text-neutral-400 text-[11px]">
                {helperText || 'PNG, JPG, WebP up to 10MB'}
              </p>
            </div>
          </div>
        )}
      </div>

      {sampleOptions && sampleOptions.length > 0 && (
        <div className="flex items-center gap-1.5 pt-0.5 overflow-x-auto no-scrollbar">
          <span className="text-[10px] text-neutral-400 shrink-0">Presets:</span>
          {sampleOptions.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onChange(sample.url)}
              className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 shrink-0 transition-colors"
            >
              {sample.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

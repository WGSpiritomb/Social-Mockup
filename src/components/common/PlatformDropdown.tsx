import React, { useState, useRef, useEffect } from 'react';
import { SocialPlatform } from '../../types';
import { PLATFORMS } from '../../data/platforms';
import { ChevronDown, Check } from 'lucide-react';

interface PlatformDropdownProps {
  activePlatform: SocialPlatform;
  onSelect: (platform: SocialPlatform) => void;
  variant?: 'toolbar' | 'panel';
  idPrefix?: string;
}

export const PlatformDropdown: React.FC<PlatformDropdownProps> = ({
  activePlatform,
  onSelect,
  variant = 'panel',
  idPrefix = 'platform',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentPlatform = PLATFORMS.find((p) => p.id === activePlatform) || PLATFORMS[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (variant === 'toolbar') {
    return (
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <button
          id={`${idPrefix}-toolbar-btn`}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-750 text-white font-semibold text-xs border border-neutral-700 hover:border-neutral-600 transition-all shadow-xs group focus:outline-hidden focus:ring-2 focus:ring-blue-500/50"
        >
          <span className="text-sm leading-none">{currentPlatform.icon}</span>
          <span className="font-semibold text-neutral-100">{currentPlatform.name}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-white' : ''
            }`}
          />
        </button>

        {isOpen && (
          <div
            id={`${idPrefix}-toolbar-menu`}
            role="listbox"
            className="absolute left-0 mt-1.5 w-60 rounded-xl bg-neutral-900/98 backdrop-blur-xl border border-neutral-700/90 shadow-2xl shadow-black/90 p-1.5 z-50 max-h-80 overflow-y-auto custom-scrollbar space-y-0.5"
          >
            <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-800/80 mb-1 flex items-center justify-between">
              <span>Choose Platform Preset</span>
              <span className="text-neutral-500 font-medium">{PLATFORMS.length} total</span>
            </div>
            {PLATFORMS.map((p) => {
              const isSelected = activePlatform === p.id;
              return (
                <button
                  key={p.id}
                  id={`${idPrefix}-option-${p.id}`}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onSelect(p.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-blue-600/20 text-white border border-blue-500/40'
                      : 'text-neutral-300 hover:bg-neutral-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="text-base">{p.icon}</span>
                    <span className="font-semibold text-sm">{p.name}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-blue-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Panel variant (Full width)
  return (
    <div className="relative w-full text-left" ref={dropdownRef}>
      <button
        id={`${idPrefix}-panel-btn`}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 hover:border-neutral-600 hover:bg-neutral-800/80 text-white font-semibold text-xs transition-all shadow-sm group focus:outline-hidden focus:ring-2 focus:ring-blue-500/50"
      >
        <div className="flex items-center space-x-2.5">
          <span className="text-lg leading-none">{currentPlatform.icon}</span>
          <span className="font-bold text-sm tracking-tight text-white">{currentPlatform.name}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700 font-medium">
            Change
          </span>
          <ChevronDown
            className={`w-4 h-4 text-neutral-400 group-hover:text-white transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-white' : ''
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div
          id={`${idPrefix}-panel-menu`}
          role="listbox"
          className="absolute left-0 right-0 top-full mt-1.5 bg-neutral-900/98 backdrop-blur-xl border border-neutral-700 rounded-xl shadow-2xl shadow-black/90 p-1.5 z-50 max-h-80 overflow-y-auto custom-scrollbar space-y-0.5"
        >
          {PLATFORMS.map((p) => {
            const isSelected = activePlatform === p.id;
            return (
              <button
                key={p.id}
                id={`${idPrefix}-panel-opt-${p.id}`}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onSelect(p.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-blue-600/20 text-white border border-blue-500/40'
                    : 'text-neutral-300 hover:bg-neutral-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <span className="text-lg">{p.icon}</span>
                  <span className="font-semibold text-sm">{p.name}</span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-blue-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

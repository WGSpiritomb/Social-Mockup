import React, { useState, useRef, useEffect } from 'react';
import { SocialPlatform } from '../../types';
import { PLATFORMS } from '../../data/platforms';
import { ChevronDown, Check } from 'lucide-react';

interface PlatformDropdownProps {
  activePlatform: SocialPlatform;
  onSelect: (platform: SocialPlatform) => void;
  idPrefix?: string;
}

export const PlatformDropdown: React.FC<PlatformDropdownProps> = ({
  activePlatform,
  onSelect,
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

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        id={`${idPrefix}-toolbar-btn`}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700/80 text-white font-semibold text-xs border border-neutral-700 hover:border-neutral-600 transition-colors group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500/60 whitespace-nowrap shrink-0 cursor-pointer"
      >
        <span className="text-sm leading-none">{currentPlatform.icon}</span>
        <span className="font-semibold text-neutral-100">{currentPlatform.name}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-transform duration-150 ${
            isOpen ? 'rotate-180 text-white' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          id={`${idPrefix}-toolbar-menu`}
          role="listbox"
          className="absolute left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 mt-1.5 w-60 rounded-xl bg-neutral-900/98 backdrop-blur-xl border border-neutral-700/90 shadow-2xl shadow-black/90 p-1.5 z-50 max-h-80 overflow-y-auto custom-scrollbar space-y-0.5"
        >
          <div className="px-2.5 py-1 text-[11px] font-semibold text-neutral-400 border-b border-neutral-800/80 mb-1 flex items-center justify-between">
            <span>Select Platform</span>
            <span className="text-neutral-500 tabular-nums">{PLATFORMS.length}</span>
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
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600/20 text-white border border-blue-500/40'
                    : 'text-neutral-300 hover:bg-neutral-800/80 hover:text-white border border-transparent'
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
};

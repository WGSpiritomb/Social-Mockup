import React from 'react';
import { Dices } from 'lucide-react';
import { StatTier } from '../../utils/statRandomizer';

const inputBaseClass =
  'w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 focus:border-blue-500 text-white outline-hidden transition-colors text-xs';

interface FieldInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  mono?: boolean;
}

export const FieldInput: React.FC<FieldInputProps> = ({
  label,
  mono = false,
  className = '',
  ...props
}) => (
  <div>
    <label className="font-semibold text-neutral-300 text-xs block">{label}</label>
    <input
      {...props}
      className={`${inputBaseClass} mt-1 ${mono ? 'font-mono tabular-nums' : ''} ${className}`}
    />
  </div>
);

interface FieldTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const FieldTextarea: React.FC<FieldTextareaProps> = ({
  label,
  className = '',
  ...props
}) => (
  <div>
    <label className="font-semibold text-neutral-300 text-xs block">{label}</label>
    <textarea
      {...props}
      className={`${inputBaseClass} py-2 mt-1 resize-y ${className}`}
    />
  </div>
);

interface FieldSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  children: React.ReactNode;
}

export const FieldSelect: React.FC<FieldSelectProps> = ({
  label,
  children,
  className = '',
  ...props
}) => (
  <div>
    <label className="font-semibold text-neutral-300 text-xs block">{label}</label>
    <select {...props} className={`${inputBaseClass} mt-1 ${className}`}>
      {children}
    </select>
  </div>
);

interface FieldCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  accentClass?: string;
}

export const FieldCheckbox: React.FC<FieldCheckboxProps> = ({
  label,
  checked,
  onChange,
  accentClass = 'accent-blue-500',
}) => (
  <label className="flex items-center space-x-2 cursor-pointer text-xs text-neutral-300 select-none">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className={`w-4 h-4 ${accentClass} cursor-pointer`}
    />
    <span>{label}</span>
  </label>
);

export interface ModeOption<T extends string> {
  id: T;
  label: string;
}

interface ModeSelectorProps<T extends string> {
  options: ModeOption<T>[];
  value: T;
  onChange: (mode: T) => void;
}

export function ModeSelector<T extends string>({
  options,
  value,
  onChange,
}: ModeSelectorProps<T>) {
  return (
    <div className="flex flex-wrap gap-1 bg-neutral-800 p-0.5 rounded-lg">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onChange(opt.id)}
          className={`px-2.5 py-1 rounded-md text-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            value === opt.id
              ? 'bg-neutral-700 text-white font-bold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

const TIERS: Array<{ id: StatTier; label: string; tip: string }> = [
  { id: 'micro', label: 'Micro', tip: 'Small organic reach' },
  { id: 'trending', label: 'Trending', tip: 'Mid-tier popular post' },
  { id: 'viral', label: 'Viral', tip: 'High-reach viral post' },
  { id: 'mega', label: 'Mega', tip: 'Massive mainstream reach' },
];

interface StatsTierBarProps {
  title: string;
  onRandomize: (tier?: StatTier) => void;
}

export const StatsTierBar: React.FC<StatsTierBarProps> = ({ title, onRandomize }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <label className="font-semibold text-neutral-300 text-xs">{title}</label>
      <button
        type="button"
        onClick={() => onRandomize()}
        className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-blue-600 hover:bg-blue-500 text-white flex items-center space-x-1.5 transition-colors cursor-pointer"
        title="Generate realistic proportionate engagement stats"
      >
        <Dices className="w-3.5 h-3.5" />
        <span>Randomize</span>
      </button>
    </div>

    <div className="grid grid-cols-4 gap-1">
      {TIERS.map((tier) => (
        <button
          key={tier.id}
          type="button"
          onClick={() => onRandomize(tier.id)}
          className="py-1 px-1.5 rounded-md bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700/70 transition-colors text-[11px] font-medium cursor-pointer"
          title={tier.tip}
        >
          {tier.label}
        </button>
      ))}
    </div>
  </div>
);

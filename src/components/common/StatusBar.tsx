import React from 'react';
import { DeviceSettings } from '../../types';
import { Wifi, Zap } from 'lucide-react';

interface StatusBarProps {
  settings: DeviceSettings;
  textColor?: 'dark' | 'light';
}

export const StatusBar: React.FC<StatusBarProps> = ({ settings, textColor }) => {
  if (!settings.showStatusBar) return null;

  const isDarkText = textColor ? textColor === 'dark' : settings.theme === 'light';
  const colorClass = isDarkText ? 'text-neutral-900' : 'text-white';
  const fillClass = isDarkText ? 'bg-neutral-900' : 'bg-white';
  const borderClass = isDarkText ? 'border-neutral-900/60' : 'border-white/60';

  return (
    <div className={`w-full h-11 px-7 flex items-center justify-between text-sm font-semibold z-30 select-none ${colorClass}`}>
      {/* Left: Time */}
      <div className="flex items-center">
        <span className="text-[14px] font-semibold tracking-tight tabular-nums">{settings.time}</span>
      </div>

      {/* Center: Dynamic Island placeholder if enabled */}
      {settings.showDynamicIsland && (
        <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-[110px] h-[28px] bg-black rounded-full flex items-center justify-between px-2.5 shadow-md pointer-events-none z-40">
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800" />
          <div className="w-3 h-3 rounded-full bg-neutral-900/80 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-950/80" />
          </div>
        </div>
      )}

      {/* Right: Cellular, Wifi, Battery */}
      <div className="flex items-center space-x-2">
        {/* Cellular bars */}
        <div className="flex items-end space-x-[2px] h-[11px]">
          {[1, 2, 3, 4].map((bar) => (
            <span
              key={bar}
              className={`w-[3px] rounded-xs ${
                bar <= settings.signalStrength ? fillClass : 'opacity-25 ' + fillClass
              }`}
              style={{ height: `${bar * 25}%` }}
            />
          ))}
        </div>

        {/* Wifi or Cellular Network */}
        {settings.wifi ? (
          <Wifi className="w-4 h-4 stroke-[2.2]" />
        ) : (
          <span className="text-[11px] font-bold tabular-nums">
            {settings.networkType === 'WiFi' ? '5G' : settings.networkType}
          </span>
        )}

        {/* Battery with charging indicator */}
        <div className="flex items-center space-x-0.5">
          <div className={`relative w-[22px] h-[11px] rounded-[3.5px] border-[1.2px] ${borderClass} p-[1.5px] flex items-center`}>
            <div
              className={`h-full rounded-[1.5px] transition-all duration-300 ${
                settings.isCharging
                  ? 'bg-emerald-500'
                  : settings.batteryLevel <= 20
                  ? 'bg-rose-500'
                  : fillClass
              }`}
              style={{ width: `${Math.min(100, Math.max(12, settings.batteryLevel))}%` }}
            />
            {settings.isCharging && (
              <Zap className="w-2.5 h-2.5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 fill-current text-white drop-shadow-xs" />
            )}
            {/* Battery cap */}
            <div className={`absolute -right-[2.5px] top-[2.5px] w-[1.5px] h-[4px] rounded-r-xs ${fillClass} opacity-60`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const HomeIndicator: React.FC<{ textColor?: 'dark' | 'light' }> = ({ textColor }) => {
  const isLightBar = textColor === 'light';
  return (
    <div className="w-full h-6 flex items-center justify-center pointer-events-none z-30 select-none pb-1">
      <div
        className={`w-32 h-1 rounded-full ${
          isLightBar ? 'bg-white/80' : 'bg-neutral-800/80'
        } backdrop-blur-xs transition-colors`}
      />
    </div>
  );
};

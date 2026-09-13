import React from 'react';
import { DeviceSettings } from '../../types';
import { Wifi } from 'lucide-react';

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

  if (settings.osType === 'android') {
    return (
      <div className={`w-full h-8 px-4 flex items-center justify-between text-xs font-medium z-30 select-none ${colorClass}`}>
        <div className="flex items-center space-x-1.5">
          <span>{settings.time}</span>
        </div>
        <div className="flex items-center space-x-2">
          {settings.wifi && <Wifi className="w-3.5 h-3.5" />}
          <span className="text-[10px] tracking-tight">{settings.networkType}</span>
          {/* Signal bars */}
          <div className="flex items-end space-x-0.5 h-3">
            {[1, 2, 3, 4].map((bar) => (
              <span
                key={bar}
                className={`w-0.5 rounded-full ${
                  bar <= settings.signalStrength ? fillClass : 'opacity-25 ' + fillClass
                }`}
                style={{ height: `${bar * 25}%` }}
              />
            ))}
          </div>
          {/* Battery */}
          <div className="flex items-center space-x-1">
            <span className="text-[10px]">{settings.batteryLevel}%</span>
            <div className={`w-3.5 h-2.5 rounded-xs border ${borderClass} p-0.5 flex items-center`}>
              <div
                className={`h-full rounded-2xs ${fillClass}`}
                style={{ width: `${Math.min(100, Math.max(10, settings.batteryLevel))}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // iOS Status Bar with Dynamic Island spacing
  return (
    <div className={`w-full h-11 px-7 flex items-center justify-between text-sm font-semibold z-30 select-none ${colorClass}`}>
      {/* Left: Time */}
      <div className="flex items-center">
        <span className="text-[14px] font-semibold tracking-tight">{settings.time}</span>
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

        {/* Wifi */}
        {settings.wifi ? (
          <Wifi className="w-4 h-4 stroke-[2.2]" />
        ) : (
          <span className="text-[11px] font-bold">{settings.networkType}</span>
        )}

        {/* Battery with percentage & outline */}
        <div className="flex items-center space-x-1">
          <div className={`relative w-[22px] h-[11px] rounded-[3.5px] border-[1.2px] ${borderClass} p-[1.5px] flex items-center`}>
            <div
              className={`h-full rounded-[1.5px] ${fillClass} transition-all duration-300`}
              style={{ width: `${Math.min(100, Math.max(12, settings.batteryLevel))}%` }}
            />
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

import React from 'react';
import { DeviceSettings } from '../../types';
import { getUserLocalTimeAndDate } from '../../utils/statRandomizer';
import { Clock, Monitor } from 'lucide-react';
import { FieldCheckbox, FieldSelect } from './FormControls';

interface DeviceSettingsEditorProps {
  settings: DeviceSettings;
  onUpdate: <K extends keyof DeviceSettings>(key: K, value: DeviceSettings[K]) => void;
}

export const DeviceSettingsEditor: React.FC<DeviceSettingsEditorProps> = ({
  settings,
  onUpdate,
}) => {
  const isDesktop = settings.viewFormat === 'desktop';

  return (
    <div className="space-y-4">
      {isDesktop && (
        <div className="p-3 rounded-xl bg-neutral-800/60 border border-neutral-700/70 flex items-start space-x-2.5 text-xs text-neutral-300">
          <Monitor className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-white">Desktop (Landscape) View Active</p>
            <p className="text-neutral-400 mt-0.5 leading-relaxed">
              Mobile status bar, Dynamic Island, and Home Indicator apply only to iPhone (Portrait) mode. Switch to iPhone (Portrait) in the preview toolbar to customize them.
            </p>
          </div>
        </div>
      )}

      <div className={`space-y-4 ${isDesktop ? 'opacity-45 pointer-events-none select-none' : ''}`}>
        {/* Time & Battery */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-neutral-300 text-xs">Status Bar Time</label>
              <button
                type="button"
                onClick={() => {
                  const { time24 } = getUserLocalTimeAndDate();
                  onUpdate('time', time24);
                }}
                className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center space-x-1 font-medium hover:underline cursor-pointer"
                title="Set to your current local time"
              >
                <Clock className="w-3 h-3" />
                <span>Now</span>
              </button>
            </div>
            <input
              type="text"
              value={settings.time}
              onChange={(e) => onUpdate('time', e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white outline-hidden focus:border-blue-500 font-mono tabular-nums text-xs"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between font-semibold text-neutral-300 text-xs">
              <label>Battery Level</label>
              <span className="tabular-nums">{settings.batteryLevel}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              value={settings.batteryLevel}
              onChange={(e) => onUpdate('batteryLevel', Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer mt-2"
            />
          </div>
        </div>

        {/* Signal & Network */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="font-semibold text-neutral-300 text-xs block">Signal Strength (1–4)</label>
            <div className="flex space-x-1 mt-1">
              {[1, 2, 3, 4].map((bars) => (
                <button
                  key={bars}
                  type="button"
                  onClick={() => onUpdate('signalStrength', bars)}
                  className={`flex-1 py-1.5 rounded-lg border font-bold text-xs tabular-nums transition-colors cursor-pointer ${
                    settings.signalStrength === bars
                      ? 'border-blue-500 bg-blue-500/20 text-white'
                      : 'border-neutral-700 bg-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  {bars}
                </button>
              ))}
            </div>
          </div>

          <FieldSelect
            label="Cellular Label (when Wi-Fi off)"
            value={settings.networkType}
            onChange={(e) => onUpdate('networkType', e.target.value as DeviceSettings['networkType'])}
          >
            <option value="5G">5G</option>
            <option value="LTE">LTE</option>
            <option value="4G">4G</option>
          </FieldSelect>
        </div>

        {/* Status Bar Toggles */}
        <div className="space-y-2.5 pt-3 border-t border-neutral-800">
          <FieldCheckbox
            label="Wi-Fi Connected Icon"
            checked={settings.wifi}
            onChange={(val) => onUpdate('wifi', val)}
          />
          <FieldCheckbox
            label="Battery Charging Indicator"
            checked={settings.isCharging}
            onChange={(val) => onUpdate('isCharging', val)}
            accentClass="accent-emerald-500"
          />
          <FieldCheckbox
            label="Show Status Bar"
            checked={settings.showStatusBar}
            onChange={(val) => onUpdate('showStatusBar', val)}
          />
          <FieldCheckbox
            label="Show Dynamic Island Cutout"
            checked={settings.showDynamicIsland}
            onChange={(val) => onUpdate('showDynamicIsland', val)}
          />
          <FieldCheckbox
            label="Show Bottom Home Indicator Bar"
            checked={settings.showHomeIndicator}
            onChange={(val) => onUpdate('showHomeIndicator', val)}
          />
        </div>
      </div>
    </div>
  );
};

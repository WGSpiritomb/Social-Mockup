import React from 'react';
import { DeviceSettings, SocialPlatform } from '../types';
import { StatusBar, HomeIndicator } from './common/StatusBar';

interface DeviceFrameProps {
  settings: DeviceSettings;
  activePlatform: SocialPlatform;
  children: React.ReactNode;
  frameRef?: React.RefObject<HTMLDivElement | null>;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  settings,
  activePlatform,
  children,
  frameRef,
}) => {
  // Determine if status bar should use dark text
  // Platforms with full video/dark background always use light status bar
  const forceLightStatusBar =
    activePlatform === 'tiktok' ||
    activePlatform === 'facetime' ||
    activePlatform === 'xvideos' ||
    activePlatform === 'snapchat' ||
    (activePlatform === 'instagram' && children !== null && (settings.theme === 'dark' || activePlatform === 'instagram')) ||
    (activePlatform === 'youtube' && settings.theme === 'dark');

  const statusBarText = forceLightStatusBar
    ? 'light'
    : settings.theme === 'light'
    ? 'dark'
    : 'light';

  // Frame dimensions mapping
  const FRAME_DIMS: Record<'borderless' | 'android' | 'iphone16', { width: number; height: number }> = {
    borderless: { width: 385, height: 780 },
    android: { width: 390, height: 800 },
    iphone16: { width: 392, height: 804 },
  };

  const currentDims = FRAME_DIMS[settings.frameStyle] || FRAME_DIMS.iphone16;
  const scaledWidth = Math.round(currentDims.width * settings.zoomScale);
  const scaledHeight = Math.round(currentDims.height * settings.zoomScale);

  // Render internal frame content based on frame style
  const renderFrameContent = () => {
    if (settings.frameStyle === 'borderless') {
      return (
        <div
          ref={frameRef}
          className="relative w-[385px] h-[780px] overflow-hidden rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_12px_24px_-8px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.1)] bg-black border border-neutral-800 flex flex-col"
        >
          <div className="absolute top-0 inset-x-0 z-30 pointer-events-none">
            <StatusBar settings={settings} textColor={statusBarText} />
          </div>

          <div className="flex-1 w-full h-full overflow-hidden pt-11 pb-6 relative">
            {children}
            {settings.showGlassGlare && (
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.035] to-transparent z-25" />
            )}
          </div>

          {settings.showHomeIndicator && (
            <div className="absolute bottom-0 inset-x-0 z-30 pointer-events-none">
              <HomeIndicator textColor={statusBarText} />
            </div>
          )}
        </div>
      );
    }

    if (settings.frameStyle === 'android') {
      return (
        <div className="relative w-[390px] h-[800px]">
          {/* Android Hardware Frame */}
          <div
            ref={frameRef}
            className="relative w-[390px] h-[800px] bg-[#1a1a1a] p-[10px] rounded-[36px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_12px_24px_-8px_rgba(0,0,0,0.6),0_0_0_2px_#333333,0_0_0_1px_rgba(255,255,255,0.08)] flex flex-col"
          >
            {/* Punch Hole Camera Cutout */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black z-40 border border-neutral-800/80 pointer-events-none flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-950/80 ring-1 ring-blue-500/20" />
            </div>

            {/* Screen Content */}
            <div className="relative flex-1 w-full h-full rounded-[28px] overflow-hidden bg-black flex flex-col">
              <div className="absolute top-0 inset-x-0 z-30 pointer-events-none">
                <StatusBar settings={settings} textColor={statusBarText} />
              </div>

              <div className="flex-1 w-full h-full overflow-hidden pt-8 pb-5 relative">
                {children}
                {settings.showGlassGlare && (
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.035] to-transparent z-25" />
                )}
              </div>

              {settings.showHomeIndicator && (
                <div className="absolute bottom-0 inset-x-0 z-30 pointer-events-none">
                  <HomeIndicator textColor={statusBarText} />
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    // Default: iPhone 16 Pro Titanium Frame
    return (
      <div className="relative w-[392px] h-[804px]">
        {/* Side Hardware Buttons */}
        <div className="absolute -left-[14px] top-[115px] w-[3px] h-[26px] bg-[#3a3938] rounded-l-xs shadow-xs" /> {/* Action button */}
        <div className="absolute -left-[14px] top-[155px] w-[3px] h-[50px] bg-[#3a3938] rounded-l-xs shadow-xs" /> {/* Volume up */}
        <div className="absolute -left-[14px] top-[215px] w-[3px] h-[50px] bg-[#3a3938] rounded-l-xs shadow-xs" /> {/* Volume down */}
        <div className="absolute -right-[14px] top-[170px] w-[3px] h-[65px] bg-[#3a3938] rounded-r-xs shadow-xs" /> {/* Power button */}

        {/* iPhone Titanium Chassis Outer Border */}
        <div
          ref={frameRef}
          className="relative w-[392px] h-[804px] bg-[#222120] p-[10px] rounded-[48px] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9),0_12px_28px_-8px_rgba(0,0,0,0.7),0_0_0_3px_#43413e,0_0_0_1px_rgba(255,255,255,0.1),inset_0_0_4px_rgba(255,255,255,0.2)] flex flex-col"
        >
          {/* Screen Bezel & Display */}
          <div className="relative flex-1 w-full h-full rounded-[38px] overflow-hidden bg-black flex flex-col border-[2px] border-black/40">
            {/* Status Bar */}
            <div className="absolute top-0 inset-x-0 z-30 pointer-events-none">
              <StatusBar settings={settings} textColor={statusBarText} />
            </div>

            {/* Platform Mockup Main Canvas */}
            <div className="flex-1 w-full h-full overflow-hidden pt-11 pb-6 relative">
              {children}
              {settings.showGlassGlare && (
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.035] to-transparent z-25" />
              )}
            </div>

            {/* Home Bar */}
            {settings.showHomeIndicator && (
              <div className="absolute bottom-0 inset-x-0 z-30 pointer-events-none">
                <HomeIndicator textColor={statusBarText} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="relative shrink-0 flex items-center justify-center transition-all duration-150"
      style={{
        width: `${scaledWidth}px`,
        height: `${scaledHeight}px`,
      }}
    >
      <div
        style={{
          width: `${currentDims.width}px`,
          height: `${currentDims.height}px`,
          transform: `scale(${settings.zoomScale})`,
          transformOrigin: 'center center',
        }}
        className="shrink-0 flex items-center justify-center"
      >
        {renderFrameContent()}
      </div>
    </div>
  );
};

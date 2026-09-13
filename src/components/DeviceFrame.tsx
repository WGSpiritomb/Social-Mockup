import React from 'react';
import { DeviceSettings, SocialPlatform } from '../types';
import { StatusBar, HomeIndicator } from './common/StatusBar';
import { Globe, Lock, ShieldCheck } from 'lucide-react';

interface DeviceFrameProps {
  settings: DeviceSettings;
  activePlatform: SocialPlatform;
  children: React.ReactNode;
  frameRef?: React.RefObject<HTMLDivElement | null>;
}

const PLATFORM_URLS: Record<SocialPlatform, string> = {
  twitter: 'https://x.com/post/status/1834920482',
  instagram: 'https://www.instagram.com/p/C9xL39z/',
  tiktok: 'https://www.tiktok.com/@creator/video/728910',
  facebook: 'https://www.facebook.com/post/847291',
  youtube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  onlyfans: 'https://onlyfans.com/feed',
  imessage: 'Messages — Desktop',
  facetime: 'FaceTime — Desktop',
  snapchat: 'https://web.snapchat.com',
  xvideos: 'https://www.xvideos.com/video9481729',
};

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  settings,
  activePlatform,
  children,
  frameRef,
}) => {
  const isDesktop = settings.viewFormat === 'desktop';
  const isPhoneFrame = !isDesktop && settings.phoneFrame === 'iphone16';

  // Determine if status bar should use dark text
  const forceLightStatusBar =
    activePlatform === 'tiktok' ||
    activePlatform === 'facetime' ||
    activePlatform === 'xvideos' ||
    activePlatform === 'snapchat' ||
    (activePlatform === 'instagram' && (settings.theme === 'dark' || activePlatform === 'instagram')) ||
    (activePlatform === 'youtube' && settings.theme === 'dark');

  const statusBarText = forceLightStatusBar
    ? 'light'
    : settings.theme === 'light'
    ? 'dark'
    : 'light';

  // Frame dimensions mapping
  const currentDims = isDesktop
    ? { width: 750, height: 540 }
    : isPhoneFrame
    ? { width: 392, height: 804 }
    : { width: 385, height: 780 };

  const scaledWidth = Math.round(currentDims.width * settings.zoomScale);
  const scaledHeight = Math.round(currentDims.height * settings.zoomScale);

  // Render content based on format & frame style
  const renderFrameContent = () => {
    // 1. DESKTOP (LANDSCAPE) VIEW
    if (isDesktop) {
      return (
        <div
          ref={frameRef}
          className="relative w-[750px] h-[540px] overflow-hidden rounded-2xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9),0_12px_28px_-8px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.12)] bg-[#101216] border border-neutral-800 flex flex-col"
        >
          {/* Desktop Browser Window Header Bar */}
          <div className="h-10 px-4 bg-neutral-900/95 border-b border-neutral-800/80 flex items-center justify-between shrink-0 select-none z-30">
            {/* Window Traffic Dots */}
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/50 shadow-xs" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/50 shadow-xs" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]/50 shadow-xs" />
            </div>

            {/* Browser Address Bar */}
            <div className="flex-1 max-w-md mx-4">
              <div className="flex items-center justify-center space-x-1.5 px-3 py-1 rounded-lg bg-neutral-950/70 border border-neutral-800 text-[11px] text-neutral-400 font-mono">
                <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="truncate">{PLATFORM_URLS[activePlatform] || 'https://web.app'}</span>
              </div>
            </div>

            {/* Right Window Status Indicator */}
            <div className="flex items-center space-x-2 text-neutral-500 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-sans font-medium text-[10px] text-neutral-400 uppercase tracking-wider">Web</span>
            </div>
          </div>

          {/* Main Desktop Screen Area */}
          <div className="flex-1 w-full h-full overflow-hidden relative flex flex-col bg-black">
            {children}
            {settings.showGlassGlare && (
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.025] to-transparent z-25" />
            )}
          </div>
        </div>
      );
    }

    // 2. IPHONE (PORTRAIT) - HARDWARE FRAME (Titanium Chassis)
    if (isPhoneFrame) {
      return (
        <div ref={frameRef} className="relative w-[392px] h-[804px]">
          {/* Side Hardware Buttons */}
          <div className="absolute -left-[14px] top-[115px] w-[3px] h-[26px] bg-[#3a3938] rounded-l-xs shadow-xs" />
          <div className="absolute -left-[14px] top-[155px] w-[3px] h-[50px] bg-[#3a3938] rounded-l-xs shadow-xs" />
          <div className="absolute -left-[14px] top-[215px] w-[3px] h-[50px] bg-[#3a3938] rounded-l-xs shadow-xs" />
          <div className="absolute -right-[14px] top-[170px] w-[3px] h-[65px] bg-[#3a3938] rounded-r-xs shadow-xs" />

          {/* iPhone Titanium Chassis Outer Border */}
          <div
            className="relative w-[392px] h-[804px] bg-[#222120] p-[10px] rounded-[48px] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9),0_12px_28px_-8px_rgba(0,0,0,0.7),0_0_0_3px_#43413e,0_0_0_1px_rgba(255,255,255,0.1),inset_0_0_4px_rgba(255,255,255,0.2)] flex flex-col"
          >
            {/* Screen Bezel & Display */}
            <div className="relative flex-1 w-full h-full rounded-[38px] overflow-hidden bg-black flex flex-col border-[2px] border-black/40">
              {/* Status Bar */}
              {settings.showStatusBar && (
                <div className="absolute top-0 inset-x-0 z-30 pointer-events-none">
                  <StatusBar settings={settings} textColor={statusBarText} />
                </div>
              )}

              {/* Platform Mockup Main Canvas */}
              <div className={`flex-1 w-full h-full overflow-hidden ${settings.showStatusBar ? 'pt-11' : 'pt-2'} pb-6 relative`}>
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
    }

    // 3. IPHONE (PORTRAIT) - NO DEVICE (Clean Raw Screenshot - DEFAULT)
    return (
      <div
        ref={frameRef}
        className="relative w-[385px] h-[780px] overflow-hidden rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_12px_24px_-8px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.1)] bg-black border border-neutral-800/80 flex flex-col"
      >
        {/* Clean Screenshot Status Bar */}
        {settings.showStatusBar && (
          <div className="absolute top-0 inset-x-0 z-30 pointer-events-none">
            <StatusBar settings={settings} textColor={statusBarText} />
          </div>
        )}

        <div className={`flex-1 w-full h-full overflow-hidden ${settings.showStatusBar ? 'pt-11' : 'pt-2'} ${settings.showHomeIndicator ? 'pb-6' : 'pb-2'} relative`}>
          {children}
          {settings.showGlassGlare && (
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.035] to-transparent z-25" />
          )}
        </div>

        {/* Home Indicator */}
        {settings.showHomeIndicator && (
          <div className="absolute bottom-0 inset-x-0 z-30 pointer-events-none">
            <HomeIndicator textColor={statusBarText} />
          </div>
        )}
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

import React from 'react';
import { DeviceSettings, SocialPlatform } from '../types';
import { StatusBar, HomeIndicator } from './common/StatusBar';

interface DeviceFrameProps {
  settings: DeviceSettings;
  activePlatform: SocialPlatform;
  forceLightStatusBar?: boolean;
  children: React.ReactNode;
  frameRef?: React.RefObject<HTMLDivElement | null>;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  settings,
  activePlatform,
  forceLightStatusBar = false,
  children,
  frameRef,
}) => {
  const isDesktop = settings.viewFormat === 'desktop';
  const isPhoneFrame = !isDesktop && settings.phoneFrame === 'iphone16';

  // Measure full content height in desktop/landscape so nothing is cut off
  const [measuredDesktopHeight, setMeasuredDesktopHeight] = React.useState<number>(750);
  const desktopMeasureRef = React.useRef<HTMLDivElement | null>(null);

  React.useLayoutEffect(() => {
    if (!isDesktop) return;

    const updateHeight = () => {
      if (desktopMeasureRef.current) {
        const h = desktopMeasureRef.current.scrollHeight || desktopMeasureRef.current.offsetHeight;
        if (h > 50) {
          setMeasuredDesktopHeight(h);
        }
      }
    };

    updateHeight();
    const raf = requestAnimationFrame(updateHeight);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && desktopMeasureRef.current) {
      ro = new ResizeObserver(() => {
        updateHeight();
      });
      ro.observe(desktopMeasureRef.current);
    }

    return () => {
      cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
    };
  }, [isDesktop, activePlatform, children, settings]);

  // Determine status bar text contrast based on dark full-bleed screens or theme
  const statusBarText = forceLightStatusBar
    ? 'light'
    : settings.theme === 'light'
    ? 'dark'
    : 'light';

  // Frame dimensions mapping
  const currentDims = isDesktop
    ? { width: 700, height: measuredDesktopHeight }
    : isPhoneFrame
    ? { width: 392, height: 804 }
    : { width: 385, height: 780 };

  const scaledWidth = Math.round(currentDims.width * settings.zoomScale);
  const scaledHeight = Math.round(currentDims.height * settings.zoomScale);

  // Render content based on format & frame style
  const renderFrameContent = () => {
    // 1. DESKTOP (LANDSCAPE) VIEW - Clean, borderless & fits full content
    if (isDesktop) {
      return (
        <div
          ref={frameRef}
          className="relative w-[700px] h-fit rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_12px_24px_-8px_rgba(0,0,0,0.6)] bg-black overflow-hidden flex flex-col"
        >
          <div
            ref={desktopMeasureRef}
            className="w-full h-auto flex flex-col relative"
          >
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

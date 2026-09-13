import React, { useRef, useState, useCallback } from 'react';
import { AppState, SocialPlatform, CanvasBackdrop } from './types';
import { initialAppState } from './data/initialData';
import { PLATFORMS } from './data/platforms';
import { EditorPanel } from './components/EditorPanel';
import { DeviceFrame } from './components/DeviceFrame';
import { GitHubPagesModal } from './components/GitHubPagesModal';
import { TwitterMockup } from './components/platforms/TwitterMockup';
import { InstagramMockup } from './components/platforms/InstagramMockup';
import { TikTokMockup } from './components/platforms/TikTokMockup';
import { FacebookMockup } from './components/platforms/FacebookMockup';
import { YouTubeMockup } from './components/platforms/YouTubeMockup';
import { OnlyFansMockup } from './components/platforms/OnlyFansMockup';
import { IMessageMockup } from './components/platforms/IMessageMockup';
import { FaceTimeMockup } from './components/platforms/FaceTimeMockup';
import { SnapchatMockup } from './components/platforms/SnapchatMockup';
import { XVideosMockup } from './components/platforms/XVideosMockup';
import { PlatformDropdown } from './components/common/PlatformDropdown';
import { captureScreenshotPng, captureScreenshotBlob } from './utils/exportHelper';
import {
  ZoomIn,
  ZoomOut,
  Sparkles,
  Smartphone,
  Monitor,
  Check,
  Download,
  Copy,
  RotateCcw,
  Github,
  Sun,
  Moon,
  Layers,
  Maximize2,
} from 'lucide-react';

const platformGlows: Record<SocialPlatform, { primary: string; secondary: string }> = {
  twitter: { primary: 'rgba(29, 155, 240, 0.18)', secondary: 'rgba(56, 189, 248, 0.12)' },
  instagram: { primary: 'rgba(225, 48, 108, 0.20)', secondary: 'rgba(131, 58, 180, 0.16)' },
  tiktok: { primary: 'rgba(0, 242, 234, 0.18)', secondary: 'rgba(254, 44, 85, 0.18)' },
  facebook: { primary: 'rgba(24, 119, 242, 0.18)', secondary: 'rgba(30, 64, 175, 0.14)' },
  youtube: { primary: 'rgba(255, 0, 0, 0.18)', secondary: 'rgba(239, 68, 68, 0.12)' },
  onlyfans: { primary: 'rgba(0, 175, 240, 0.18)', secondary: 'rgba(14, 165, 233, 0.14)' },
  imessage: { primary: 'rgba(0, 122, 255, 0.18)', secondary: 'rgba(52, 199, 89, 0.12)' },
  facetime: { primary: 'rgba(52, 199, 89, 0.22)', secondary: 'rgba(16, 185, 129, 0.14)' },
  snapchat: { primary: 'rgba(255, 252, 0, 0.18)', secondary: 'rgba(234, 179, 8, 0.14)' },
  xvideos: { primary: 'rgba(217, 35, 35, 0.22)', secondary: 'rgba(185, 28, 28, 0.14)' },
};

export default function App() {
  const [state, setState] = useState<AppState>(initialAppState);
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');
  const frameCaptureRef = useRef<HTMLDivElement>(null);

  const currentPlatform =
    PLATFORMS.find((p) => p.id === state.activePlatform) || PLATFORMS[0];
  const activeGlow =
    platformGlows[state.activePlatform] || platformGlows.twitter;

  // Single Merged Platform & Preset Switcher
  const handlePresetSelect = (platform: SocialPlatform) => {
    setState((prev) => ({
      ...prev,
      activePlatform: platform,
    }));
  };

  // Export high-res PNG (Bulletproof for GitHub Pages & local)
  const handleExportPng = useCallback(async () => {
    if (!frameCaptureRef.current) return;
    setIsExporting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 80));

      const dataUrl = await captureScreenshotPng(frameCaptureRef.current);

      const link = document.createElement('a');
      link.download = `mockup-${state.activePlatform}-${state.deviceSettings.viewFormat}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export screenshot:', err);
      alert('Failed to generate PNG export. Please check console.');
    } finally {
      setIsExporting(false);
    }
  }, [state.activePlatform, state.deviceSettings.viewFormat]);

  // Copy PNG image to clipboard
  const handleCopyToClipboard = useCallback(async () => {
    if (!frameCaptureRef.current) return;

    try {
      const blob = await captureScreenshotBlob(frameCaptureRef.current);

      if (blob && navigator.clipboard && (window as any).ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } else {
        const dataUrl = await captureScreenshotPng(frameCaptureRef.current);
        await navigator.clipboard.writeText(dataUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (err) {
      console.error('Clipboard copy failed:', err);
      alert('Could not copy image directly to clipboard on this browser. Try Download PNG instead.');
    }
  }, []);

  const handleReset = () => {
    if (confirm('Reset all fields and settings to default?')) {
      setState(initialAppState);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#0a0c0f] text-neutral-100 overflow-hidden font-sans select-none">
      {/* GLOBAL TOP HEADER: Spans full width across Editor and Preview */}
      <header className="h-14 border-b border-neutral-800 bg-neutral-900/95 backdrop-blur-md flex items-center justify-between px-4 z-40 shrink-0">
        {/* Left: Brand Identity */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-base shadow-md shadow-blue-500/25">
            M
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-bold text-sm tracking-tight text-white leading-none">
                Social Media Mockup Generator
              </h1>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30">
                PRO Studio
              </span>
            </div>
            <p className="text-[10px] text-neutral-400 mt-0.5">Pixel-Perfect Screenshot Studio</p>
          </div>
        </div>

        {/* Center: THE MERGED PLATFORM & PRESET SELECTOR (Red) */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 bg-neutral-950/80 border border-neutral-700/80 rounded-xl p-1 shadow-inner">
            <span className="text-[11px] font-bold text-neutral-400 pl-2 pr-1 flex items-center space-x-1 shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Platform:</span>
            </span>
            <PlatformDropdown
              activePlatform={state.activePlatform}
              onSelect={handlePresetSelect}
              variant="toolbar"
              idPrefix="global-platform-select"
            />
          </div>
        </div>

        {/* Right: Quick Global Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 hover:text-white border border-neutral-700/80 text-xs transition-colors"
            title="Reset all fields to default"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleCopyToClipboard}
            className={`hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              copied
                ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-700 hover:border-neutral-600'
            }`}
            title="Copy screenshot directly to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-400" />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            onClick={handleExportPng}
            disabled={isExporting}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20 transition-all border border-blue-500"
            title="Export high-resolution PNG screenshot"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Exporting...' : 'Export PNG'}</span>
          </button>

          <button
            onClick={() => setIsGitHubModalOpen(true)}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 text-xs transition-colors"
            title="GitHub Pages deployment instructions"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Deploy</span>
          </button>
        </div>
      </header>

      {/* Mobile / Small Screen View Switcher Floating Pill */}
      <div className="lg:hidden absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center bg-neutral-900/95 backdrop-blur-md p-1 rounded-full border border-neutral-700 shadow-2xl">
        <button
          onClick={() => setMobileTab('editor')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            mobileTab === 'editor'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Form Editor
        </button>
        <button
          onClick={() => setMobileTab('preview')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            mobileTab === 'preview'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Live Preview
        </button>
      </div>

      {/* MAIN SPLIT VIEW (Side by Side: Editor & Preview) */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* LEFT PANEL: CONTROLS & FORM EDITOR (~40% width) */}
        <div
          className={`w-full lg:w-[42%] xl:w-[38%] h-full flex-shrink-0 z-20 shadow-2xl ${
            mobileTab === 'editor' ? 'flex flex-col' : 'hidden lg:flex lg:flex-col'
          }`}
        >
          <EditorPanel
            state={state}
            onChange={setState}
            onExportPng={handleExportPng}
            onCopyToClipboard={handleCopyToClipboard}
            onReset={handleReset}
            onOpenGitHubModal={() => setIsGitHubModalOpen(true)}
            isExporting={isExporting}
            copied={copied}
          />
        </div>

        {/* RIGHT PANEL: LIVE INTERACTIVE PREVIEW STUDIO (~60% width) (Green) */}
        <div
          className={`flex-1 h-full flex flex-col bg-[#0f1115] relative overflow-hidden ${
            mobileTab === 'preview' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          {/* Enhanced Viewport & Quick Controls Toolbar */}
          <div className="relative z-10 px-4 py-2.5 border-b border-neutral-800/80 bg-neutral-900/70 backdrop-blur-md flex flex-wrap items-center justify-between gap-2 select-none">
            {/* Left: View Format Selector - 2 OPTIONS ONLY: iPhone (Portrait) and Desktop (Landscape) */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center bg-neutral-800/90 p-0.5 rounded-xl border border-neutral-700/70 text-xs">
                <button
                  onClick={() =>
                    setState((prev) => ({
                      ...prev,
                      deviceSettings: {
                        ...prev.deviceSettings,
                        viewFormat: 'iphone',
                      },
                    }))
                  }
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                    (state.deviceSettings.viewFormat || 'iphone') === 'iphone'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-700/50'
                  }`}
                  title="iPhone (Portrait) view"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>iPhone (Portrait)</span>
                </button>

                <button
                  onClick={() =>
                    setState((prev) => ({
                      ...prev,
                      deviceSettings: {
                        ...prev.deviceSettings,
                        viewFormat: 'desktop',
                      },
                    }))
                  }
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                    state.deviceSettings.viewFormat === 'desktop'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-700/50'
                  }`}
                  title="Desktop (Landscape) view"
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop (Landscape)</span>
                </button>
              </div>

              {/* Device Option: ONLY for phone! */}
              {(state.deviceSettings.viewFormat || 'iphone') === 'iphone' && (
                <div className="flex items-center space-x-1.5 pl-1.5 border-l border-neutral-800">
                  <span className="text-[11px] font-semibold text-neutral-400 hidden xl:inline">
                    Device:
                  </span>
                  <div className="flex items-center bg-neutral-800/80 p-0.5 rounded-xl border border-neutral-700/60 text-xs">
                    <button
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          deviceSettings: {
                            ...prev.deviceSettings,
                            phoneFrame: 'none',
                            frameStyle: 'borderless',
                          },
                        }))
                      }
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                        (state.deviceSettings.phoneFrame || 'none') === 'none'
                          ? 'bg-purple-600 text-white shadow-xs'
                          : 'text-neutral-400 hover:text-white hover:bg-neutral-700/50'
                      }`}
                      title="No Device (Clean Screenshot - Default)"
                    >
                      <span>📷</span>
                      <span>No Device (Screenshot)</span>
                    </button>

                    <button
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          deviceSettings: {
                            ...prev.deviceSettings,
                            phoneFrame: 'iphone16',
                            frameStyle: 'iphone16',
                          },
                        }))
                      }
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                        state.deviceSettings.phoneFrame === 'iphone16'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-neutral-400 hover:text-white hover:bg-neutral-700/50'
                      }`}
                      title="iPhone 16 Pro Titanium Frame"
                    >
                      <span>📱</span>
                      <span className="hidden sm:inline">iPhone Frame</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Center: Canvas Studio Backdrop Mode & Quick Screen Toggles */}
            <div className="flex items-center space-x-1.5">
              <span className="text-[11px] font-semibold text-neutral-400 hidden 2xl:inline">
                Studio Backdrop:
              </span>
              <div className="flex items-center bg-neutral-800/80 p-0.5 rounded-xl border border-neutral-700/60 text-xs">
                {(
                  [
                    { id: 'mesh', label: 'Mesh Glow', icon: '🌌' },
                    { id: 'dark', label: 'Dark', icon: '🖤' },
                    { id: 'light', label: 'Light', icon: '🤍' },
                    { id: 'transparent', label: 'Checker', icon: '🏁' },
                  ] as const
                ).map((b) => (
                  <button
                    key={b.id}
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        deviceSettings: { ...prev.deviceSettings, canvasBackdrop: b.id },
                      }))
                    }
                    title={`Studio backdrop: ${b.label}`}
                    className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
                      (state.deviceSettings.canvasBackdrop || 'mesh') === b.id
                        ? 'bg-neutral-700 text-white shadow-xs'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-700/40'
                    }`}
                  >
                    <span>{b.icon}</span>
                    <span className="hidden md:inline text-[11px]">{b.label}</span>
                  </button>
                ))}
              </div>

              {/* Quick Screen Toggles */}
              <div className="flex items-center bg-neutral-800/80 p-0.5 rounded-xl border border-neutral-700/60 text-xs space-x-0.5">
                {/* Theme Toggle */}
                <button
                  onClick={() =>
                    setState((prev) => ({
                      ...prev,
                      deviceSettings: {
                        ...prev.deviceSettings,
                        theme: prev.deviceSettings.theme === 'dark' ? 'light' : 'dark',
                      },
                    }))
                  }
                  className="p-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-700/60 transition-colors"
                  title={`Switch OS Theme (${state.deviceSettings.theme === 'dark' ? 'Dark' : 'Light'})`}
                >
                  {state.deviceSettings.theme === 'dark' ? (
                    <Moon className="w-3.5 h-3.5 text-indigo-400" />
                  ) : (
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                  )}
                </button>

                {/* Glass Glare Toggle */}
                <button
                  onClick={() =>
                    setState((prev) => ({
                      ...prev,
                      deviceSettings: {
                        ...prev.deviceSettings,
                        showGlassGlare: !prev.deviceSettings.showGlassGlare,
                      },
                    }))
                  }
                  className={`p-1.5 rounded-lg transition-colors ${
                    state.deviceSettings.showGlassGlare
                      ? 'text-blue-400 bg-blue-500/15'
                      : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                  title={`OLED Glass Glare Reflection: ${state.deviceSettings.showGlassGlare ? 'ON' : 'OFF'}`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: Scale / Zoom & Fit Controls */}
            <div className="flex items-center space-x-1.5 bg-neutral-800/80 rounded-xl p-1 border border-neutral-700/60 text-xs">
              <button
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    deviceSettings: {
                      ...prev.deviceSettings,
                      zoomScale: Math.max(0.5, Number((prev.deviceSettings.zoomScale - 0.05).toFixed(2))),
                    },
                  }))
                }
                className="p-1 rounded-lg hover:bg-neutral-700 text-neutral-300 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>

              <span className="font-semibold text-neutral-200 min-w-[38px] text-center text-[11px]">
                {Math.round(state.deviceSettings.zoomScale * 100)}%
              </span>

              <button
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    deviceSettings: {
                      ...prev.deviceSettings,
                      zoomScale: Math.min(1.3, Number((prev.deviceSettings.zoomScale + 0.05).toFixed(2))),
                    },
                  }))
                }
                className="p-1 rounded-lg hover:bg-neutral-700 text-neutral-300 transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>

              {/* Auto Fit Button */}
              <button
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    deviceSettings: { ...prev.deviceSettings, zoomScale: 0.8 },
                  }))
                }
                className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-colors ${
                  state.deviceSettings.zoomScale === 0.8
                    ? 'bg-blue-600 text-white'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
                }`}
                title="Auto-Fit device to preview screen"
              >
                Fit
              </button>

              {/* 100% Actual pixel size */}
              <button
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    deviceSettings: { ...prev.deviceSettings, zoomScale: 1 },
                  }))
                }
                className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-colors ${
                  state.deviceSettings.zoomScale === 1
                    ? 'bg-blue-600 text-white'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
                }`}
                title="100% Actual pixel size"
              >
                100%
              </button>
            </div>
          </div>

          {/* Live Mockup Centered Canvas Frame */}
          <div
            className={`relative flex-1 w-full h-full overflow-auto custom-scrollbar flex p-6 select-none transition-colors duration-300 ${
              state.deviceSettings.canvasBackdrop === 'light'
                ? 'bg-neutral-100 text-neutral-900'
                : state.deviceSettings.canvasBackdrop === 'transparent'
                ? 'bg-[#15171b] [background-image:linear-gradient(45deg,#1f232b_25%,transparent_25%),linear-gradient(-45deg,#1f232b_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#1f232b_75%),linear-gradient(-45deg,transparent_75%,#1f232b_75%)] [background-size:20px_20px] [background-position:0_0,0_10px,10px_-10px,-10px_0px]'
                : state.deviceSettings.canvasBackdrop === 'dark'
                ? 'bg-[#0a0c0e]'
                : 'bg-[#0f1115]'
            }`}
          >
            {/* Subtle Ambient Background Mesh & Dynamic Platform Spotlight */}
            {(state.deviceSettings.canvasBackdrop === 'mesh' || !state.deviceSettings.canvasBackdrop) && (
              <>
                <div className="absolute inset-0 bg-[radial-gradient(#272d38_1px,transparent_1px)] [background-size:24px_24px] opacity-45 pointer-events-none" />
                <div
                  className="absolute top-1/4 -right-16 w-[480px] h-[480px] rounded-full blur-[110px] pointer-events-none transition-all duration-700 opacity-60"
                  style={{ backgroundColor: activeGlow.primary }}
                />
                <div
                  className="absolute bottom-1/4 -left-16 w-[480px] h-[480px] rounded-full blur-[110px] pointer-events-none transition-all duration-700 opacity-50"
                  style={{ backgroundColor: activeGlow.secondary }}
                />
              </>
            )}

            {/* Centered Device Mockup with auto margins so it never scrolls into empty void */}
            <div className="m-auto flex items-center justify-center relative z-20">
              <DeviceFrame
                settings={state.deviceSettings}
                activePlatform={state.activePlatform}
                frameRef={frameCaptureRef}
              >
                {state.activePlatform === 'twitter' && (
                  <TwitterMockup state={state.twitter} deviceSettings={state.deviceSettings} />
                )}
                {state.activePlatform === 'instagram' && (
                  <InstagramMockup state={state.instagram} deviceSettings={state.deviceSettings} />
                )}
                {state.activePlatform === 'tiktok' && (
                  <TikTokMockup state={state.tiktok} deviceSettings={state.deviceSettings} />
                )}
                {state.activePlatform === 'facebook' && (
                  <FacebookMockup state={state.facebook} deviceSettings={state.deviceSettings} />
                )}
                {state.activePlatform === 'youtube' && (
                  <YouTubeMockup state={state.youtube} deviceSettings={state.deviceSettings} />
                )}
                {state.activePlatform === 'onlyfans' && (
                  <OnlyFansMockup state={state.onlyfans} deviceSettings={state.deviceSettings} />
                )}
                {state.activePlatform === 'imessage' && (
                  <IMessageMockup state={state.imessage} deviceSettings={state.deviceSettings} />
                )}
                {state.activePlatform === 'facetime' && (
                  <FaceTimeMockup state={state.facetime} deviceSettings={state.deviceSettings} />
                )}
                {state.activePlatform === 'snapchat' && (
                  <SnapchatMockup state={state.snapchat} deviceSettings={state.deviceSettings} />
                )}
                {state.activePlatform === 'xvideos' && (
                  <XVideosMockup state={state.xvideos} deviceSettings={state.deviceSettings} />
                )}
              </DeviceFrame>
            </div>
          </div>
        </div>
      </div>

      {/* GitHub Pages CI/CD Guide Modal */}
      <GitHubPagesModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
      />
    </div>
  );
}

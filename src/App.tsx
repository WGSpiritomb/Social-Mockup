import React, { useRef, useState, useCallback, useEffect } from 'react';
import { AppState, SocialPlatform } from './types';
import { initialAppState } from './data/initialData';
import { EditorPanel } from './components/EditorPanel';
import { DeviceFrame } from './components/DeviceFrame';
import { GitHubPagesModal } from './components/GitHubPagesModal';
import { FanzaMockup } from './components/platforms/FanzaMockup';
import { FanboxMockup } from './components/platforms/FanboxMockup';
import { DlsiteMockup } from './components/platforms/DlsiteMockup';
import { FantiaMockup } from './components/platforms/FantiaMockup';
import { OnlyFansMockup } from './components/platforms/OnlyFansMockup';
import { FanslyMockup } from './components/platforms/FanslyMockup';
import { XVideosMockup } from './components/platforms/XVideosMockup';
import { PornhubMockup } from './components/platforms/PornhubMockup';
import { BlackedMockup } from './components/platforms/BlackedMockup';
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
  Camera,
} from 'lucide-react';

const STORAGE_KEY = 'mockup-studio-state-v1';
const VALID_PLATFORMS: SocialPlatform[] = [
  'fanza',
  'fanbox',
  'dlsite',
  'fantia',
  'onlyfans',
  'fansly',
  'xvideos',
  'pornhub',
  'blacked',
];

function loadSavedState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialAppState;
    const parsed = JSON.parse(raw) as Partial<AppState>;
    const activePlatform =
      parsed.activePlatform && VALID_PLATFORMS.includes(parsed.activePlatform)
        ? parsed.activePlatform
        : initialAppState.activePlatform;

    return {
      activePlatform,
      deviceSettings: {
        ...initialAppState.deviceSettings,
        ...(parsed.deviceSettings || {}),
      },
      fanza: { ...initialAppState.fanza, ...(parsed.fanza || {}) },
      fanbox: { ...initialAppState.fanbox, ...(parsed.fanbox || {}) },
      dlsite: { ...initialAppState.dlsite, ...(parsed.dlsite || {}) },
      fantia: { ...initialAppState.fantia, ...(parsed.fantia || {}) },
      onlyfans: { ...initialAppState.onlyfans, ...(parsed.onlyfans || {}) },
      fansly: { ...initialAppState.fansly, ...(parsed.fansly || {}) },
      xvideos: { ...initialAppState.xvideos, ...(parsed.xvideos || {}) },
      pornhub: { ...initialAppState.pornhub, ...(parsed.pornhub || {}) },
      blacked: { ...initialAppState.blacked, ...(parsed.blacked || {}) },
    };
  } catch {
    return initialAppState;
  }
}

const platformGlows: Record<SocialPlatform, { primary: string; secondary: string }> = {
  fanza: { primary: 'rgba(230, 0, 18, 0.22)', secondary: 'rgba(220, 38, 38, 0.14)' },
  fanbox: { primary: 'rgba(255, 207, 51, 0.20)', secondary: 'rgba(245, 158, 11, 0.14)' },
  dlsite: { primary: 'rgba(0, 91, 172, 0.24)', secondary: 'rgba(69, 182, 255, 0.14)' },
  fantia: { primary: 'rgba(0, 179, 119, 0.20)', secondary: 'rgba(16, 185, 129, 0.14)' },
  onlyfans: { primary: 'rgba(0, 175, 240, 0.18)', secondary: 'rgba(14, 165, 233, 0.14)' },
  fansly: { primary: 'rgba(31, 162, 241, 0.22)', secondary: 'rgba(56, 189, 248, 0.14)' },
  xvideos: { primary: 'rgba(217, 35, 35, 0.22)', secondary: 'rgba(185, 28, 28, 0.14)' },
  pornhub: { primary: 'rgba(255, 144, 0, 0.22)', secondary: 'rgba(234, 88, 12, 0.14)' },
  blacked: { primary: 'rgba(212, 175, 55, 0.18)', secondary: 'rgba(161, 161, 170, 0.14)' },
};

export default function App() {
  const [state, setState] = useState<AppState>(loadSavedState);
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [confirmingReset, setConfirmingReset] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'info' | 'error' } | null>(null);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');
  const frameCaptureRef = useRef<HTMLDivElement>(null);

  const showToast = useCallback((message: string, type: 'info' | 'error' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((curr) => (curr?.message === message ? null : curr));
    }, 3000);
  }, []);

  // Persist user edits safely to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore quota exceeded if large base64 images are uploaded
    }
  }, [state]);

  // Cancel inline reset confirmation after 3.5s
  useEffect(() => {
    if (!confirmingReset) return;
    const timer = setTimeout(() => setConfirmingReset(false), 3500);
    return () => clearTimeout(timer);
  }, [confirmingReset]);

  const activeGlow = platformGlows[state.activePlatform] || platformGlows.fanza;

  // Determine when the active screen always has a dark/colored top bar regardless of light/dark theme
  const forceLightStatusBar =
    state.activePlatform === 'xvideos' ||
    state.activePlatform === 'pornhub' ||
    state.activePlatform === 'blacked' ||
    (state.activePlatform === 'dlsite' && state.deviceSettings.theme === 'light');

  const handlePresetSelect = (platform: SocialPlatform) => {
    setState((prev) => ({
      ...prev,
      activePlatform: platform,
    }));
  };

  const handleExportPng = useCallback(async () => {
    if (!frameCaptureRef.current) return;
    setIsExporting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 80));
      const dataUrl = await captureScreenshotPng(frameCaptureRef.current);

      const link = document.createElement('a');
      link.download = `mockup-${state.activePlatform}-${state.deviceSettings.viewFormat}-${Date.now()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('PNG screenshot exported.');
    } catch (err) {
      console.error('Failed to export screenshot:', err);
      showToast('Failed to export PNG screenshot.', 'error');
    } finally {
      setIsExporting(false);
    }
  }, [state.activePlatform, state.deviceSettings.viewFormat, showToast]);

  const handleCopyToClipboard = useCallback(async () => {
    if (!frameCaptureRef.current) return;

    try {
      const blob = await captureScreenshotBlob(frameCaptureRef.current);

      if (blob && navigator.clipboard && typeof ClipboardItem !== 'undefined') {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
        showToast('Screenshot copied to clipboard.');
      } else {
        const dataUrl = await captureScreenshotPng(frameCaptureRef.current);
        await navigator.clipboard.writeText(dataUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
        showToast('Image data copied to clipboard.');
      }
    } catch (err) {
      console.error('Clipboard copy failed:', err);
      showToast('Clipboard copy blocked by browser. Use Export PNG instead.', 'error');
    }
  }, [showToast]);

  const handleReset = () => {
    if (!confirmingReset) {
      setConfirmingReset(true);
      return;
    }
    setConfirmingReset(false);
    setState(initialAppState);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    showToast('Reset to defaults.');
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#0a0c0f] text-neutral-100 overflow-hidden font-sans select-none">
      {/* GLOBAL TOP HEADER */}
      <header className="h-14 border-b border-neutral-800 bg-neutral-900/95 backdrop-blur-md flex items-center justify-between gap-4 px-4 z-40 shrink-0">
        {/* Left: Brand Identity */}
        <div className="flex items-center space-x-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-sm shrink-0">
            M
          </div>
          <h1 className="font-bold text-sm tracking-tight text-white truncate whitespace-nowrap">
            Mockup Studio
          </h1>
        </div>

        {/* Center: Platform Selector */}
        <div className="flex items-center shrink-0">
          <PlatformDropdown
            activePlatform={state.activePlatform}
            onSelect={handlePresetSelect}
            idPrefix="global-platform-select"
          />
        </div>

        {/* Right: Primary Actions */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            type="button"
            onClick={handleReset}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 flex items-center space-x-1.5 cursor-pointer ${
              confirmingReset
                ? 'bg-rose-600/20 text-rose-300 border-rose-500/50 hover:bg-rose-600/30'
                : 'bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white border-neutral-700/80'
            }`}
            title={confirmingReset ? 'Click again to confirm reset' : 'Reset all fields to default'}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {confirmingReset && <span>Confirm Reset?</span>}
          </button>

          <button
            type="button"
            onClick={handleCopyToClipboard}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border whitespace-nowrap shrink-0 cursor-pointer ${
              copied
                ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/40'
                : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-700 hover:border-neutral-600'
            }`}
            title="Copy screenshot to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-400" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleExportPng}
            disabled={isExporting}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20 transition-colors border border-blue-500 whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-60"
            title="Export high-resolution PNG screenshot"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Exporting...' : 'Export PNG'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsGitHubModalOpen(true)}
            className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 text-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title="GitHub Pages deployment instructions"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Deploy</span>
          </button>
        </div>
      </header>

      {/* Non-blocking Toast Feedback */}
      {toast && (
        <div
          role="status"
          className={`fixed top-16 right-4 z-50 px-3.5 py-2 rounded-lg text-xs font-semibold shadow-xl border transition-all ${
            toast.type === 'error'
              ? 'bg-rose-950/95 border-rose-700 text-rose-200'
              : 'bg-neutral-900/95 border-neutral-700 text-neutral-100'
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Mobile View Switcher */}
      <div className="lg:hidden absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center bg-neutral-900/95 backdrop-blur-md p-1 rounded-full border border-neutral-700 shadow-2xl">
        <button
          type="button"
          onClick={() => setMobileTab('editor')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
            mobileTab === 'editor'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Editor
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('preview')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
            mobileTab === 'preview'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Preview
        </button>
      </div>

      {/* MAIN SPLIT VIEW */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* LEFT PANEL: EDITOR */}
        <div
          className={`w-full lg:w-[42%] xl:w-[38%] h-full flex-shrink-0 z-20 shadow-2xl ${
            mobileTab === 'editor' ? 'flex flex-col' : 'hidden lg:flex lg:flex-col'
          }`}
        >
          <EditorPanel state={state} onChange={setState} />
        </div>

        {/* RIGHT PANEL: LIVE INTERACTIVE PREVIEW STUDIO */}
        <div
          className={`flex-1 h-full flex flex-col bg-[#0f1115] relative overflow-hidden ${
            mobileTab === 'preview' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          {/* Preview Toolbar */}
          <div className="relative z-10 px-4 py-2 border-b border-neutral-800/80 bg-neutral-900/70 backdrop-blur-md flex flex-wrap items-center justify-between gap-2 select-none">
            {/* Left: View Format & Device Frame */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center bg-neutral-800/90 p-0.5 rounded-lg border border-neutral-700/70 text-xs">
                <button
                  type="button"
                  onClick={() =>
                    setState((prev) => ({
                      ...prev,
                      deviceSettings: {
                        ...prev.deviceSettings,
                        viewFormat: 'iphone',
                      },
                    }))
                  }
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center space-x-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                    (state.deviceSettings.viewFormat || 'iphone') === 'iphone'
                      ? 'bg-blue-600 text-white'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-700/50'
                  }`}
                  title="iPhone (Portrait) view"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>iPhone</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setState((prev) => ({
                      ...prev,
                      deviceSettings: {
                        ...prev.deviceSettings,
                        viewFormat: 'desktop',
                      },
                    }))
                  }
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center space-x-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                    state.deviceSettings.viewFormat === 'desktop'
                      ? 'bg-blue-600 text-white'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-700/50'
                  }`}
                  title="Desktop (Landscape) view"
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </button>
              </div>

              {(state.deviceSettings.viewFormat || 'iphone') === 'iphone' && (
                <div className="flex items-center bg-neutral-800/80 p-0.5 rounded-lg border border-neutral-700/60 text-xs">
                  <button
                    type="button"
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        deviceSettings: {
                          ...prev.deviceSettings,
                          phoneFrame: 'none',
                        },
                      }))
                    }
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center space-x-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                      (state.deviceSettings.phoneFrame || 'none') === 'none'
                        ? 'bg-neutral-700 text-white'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-700/50'
                    }`}
                    title="Clean screenshot without phone chassis"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Screenshot</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        deviceSettings: {
                          ...prev.deviceSettings,
                          phoneFrame: 'iphone16',
                        },
                      }))
                    }
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center space-x-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                      state.deviceSettings.phoneFrame === 'iphone16'
                        ? 'bg-neutral-700 text-white'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-700/50'
                    }`}
                    title="iPhone 16 Pro Titanium Frame"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Frame</span>
                  </button>
                </div>
              )}
            </div>

            {/* Center: Studio Backdrop & App Theme / Glare */}
            <div className="flex items-center space-x-1.5">
              <div className="flex items-center bg-neutral-800/80 p-0.5 rounded-lg border border-neutral-700/60 text-xs">
                {(
                  [
                    { id: 'mesh', label: 'Glow' },
                    { id: 'dark', label: 'Dark' },
                    { id: 'light', label: 'Light' },
                    { id: 'transparent', label: 'Grid' },
                  ] as const
                ).map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        deviceSettings: { ...prev.deviceSettings, canvasBackdrop: b.id },
                      }))
                    }
                    title={`Studio backdrop: ${b.label}`}
                    className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                      (state.deviceSettings.canvasBackdrop || 'mesh') === b.id
                        ? 'bg-neutral-700 text-white'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-700/40'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center bg-neutral-800/80 p-0.5 rounded-lg border border-neutral-700/60 text-xs space-x-0.5">
                <button
                  type="button"
                  onClick={() =>
                    setState((prev) => ({
                      ...prev,
                      deviceSettings: {
                        ...prev.deviceSettings,
                        theme: prev.deviceSettings.theme === 'dark' ? 'light' : 'dark',
                      },
                    }))
                  }
                  className="p-1.5 rounded-md text-neutral-300 hover:text-white hover:bg-neutral-700/60 transition-colors cursor-pointer"
                  title={`App Theme: ${state.deviceSettings.theme === 'dark' ? 'Dark' : 'Light'}`}
                >
                  {state.deviceSettings.theme === 'dark' ? (
                    <Moon className="w-3.5 h-3.5 text-indigo-400" />
                  ) : (
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setState((prev) => ({
                      ...prev,
                      deviceSettings: {
                        ...prev.deviceSettings,
                        showGlassGlare: !prev.deviceSettings.showGlassGlare,
                      },
                    }))
                  }
                  className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                    state.deviceSettings.showGlassGlare
                      ? 'text-blue-400 bg-blue-500/15'
                      : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                  title={`Glass Glare Reflection: ${state.deviceSettings.showGlassGlare ? 'ON' : 'OFF'}`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: Zoom Controls */}
            <div className="flex items-center space-x-1 bg-neutral-800/80 rounded-lg p-0.5 border border-neutral-700/60 text-xs">
              <button
                type="button"
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    deviceSettings: {
                      ...prev.deviceSettings,
                      zoomScale: Math.max(0.5, Number((prev.deviceSettings.zoomScale - 0.05).toFixed(2))),
                    },
                  }))
                }
                className="p-1 rounded-md hover:bg-neutral-700 text-neutral-300 transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>

              <span className="font-semibold text-neutral-200 min-w-[38px] text-center text-[11px] tabular-nums">
                {Math.round(state.deviceSettings.zoomScale * 100)}%
              </span>

              <button
                type="button"
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    deviceSettings: {
                      ...prev.deviceSettings,
                      zoomScale: Math.min(1.3, Number((prev.deviceSettings.zoomScale + 0.05).toFixed(2))),
                    },
                  }))
                }
                className="p-1 rounded-md hover:bg-neutral-700 text-neutral-300 transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    deviceSettings: { ...prev.deviceSettings, zoomScale: 0.8 },
                  }))
                }
                className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                  state.deviceSettings.zoomScale === 0.8
                    ? 'bg-blue-600 text-white'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
                }`}
                title="Fit to screen (80%)"
              >
                Fit
              </button>

              <button
                type="button"
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    deviceSettings: { ...prev.deviceSettings, zoomScale: 1 },
                  }))
                }
                className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                  state.deviceSettings.zoomScale === 1
                    ? 'bg-blue-600 text-white'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
                }`}
                title="100% scale"
              >
                100%
              </button>
            </div>
          </div>

          {/* Live Mockup Centered Canvas */}
          <div
            className={`relative flex-1 w-full h-full overflow-auto custom-scrollbar flex p-6 pb-20 lg:pb-6 select-none transition-colors duration-300 ${
              state.deviceSettings.canvasBackdrop === 'light'
                ? 'bg-neutral-100 text-neutral-900'
                : state.deviceSettings.canvasBackdrop === 'transparent'
                ? 'bg-[#15171b] [background-image:linear-gradient(45deg,#1f232b_25%,transparent_25%),linear-gradient(-45deg,#1f232b_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#1f232b_75%),linear-gradient(-45deg,transparent_75%,#1f232b_75%)] [background-size:20px_20px] [background-position:0_0,0_10px,10px_-10px,-10px_0px]'
                : state.deviceSettings.canvasBackdrop === 'dark'
                ? 'bg-[#0a0c0e]'
                : 'bg-[#0f1115]'
            }`}
          >
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

            <div className="m-auto flex items-center justify-center relative z-20">
              <DeviceFrame
                settings={state.deviceSettings}
                activePlatform={state.activePlatform}
                forceLightStatusBar={forceLightStatusBar}
                frameRef={frameCaptureRef}
              >
                {state.activePlatform === 'fanza' && (
                  <FanzaMockup state={state.fanza} deviceSettings={state.deviceSettings} />
                )}
                {state.activePlatform === 'fanbox' && (
                  <FanboxMockup state={state.fanbox} deviceSettings={state.deviceSettings} />
                )}
                {state.activePlatform === 'dlsite' && (
                  <DlsiteMockup state={state.dlsite} deviceSettings={state.deviceSettings} />
                )}
                {state.activePlatform === 'fantia' && (
                  <FantiaMockup state={state.fantia} deviceSettings={state.deviceSettings} />
                )}
                {state.activePlatform === 'onlyfans' && (
                  <OnlyFansMockup state={state.onlyfans} deviceSettings={state.deviceSettings} />
                )}
                {state.activePlatform === 'fansly' && (
                  <FanslyMockup state={state.fansly} deviceSettings={state.deviceSettings} />
                )}
                {state.activePlatform === 'xvideos' && (
                  <XVideosMockup state={state.xvideos} deviceSettings={state.deviceSettings} />
                )}
                {state.activePlatform === 'pornhub' && (
                  <PornhubMockup state={state.pornhub} deviceSettings={state.deviceSettings} />
                )}
                {state.activePlatform === 'blacked' && (
                  <BlackedMockup state={state.blacked} deviceSettings={state.deviceSettings} />
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

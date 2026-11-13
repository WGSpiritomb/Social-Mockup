import React, { useState, useEffect } from 'react';
import {
  AppState,
  SocialPlatform,
  FanzaMode,
  OnlyFansMode,
  FanboxMode,
  FanslyMode,
  DlsiteMode,
  FantiaMode,
} from '../types';
import { Sliders, Smartphone, MessageCircle } from 'lucide-react';
import { ModeSelector, ModeOption } from './editor/FormControls';
import { DeviceSettingsEditor } from './editor/DeviceSettingsEditor';
import { PlatformContentEditor } from './editor/PlatformContentEditor';
import { MessagesManager } from './editor/MessagesManager';

interface EditorPanelProps {
  state: AppState;
  onChange: (updater: (prev: AppState) => AppState) => void;
}

function getMessagesTabLabel(state: AppState): string | null {
  switch (state.activePlatform) {
    case 'fanza':
    case 'dlsite':
      return 'Reviews';
    case 'onlyfans':
      return state.onlyfans.mode === 'chat' ? 'DM Messages' : null;
    case 'fansly':
      return state.fansly.mode === 'chat' ? 'DM Messages' : 'Comments';
    case 'fanbox':
    case 'fantia':
    case 'xvideos':
    case 'pornhub':
    case 'blacked':
      return 'Comments';
  }
}

const MODE_OPTIONS: Partial<Record<SocialPlatform, ModeOption<string>[]>> = {
  fanza: [
    { id: 'product', label: 'Product Page' },
    { id: 'stream', label: 'TV Stream' },
  ] as ModeOption<FanzaMode>[],
  fanbox: [
    { id: 'locked', label: 'Supporter Only' },
    { id: 'post', label: 'Public Post' },
  ] as ModeOption<FanboxMode>[],
  dlsite: [
    { id: 'product', label: 'Work Page' },
    { id: 'viewer', label: 'Sample Player' },
  ] as ModeOption<DlsiteMode>[],
  fantia: [
    { id: 'locked', label: 'Plan Locked' },
    { id: 'post', label: 'Free Post' },
  ] as ModeOption<FantiaMode>[],
  onlyfans: [
    { id: 'locked', label: 'Paywalled' },
    { id: 'post', label: 'Feed Post' },
    { id: 'chat', label: 'DM Chat' },
  ] as ModeOption<OnlyFansMode>[],
  fansly: [
    { id: 'locked', label: 'Tier Locked' },
    { id: 'post', label: 'Feed Post' },
    { id: 'chat', label: 'DM Chat' },
  ] as ModeOption<FanslyMode>[],
};

export const EditorPanel: React.FC<EditorPanelProps> = ({ state, onChange }) => {
  const [activeTab, setActiveTab] = useState<'content' | 'device' | 'messages'>('content');
  const messagesTabLabel = getMessagesTabLabel(state);

  useEffect(() => {
    if (activeTab === 'messages' && !messagesTabLabel) {
      setActiveTab('content');
    }
  }, [activeTab, messagesTabLabel]);

  const activeModes = MODE_OPTIONS[state.activePlatform];
  const currentMode = state[state.activePlatform].mode;

  const handleModeChange = (nextMode: string) => {
    onChange((prev) => {
      if (prev.activePlatform === 'onlyfans') {
        const mode = nextMode as OnlyFansMode;
        return {
          ...prev,
          onlyfans: {
            ...prev.onlyfans,
            mode,
            isLocked: mode === 'locked' ? true : mode === 'post' ? false : prev.onlyfans.isLocked,
          },
        };
      }

      if (prev.activePlatform === 'fanza') {
        return { ...prev, fanza: { ...prev.fanza, mode: nextMode as FanzaMode } };
      }
      if (prev.activePlatform === 'fanbox') {
        return { ...prev, fanbox: { ...prev.fanbox, mode: nextMode as FanboxMode } };
      }
      if (prev.activePlatform === 'dlsite') {
        return { ...prev, dlsite: { ...prev.dlsite, mode: nextMode as DlsiteMode } };
      }
      if (prev.activePlatform === 'fantia') {
        return { ...prev, fantia: { ...prev.fantia, mode: nextMode as FantiaMode } };
      }
      if (prev.activePlatform === 'fansly') {
        return { ...prev, fansly: { ...prev.fansly, mode: nextMode as FanslyMode } };
      }

      return prev;
    });
  };

  return (
    <div className="w-full h-full flex flex-col bg-neutral-900 border-r border-neutral-800 text-neutral-200 select-none overflow-hidden">
      {/* Mode Switcher per Platform */}
      <div className="px-4 py-2.5 border-b border-neutral-800 bg-neutral-900/90 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center space-x-2 text-xs font-semibold text-neutral-400">
          <span>Mode:</span>
          {activeModes ? (
            <ModeSelector
              options={activeModes}
              value={currentMode}
              onChange={handleModeChange}
            />
          ) : (
            <span className="px-2.5 py-1 rounded-md bg-neutral-800 text-white font-semibold text-xs">
              {state.activePlatform === 'blacked' ? 'Scene Page' : 'Video Page'}
            </span>
          )}
        </div>
      </div>

      {/* Editor Sub-Tabs */}
      <div className="flex border-b border-neutral-800 px-4 text-xs font-semibold bg-neutral-950/40 shrink-0">
        <button
          type="button"
          onClick={() => setActiveTab('content')}
          className={`py-2.5 mr-4 border-b-2 transition-colors flex items-center space-x-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'content'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Content & Details</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('device')}
          className={`py-2.5 mr-4 border-b-2 transition-colors flex items-center space-x-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'device'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Status Bar</span>
        </button>

        {messagesTabLabel && (
          <button
            type="button"
            onClick={() => setActiveTab('messages')}
            className={`py-2.5 border-b-2 transition-colors flex items-center space-x-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'messages'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{messagesTabLabel}</span>
          </button>
        )}
      </div>

      {/* Main Scrollable Form Area */}
      <div className="flex-1 overflow-y-auto p-4 pb-20 lg:pb-6 space-y-4 custom-scrollbar text-xs">
        {activeTab === 'content' && (
          <PlatformContentEditor state={state} onChange={onChange} />
        )}

        {activeTab === 'device' && (
          <DeviceSettingsEditor
            settings={state.deviceSettings}
            onUpdate={(key, val) =>
              onChange((prev) => ({
                ...prev,
                deviceSettings: { ...prev.deviceSettings, [key]: val },
              }))
            }
          />
        )}

        {activeTab === 'messages' && messagesTabLabel && (
          <MessagesManager state={state} onChange={onChange} />
        )}
      </div>
    </div>
  );
};

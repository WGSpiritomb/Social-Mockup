import React, { useState } from 'react';
import {
  AppState,
  SocialPlatform,
  TwitterMode,
  InstagramMode,
  TikTokMode,
  FacebookMode,
  YouTubeMode,
  OnlyFansMode,
  IMessageMode,
  FaceTimeMode,
  VerifiedBadge,
} from '../types';
import { ImageUploader } from './common/ImageUploader';
import {
  Download,
  Copy,
  RotateCcw,
  Sparkles,
  Smartphone,
  Sliders,
  Image as ImageIcon,
  MessageCircle,
  Plus,
  Trash2,
  Moon,
  Sun,
  Share2,
  Check,
  Github,
  HelpCircle,
  ChevronDown,
  Clock,
  Dices,
  Wand2,
} from 'lucide-react';
import {
  getUserLocalTimeAndDate,
  generateProportionateTwitterStats,
  calculateTwitterStatsFromViews,
  generateProportionateInstagramStats,
  generateProportionateTikTokStats,
  generateProportionateYouTubeStats,
  StatTier,
} from '../utils/statRandomizer';

interface EditorPanelProps {
  state: AppState;
  onChange: (updater: (prev: AppState) => AppState) => void;
  onExportPng: () => void;
  onCopyToClipboard: () => void;
  onReset: () => void;
  onOpenGitHubModal: () => void;
  isExporting: boolean;
  copied: boolean;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({
  state,
  onChange,
  onExportPng,
  onCopyToClipboard,
  onReset,
  onOpenGitHubModal,
  isExporting,
  copied,
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'device' | 'messages'>('content');

  const updateDevice = (key: keyof AppState['deviceSettings'], val: any) => {
    onChange((prev) => ({
      ...prev,
      deviceSettings: { ...prev.deviceSettings, [key]: val },
    }));
  };

  const updatePlatformState = <K extends keyof AppState>(
    platform: K,
    key: keyof AppState[K],
    val: any
  ) => {
    onChange((prev) => ({
      ...prev,
      [platform]: {
        ...(prev[platform] as any),
        [key]: val,
      },
    }));
  };

  return (
    <div className="w-full h-full flex flex-col bg-neutral-900 border-r border-neutral-800 text-neutral-200 select-none overflow-hidden">
      {/* Mode Switcher per Platform */}
      <div className="px-4 py-2.5 border-b border-neutral-800 bg-neutral-900/90 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-1 text-xs font-semibold text-neutral-400">
          <span>Mode:</span>
          {state.activePlatform === 'twitter' && (
            <div className="flex space-x-1 bg-neutral-800 p-0.5 rounded-lg">
              {(['post', 'chat'] as TwitterMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => updatePlatformState('twitter', 'mode', m)}
                  className={`px-2.5 py-1 rounded-md capitalize transition-colors ${
                    state.twitter.mode === m
                      ? 'bg-neutral-700 text-white font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {m === 'post' ? 'Tweet Post' : 'DM Chat'}
                </button>
              ))}
            </div>
          )}

          {state.activePlatform === 'instagram' && (
            <div className="flex space-x-1 bg-neutral-800 p-0.5 rounded-lg">
              {(['post', 'chat', 'live'] as InstagramMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => updatePlatformState('instagram', 'mode', m)}
                  className={`px-2 py-1 rounded-md capitalize transition-colors ${
                    state.instagram.mode === m
                      ? 'bg-neutral-700 text-white font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {m === 'post' ? 'Feed Post' : m === 'chat' ? 'DM Chat' : 'Instagram Live'}
                </button>
              ))}
            </div>
          )}

          {state.activePlatform === 'tiktok' && (
            <div className="flex space-x-1 bg-neutral-800 p-0.5 rounded-lg">
              {(['feed', 'live'] as TikTokMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => updatePlatformState('tiktok', 'mode', m)}
                  className={`px-2.5 py-1 rounded-md capitalize transition-colors ${
                    state.tiktok.mode === m
                      ? 'bg-neutral-700 text-white font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {m === 'feed' ? 'Video Feed' : 'TikTok Live'}
                </button>
              ))}
            </div>
          )}

          {state.activePlatform === 'facebook' && (
            <div className="flex space-x-1 bg-neutral-800 p-0.5 rounded-lg">
              {(['post', 'messenger'] as FacebookMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => updatePlatformState('facebook', 'mode', m)}
                  className={`px-2.5 py-1 rounded-md capitalize transition-colors ${
                    state.facebook.mode === m
                      ? 'bg-neutral-700 text-white font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {m === 'post' ? 'Newsfeed' : 'Messenger'}
                </button>
              ))}
            </div>
          )}

          {state.activePlatform === 'youtube' && (
            <div className="flex space-x-1 bg-neutral-800 p-0.5 rounded-lg">
              {(['video', 'channel', 'live'] as YouTubeMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => updatePlatformState('youtube', 'mode', m)}
                  className={`px-2 py-1 rounded-md capitalize transition-colors ${
                    state.youtube.mode === m
                      ? 'bg-neutral-700 text-white font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {m === 'video' ? 'Video Player' : m === 'channel' ? 'Channel' : 'Live Stream'}
                </button>
              ))}
            </div>
          )}

          {state.activePlatform === 'onlyfans' && (
            <div className="flex space-x-1 bg-neutral-800 p-0.5 rounded-lg">
              {(['locked', 'post', 'chat'] as OnlyFansMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => updatePlatformState('onlyfans', 'mode', m)}
                  className={`px-2 py-1 rounded-md capitalize transition-colors ${
                    state.onlyfans.mode === m
                      ? 'bg-neutral-700 text-white font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {m === 'locked' ? 'Paywalled' : m === 'post' ? 'Feed Post' : 'DM Chat'}
                </button>
              ))}
            </div>
          )}

          {state.activePlatform === 'imessage' && (
            <div className="flex space-x-1 bg-neutral-800 p-0.5 rounded-lg">
              {(['single', 'group'] as IMessageMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => updatePlatformState('imessage', 'mode', m)}
                  className={`px-2.5 py-1 rounded-md capitalize transition-colors ${
                    state.imessage.mode === m
                      ? 'bg-neutral-700 text-white font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {m === 'single' ? 'Single Chat' : 'Group Chat'}
                </button>
              ))}
            </div>
          )}

          {state.activePlatform === 'facetime' && (
            <div className="flex space-x-1 bg-neutral-800 p-0.5 rounded-lg">
              {(['video', 'audio'] as FaceTimeMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => updatePlatformState('facetime', 'mode', m)}
                  className={`px-2.5 py-1 rounded-md capitalize transition-colors ${
                    state.facetime.mode === m
                      ? 'bg-neutral-700 text-white font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {m === 'video' ? 'Video Call' : 'Audio Call'}
                </button>
              ))}
            </div>
          )}

          {state.activePlatform === 'snapchat' && (
            <div className="flex space-x-1 bg-neutral-800 p-0.5 rounded-lg">
              {(['story', 'chat'] as ('story' | 'chat')[]).map((m) => (
                <button
                  key={m}
                  onClick={() => updatePlatformState('snapchat', 'mode', m)}
                  className={`px-2.5 py-1 rounded-md capitalize transition-colors ${
                    state.snapchat.mode === m
                      ? 'bg-neutral-700 text-white font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {m === 'story' ? 'Snap Story' : 'Snap Chat'}
                </button>
              ))}
            </div>
          )}

          {state.activePlatform === 'xvideos' && (
            <div className="flex space-x-1 bg-neutral-800 p-0.5 rounded-lg">
              <span className="px-2.5 py-1 rounded-md bg-neutral-700 text-white font-bold text-xs">
                Video Page
              </span>
            </div>
          )}
        </div>

        {/* Global Dark / Light Theme quick toggle */}
        <button
          onClick={() =>
            updateDevice('theme', state.deviceSettings.theme === 'dark' ? 'light' : 'dark')
          }
          className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 transition-colors flex items-center space-x-1 text-xs"
        >
          {state.deviceSettings.theme === 'dark' ? (
            <>
              <Moon className="w-3.5 h-3.5 text-blue-400" />
              <span>Dark</span>
            </>
          ) : (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Light</span>
            </>
          )}
        </button>
      </div>

      {/* Editor Sub-Tabs: Content / Device / Messages */}
      <div className="flex border-b border-neutral-800 px-4 text-xs font-semibold bg-neutral-950/40">
        <button
          onClick={() => setActiveTab('content')}
          className={`py-2.5 mr-4 border-b-2 transition-colors flex items-center space-x-1.5 ${
            activeTab === 'content'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Content & Details</span>
        </button>

        <button
          onClick={() => setActiveTab('device')}
          className={`py-2.5 mr-4 border-b-2 transition-colors flex items-center space-x-1.5 ${
            activeTab === 'device'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Device & Status Bar</span>
        </button>

        {/* Replies / Threads Tab */}
        {(state.activePlatform === 'twitter' ||
          state.activePlatform === 'imessage' ||
          state.activePlatform === 'instagram' ||
          state.activePlatform === 'facebook' ||
          state.activePlatform === 'snapchat' ||
          state.activePlatform === 'xvideos') && (
          <button
            onClick={() => setActiveTab('messages')}
            className={`py-2.5 border-b-2 transition-colors flex items-center space-x-1.5 ${
              activeTab === 'messages'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>
              {state.activePlatform === 'imessage'
                ? 'Chat Bubbles'
                : state.activePlatform === 'snapchat'
                ? 'Chat Messages'
                : state.activePlatform === 'twitter'
                ? 'Replies / Threads'
                : 'Comments'}
            </span>
          </button>
        )}
      </div>

      {/* Main Scrollable Form Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar text-xs">
        {/* TAB 1: DEVICE & STATUS BAR SETTINGS */}
        {activeTab === 'device' && (
          <div className="space-y-4">
            {/* Chassis Style */}
            <div className="space-y-1.5">
              <label className="font-semibold text-neutral-300">Device Mockup Frame</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'iphone16', label: 'iPhone 16 Pro' },
                  { id: 'android', label: 'Android Phone' },
                  { id: 'borderless', label: 'Borderless / Raw' },
                ].map((frame) => (
                  <button
                    key={frame.id}
                    onClick={() => updateDevice('frameStyle', frame.id)}
                    className={`py-2 px-2 rounded-lg border text-center transition-colors ${
                      state.deviceSettings.frameStyle === frame.id
                        ? 'border-blue-500 bg-blue-500/10 text-white font-bold'
                        : 'border-neutral-700 bg-neutral-800/60 text-neutral-300 hover:border-neutral-600'
                    }`}
                  >
                    {frame.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Time & Battery */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-neutral-300">Status Bar Time</label>
                  <button
                    type="button"
                    onClick={() => {
                      const { time24 } = getUserLocalTimeAndDate();
                      updateDevice('time', time24);
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
                  value={state.deviceSettings.time}
                  onChange={(e) => updateDevice('time', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white outline-hidden focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-semibold text-neutral-300">
                  <label>Battery Level</label>
                  <span>{state.deviceSettings.batteryLevel}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={state.deviceSettings.batteryLevel}
                  onChange={(e) => updateDevice('batteryLevel', Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer mt-2"
                />
              </div>
            </div>

            {/* Signal & Network */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-neutral-300">Signal Strength (1-4)</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4].map((bars) => (
                    <button
                      key={bars}
                      onClick={() => updateDevice('signalStrength', bars)}
                      className={`flex-1 py-1.5 rounded-lg border font-bold transition-colors ${
                        state.deviceSettings.signalStrength === bars
                          ? 'border-blue-500 bg-blue-500/20 text-white'
                          : 'border-neutral-700 bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      {bars}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-neutral-300">Network Type</label>
                <select
                  value={state.deviceSettings.networkType}
                  onChange={(e) => updateDevice('networkType', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white outline-hidden focus:border-blue-500"
                >
                  <option value="5G">5G</option>
                  <option value="LTE">LTE</option>
                  <option value="4G">4G</option>
                  <option value="WiFi">WiFi Only</option>
                </select>
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-2 pt-2 border-t border-neutral-800">
              <label className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-neutral-800/40">
                <span className="text-neutral-300">Show Status Bar</span>
                <input
                  type="checkbox"
                  checked={state.deviceSettings.showStatusBar}
                  onChange={(e) => updateDevice('showStatusBar', e.target.checked)}
                  className="w-4 h-4 accent-blue-500"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-neutral-800/40">
                <span className="text-neutral-300">Show Dynamic Island Cutout</span>
                <input
                  type="checkbox"
                  checked={state.deviceSettings.showDynamicIsland}
                  onChange={(e) => updateDevice('showDynamicIsland', e.target.checked)}
                  className="w-4 h-4 accent-blue-500"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-neutral-800/40">
                <span className="text-neutral-300">Show Bottom Home Indicator Bar</span>
                <input
                  type="checkbox"
                  checked={state.deviceSettings.showHomeIndicator}
                  onChange={(e) => updateDevice('showHomeIndicator', e.target.checked)}
                  className="w-4 h-4 accent-blue-500"
                />
              </label>
            </div>
          </div>
        )}

        {/* TAB 2: CONTENT & DETAILS (CONTEXTUAL PER PLATFORM) */}
        {activeTab === 'content' && (
          <div className="space-y-4">
            {/* 1. X / TWITTER */}
            {state.activePlatform === 'twitter' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-neutral-300">Display Name</label>
                    <input
                      type="text"
                      value={state.twitter.displayName}
                      onChange={(e) => updatePlatformState('twitter', 'displayName', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-neutral-300">Handle (@)</label>
                    <input
                      type="text"
                      value={state.twitter.handle}
                      onChange={(e) => updatePlatformState('twitter', 'handle', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-neutral-300">Verified Badge</label>
                    <select
                      value={state.twitter.verifiedBadge}
                      onChange={(e) => updatePlatformState('twitter', 'verifiedBadge', e.target.value as VerifiedBadge)}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                    >
                      <option value="none">None</option>
                      <option value="blue">Blue Verified</option>
                      <option value="gold">Gold (Business / Official)</option>
                      <option value="gray">Gray (Government)</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-neutral-300">Client Device Badge</label>
                    <input
                      type="text"
                      value={state.twitter.client}
                      onChange={(e) => updatePlatformState('twitter', 'client', e.target.value)}
                      placeholder="Twitter for iPhone"
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                    />
                  </div>
                </div>

                <ImageUploader
                  label="Profile Avatar"
                  value={state.twitter.avatarUrl}
                  onChange={(val) => updatePlatformState('twitter', 'avatarUrl', val)}
                  aspectRatio="square"
                />

                {state.twitter.mode === 'post' && (
                  <>
                    <div>
                      <label className="font-semibold text-neutral-300">Tweet Text</label>
                      <textarea
                        rows={3}
                        value={state.twitter.tweetText}
                        onChange={(e) => updatePlatformState('twitter', 'tweetText', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="font-semibold text-neutral-300">Include Media Image</label>
                        <input
                          type="checkbox"
                          checked={state.twitter.hasMedia}
                          onChange={(e) => updatePlatformState('twitter', 'hasMedia', e.target.checked)}
                          className="w-4 h-4 accent-blue-500"
                        />
                      </div>
                      {state.twitter.hasMedia && (
                        <ImageUploader
                          label="Tweet Media Attachment"
                          value={state.twitter.mediaUrl}
                          onChange={(val) => updatePlatformState('twitter', 'mediaUrl', val)}
                          aspectRatio="video"
                        />
                      )}
                    </div>

                    {/* Timestamps & Metrics */}
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between">
                        <label className="font-semibold text-neutral-300 text-xs">Timestamp & Date</label>
                        <button
                          type="button"
                          onClick={() => {
                            const { time12, time24, dateFormatted } = getUserLocalTimeAndDate();
                            onChange((prev) => ({
                              ...prev,
                              twitter: {
                                ...prev.twitter,
                                timestamp: time12,
                                date: dateFormatted,
                              },
                              deviceSettings: {
                                ...prev.deviceSettings,
                                time: time24,
                              },
                            }));
                          }}
                          className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-blue-500/15 hover:bg-blue-500/25 text-blue-400 border border-blue-500/30 flex items-center space-x-1.5 transition-colors cursor-pointer"
                          title="Fetch and set your current local device time & date"
                        >
                          <Clock className="w-3.5 h-3.5 text-blue-400" />
                          <span>Use Current Time & Date</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[11px] text-neutral-400">Time</label>
                          <input
                            type="text"
                            value={state.twitter.timestamp}
                            onChange={(e) => updatePlatformState('twitter', 'timestamp', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-0.5 outline-hidden text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-neutral-400">Date</label>
                          <input
                            type="text"
                            value={state.twitter.date}
                            onChange={(e) => updatePlatformState('twitter', 'date', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-0.5 outline-hidden text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Proportionate Stats Randomizer */}
                    <div className="space-y-2 pt-2 border-t border-neutral-800/80">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5">
                          <label className="font-semibold text-neutral-300 text-xs">Engagement Stats</label>
                          <span className="text-[10px] text-neutral-400 bg-neutral-800/90 px-1.5 py-0.5 rounded border border-neutral-700/60 font-medium">
                            Proportionate
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const stats = generateProportionateTwitterStats();
                            onChange((prev) => ({
                              ...prev,
                              twitter: {
                                ...prev.twitter,
                                ...stats,
                              },
                            }));
                          }}
                          className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center space-x-1.5 shadow-xs transition-all cursor-pointer"
                          title="Generate realistic mathematically proportionate engagement stats"
                        >
                          <Dices className="w-3.5 h-3.5" />
                          <span>Randomize Stats</span>
                        </button>
                      </div>

                      {/* Tier Presets */}
                      <div className="grid grid-cols-4 gap-1">
                        {(
                          [
                            { id: 'micro', label: 'Micro', icon: '🌱', tip: '1.5K - 9K views' },
                            { id: 'trending', label: 'Trending', icon: '🔥', tip: '60K - 550K views' },
                            { id: 'viral', label: 'Viral', icon: '🚀', tip: '1.2M - 9.5M views' },
                            { id: 'mega', label: 'Mega', icon: '👑', tip: '12M - 85M views' },
                          ] as const
                        ).map((tier) => (
                          <button
                            key={tier.id}
                            type="button"
                            onClick={() => {
                              const stats = generateProportionateTwitterStats(tier.id);
                              onChange((prev) => ({
                                ...prev,
                                twitter: {
                                  ...prev.twitter,
                                  ...stats,
                                },
                              }));
                            }}
                            className="py-1 px-1 rounded-md bg-neutral-800/70 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700/60 transition-colors flex items-center justify-center space-x-1 text-[11px] cursor-pointer"
                            title={`Load realistic ${tier.label} tier (${tier.tip})`}
                          >
                            <span>{tier.icon}</span>
                            <span>{tier.label}</span>
                          </button>
                        ))}
                      </div>

                      {/* Stat inputs */}
                      <div className="grid grid-cols-4 gap-1.5">
                        <div>
                          <label className="text-[10px] text-neutral-400">Reposts</label>
                          <input
                            type="number"
                            value={state.twitter.retweets}
                            onChange={(e) => updatePlatformState('twitter', 'retweets', Number(e.target.value))}
                            className="w-full px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-white mt-0.5 text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-neutral-400">Quotes</label>
                          <input
                            type="number"
                            value={state.twitter.quotes}
                            onChange={(e) => updatePlatformState('twitter', 'quotes', Number(e.target.value))}
                            className="w-full px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-white mt-0.5 text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-neutral-400">Likes</label>
                          <input
                            type="number"
                            value={state.twitter.likes}
                            onChange={(e) => updatePlatformState('twitter', 'likes', Number(e.target.value))}
                            className="w-full px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-white mt-0.5 text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-neutral-400">Views</label>
                          <input
                            type="number"
                            value={state.twitter.views}
                            onChange={(e) => updatePlatformState('twitter', 'views', Number(e.target.value))}
                            className="w-full px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-white mt-0.5 text-xs font-mono"
                          />
                        </div>
                      </div>

                      {/* Balance from Views button */}
                      <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-0.5 px-0.5">
                        <span className="text-[11px] text-neutral-500">Custom view count?</span>
                        <button
                          type="button"
                          onClick={() => {
                            const balanced = calculateTwitterStatsFromViews(state.twitter.views);
                            onChange((prev) => ({
                              ...prev,
                              twitter: {
                                ...prev.twitter,
                                retweets: balanced.retweets,
                                quotes: balanced.quotes,
                                likes: balanced.likes,
                                bookmarks: balanced.bookmarks,
                                repliesCount: balanced.repliesCount,
                              },
                            }));
                          }}
                          className="text-blue-400 hover:text-blue-300 font-medium hover:underline flex items-center space-x-1 cursor-pointer"
                          title="Proportionately calculate Reposts, Quotes, and Likes to match current Views"
                        >
                          <Wand2 className="w-3 h-3 text-blue-400" />
                          <span>Balance from Views</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* 2. INSTAGRAM */}
            {state.activePlatform === 'instagram' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-neutral-300">Username</label>
                    <input
                      type="text"
                      value={state.instagram.username}
                      onChange={(e) => updatePlatformState('instagram', 'username', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-neutral-300">Full Name</label>
                    <input
                      type="text"
                      value={state.instagram.fullName}
                      onChange={(e) => updatePlatformState('instagram', 'fullName', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={state.instagram.isVerified}
                      onChange={(e) => updatePlatformState('instagram', 'isVerified', e.target.checked)}
                      className="w-4 h-4 accent-blue-500"
                    />
                    <span className="text-neutral-300">Verified Check</span>
                  </label>

                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={state.instagram.hasStoryRing}
                      onChange={(e) => updatePlatformState('instagram', 'hasStoryRing', e.target.checked)}
                      className="w-4 h-4 accent-pink-500"
                    />
                    <span className="text-neutral-300">Story Gradient Ring</span>
                  </label>
                </div>

                <ImageUploader
                  label="Profile Avatar"
                  value={state.instagram.avatarUrl}
                  onChange={(val) => updatePlatformState('instagram', 'avatarUrl', val)}
                  aspectRatio="square"
                />

                {state.instagram.mode === 'post' && (
                  <>
                    <ImageUploader
                      label="Post Main Photo / Carousel"
                      value={state.instagram.postMediaUrl}
                      onChange={(val) => updatePlatformState('instagram', 'postMediaUrl', val)}
                      aspectRatio="square"
                    />

                    <div>
                      <label className="font-semibold text-neutral-300">Location Tag</label>
                      <input
                        type="text"
                        value={state.instagram.location}
                        onChange={(e) => updatePlatformState('instagram', 'location', e.target.value)}
                        placeholder="e.g. Positano, Italy"
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-neutral-300">Caption</label>
                      <textarea
                        rows={3}
                        value={state.instagram.caption}
                        onChange={(e) => updatePlatformState('instagram', 'caption', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="font-semibold text-neutral-300">Likes Count</label>
                          <button
                            type="button"
                            onClick={() => {
                              const stats = generateProportionateInstagramStats();
                              updatePlatformState('instagram', 'likesCount', stats.likes);
                            }}
                            className="text-[11px] text-purple-400 hover:text-purple-300 flex items-center space-x-1 font-medium hover:underline cursor-pointer"
                            title="Randomize proportionate likes"
                          >
                            <Dices className="w-3 h-3" />
                            <span>Randomize</span>
                          </button>
                        </div>
                        <input
                          type="number"
                          value={state.instagram.likesCount}
                          onChange={(e) => updatePlatformState('instagram', 'likesCount', Number(e.target.value))}
                          className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-neutral-300">"Liked By" Friend</label>
                        <input
                          type="text"
                          value={state.instagram.likedByUsername}
                          onChange={(e) => updatePlatformState('instagram', 'likedByUsername', e.target.value)}
                          placeholder="marco_italy"
                          className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                        />
                      </div>
                    </div>
                  </>
                )}

                {state.instagram.mode === 'live' && (
                  <div className="space-y-3 p-3 rounded-xl bg-neutral-950/60 border border-neutral-800">
                    <h4 className="font-bold text-rose-400">Instagram Live Controls</h4>
                    <ImageUploader
                      label="Live Video Stream Feed Image"
                      value={state.instagram.postMediaUrl}
                      onChange={(val) => updatePlatformState('instagram', 'postMediaUrl', val)}
                      aspectRatio="portrait"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-neutral-400">Live Viewers Count</label>
                        <input
                          type="text"
                          value={state.instagram.liveViewers}
                          onChange={(e) => updatePlatformState('instagram', 'liveViewers', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1"
                        />
                      </div>
                      <div className="flex items-center pt-5">
                        <label className="flex items-center space-x-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={state.instagram.liveHeartsEnabled}
                            onChange={(e) => updatePlatformState('instagram', 'liveHeartsEnabled', e.target.checked)}
                            className="w-4 h-4 accent-rose-500"
                          />
                          <span className="text-neutral-300">Floating Hearts</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. TIKTOK */}
            {state.activePlatform === 'tiktok' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-neutral-300">Username</label>
                    <input
                      type="text"
                      value={state.tiktok.username}
                      onChange={(e) => updatePlatformState('tiktok', 'username', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-neutral-300">Handle (@)</label>
                    <input
                      type="text"
                      value={state.tiktok.handle}
                      onChange={(e) => updatePlatformState('tiktok', 'handle', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={state.tiktok.isVerified}
                      onChange={(e) => updatePlatformState('tiktok', 'isVerified', e.target.checked)}
                      className="w-4 h-4 accent-cyan-400"
                    />
                    <span className="text-neutral-300">Verified Checkmark</span>
                  </label>
                </div>

                <ImageUploader
                  label="Profile Avatar"
                  value={state.tiktok.avatarUrl}
                  onChange={(val) => updatePlatformState('tiktok', 'avatarUrl', val)}
                  aspectRatio="square"
                />

                <ImageUploader
                  label="Video Background Feed"
                  value={state.tiktok.backgroundMediaUrl}
                  onChange={(val) => updatePlatformState('tiktok', 'backgroundMediaUrl', val)}
                  aspectRatio="portrait"
                />

                {state.tiktok.mode === 'feed' && (
                  <>
                    <div>
                      <label className="font-semibold text-neutral-300">Caption & Hashtags</label>
                      <textarea
                        rows={2}
                        value={state.tiktok.caption}
                        onChange={(e) => updatePlatformState('tiktok', 'caption', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-neutral-300">Sound Track Title</label>
                      <input
                        type="text"
                        value={state.tiktok.soundTitle}
                        onChange={(e) => updatePlatformState('tiktok', 'soundTitle', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                      />
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between">
                        <label className="font-semibold text-neutral-300 text-xs">Engagement Stats</label>
                        <button
                          type="button"
                          onClick={() => {
                            const stats = generateProportionateTikTokStats();
                            onChange((prev) => ({
                              ...prev,
                              tiktok: {
                                ...prev.tiktok,
                                likes: stats.likes,
                                commentsCount: stats.commentsCount,
                                bookmarks: stats.bookmarks,
                                shares: stats.shares,
                              },
                            }));
                          }}
                          className="px-2 py-0.5 rounded text-[11px] font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center space-x-1 cursor-pointer"
                          title="Generate proportionate random TikTok metrics"
                        >
                          <Dices className="w-3 h-3" />
                          <span>Randomize Stats</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-4 gap-1.5">
                        <div>
                          <label className="text-[10px] text-neutral-400">Likes</label>
                          <input
                            type="number"
                            value={state.tiktok.likes}
                            onChange={(e) => updatePlatformState('tiktok', 'likes', Number(e.target.value))}
                            className="w-full px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-white mt-0.5"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-neutral-400">Comments</label>
                          <input
                            type="number"
                            value={state.tiktok.commentsCount}
                            onChange={(e) => updatePlatformState('tiktok', 'commentsCount', Number(e.target.value))}
                            className="w-full px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-white mt-0.5"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-neutral-400">Bookmarks</label>
                          <input
                            type="number"
                            value={state.tiktok.bookmarks}
                            onChange={(e) => updatePlatformState('tiktok', 'bookmarks', Number(e.target.value))}
                            className="w-full px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-white mt-0.5"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-neutral-400">Shares</label>
                          <input
                            type="number"
                            value={state.tiktok.shares}
                            onChange={(e) => updatePlatformState('tiktok', 'shares', Number(e.target.value))}
                            className="w-full px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-white mt-0.5"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {state.tiktok.mode === 'live' && (
                  <div className="space-y-3 p-3 rounded-xl bg-neutral-950/60 border border-neutral-800">
                    <h4 className="font-bold text-[#fe2c55]">TikTok Live Settings</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-neutral-400">Live Viewers</label>
                        <input
                          type="text"
                          value={state.tiktok.liveViewers}
                          onChange={(e) => updatePlatformState('tiktok', 'liveViewers', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-400">Coin Count</label>
                        <input
                          type="number"
                          value={state.tiktok.liveCoins}
                          onChange={(e) => updatePlatformState('tiktok', 'liveCoins', Number(e.target.value))}
                          className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-neutral-400">Floating Gift Animation</label>
                      <select
                        value={state.tiktok.liveGift}
                        onChange={(e) => updatePlatformState('tiktok', 'liveGift', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1"
                      >
                        <option value="none">None</option>
                        <option value="dragon">🐉 TikTok Dragon</option>
                        <option value="rose">🌹 10x Roses</option>
                        <option value="galaxy">🌌 Galaxy</option>
                        <option value="heart">💖 Heart</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 4. FACEBOOK */}
            {state.activePlatform === 'facebook' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-neutral-300">User Name</label>
                    <input
                      type="text"
                      value={state.facebook.userName}
                      onChange={(e) => updatePlatformState('facebook', 'userName', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-neutral-300">Audience Privacy</label>
                    <select
                      value={state.facebook.privacy}
                      onChange={(e) => updatePlatformState('facebook', 'privacy', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                    >
                      <option value="public">Public (🌐)</option>
                      <option value="friends">Friends (👥)</option>
                      <option value="onlyme">Only Me (🔒)</option>
                    </select>
                  </div>
                </div>

                <ImageUploader
                  label="Profile Picture"
                  value={state.facebook.userAvatar}
                  onChange={(val) => updatePlatformState('facebook', 'userAvatar', val)}
                  aspectRatio="square"
                />

                {state.facebook.mode === 'post' && (
                  <>
                    <div>
                      <label className="font-semibold text-neutral-300">Post Text</label>
                      <textarea
                        rows={3}
                        value={state.facebook.postText}
                        onChange={(e) => updatePlatformState('facebook', 'postText', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="font-semibold text-neutral-300">Media Attachment</label>
                        <input
                          type="checkbox"
                          checked={state.facebook.hasMedia}
                          onChange={(e) => updatePlatformState('facebook', 'hasMedia', e.target.checked)}
                          className="w-4 h-4 accent-blue-500"
                        />
                      </div>
                      {state.facebook.hasMedia && (
                        <ImageUploader
                          label="Post Attachment Photo"
                          value={state.facebook.mediaUrl}
                          onChange={(val) => updatePlatformState('facebook', 'mediaUrl', val)}
                          aspectRatio="video"
                        />
                      )}
                    </div>

                    {/* Reactions */}
                    <div className="space-y-1">
                      <label className="font-semibold text-neutral-300">Reactions Breakdown</label>
                      <div className="grid grid-cols-4 gap-1.5">
                        <div>
                          <label className="text-[10px] text-neutral-400">👍 Like</label>
                          <input
                            type="number"
                            value={state.facebook.reactions.like}
                            onChange={(e) =>
                              onChange((prev) => ({
                                ...prev,
                                facebook: {
                                  ...prev.facebook,
                                  reactions: { ...prev.facebook.reactions, like: Number(e.target.value) },
                                },
                              }))
                            }
                            className="w-full px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-white mt-0.5"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-neutral-400">❤️ Love</label>
                          <input
                            type="number"
                            value={state.facebook.reactions.love}
                            onChange={(e) =>
                              onChange((prev) => ({
                                ...prev,
                                facebook: {
                                  ...prev.facebook,
                                  reactions: { ...prev.facebook.reactions, love: Number(e.target.value) },
                                },
                              }))
                            }
                            className="w-full px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-white mt-0.5"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-neutral-400">🥰 Care</label>
                          <input
                            type="number"
                            value={state.facebook.reactions.care}
                            onChange={(e) =>
                              onChange((prev) => ({
                                ...prev,
                                facebook: {
                                  ...prev.facebook,
                                  reactions: { ...prev.facebook.reactions, care: Number(e.target.value) },
                                },
                              }))
                            }
                            className="w-full px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-white mt-0.5"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-neutral-400">😮 Wow</label>
                          <input
                            type="number"
                            value={state.facebook.reactions.wow}
                            onChange={(e) =>
                              onChange((prev) => ({
                                ...prev,
                                facebook: {
                                  ...prev.facebook,
                                  reactions: { ...prev.facebook.reactions, wow: Number(e.target.value) },
                                },
                              }))
                            }
                            className="w-full px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-white mt-0.5"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* 5. YOUTUBE */}
            {state.activePlatform === 'youtube' && (
              <div className="space-y-3">
                <div>
                  <label className="font-semibold text-neutral-300">Video Title</label>
                  <input
                    type="text"
                    value={state.youtube.title}
                    onChange={(e) => updatePlatformState('youtube', 'title', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-neutral-300">Channel Name</label>
                    <input
                      type="text"
                      value={state.youtube.channelName}
                      onChange={(e) => updatePlatformState('youtube', 'channelName', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-neutral-300">Subscribers</label>
                    <input
                      type="text"
                      value={state.youtube.subscribersCount}
                      onChange={(e) => updatePlatformState('youtube', 'subscribersCount', e.target.value)}
                      placeholder="2.48M"
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={state.youtube.isVerified}
                      onChange={(e) => updatePlatformState('youtube', 'isVerified', e.target.checked)}
                      className="w-4 h-4 accent-red-600"
                    />
                    <span className="text-neutral-300">Verified Channel</span>
                  </label>
                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={state.youtube.isSubscribed}
                      onChange={(e) => updatePlatformState('youtube', 'isSubscribed', e.target.checked)}
                      className="w-4 h-4 accent-red-600"
                    />
                    <span className="text-neutral-300">Subscribed Status</span>
                  </label>
                </div>

                <ImageUploader
                  label="Channel Avatar"
                  value={state.youtube.channelAvatar}
                  onChange={(val) => updatePlatformState('youtube', 'channelAvatar', val)}
                  aspectRatio="square"
                />

                <ImageUploader
                  label="Video Thumbnail Image"
                  value={state.youtube.thumbnailUrl}
                  onChange={(val) => updatePlatformState('youtube', 'thumbnailUrl', val)}
                  aspectRatio="video"
                />

                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="font-semibold text-neutral-300 text-xs">Video Metrics</label>
                    <button
                      type="button"
                      onClick={() => {
                        const stats = generateProportionateYouTubeStats();
                        onChange((prev) => ({
                          ...prev,
                          youtube: {
                            ...prev.youtube,
                            viewsCount: stats.viewsCount,
                            likesCount: stats.likesCount,
                            subscribersCount: stats.subscribersCount,
                          },
                        }));
                      }}
                      className="px-2 py-0.5 rounded text-[11px] font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center space-x-1 cursor-pointer"
                      title="Generate proportionate random YouTube metrics"
                    >
                      <Dices className="w-3 h-3" />
                      <span>Randomize Stats</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[10px] text-neutral-400">Views</label>
                      <input
                        type="text"
                        value={state.youtube.viewsCount}
                        onChange={(e) => updatePlatformState('youtube', 'viewsCount', e.target.value)}
                        className="w-full px-2 py-1.5 rounded bg-neutral-800 border border-neutral-700 text-white mt-0.5 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-neutral-400">Likes</label>
                      <input
                        type="text"
                        value={state.youtube.likesCount}
                        onChange={(e) => updatePlatformState('youtube', 'likesCount', e.target.value)}
                        className="w-full px-2 py-1.5 rounded bg-neutral-800 border border-neutral-700 text-white mt-0.5 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-neutral-400">Duration</label>
                      <input
                        type="text"
                        value={state.youtube.duration}
                        onChange={(e) => updatePlatformState('youtube', 'duration', e.target.value)}
                        className="w-full px-2 py-1.5 rounded bg-neutral-800 border border-neutral-700 text-white mt-0.5 text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-neutral-300 font-semibold">
                    <label>Seekbar Progress</label>
                    <span>{state.youtube.progressPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={state.youtube.progressPercent}
                    onChange={(e) => updatePlatformState('youtube', 'progressPercent', Number(e.target.value))}
                    className="w-full accent-red-600 mt-1 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* 6. ONLYFANS */}
            {state.activePlatform === 'onlyfans' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-neutral-300">Creator Name</label>
                    <input
                      type="text"
                      value={state.onlyfans.creatorName}
                      onChange={(e) => updatePlatformState('onlyfans', 'creatorName', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-neutral-300">Username</label>
                    <input
                      type="text"
                      value={state.onlyfans.username}
                      onChange={(e) => updatePlatformState('onlyfans', 'username', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                    />
                  </div>
                </div>

                <ImageUploader
                  label="Creator Profile Avatar"
                  value={state.onlyfans.avatarUrl}
                  onChange={(val) => updatePlatformState('onlyfans', 'avatarUrl', val)}
                  aspectRatio="square"
                />

                <ImageUploader
                  label="Post Media Photo"
                  value={state.onlyfans.mediaUrl}
                  onChange={(val) => updatePlatformState('onlyfans', 'mediaUrl', val)}
                  aspectRatio="square"
                />

                <div>
                  <label className="font-semibold text-neutral-300">Post Text</label>
                  <textarea
                    rows={2}
                    value={state.onlyfans.postText}
                    onChange={(e) => updatePlatformState('onlyfans', 'postText', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                  />
                </div>

                <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-[#00aff0]">Paywall Lock Overlay</label>
                    <input
                      type="checkbox"
                      checked={state.onlyfans.isLocked}
                      onChange={(e) => updatePlatformState('onlyfans', 'isLocked', e.target.checked)}
                      className="w-4 h-4 accent-[#00aff0]"
                    />
                  </div>
                  {state.onlyfans.isLocked && (
                    <div>
                      <label className="text-neutral-400">Unlock Price ($)</label>
                      <input
                        type="number"
                        step="0.5"
                        value={state.onlyfans.unlockPrice}
                        onChange={(e) => updatePlatformState('onlyfans', 'unlockPrice', Number(e.target.value))}
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1"
                      />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-neutral-400">Suggested Tip Amount ($)</label>
                    <input
                      type="number"
                      value={state.onlyfans.tipAmount}
                      onChange={(e) => updatePlatformState('onlyfans', 'tipAmount', Number(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400">Likes</label>
                    <input
                      type="number"
                      value={state.onlyfans.likes}
                      onChange={(e) => updatePlatformState('onlyfans', 'likes', Number(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 7. IMESSAGE */}
            {state.activePlatform === 'imessage' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-neutral-300">Contact Name</label>
                    <input
                      type="text"
                      value={state.imessage.contactName}
                      onChange={(e) => updatePlatformState('imessage', 'contactName', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-neutral-300">Bubble Type</label>
                    <select
                      value={state.imessage.messageType}
                      onChange={(e) => updatePlatformState('imessage', 'messageType', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                    >
                      <option value="imessage">iMessage (Blue Bubbles)</option>
                      <option value="sms">SMS Text (Green Bubbles)</option>
                    </select>
                  </div>
                </div>

                <ImageUploader
                  label="Contact Avatar"
                  value={state.imessage.contactAvatar}
                  onChange={(val) => updatePlatformState('imessage', 'contactAvatar', val)}
                  aspectRatio="square"
                />

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-neutral-300">Read Receipt Text</label>
                    <input
                      type="text"
                      value={state.imessage.receiptText}
                      onChange={(e) => updatePlatformState('imessage', 'receiptText', e.target.value)}
                      placeholder="Read 9:42 AM"
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                    />
                  </div>
                  <div className="flex items-center pt-5">
                    <label className="flex items-center space-x-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={state.imessage.showTypingIndicator}
                        onChange={(e) => updatePlatformState('imessage', 'showTypingIndicator', e.target.checked)}
                        className="w-4 h-4 accent-blue-500"
                      />
                      <span className="text-neutral-300">Animated Typing Dots</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* 8. FACETIME */}
            {state.activePlatform === 'facetime' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-neutral-300">Contact Name</label>
                    <input
                      type="text"
                      value={state.facetime.contactName}
                      onChange={(e) => updatePlatformState('facetime', 'contactName', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-neutral-300">Call Timer</label>
                    <input
                      type="text"
                      value={state.facetime.duration}
                      onChange={(e) => updatePlatformState('facetime', 'duration', e.target.value)}
                      placeholder="14:28"
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                    />
                  </div>
                </div>

                <ImageUploader
                  label="Contact Avatar (Audio Call)"
                  value={state.facetime.contactAvatar}
                  onChange={(val) => updatePlatformState('facetime', 'contactAvatar', val)}
                  aspectRatio="square"
                />

                {state.facetime.mode === 'video' && (
                  <>
                    <ImageUploader
                      label="Main Video Feed (Caller)"
                      value={state.facetime.backgroundMediaUrl}
                      onChange={(val) => updatePlatformState('facetime', 'backgroundMediaUrl', val)}
                      aspectRatio="portrait"
                    />
                    <ImageUploader
                      label="PiP Local Selfie Camera Inset"
                      value={state.facetime.selfieMediaUrl}
                      onChange={(val) => updatePlatformState('facetime', 'selfieMediaUrl', val)}
                      aspectRatio="portrait"
                    />
                  </>
                )}

                <div className="flex items-center space-x-3 pt-2">
                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={state.facetime.isMuted}
                      onChange={(e) => updatePlatformState('facetime', 'isMuted', e.target.checked)}
                      className="w-4 h-4 accent-red-500"
                    />
                    <span className="text-neutral-300">Microphone Muted</span>
                  </label>
                </div>
              </div>
            )}

            {/* 9. SNAPCHAT */}
            {state.activePlatform === 'snapchat' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-neutral-300">Display Name</label>
                    <input
                      type="text"
                      value={state.snapchat.displayName}
                      onChange={(e) => updatePlatformState('snapchat', 'displayName', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-neutral-300">Username</label>
                    <input
                      type="text"
                      value={state.snapchat.username}
                      onChange={(e) => updatePlatformState('snapchat', 'username', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-neutral-300">Snap Streak (🔥)</label>
                    <input
                      type="number"
                      value={state.snapchat.chatStreak}
                      onChange={(e) => updatePlatformState('snapchat', 'chatStreak', Number(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-neutral-300">Time Elapsed</label>
                    <input
                      type="text"
                      value={state.snapchat.timeElapsed}
                      onChange={(e) => updatePlatformState('snapchat', 'timeElapsed', e.target.value)}
                      placeholder="2h ago"
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                    />
                  </div>
                </div>

                <ImageUploader
                  label="Bitmoji / Avatar"
                  value={state.snapchat.avatarUrl}
                  onChange={(val) => updatePlatformState('snapchat', 'avatarUrl', val)}
                  aspectRatio="square"
                />

                {state.snapchat.mode === 'story' && (
                  <>
                    <ImageUploader
                      label="Snap Photo / Story Background"
                      value={state.snapchat.mediaUrl}
                      onChange={(val) => updatePlatformState('snapchat', 'mediaUrl', val)}
                      aspectRatio="portrait"
                    />

                    <div>
                      <label className="font-semibold text-neutral-300">Overlay Caption Text</label>
                      <input
                        type="text"
                        value={state.snapchat.bannerText}
                        onChange={(e) => updatePlatformState('snapchat', 'bannerText', e.target.value)}
                        placeholder="Snapchat text overlay..."
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="font-semibold text-neutral-300">Overlay Style</label>
                        <select
                          value={state.snapchat.bannerStyle}
                          onChange={(e) => updatePlatformState('snapchat', 'bannerStyle', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                        >
                          <option value="classic">Classic Dark Bar</option>
                          <option value="large">Big Bold Headline</option>
                        </select>
                      </div>
                      <div>
                        <label className="font-semibold text-neutral-300">Timer Indicator</label>
                        <input
                          type="text"
                          value={state.snapchat.timerDuration}
                          onChange={(e) => updatePlatformState('snapchat', 'timerDuration', e.target.value)}
                          placeholder="5s or ∞"
                          className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* 10. XVIDEOS */}
            {state.activePlatform === 'xvideos' && (
              <div className="space-y-3">
                <div>
                  <label className="font-semibold text-neutral-300">Video Title</label>
                  <input
                    type="text"
                    value={state.xvideos.videoTitle}
                    onChange={(e) => updatePlatformState('xvideos', 'videoTitle', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-neutral-300">Uploader Name</label>
                    <input
                      type="text"
                      value={state.xvideos.uploaderName}
                      onChange={(e) => updatePlatformState('xvideos', 'uploaderName', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-neutral-300">Subscribers</label>
                    <input
                      type="text"
                      value={state.xvideos.subscribersCount}
                      onChange={(e) => updatePlatformState('xvideos', 'subscribersCount', e.target.value)}
                      placeholder="580K"
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={state.xvideos.isVerified}
                      onChange={(e) => updatePlatformState('xvideos', 'isVerified', e.target.checked)}
                      className="w-4 h-4 accent-[#d92323]"
                    />
                    <span className="text-neutral-300">Verified Model Badge</span>
                  </label>
                </div>

                <ImageUploader
                  label="Uploader Profile Avatar"
                  value={state.xvideos.uploaderAvatar}
                  onChange={(val) => updatePlatformState('xvideos', 'uploaderAvatar', val)}
                  aspectRatio="square"
                />

                <ImageUploader
                  label="Video Thumbnail Image"
                  value={state.xvideos.thumbnailUrl}
                  onChange={(val) => updatePlatformState('xvideos', 'thumbnailUrl', val)}
                  aspectRatio="video"
                />

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="font-semibold text-neutral-300">Views</label>
                    <input
                      type="text"
                      value={state.xvideos.viewsCount}
                      onChange={(e) => updatePlatformState('xvideos', 'viewsCount', e.target.value)}
                      className="w-full px-2 py-1.5 rounded bg-neutral-800 border border-neutral-700 text-white mt-1"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-neutral-300">Rating %</label>
                    <input
                      type="number"
                      value={state.xvideos.ratingPercent}
                      onChange={(e) => updatePlatformState('xvideos', 'ratingPercent', Number(e.target.value))}
                      className="w-full px-2 py-1.5 rounded bg-neutral-800 border border-neutral-700 text-white mt-1"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-neutral-300">Duration</label>
                    <input
                      type="text"
                      value={state.xvideos.duration}
                      onChange={(e) => updatePlatformState('xvideos', 'duration', e.target.value)}
                      className="w-full px-2 py-1.5 rounded bg-neutral-800 border border-neutral-700 text-white mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-neutral-300">Likes</label>
                    <input
                      type="text"
                      value={state.xvideos.likesCount}
                      onChange={(e) => updatePlatformState('xvideos', 'likesCount', e.target.value)}
                      className="w-full px-2 py-1.5 rounded bg-neutral-800 border border-neutral-700 text-white mt-1"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-neutral-300">Dislikes</label>
                    <input
                      type="text"
                      value={state.xvideos.dislikesCount}
                      onChange={(e) => updatePlatformState('xvideos', 'dislikesCount', e.target.value)}
                      className="w-full px-2 py-1.5 rounded bg-neutral-800 border border-neutral-700 text-white mt-1"
                    />
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-neutral-300 font-semibold">
                    <label>Seekbar Progress</label>
                    <span>{state.xvideos.progressPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={state.xvideos.progressPercent}
                    onChange={(e) => updatePlatformState('xvideos', 'progressPercent', Number(e.target.value))}
                    className="w-full accent-[#d92323] mt-1 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="font-semibold text-neutral-300">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={state.xvideos.tags.join(', ')}
                    onChange={(e) =>
                      updatePlatformState(
                        'xvideos',
                        'tags',
                        e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                      )
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white mt-1 outline-hidden"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: DYNAMIC MESSAGES / REPLIES / THREADS MANAGER */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            {/* Twitter Replies */}
            {state.activePlatform === 'twitter' && state.twitter.mode === 'post' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-neutral-200">Tweet Reply Threads</h4>
                  <button
                    onClick={() => {
                      const newReply = {
                        id: `reply-${Date.now()}`,
                        displayName: 'Tech Fan',
                        handle: 'techfan',
                        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200',
                        verifiedBadge: 'none' as VerifiedBadge,
                        text: 'Incredible development! Really excited to see what happens next.',
                        timestamp: '11:00 AM',
                        likes: 420,
                      };
                      onChange((prev) => ({
                        ...prev,
                        twitter: {
                          ...prev.twitter,
                          replies: [...prev.twitter.replies, newReply],
                        },
                      }));
                    }}
                    className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[11px]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Reply</span>
                  </button>
                </div>

                {state.twitter.replies.map((reply, idx) => (
                  <div key={reply.id} className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-400 text-[11px]">Reply #{idx + 1}</span>
                      <button
                        onClick={() => {
                          onChange((prev) => ({
                            ...prev,
                            twitter: {
                              ...prev.twitter,
                              replies: prev.twitter.replies.filter((r) => r.id !== reply.id),
                            },
                          }));
                        }}
                        className="text-neutral-500 hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={reply.displayName}
                        onChange={(e) => {
                          const val = e.target.value;
                          onChange((prev) => ({
                            ...prev,
                            twitter: {
                              ...prev.twitter,
                              replies: prev.twitter.replies.map((r) =>
                                r.id === reply.id ? { ...r, displayName: val } : r
                              ),
                            },
                          }));
                        }}
                        placeholder="Display Name"
                        className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-white"
                      />
                      <input
                        type="text"
                        value={reply.handle}
                        onChange={(e) => {
                          const val = e.target.value;
                          onChange((prev) => ({
                            ...prev,
                            twitter: {
                              ...prev.twitter,
                              replies: prev.twitter.replies.map((r) =>
                                r.id === reply.id ? { ...r, handle: val } : r
                              ),
                            },
                          }));
                        }}
                        placeholder="handle"
                        className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-white"
                      />
                    </div>

                    <textarea
                      rows={2}
                      value={reply.text}
                      onChange={(e) => {
                        const val = e.target.value;
                        onChange((prev) => ({
                          ...prev,
                          twitter: {
                            ...prev.twitter,
                            replies: prev.twitter.replies.map((r) =>
                              r.id === reply.id ? { ...r, text: val } : r
                            ),
                          },
                        }));
                      }}
                      className="w-full px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-white"
                    />

                    <div className="flex items-center space-x-2">
                      <span className="text-neutral-400 text-[10px]">Badge:</span>
                      <select
                        value={reply.verifiedBadge}
                        onChange={(e) => {
                          const val = e.target.value as VerifiedBadge;
                          onChange((prev) => ({
                            ...prev,
                            twitter: {
                              ...prev.twitter,
                              replies: prev.twitter.replies.map((r) =>
                                r.id === reply.id ? { ...r, verifiedBadge: val } : r
                              ),
                            },
                          }));
                        }}
                        className="px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-white text-[11px]"
                      >
                        <option value="none">None</option>
                        <option value="blue">Blue</option>
                        <option value="gold">Gold</option>
                      </select>
                      <input
                        type="number"
                        value={reply.likes}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          onChange((prev) => ({
                            ...prev,
                            twitter: {
                              ...prev.twitter,
                              replies: prev.twitter.replies.map((r) =>
                                r.id === reply.id ? { ...r, likes: val } : r
                              ),
                            },
                          }));
                        }}
                        placeholder="Likes"
                        className="w-20 px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-white text-[11px]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* iMessage Bubbles */}
            {state.activePlatform === 'imessage' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-neutral-200">Chat Message Bubbles</h4>
                  <button
                    onClick={() => {
                      const newMsg = {
                        id: `msg-${Date.now()}`,
                        sender: 'them' as 'me' | 'them',
                        text: 'Sounds great! Can’t wait.',
                        timestamp: '9:42 AM',
                      };
                      onChange((prev) => ({
                        ...prev,
                        imessage: {
                          ...prev.imessage,
                          chatBubbles: [...prev.imessage.chatBubbles, newMsg],
                        },
                      }));
                    }}
                    className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[11px]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Message</span>
                  </button>
                </div>

                {state.imessage.chatBubbles.map((msg, idx) => (
                  <div key={msg.id} className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-neutral-400 text-[11px]">#{idx + 1}</span>
                        <select
                          value={msg.sender}
                          onChange={(e) => {
                            const val = e.target.value as 'me' | 'them';
                            onChange((prev) => ({
                              ...prev,
                              imessage: {
                                ...prev.imessage,
                                chatBubbles: prev.imessage.chatBubbles.map((m) =>
                                  m.id === msg.id ? { ...m, sender: val } : m
                                ),
                              },
                            }));
                          }}
                          className="px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-white font-semibold text-[11px]"
                        >
                          <option value="me">Me (Outgoing)</option>
                          <option value="them">Them (Incoming)</option>
                        </select>
                      </div>

                      <div className="flex items-center space-x-2">
                        <label className="flex items-center space-x-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!!msg.liked}
                            onChange={(e) => {
                              const val = e.target.checked;
                              onChange((prev) => ({
                                ...prev,
                                imessage: {
                                  ...prev.imessage,
                                  chatBubbles: prev.imessage.chatBubbles.map((m) =>
                                    m.id === msg.id ? { ...m, liked: val } : m
                                  ),
                                },
                              }));
                            }}
                            className="w-3 h-3 accent-red-500"
                          />
                          <span className="text-[10px] text-neutral-400">Heart React</span>
                        </label>

                        <button
                          onClick={() => {
                            onChange((prev) => ({
                              ...prev,
                              imessage: {
                                ...prev.imessage,
                                chatBubbles: prev.imessage.chatBubbles.filter((m) => m.id !== msg.id),
                              },
                            }));
                          }}
                          className="text-neutral-500 hover:text-red-400 p-0.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <textarea
                      rows={2}
                      value={msg.text}
                      onChange={(e) => {
                        const val = e.target.value;
                        onChange((prev) => ({
                          ...prev,
                          imessage: {
                            ...prev.imessage,
                            chatBubbles: prev.imessage.chatBubbles.map((m) =>
                              m.id === msg.id ? { ...m, text: val } : m
                            ),
                          },
                        }));
                      }}
                      className="w-full px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-white"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Instagram Comments */}
            {state.activePlatform === 'instagram' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-neutral-200">Post Comments</h4>
                  <button
                    onClick={() => {
                      const newComment = {
                        id: `ig-c-${Date.now()}`,
                        author: 'travel_lover',
                        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
                        text: 'This is absolutely gorgeous!! Added to my bucket list 😍',
                        timestamp: '15m',
                        likes: 12,
                      };
                      onChange((prev) => ({
                        ...prev,
                        instagram: {
                          ...prev.instagram,
                          comments: [...prev.instagram.comments, newComment],
                        },
                      }));
                    }}
                    className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-semibold text-[11px]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Comment</span>
                  </button>
                </div>

                {state.instagram.comments.map((comment) => (
                  <div key={comment.id} className="p-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={comment.author}
                        onChange={(e) => {
                          const val = e.target.value;
                          onChange((prev) => ({
                            ...prev,
                            instagram: {
                              ...prev.instagram,
                              comments: prev.instagram.comments.map((c) =>
                                c.id === comment.id ? { ...c, author: val } : c
                              ),
                            },
                          }));
                        }}
                        className="px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-white font-bold"
                        placeholder="Author"
                      />
                      <button
                        onClick={() => {
                          onChange((prev) => ({
                            ...prev,
                            instagram: {
                              ...prev.instagram,
                              comments: prev.instagram.comments.filter((c) => c.id !== comment.id),
                            },
                          }));
                        }}
                        className="text-neutral-500 hover:text-red-400 p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <input
                      type="text"
                      value={comment.text}
                      onChange={(e) => {
                        const val = e.target.value;
                        onChange((prev) => ({
                          ...prev,
                          instagram: {
                            ...prev.instagram,
                            comments: prev.instagram.comments.map((c) =>
                              c.id === comment.id ? { ...c, text: val } : c
                            ),
                          },
                        }));
                      }}
                      className="w-full px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-white"
                      placeholder="Comment content"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Snapchat Messages */}
            {state.activePlatform === 'snapchat' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-neutral-200">Snapchat Chat History</h4>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => {
                        const newMsg = {
                          id: `sc-msg-${Date.now()}`,
                          sender: 'them' as 'me' | 'them',
                          type: 'text' as const,
                          text: 'Hey! What are your plans for tonight?',
                          timestamp: '10:30 AM',
                        };
                        onChange((prev) => ({
                          ...prev,
                          snapchat: {
                            ...prev.snapchat,
                            chatMessages: [...prev.snapchat.chatMessages, newMsg],
                          },
                        }));
                      }}
                      className="px-2 py-1 rounded bg-[#0096ff] text-white font-semibold text-[10px]"
                    >
                      + Text
                    </button>
                    <button
                      onClick={() => {
                        const newSnap = {
                          id: `sc-snap-${Date.now()}`,
                          sender: 'them' as 'me' | 'them',
                          type: 'snap' as const,
                          timestamp: '10:32 AM',
                        };
                        onChange((prev) => ({
                          ...prev,
                          snapchat: {
                            ...prev.snapchat,
                            chatMessages: [...prev.snapchat.chatMessages, newSnap],
                          },
                        }));
                      }}
                      className="px-2 py-1 rounded bg-red-600 text-white font-semibold text-[10px]"
                    >
                      + Snap
                    </button>
                  </div>
                </div>

                {state.snapchat.chatMessages.map((msg, idx) => (
                  <div key={msg.id} className="p-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-neutral-400 text-[11px]">#{idx + 1}</span>
                        <select
                          value={msg.sender}
                          onChange={(e) => {
                            const val = e.target.value as 'me' | 'them';
                            onChange((prev) => ({
                              ...prev,
                              snapchat: {
                                ...prev.snapchat,
                                chatMessages: prev.snapchat.chatMessages.map((m) =>
                                  m.id === msg.id ? { ...m, sender: val } : m
                                ),
                              },
                            }));
                          }}
                          className="px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-white font-semibold text-[11px]"
                        >
                          <option value="me">Me</option>
                          <option value="them">Friend</option>
                        </select>
                        <span className="text-[10px] text-neutral-400 uppercase font-mono">{msg.type}</span>
                      </div>

                      <button
                        onClick={() => {
                          onChange((prev) => ({
                            ...prev,
                            snapchat: {
                              ...prev.snapchat,
                              chatMessages: prev.snapchat.chatMessages.filter((m) => m.id !== msg.id),
                            },
                          }));
                        }}
                        className="text-neutral-500 hover:text-red-400 p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {msg.type === 'text' && (
                      <textarea
                        rows={2}
                        value={msg.text || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          onChange((prev) => ({
                            ...prev,
                            snapchat: {
                              ...prev.snapchat,
                              chatMessages: prev.snapchat.chatMessages.map((m) =>
                                m.id === msg.id ? { ...m, text: val } : m
                              ),
                            },
                          }));
                        }}
                        className="w-full px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-white"
                        placeholder="Message text"
                      />
                    )}

                    <input
                      type="text"
                      value={msg.timestamp}
                      onChange={(e) => {
                        const val = e.target.value;
                        onChange((prev) => ({
                          ...prev,
                          snapchat: {
                            ...prev.snapchat,
                            chatMessages: prev.snapchat.chatMessages.map((m) =>
                              m.id === msg.id ? { ...m, timestamp: val } : m
                            ),
                          },
                        }));
                      }}
                      className="w-full px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-white text-[11px]"
                      placeholder="Timestamp (e.g. 10:14 AM)"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* XVideos Comments */}
            {state.activePlatform === 'xvideos' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-neutral-200">Video Comments</h4>
                  <button
                    onClick={() => {
                      const newComment = {
                        id: `xv-c-${Date.now()}`,
                        author: 'VIP_Member',
                        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
                        text: 'Great cinematography and production quality!',
                        timestamp: 'Just now',
                        likes: 42,
                      };
                      onChange((prev) => ({
                        ...prev,
                        xvideos: {
                          ...prev.xvideos,
                          comments: [...prev.xvideos.comments, newComment],
                        },
                      }));
                    }}
                    className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-[#d92323] hover:bg-red-600 text-white font-semibold text-[11px]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Comment</span>
                  </button>
                </div>

                {state.xvideos.comments.map((comment) => (
                  <div key={comment.id} className="p-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={comment.author}
                        onChange={(e) => {
                          const val = e.target.value;
                          onChange((prev) => ({
                            ...prev,
                            xvideos: {
                              ...prev.xvideos,
                              comments: prev.xvideos.comments.map((c) =>
                                c.id === comment.id ? { ...c, author: val } : c
                              ),
                            },
                          }));
                        }}
                        className="px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-white font-bold"
                        placeholder="Author"
                      />
                      <button
                        onClick={() => {
                          onChange((prev) => ({
                            ...prev,
                            xvideos: {
                              ...prev.xvideos,
                              comments: prev.xvideos.comments.filter((c) => c.id !== comment.id),
                            },
                          }));
                        }}
                        className="text-neutral-500 hover:text-red-400 p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <textarea
                      rows={2}
                      value={comment.text}
                      onChange={(e) => {
                        const val = e.target.value;
                        onChange((prev) => ({
                          ...prev,
                          xvideos: {
                            ...prev.xvideos,
                            comments: prev.xvideos.comments.map((c) =>
                              c.id === comment.id ? { ...c, text: val } : c
                            ),
                          },
                        }));
                      }}
                      className="w-full px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-white"
                      placeholder="Comment text"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Sticky Action Bar: Download PNG, Copy to Clipboard, Reset */}
      <div className="p-3 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between gap-2">
        <button
          onClick={onReset}
          className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 transition-colors"
          title="Reset to initial defaults"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={onCopyToClipboard}
          className="flex-1 py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 font-semibold flex items-center justify-center space-x-1.5 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Image</span>
            </>
          )}
        </button>

        <button
          onClick={onExportPng}
          disabled={isExporting}
          className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold flex items-center justify-center space-x-1.5 shadow-lg shadow-blue-600/30 transition-all active:scale-95 disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          <span>{isExporting ? 'Exporting...' : 'Download PNG'}</span>
        </button>
      </div>
    </div>
  );
};

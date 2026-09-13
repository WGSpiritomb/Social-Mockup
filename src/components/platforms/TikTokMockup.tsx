import React from 'react';
import { TikTokState, DeviceSettings } from '../../types';
import { TikTokBadge } from '../common/Badges';
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Music,
  Plus,
  Search,
  Users,
  Sparkles,
  Gift,
  Coins,
  X,
  Volume2,
} from 'lucide-react';

interface TikTokMockupProps {
  state: TikTokState;
  deviceSettings: DeviceSettings;
}

export const TikTokMockup: React.FC<TikTokMockupProps> = ({ state, deviceSettings }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace('.0', '') + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1).replace('.0', '') + 'K';
    return num.toLocaleString();
  };

  // TikTok Live Mode
  if (state.mode === 'live') {
    return (
      <div className="relative w-full h-full bg-black text-white select-none overflow-hidden flex flex-col justify-between">
        {/* Live Video Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={state.backgroundMediaUrl}
            alt="TikTok Live background"
            className="w-full h-full object-cover brightness-75"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/85" />
        </div>

        {/* Live Top Header */}
        <div className="relative z-10 p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md rounded-full pl-1 pr-3 py-1 border border-white/10">
            <img
              src={state.avatarUrl}
              alt={state.username}
              className="w-7 h-7 rounded-full object-cover border border-rose-500"
            />
            <div className="leading-tight">
              <span className="font-bold text-xs block truncate max-w-[90px]">{state.username}</span>
              <span className="text-[10px] text-rose-400 font-semibold flex items-center space-x-1">
                <Coins className="w-2.5 h-2.5 text-yellow-400" />
                <span>{state.liveCoins.toLocaleString()}</span>
              </span>
            </div>
            <button className="px-2 py-0.5 rounded-full bg-rose-500 text-white font-bold text-[10px] ml-1">
              + Follow
            </button>
          </div>

          {/* Top Gifters & Viewers */}
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              {state.topGifters.map((g) => (
                <img
                  key={g.id}
                  src={g.avatarUrl}
                  alt={`Gifter ${g.rank}`}
                  className="w-6 h-6 rounded-full border border-white object-cover"
                />
              ))}
            </div>
            <span className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full text-xs font-semibold flex items-center space-x-1">
              <Users className="w-3 h-3 text-neutral-300" />
              <span>{state.liveViewers}</span>
            </span>
            <button className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Floating Gift Animation overlay if gift selected */}
        {state.liveGift !== 'none' && (
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-center animate-bounce">
            <div className="bg-gradient-to-r from-amber-500 to-rose-500 p-1 rounded-2xl shadow-xl shadow-rose-500/40">
              <div className="bg-black/70 backdrop-blur-md px-4 py-2 rounded-xl flex items-center space-x-2">
                <span className="text-3xl">
                  {state.liveGift === 'dragon'
                    ? '🐉'
                    : state.liveGift === 'rose'
                    ? '🌹'
                    : state.liveGift === 'galaxy'
                    ? '🌌'
                    : '💖'}
                </span>
                <div>
                  <p className="font-extrabold text-xs uppercase tracking-wider text-amber-300">
                    {state.liveGift.toUpperCase()} GIFT
                  </p>
                  <p className="text-[11px] text-white">Sent to Creator</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Live Chat stream & Bottom Action bar */}
        <div className="relative z-10 p-3 space-y-2">
          {/* Live Chat messages */}
          <div className="max-h-48 overflow-y-auto no-scrollbar space-y-1.5 flex flex-col justify-end">
            {state.liveChatMessages.map((msg) => (
              <div
                key={msg.id}
                className="bg-black/40 backdrop-blur-xs rounded-lg py-1 px-2 text-xs flex items-center space-x-1.5 w-fit max-w-[88%]"
              >
                <span className="bg-amber-500/90 text-black font-extrabold text-[9px] px-1 py-0.2 rounded-xs">
                  Lv.{msg.level}
                </span>
                <span className="font-semibold text-neutral-300">{msg.user}:</span>
                <span className="text-white">{msg.message}</span>
              </div>
            ))}
          </div>

          {/* Live Stream Bottom bar */}
          <div className="flex items-center space-x-2 pt-1">
            <div className="flex-1 bg-white/20 backdrop-blur-md rounded-full px-3 py-2 text-xs text-white/80">
              Say something nice...
            </div>
            <button className="w-9 h-9 rounded-full bg-rose-500 flex items-center justify-center text-white shadow-md shadow-rose-500/50">
              <Gift className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // TikTok Video Feed UI
  return (
    <div className="relative w-full h-full bg-black text-white select-none overflow-hidden flex flex-col justify-between">
      {/* Background Video Media */}
      <div className="absolute inset-0 z-0">
        <img
          src={state.backgroundMediaUrl}
          alt="TikTok post background"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      </div>

      {/* Top Header */}
      <div className="relative z-10 px-4 pt-3 flex items-center justify-between text-sm font-semibold">
        <span className="opacity-70 text-xs">LIVE</span>
        <div className="flex items-center space-x-4">
          <span className="opacity-60 text-sm font-bold">Following</span>
          <div className="relative">
            <span className="text-white text-base font-extrabold">For You</span>
            <div className="w-7 h-[2px] bg-white rounded-full mx-auto mt-0.5" />
          </div>
        </div>
        <Search className="w-5 h-5 opacity-90 cursor-pointer" />
      </div>

      {/* Main UI overlay (Right actions + Bottom info) */}
      <div className="relative z-10 flex items-end justify-between p-3 pb-4">
        {/* Bottom Left: User info, caption, audio */}
        <div className="flex-1 pr-4 space-y-2 max-w-[80%]">
          <div className="flex items-center space-x-1.5">
            <span className="font-bold text-sm leading-tight drop-shadow-md">
              {state.handle || `@${state.username}`}
            </span>
            {state.isVerified && <TikTokBadge className="w-3.5 h-3.5" />}
          </div>

          <p className="text-xs leading-snug drop-shadow-md whitespace-pre-wrap break-words line-clamp-3">
            {state.caption}
          </p>

          <div className="flex items-center space-x-1.5 text-xs text-neutral-200">
            <Music className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate drop-shadow-md">{state.soundTitle}</span>
          </div>
        </div>

        {/* Right Column: Avatar, Likes, Comments, Bookmarks, Share, Vinyl */}
        <div className="flex flex-col items-center space-y-4 shrink-0">
          {/* Avatar with Follow Button */}
          <div className="relative mb-2">
            <img
              src={state.avatarUrl}
              alt={state.username}
              className="w-11 h-11 rounded-full border-2 border-white object-cover"
            />
            <button className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#fe2c55] text-white flex items-center justify-center shadow-xs">
              <Plus className="w-3 h-3 stroke-[3]" />
            </button>
          </div>

          {/* Like */}
          <div className="flex flex-col items-center">
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-white active:scale-90 transition-transform">
              <Heart className="w-7 h-7 fill-[#fe2c55] text-[#fe2c55] drop-shadow-lg" />
            </button>
            <span className="text-[11px] font-bold drop-shadow-md">{formatNumber(state.likes)}</span>
          </div>

          {/* Comments */}
          <div className="flex flex-col items-center">
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-white active:scale-90 transition-transform">
              <MessageCircle className="w-7 h-7 fill-white text-white drop-shadow-lg -scale-x-100" />
            </button>
            <span className="text-[11px] font-bold drop-shadow-md">{formatNumber(state.commentsCount)}</span>
          </div>

          {/* Bookmark */}
          <div className="flex flex-col items-center">
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-white active:scale-90 transition-transform">
              <Bookmark className="w-7 h-7 fill-yellow-400 text-yellow-400 drop-shadow-lg" />
            </button>
            <span className="text-[11px] font-bold drop-shadow-md">{formatNumber(state.bookmarks)}</span>
          </div>

          {/* Share */}
          <div className="flex flex-col items-center">
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-white active:scale-90 transition-transform">
              <Share2 className="w-7 h-7 fill-white text-white drop-shadow-lg" />
            </button>
            <span className="text-[11px] font-bold drop-shadow-md">{formatNumber(state.shares)}</span>
          </div>

          {/* Rotating Vinyl Sound Disc */}
          <div className="relative pt-1">
            <div className="w-10 h-10 rounded-full bg-neutral-900 border-[3px] border-neutral-800 p-1 flex items-center justify-center animate-spin-slow shadow-lg">
              <img
                src={state.avatarUrl}
                alt="Audio cover"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <span className="absolute -top-1 right-0 text-[10px] animate-ping opacity-60">🎵</span>
          </div>
        </div>
      </div>
    </div>
  );
};

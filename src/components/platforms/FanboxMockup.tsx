import React from 'react';
import { FanboxState, DeviceSettings } from '../../types';
import { SafeImage } from '../common/SafeImage';
import {
  Heart,
  MessageSquare,
  Share2,
  Lock,
  Search,
  Bell,
  Sparkles,
  MoreHorizontal,
} from 'lucide-react';

interface FanboxMockupProps {
  state: FanboxState;
  deviceSettings: DeviceSettings;
}

export const FanboxMockup: React.FC<FanboxMockupProps> = ({ state, deviceSettings }) => {
  const isDark = deviceSettings.theme === 'dark';
  const isDesktop = deviceSettings?.viewFormat === 'desktop';
  const isLocked = state.mode === 'locked';

  const bgClass = isDark ? 'bg-[#141518] text-neutral-100' : 'bg-[#f4f5f7] text-neutral-900';
  const cardClass = isDark ? 'bg-[#1c1e24] border-neutral-800' : 'bg-white border-neutral-200';
  const mutedClass = isDark ? 'text-neutral-400' : 'text-neutral-500';
  const borderClass = isDark ? 'border-neutral-800' : 'border-neutral-200';

  return (
    <div
      className={`w-full ${
        isDesktop ? 'h-auto overflow-visible' : 'h-full overflow-y-auto'
      } ${bgClass} flex flex-col no-scrollbar select-none text-xs`}
    >
      {/* Top FANBOX Header */}
      <div
        className={`px-3.5 py-2.5 flex items-center justify-between border-b shrink-0 ${
          isDark ? 'bg-[#1a1c22] border-neutral-800' : 'bg-white border-neutral-200'
        }`}
      >
        <div className="flex items-center space-x-2">
          <span className="px-2 py-0.5 rounded bg-[#ffcf33] text-neutral-950 font-black text-xs tracking-tight">
            FANBOX
          </span>
          <span className={`text-[10px] font-semibold ${mutedClass}`}>DMM / Creator Club</span>
        </div>

        <div className={`flex items-center space-x-3 ${mutedClass}`}>
          <Search className="w-4 h-4" />
          <Bell className="w-4 h-4" />
        </div>
      </div>

      {/* Creator Header Card */}
      <div className={`m-3 mb-0 p-3 rounded-xl border ${cardClass} flex items-center justify-between`}>
        <div className="flex items-center space-x-2.5 min-w-0">
          <SafeImage
            src={state.avatarUrl}
            alt={state.creatorName}
            fallbackText={state.creatorName}
            className="w-10 h-10 rounded-full object-cover border-2 border-[#ffcf33] shrink-0"
          />
          <div className="min-w-0">
            <div className="font-bold text-sm truncate">{state.creatorName}</div>
            <div className={`text-[11px] ${mutedClass} truncate`}>@{state.handle}</div>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-[#ffcf33] text-neutral-950 font-bold text-[11px] shrink-0 tabular-nums">
          ¥{state.planPriceYen.toLocaleString()}/月
        </span>
      </div>

      {/* Post Card */}
      <div className={`m-3 rounded-xl border ${cardClass} overflow-hidden`}>
        <div className="p-3.5 space-y-2.5">
          {/* Plan Pill & Timestamp */}
          <div className="flex items-center justify-between">
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center space-x-1 ${
                isLocked
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  : isDark
                  ? 'bg-neutral-800 text-neutral-300'
                  : 'bg-neutral-100 text-neutral-700'
              }`}
            >
              {isLocked && <Lock className="w-2.5 h-2.5" />}
              <span>{isLocked ? `${state.planName}限定` : '全体公開'}</span>
            </span>
            <span className={`text-[10px] tabular-nums ${mutedClass}`}>{state.timestamp}</span>
          </div>

          <h2 className="font-bold text-[14px] leading-snug break-words">{state.postTitle}</h2>
          <p className={`text-xs leading-relaxed whitespace-pre-wrap break-words ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
            {state.postText}
          </p>
        </div>

        {/* Media / Supporter Paywall */}
        <div className="relative w-full aspect-video bg-neutral-900 overflow-hidden">
          <SafeImage
            src={state.mediaUrl}
            alt={state.postTitle}
            className={`w-full h-full object-cover transition-all ${
              isLocked ? 'blur-xl scale-110 brightness-50' : ''
            }`}
          />

          {isLocked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center text-white z-10">
              <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center mb-2.5 border border-[#ffcf33]/40">
                <Lock className="w-6 h-6 text-[#ffcf33]" />
              </div>
              <p className="font-extrabold text-sm mb-1">{state.planName}</p>
              <p className="text-[11px] text-neutral-300 mb-3 tabular-nums">
                ¥{state.planPriceYen.toLocaleString()} / 月以上でこの投稿を閲覧できます
              </p>
              <button className="px-5 py-2 rounded-full bg-[#ffcf33] hover:bg-amber-400 text-neutral-950 font-extrabold text-xs shadow-lg flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>支援して記事を読む</span>
              </button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className={`px-3.5 py-2.5 border-t ${borderClass} flex items-center justify-between tabular-nums`}>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 font-semibold text-xs">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>{state.likes.toLocaleString()}</span>
            </div>
            <div className={`flex items-center space-x-1.5 font-semibold text-xs ${mutedClass}`}>
              <MessageSquare className="w-4 h-4" />
              <span>{state.commentsCount.toLocaleString()}</span>
            </div>
          </div>
          <div className={`flex items-center space-x-3 ${mutedClass}`}>
            <Share2 className="w-4 h-4" />
            <MoreHorizontal className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Supporter Comments */}
      <div className="px-3 pb-4 space-y-2">
        <h3 className={`font-bold text-[11px] px-1 ${mutedClass}`}>コメント</h3>
        {state.comments.map((comment) => (
          <div key={comment.id} className={`p-2.5 rounded-xl border ${cardClass} space-y-1.5`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <SafeImage
                  src={comment.avatar}
                  alt={comment.author}
                  fallbackText={comment.author}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span className="font-bold text-[11px]">{comment.author}</span>
              </div>
              <span className={`text-[10px] ${mutedClass}`}>{comment.timestamp}</span>
            </div>
            <p className={`text-[11px] pl-7 leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
              {comment.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

import React from 'react';
import { FanslyState, DeviceSettings } from '../../types';
import { SafeImage } from '../common/SafeImage';
import {
  Lock,
  Heart,
  MessageCircle,
  DollarSign,
  Bookmark,
  MoreHorizontal,
  ArrowLeft,
  CheckCircle2,
  Send,
  Image as ImageIcon,
  Smile,
  Crown,
} from 'lucide-react';

interface FanslyMockupProps {
  state: FanslyState;
  deviceSettings: DeviceSettings;
}

export const FanslyMockup: React.FC<FanslyMockupProps> = ({ state, deviceSettings }) => {
  const isDark = deviceSettings.theme === 'dark';
  const isDesktop = deviceSettings?.viewFormat === 'desktop';

  const bgClass = isDark ? 'bg-[#11151b] text-white' : 'bg-white text-neutral-900';
  const cardBgClass = isDark ? 'bg-[#171d26] text-white' : 'bg-white text-neutral-900';
  const borderClass = isDark ? 'border-neutral-800' : 'border-neutral-200';
  const subtextClass = isDark ? 'text-neutral-400' : 'text-neutral-500';

  // DM Chat Mode
  if (state.mode === 'chat') {
    return (
      <div
        className={`w-full ${
          isDesktop ? 'h-auto min-h-[520px]' : 'h-full'
        } flex flex-col ${bgClass} select-none`}
      >
        <div className={`px-4 py-2.5 flex items-center justify-between border-b ${borderClass}`}>
          <div className="flex items-center space-x-3">
            <ArrowLeft className="w-5 h-5 text-[#1fa2f1]" />
            <SafeImage
              src={state.avatarUrl}
              alt={state.creatorName}
              fallbackText={state.creatorName}
              className="w-8 h-8 rounded-full object-cover border border-[#1fa2f1]"
            />
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-bold text-sm">{state.creatorName}</span>
                {state.isVerified && (
                  <CheckCircle2 className="w-3.5 h-3.5 fill-[#1fa2f1] text-white" />
                )}
              </div>
              <span className={`text-xs ${subtextClass}`}>@{state.username}</span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#1fa2f1]/15 text-[#1fa2f1] font-bold text-xs flex items-center space-x-1">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Tip</span>
          </span>
        </div>

        <div className="flex-1 p-4 space-y-3 overflow-y-auto no-scrollbar flex flex-col justify-end">
          {state.chatMessages.map((msg) => {
            const isMe = msg.sender === 'me';
            return (
              <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                <div
                  className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-[14px] leading-snug break-words ${
                    isMe
                      ? 'bg-[#1fa2f1] text-white rounded-br-xs'
                      : isDark
                      ? 'bg-[#222a36] text-white rounded-bl-xs'
                      : 'bg-neutral-200 text-neutral-900 rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className={`text-[10px] ${subtextClass} mt-0.5 px-1`}>{msg.timestamp}</span>
              </div>
            );
          })}
        </div>

        <div className={`p-2.5 border-t ${borderClass} flex items-center space-x-2`}>
          <div
            className={`w-8 h-8 rounded-full text-[#1fa2f1] flex items-center justify-center shrink-0 ${
              isDark ? 'bg-neutral-800' : 'bg-neutral-100'
            }`}
          >
            <DollarSign className="w-4 h-4" />
          </div>
          <div
            className={`flex-1 flex items-center rounded-full px-3.5 py-2 ${
              isDark ? 'bg-[#222a36]' : 'bg-neutral-100'
            }`}
          >
            <input
              type="text"
              readOnly
              placeholder="Write a message..."
              className="bg-transparent text-sm w-full outline-hidden placeholder:text-neutral-500"
            />
            <div className="flex items-center space-x-2 text-neutral-400">
              <ImageIcon className="w-4 h-4" />
              <Smile className="w-4 h-4" />
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#1fa2f1] flex items-center justify-center text-white shrink-0">
            <Send className="w-4 h-4" />
          </div>
        </div>
      </div>
    );
  }

  const isLocked = state.mode === 'locked';

  return (
    <div
      className={`w-full ${
        isDesktop ? 'h-auto overflow-visible' : 'h-full overflow-y-auto'
      } flex flex-col ${bgClass} select-none no-scrollbar text-xs`}
    >
      {/* Top Fansly Header */}
      <div
        className={`px-4 py-2.5 flex items-center justify-between border-b ${borderClass} ${cardBgClass} shrink-0`}
      >
        <div className="flex items-center space-x-1.5">
          <Heart className="w-4 h-4 text-[#1fa2f1] fill-[#1fa2f1]" />
          <span className="text-[#1fa2f1] font-black text-lg tracking-tight">fansly</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-1 rounded-full bg-[#1fa2f1] text-white font-bold text-[11px] flex items-center space-x-1">
            <Crown className="w-3 h-3" />
            <span>{state.tierName}</span>
          </span>
          <MoreHorizontal className={`w-4 h-4 ${subtextClass}`} />
        </div>
      </div>

      {/* Post Card */}
      <div className={`${cardBgClass} border-b ${borderClass}`}>
        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <SafeImage
              src={state.avatarUrl}
              alt={state.creatorName}
              fallbackText={state.creatorName}
              className="w-10 h-10 rounded-full object-cover border border-[#1fa2f1]"
            />
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-bold text-sm">{state.creatorName}</span>
                {state.isVerified && (
                  <CheckCircle2 className="w-3.5 h-3.5 fill-[#1fa2f1] text-white" />
                )}
              </div>
              <span className={`text-xs ${subtextClass}`}>
                @{state.username} · {state.timestamp}
              </span>
            </div>
          </div>
          <MoreHorizontal className={`w-5 h-5 ${subtextClass}`} />
        </div>

        <div className="px-3.5 pb-3 text-sm leading-relaxed whitespace-pre-wrap break-words">
          {state.postText}
        </div>

        <div className="relative w-full aspect-square bg-neutral-900 overflow-hidden">
          <SafeImage
            src={state.mediaUrl}
            alt="Fansly post media"
            className={`w-full h-full object-cover transition-all ${
              isLocked ? 'blur-xl scale-110 brightness-50' : ''
            }`}
          />

          {isLocked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white z-10">
              <div className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center mb-3 border border-[#1fa2f1]/40">
                <Lock className="w-7 h-7 text-[#1fa2f1]" />
              </div>
              <h4 className="font-extrabold text-base mb-1">{state.tierName} Required</h4>
              <p className="text-xs text-neutral-300 max-w-xs mb-4">
                Subscribe to {state.tierName} or unlock this post individually
              </p>
              <button className="px-6 py-2.5 rounded-full bg-[#1fa2f1] hover:bg-[#0f8bd8] text-white font-extrabold text-sm shadow-lg shadow-[#1fa2f1]/30 tabular-nums">
                Unlock for ${state.unlockPrice.toFixed(2)}
              </button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className={`px-3.5 py-3 flex items-center justify-between border-t ${borderClass} tabular-nums`}>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 font-semibold">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <span>{state.likes.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1.5 font-semibold">
              <MessageCircle className="w-5 h-5 -scale-x-100" />
              <span>{state.commentsCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-[#1fa2f1]/15 text-[#1fa2f1] font-bold">
              <DollarSign className="w-3.5 h-3.5" />
              <span>Tip ${state.tipAmount.toFixed(0)}</span>
            </div>
          </div>
          <Bookmark className={`w-5 h-5 ${subtextClass}`} />
        </div>
      </div>

      {/* Inline Comments */}
      {state.comments.length > 0 && (
        <div className="p-3.5 space-y-2">
          {state.comments.map((c) => (
            <div key={c.id} className="flex items-start space-x-2.5">
              <SafeImage
                src={c.avatar}
                alt={c.author}
                fallbackText={c.author}
                className="w-6 h-6 rounded-full object-cover shrink-0 mt-0.5"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-xs">{c.author}</span>
                  <span className={`text-[10px] ${subtextClass}`}>{c.timestamp}</span>
                </div>
                <p className={`text-xs leading-snug ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  {c.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

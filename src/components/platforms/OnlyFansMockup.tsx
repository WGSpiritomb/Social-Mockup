import React from 'react';
import { OnlyFansState, DeviceSettings } from '../../types';
import {
  Lock,
  Heart,
  MessageCircle,
  DollarSign,
  Share2,
  Bookmark,
  MoreHorizontal,
  ArrowLeft,
  CheckCircle2,
  Send,
  Image as ImageIcon,
  Smile,
} from 'lucide-react';

interface OnlyFansMockupProps {
  state: OnlyFansState;
  deviceSettings: DeviceSettings;
}

export const OnlyFansMockup: React.FC<OnlyFansMockupProps> = ({ state, deviceSettings }) => {
  const isDark = deviceSettings.theme === 'dark';
  const bgClass = isDark ? 'bg-[#121619] text-white' : 'bg-white text-neutral-900';
  const cardBgClass = isDark ? 'bg-[#191f24] text-white' : 'bg-white text-neutral-900';
  const borderClass = isDark ? 'border-neutral-800' : 'border-neutral-200';
  const subtextClass = isDark ? 'text-neutral-400' : 'text-neutral-500';

  // DM Chat Mode
  if (state.mode === 'chat') {
    return (
      <div className={`w-full h-full flex flex-col ${bgClass} select-none`}>
        {/* OnlyFans DM Header */}
        <div className={`px-4 py-2.5 flex items-center justify-between border-b ${borderClass}`}>
          <div className="flex items-center space-x-3">
            <ArrowLeft className="w-5 h-5 text-[#00aff0] cursor-pointer" />
            <img
              src={state.avatarUrl}
              alt={state.creatorName}
              className="w-8 h-8 rounded-full object-cover border border-[#00aff0]"
            />
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-bold text-sm">{state.creatorName}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00aff0] fill-[#00aff0]" />
              </div>
              <span className={`text-xs ${subtextClass}`}>@{state.username}</span>
            </div>
          </div>
          <button className="px-2.5 py-1 rounded-full bg-[#00aff0]/10 text-[#00aff0] font-bold text-xs flex items-center space-x-1">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Tip</span>
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto no-scrollbar flex flex-col justify-end">
          {state.chatMessages.map((msg) => {
            const isMe = msg.sender === 'me';
            return (
              <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                <div
                  className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-[14px] leading-snug break-words ${
                    isMe
                      ? 'bg-[#00aff0] text-white rounded-br-xs'
                      : isDark
                      ? 'bg-[#242b32] text-white rounded-bl-xs'
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

        {/* Input bar */}
        <div className={`p-2.5 border-t ${borderClass} flex items-center space-x-2`}>
          <button className="w-8 h-8 rounded-full bg-neutral-800 text-[#00aff0] flex items-center justify-center shrink-0">
            <DollarSign className="w-4 h-4" />
          </button>
          <div className={`flex-1 flex items-center rounded-full px-3.5 py-2 ${isDark ? 'bg-[#242b32]' : 'bg-neutral-100'}`}>
            <input
              type="text"
              readOnly
              placeholder="Send a message or tip..."
              className="bg-transparent text-sm w-full outline-hidden placeholder:text-neutral-500"
            />
            <div className="flex items-center space-x-2 text-neutral-400">
              <ImageIcon className="w-4 h-4" />
              <Smile className="w-4 h-4" />
            </div>
          </div>
          <button className="w-8 h-8 rounded-full bg-[#00aff0] flex items-center justify-center text-white shrink-0">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Feed Post or Paywalled Post Mode
  const isPaywalled = state.mode === 'locked' || state.isLocked;

  return (
    <div className={`w-full h-full flex flex-col ${bgClass} select-none overflow-y-auto no-scrollbar`}>
      {/* Top Header */}
      <div className={`px-4 py-2.5 flex items-center justify-between border-b ${borderClass} ${cardBgClass}`}>
        <span className="text-[#00aff0] font-black text-xl tracking-tight">OnlyFans</span>
        <div className="flex items-center space-x-3">
          <button className="px-3 py-1 rounded-full bg-[#00aff0] text-white font-bold text-xs">
            Subscribed
          </button>
          <MoreHorizontal className={`w-5 h-5 ${subtextClass}`} />
        </div>
      </div>

      {/* Post Card */}
      <div className={`mt-2 ${cardBgClass} border-b ${borderClass}`}>
        {/* Creator Info Header */}
        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={state.avatarUrl}
              alt={state.creatorName}
              className="w-10 h-10 rounded-full object-cover border border-[#00aff0]"
            />
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-bold text-sm leading-tight hover:underline cursor-pointer">
                  {state.creatorName}
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00aff0] fill-[#00aff0]" />
              </div>
              <span className={`text-xs ${subtextClass}`}>@{state.username} · 3h ago</span>
            </div>
          </div>
          <MoreHorizontal className={`w-5 h-5 ${subtextClass} cursor-pointer`} />
        </div>

        {/* Text */}
        <div className="px-3.5 pb-3 text-sm leading-relaxed whitespace-pre-wrap break-words">
          {state.postText}
        </div>

        {/* Media / Locked Paywall Overlay */}
        <div className="relative w-full aspect-square bg-neutral-900 overflow-hidden">
          <img
            src={state.mediaUrl}
            alt="OnlyFans media"
            className={`w-full h-full object-cover transition-all ${
              isPaywalled ? 'blur-xl scale-110 brightness-50' : ''
            }`}
            referrerPolicy="no-referrer"
          />

          {/* Paywall Overlay */}
          {isPaywalled && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white z-10">
              <div className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center mb-3 border border-white/20">
                <Lock className="w-7 h-7 text-[#00aff0]" />
              </div>
              <h4 className="font-extrabold text-base mb-1">Subscriber-Only Exclusive</h4>
              <p className="text-xs text-neutral-300 max-w-xs mb-4">
                Unlock this post to view 24 high-resolution media items
              </p>
              <button className="px-6 py-2.5 rounded-full bg-[#00aff0] hover:bg-[#009fd9] text-white font-extrabold text-sm shadow-lg shadow-[#00aff0]/30 transition-transform active:scale-95">
                Unlock Post for ${state.unlockPrice.toFixed(2)}
              </button>
            </div>
          )}
        </div>

        {/* Actions Bar */}
        <div className={`px-3.5 py-3 flex items-center justify-between border-t ${borderClass}`}>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1.5 text-xs font-semibold hover:text-rose-500">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <span>{state.likes.toLocaleString()}</span>
            </button>
            <button className="flex items-center space-x-1.5 text-xs font-semibold hover:text-[#00aff0]">
              <MessageCircle className="w-5 h-5 -scale-x-100" />
              <span>{state.comments.toLocaleString()}</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1 rounded-full bg-[#00aff0]/10 text-[#00aff0] font-bold text-xs">
              <DollarSign className="w-3.5 h-3.5" />
              <span>Tip ${state.tipAmount.toFixed(0)}</span>
            </button>
          </div>
          <Bookmark className="w-5 h-5 text-neutral-400 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

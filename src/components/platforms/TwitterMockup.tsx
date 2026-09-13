import React from 'react';
import { TwitterState, DeviceSettings } from '../../types';
import { TwitterBadge } from '../common/Badges';
import {
  MessageCircle,
  Repeat2,
  Heart,
  Bookmark,
  Share,
  MoreHorizontal,
  ArrowLeft,
  Search,
  Sparkles,
  Send,
  Image as ImageIcon,
  Smile,
  BarChart2,
} from 'lucide-react';

interface TwitterMockupProps {
  state: TwitterState;
  deviceSettings: DeviceSettings;
}

export const TwitterMockup: React.FC<TwitterMockupProps> = ({ state, deviceSettings }) => {
  const isDark = deviceSettings.theme === 'dark';
  const bgClass = isDark ? 'bg-black text-white' : 'bg-white text-neutral-900';
  const borderClass = isDark ? 'border-neutral-800' : 'border-neutral-200';
  const subtextClass = isDark ? 'text-neutral-500' : 'text-neutral-500';
  const iconColor = isDark ? 'text-neutral-500 hover:text-neutral-300' : 'text-neutral-500 hover:text-neutral-700';

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace('.0', '') + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1).replace('.0', '') + 'K';
    return num.toLocaleString();
  };

  if (state.mode === 'chat') {
    return (
      <div className={`w-full h-full flex flex-col ${bgClass} select-none`}>
        {/* DM Chat Header */}
        <div className={`px-4 py-3 flex items-center justify-between border-b ${borderClass}`}>
          <div className="flex items-center space-x-3">
            <ArrowLeft className="w-5 h-5 cursor-pointer" />
            <div className="relative">
              <img
                src={state.avatarUrl}
                alt={state.displayName}
                className="w-8 h-8 rounded-full object-cover border border-neutral-700"
              />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-bold text-sm leading-tight">{state.displayName}</span>
                <TwitterBadge type={state.verifiedBadge} className="w-3.5 h-3.5" />
              </div>
              <span className={`text-xs ${subtextClass}`}>@{state.handle}</span>
            </div>
          </div>
          <MoreHorizontal className={`w-5 h-5 ${iconColor}`} />
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto no-scrollbar flex flex-col justify-end">
          <div className="text-center my-2">
            <span className={`text-[11px] px-2 py-0.5 rounded-full ${isDark ? 'bg-neutral-900 text-neutral-500' : 'bg-neutral-100 text-neutral-500'}`}>
              Direct Messages are end-to-end encrypted
            </span>
          </div>

          {state.chatMessages.map((msg) => {
            const isMe = msg.sender === 'me';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-[14px] leading-snug break-words ${
                    isMe
                      ? 'bg-[#1d9bf0] text-white rounded-br-xs'
                      : isDark
                      ? 'bg-neutral-800 text-white rounded-bl-xs'
                      : 'bg-neutral-200 text-neutral-900 rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <div className={`flex items-center space-x-1 text-[10px] ${subtextClass} mt-0.5 px-1`}>
                  <span>{msg.timestamp}</span>
                  {isMe && msg.status === 'read' && <span className="text-[#1d9bf0]">· Seen</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* DM Input Bar */}
        <div className={`p-2.5 border-t ${borderClass} flex items-center space-x-2`}>
          <div className={`flex-1 flex items-center rounded-full px-3.5 py-2 ${isDark ? 'bg-neutral-900' : 'bg-neutral-100'}`}>
            <input
              type="text"
              readOnly
              placeholder="Start a message"
              className="bg-transparent text-sm w-full outline-hidden placeholder:text-neutral-500"
            />
            <div className="flex items-center space-x-2 text-neutral-400">
              <ImageIcon className="w-4 h-4" />
              <Smile className="w-4 h-4" />
            </div>
          </div>
          <button className="w-8 h-8 rounded-full bg-[#1d9bf0] flex items-center justify-center text-white shrink-0">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Tweet Post Mode
  return (
    <div className={`w-full h-full flex flex-col ${bgClass} select-none`}>
      {/* Twitter App Header */}
      <div className={`px-4 py-2.5 flex items-center justify-between border-b ${borderClass}`}>
        <ArrowLeft className="w-5 h-5 cursor-pointer" />
        <div className="font-bold text-base tracking-tight">Post</div>
        <MoreHorizontal className="w-5 h-5 cursor-pointer" />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Main Tweet */}
        <div className={`p-4 border-b ${borderClass}`}>
          {/* Author info */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <img
                src={state.avatarUrl}
                alt={state.displayName}
                className="w-10 h-10 rounded-full object-cover border border-neutral-700/50"
              />
              <div className="flex flex-col">
                <div className="flex items-center space-x-1">
                  <span className="font-bold text-[15px] leading-tight hover:underline cursor-pointer">
                    {state.displayName}
                  </span>
                  <TwitterBadge type={state.verifiedBadge} className="w-4 h-4" />
                </div>
                <span className={`text-[13px] ${subtextClass}`}>@{state.handle}</span>
              </div>
            </div>
            <button className="px-3.5 py-1 rounded-full bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors">
              Follow
            </button>
          </div>

          {/* Tweet Text */}
          <div className="text-[16px] leading-normal font-normal whitespace-pre-wrap break-words mb-3">
            {state.tweetText}
          </div>

          {/* Media Attachment */}
          {state.hasMedia && state.mediaUrl && (
            <div className="rounded-2xl overflow-hidden border border-neutral-800 mb-3 bg-neutral-900">
              <img
                src={state.mediaUrl}
                alt="Tweet media"
                className="w-full max-h-72 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Timestamp & Client badge */}
          <div className={`py-2 text-[13px] ${subtextClass} flex items-center space-x-1 border-b ${borderClass}`}>
            <span>{state.timestamp}</span>
            <span>·</span>
            <span>{state.date}</span>
            <span>·</span>
            <span className="text-[#1d9bf0] hover:underline cursor-pointer">{state.client}</span>
          </div>

          {/* Views count */}
          <div className={`py-2.5 text-[13px] border-b ${borderClass} flex items-center space-x-1`}>
            <span className="font-bold text-inherit">{formatNumber(state.views)}</span>
            <span className={subtextClass}>Views</span>
          </div>

          {/* Metrics summary: Retweets, Quotes, Likes, Bookmarks */}
          <div className={`py-2.5 border-b ${borderClass} flex items-center space-x-4 text-[13px]`}>
            <div>
              <span className="font-bold text-inherit">{formatNumber(state.retweets)}</span>{' '}
              <span className={subtextClass}>Reposts</span>
            </div>
            <div>
              <span className="font-bold text-inherit">{formatNumber(state.quotes)}</span>{' '}
              <span className={subtextClass}>Quotes</span>
            </div>
            <div>
              <span className="font-bold text-inherit">{formatNumber(state.likes)}</span>{' '}
              <span className={subtextClass}>Likes</span>
            </div>
            <div>
              <span className="font-bold text-inherit">{formatNumber(state.bookmarks)}</span>{' '}
              <span className={subtextClass}>Bookmarks</span>
            </div>
          </div>

          {/* Action Row Icons */}
          <div className={`py-2 flex items-center justify-around ${iconColor}`}>
            <button className="p-1.5 hover:text-[#1d9bf0] transition-colors">
              <MessageCircle className="w-5 h-5" />
            </button>
            <button className="p-1.5 hover:text-green-500 transition-colors">
              <Repeat2 className="w-5 h-5" />
            </button>
            <button className="p-1.5 hover:text-rose-500 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-1.5 hover:text-[#1d9bf0] transition-colors">
              <Bookmark className="w-5 h-5" />
            </button>
            <button className="p-1.5 hover:text-[#1d9bf0] transition-colors">
              <Share className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reply Threads */}
        {state.replies && state.replies.length > 0 && (
          <div className="divide-y divide-neutral-800">
            {state.replies.map((reply) => (
              <div key={reply.id} className="p-3.5 flex space-x-3">
                <img
                  src={reply.avatarUrl}
                  alt={reply.displayName}
                  className="w-9 h-9 rounded-full object-cover border border-neutral-700/50 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1">
                    <span className="font-bold text-xs truncate">{reply.displayName}</span>
                    <TwitterBadge type={reply.verifiedBadge} className="w-3.5 h-3.5" />
                    <span className={`text-xs ${subtextClass}`}>@{reply.handle}</span>
                    <span className={`text-xs ${subtextClass}`}>· {reply.timestamp}</span>
                  </div>
                  <div className="text-[13px] mt-1 leading-snug break-words">
                    {reply.text}
                  </div>
                  <div className={`flex items-center space-x-6 mt-2 text-xs ${subtextClass}`}>
                    <div className="flex items-center space-x-1 hover:text-[#1d9bf0] cursor-pointer">
                      <MessageCircle className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex items-center space-x-1 hover:text-green-500 cursor-pointer">
                      <Repeat2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex items-center space-x-1 hover:text-rose-500 cursor-pointer">
                      <Heart className="w-3.5 h-3.5" />
                      <span>{formatNumber(reply.likes)}</span>
                    </div>
                    <div className="flex items-center space-x-1 hover:text-[#1d9bf0] cursor-pointer">
                      <Share className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

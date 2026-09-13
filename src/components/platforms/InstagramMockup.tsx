import React from 'react';
import { InstagramState, DeviceSettings } from '../../types';
import { InstagramBadge } from '../common/Badges';
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  ArrowLeft,
  Phone,
  Video,
  Info,
  Smile,
  Image as ImageIcon,
  Mic,
  Share2,
  Users,
  Eye,
  X,
  Volume2,
  Camera,
} from 'lucide-react';

interface InstagramMockupProps {
  state: InstagramState;
  deviceSettings: DeviceSettings;
}

export const InstagramMockup: React.FC<InstagramMockupProps> = ({ state, deviceSettings }) => {
  const isDark = deviceSettings.theme === 'dark';
  const bgClass = isDark ? 'bg-black text-white' : 'bg-white text-neutral-900';
  const borderClass = isDark ? 'border-neutral-800' : 'border-neutral-200';
  const subtextClass = isDark ? 'text-neutral-400' : 'text-neutral-500';

  const formatNumber = (num: number) => num.toLocaleString();

  // Instagram Live Mode
  if (state.mode === 'live') {
    return (
      <div className="relative w-full h-full bg-neutral-950 text-white overflow-hidden select-none flex flex-col justify-between">
        {/* Fullscreen Video Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={state.postMediaUrl}
            alt="Live stream feed"
            className="w-full h-full object-cover brightness-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        </div>

        {/* Live Top Header */}
        <div className="relative z-10 px-4 pt-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <img
                src={state.avatarUrl}
                alt={state.username}
                className="w-9 h-9 rounded-full object-cover border-2 border-rose-500"
              />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-bold text-sm leading-tight drop-shadow-xs">{state.username}</span>
                {state.isVerified && <InstagramBadge className="w-3.5 h-3.5" />}
              </div>
              <div className="flex items-center space-x-1.5 mt-0.5">
                {/* LIVE Badge */}
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black tracking-wider bg-gradient-to-r from-[#e1306c] to-[#fd1d1d] uppercase shadow-xs">
                  LIVE
                </span>
                <span className="flex items-center space-x-1 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full text-[11px] font-medium">
                  <Eye className="w-3 h-3" />
                  <span>{state.liveViewers}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white">
              <Volume2 className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Floating Heart Animations Engine */}
        {state.liveHeartsEnabled && (
          <div className="absolute right-5 bottom-24 pointer-events-none z-20 flex flex-col items-center">
            <span className="text-rose-500 animate-float-heart text-2xl drop-shadow-md">❤️</span>
            <span
              className="text-pink-400 animate-float-heart text-3xl drop-shadow-md"
              style={{ animationDelay: '0.8s', marginLeft: '12px' }}
            >
              💖
            </span>
            <span
              className="text-red-500 animate-float-heart text-xl drop-shadow-md"
              style={{ animationDelay: '1.4s', marginRight: '16px' }}
            >
              🔥
            </span>
            <span
              className="text-rose-400 animate-float-heart text-2xl drop-shadow-md"
              style={{ animationDelay: '2.1s' }}
            >
              ❤️
            </span>
          </div>
        )}

        {/* Live Bottom Comments Stream & Chat Bar */}
        <div className="relative z-10 p-4 space-y-3">
          <div className="max-h-44 overflow-y-auto no-scrollbar space-y-2 flex flex-col justify-end">
            {state.liveComments.map((comment) => (
              <div
                key={comment.id}
                className="flex items-start space-x-2 bg-black/30 backdrop-blur-xs rounded-full py-1 px-2.5 max-w-[85%] w-fit"
              >
                <img
                  src={comment.avatarUrl}
                  alt={comment.username}
                  className="w-5 h-5 rounded-full object-cover shrink-0 mt-0.5"
                />
                <div className="text-xs leading-tight">
                  <span className="font-bold mr-1 text-white/95">{comment.username}</span>
                  <span className="text-white/90">{comment.message}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Live Action Bar */}
          <div className="flex items-center space-x-2 pt-1">
            <div className="flex-1 bg-black/50 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-xs text-white/70">
              Add a comment...
            </div>
            <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full bg-rose-600 flex items-center justify-center text-white shadow-lg shadow-rose-600/50">
              <Heart className="w-5 h-5 fill-white" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Instagram DM Chat Mode
  if (state.mode === 'chat') {
    return (
      <div className={`w-full h-full flex flex-col ${bgClass} select-none`}>
        {/* DM Header */}
        <div className={`px-4 py-2.5 flex items-center justify-between border-b ${borderClass}`}>
          <div className="flex items-center space-x-3">
            <ArrowLeft className="w-5 h-5 cursor-pointer" />
            <div className="relative">
              <img
                src={state.avatarUrl}
                alt={state.username}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-black" />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-sm leading-tight">{state.fullName || state.username}</span>
                {state.isVerified && <InstagramBadge className="w-3 h-3" />}
              </div>
              <span className={`text-[11px] ${subtextClass}`}>{state.username} · Active now</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Phone className="w-5 h-5" />
            <Video className="w-5 h-5" />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto no-scrollbar flex flex-col justify-end">
          <div className="text-center py-4">
            <img
              src={state.avatarUrl}
              alt={state.username}
              className="w-16 h-16 rounded-full mx-auto object-cover mb-2"
            />
            <h4 className="font-bold text-sm">{state.fullName}</h4>
            <p className={`text-xs ${subtextClass}`}>Instagram · {state.username}</p>
          </div>

          {state.chatMessages.map((msg) => {
            const isMe = msg.sender === 'me';
            return (
              <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                <div className="relative group">
                  <div
                    className={`max-w-[75%] px-3.5 py-2.5 rounded-3xl text-[14px] leading-snug break-words ${
                      isMe
                        ? 'bg-[#3797f0] text-white rounded-br-md'
                        : isDark
                        ? 'bg-neutral-800 text-white rounded-bl-md'
                        : 'bg-neutral-200 text-neutral-900 rounded-bl-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.liked && (
                    <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-[10px] border-2 border-black">
                      ❤️
                    </div>
                  )}
                </div>
                {isMe && msg.status === 'read' && (
                  <span className={`text-[10px] ${subtextClass} mt-0.5 px-1`}>Seen</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <div className={`p-2.5 border-t ${borderClass} flex items-center space-x-2`}>
          <div className={`flex-1 flex items-center rounded-full px-3.5 py-2 ${isDark ? 'bg-neutral-900' : 'bg-neutral-100'}`}>
            <Camera className="w-4 h-4 text-neutral-400 mr-2" />
            <input
              type="text"
              readOnly
              placeholder="Message..."
              className="bg-transparent text-sm w-full outline-hidden placeholder:text-neutral-500"
            />
            <div className="flex items-center space-x-2 text-neutral-400">
              <Mic className="w-4 h-4" />
              <ImageIcon className="w-4 h-4" />
              <Smile className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Instagram Feed Post Mode
  return (
    <div className={`w-full h-full flex flex-col ${bgClass} select-none`}>
      {/* Top App Header */}
      <div className={`px-4 py-2.5 flex items-center justify-between border-b ${borderClass}`}>
        <span className="font-bold text-lg tracking-tight font-serif italic">Instagram</span>
        <div className="flex items-center space-x-4">
          <Heart className="w-5 h-5 cursor-pointer" />
          <Send className="w-5 h-5 -rotate-45 cursor-pointer" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Post Header */}
        <div className="px-3.5 py-2.5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div
              className={`p-[2px] rounded-full ${
                state.hasStoryRing
                  ? 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]'
                  : 'bg-transparent'
              }`}
            >
              <img
                src={state.avatarUrl}
                alt={state.username}
                className="w-8 h-8 rounded-full object-cover border border-black/40"
              />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-[13px] leading-tight cursor-pointer hover:underline">
                  {state.username}
                </span>
                {state.isVerified && <InstagramBadge className="w-3.5 h-3.5" />}
              </div>
              {state.location && (
                <span className={`text-[11px] ${subtextClass} block leading-tight`}>{state.location}</span>
              )}
            </div>
          </div>
          <MoreHorizontal className="w-5 h-5 cursor-pointer" />
        </div>

        {/* Post Media */}
        <div className="w-full bg-neutral-900 overflow-hidden relative">
          <img
            src={state.postMediaUrl}
            alt="Instagram post"
            className="w-full max-h-[380px] object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Action Row */}
        <div className="px-3.5 pt-3 pb-1 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500 cursor-pointer" />
            <MessageCircle className="w-6 h-6 cursor-pointer -scale-x-100" />
            <Send className="w-6 h-6 cursor-pointer -rotate-45" />
          </div>
          <Bookmark className="w-6 h-6 cursor-pointer" />
        </div>

        {/* Likes Count */}
        <div className="px-3.5 py-1 text-[13px] font-semibold">
          {state.likedByUsername ? (
            <span>
              Liked by <span className="cursor-pointer font-bold">{state.likedByUsername}</span> and{' '}
              <span className="cursor-pointer font-bold">{formatNumber(state.likesCount)} others</span>
            </span>
          ) : (
            <span>{formatNumber(state.likesCount)} likes</span>
          )}
        </div>

        {/* Caption */}
        <div className="px-3.5 text-[13px] leading-snug break-words">
          <span className="font-bold mr-1.5">{state.username}</span>
          <span>{state.caption}</span>
        </div>

        {/* Comments Count */}
        <div className={`px-3.5 pt-1 text-[12px] ${subtextClass} cursor-pointer`}>
          View all {state.comments.length + 14} comments
        </div>

        {/* Recent Comments */}
        <div className="px-3.5 pt-1 space-y-1">
          {state.comments.slice(0, 2).map((c) => (
            <div key={c.id} className="text-[12px] flex items-start justify-between">
              <div>
                <span className="font-bold mr-1.5">{c.author}</span>
                <span>{c.text}</span>
              </div>
              <Heart className="w-3 h-3 text-neutral-400 shrink-0 mt-0.5 ml-2" />
            </div>
          ))}
        </div>

        {/* Timestamp */}
        <div className={`px-3.5 py-2 text-[10px] ${subtextClass} uppercase tracking-wider`}>
          {state.timestamp}
        </div>
      </div>
    </div>
  );
};

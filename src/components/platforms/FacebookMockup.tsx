import React from 'react';
import { FacebookState, DeviceSettings } from '../../types';
import {
  Globe,
  Users,
  Lock,
  MoreHorizontal,
  ThumbsUp,
  MessageSquare,
  Share2,
  ArrowLeft,
  Phone,
  Video,
  Info,
  Smile,
  Image as ImageIcon,
  Mic,
  Camera,
} from 'lucide-react';

interface FacebookMockupProps {
  state: FacebookState;
  deviceSettings: DeviceSettings;
}

export const FacebookMockup: React.FC<FacebookMockupProps> = ({ state, deviceSettings }) => {
  const isDark = deviceSettings.theme === 'dark';
  const bgClass = isDark ? 'bg-[#18191a] text-[#e4e6eb]' : 'bg-[#f0f2f5] text-[#050505]';
  const cardBgClass = isDark ? 'bg-[#242526] text-[#e4e6eb]' : 'bg-white text-[#050505]';
  const borderClass = isDark ? 'border-[#393a3b]' : 'border-[#ced0d4]';
  const subtextClass = isDark ? 'text-[#b0b3b8]' : 'text-[#65676b]';

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace('.0', '') + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1).replace('.0', '') + 'K';
    return num.toLocaleString();
  };

  const totalReactions =
    state.reactions.like +
    state.reactions.love +
    state.reactions.care +
    state.reactions.haha +
    state.reactions.wow +
    state.reactions.sad +
    state.reactions.angry;

  // Messenger Chat Mode
  if (state.mode === 'messenger') {
    return (
      <div className={`w-full h-full flex flex-col ${isDark ? 'bg-[#18191a] text-[#e4e6eb]' : 'bg-white text-neutral-900'} select-none`}>
        {/* Messenger Header */}
        <div className={`px-4 py-2.5 flex items-center justify-between border-b ${borderClass}`}>
          <div className="flex items-center space-x-3">
            <ArrowLeft className="w-5 h-5 text-[#0084ff] cursor-pointer" />
            <div className="relative">
              <img
                src={state.userAvatar}
                alt={state.userName}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-black" />
            </div>
            <div>
              <span className="font-bold text-sm block leading-tight">{state.userName}</span>
              <span className={`text-[11px] ${subtextClass}`}>Active now</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-[#0084ff]">
            <Phone className="w-5 h-5" />
            <Video className="w-5 h-5" />
            <Info className="w-5 h-5" />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto no-scrollbar flex flex-col justify-end">
          <div className="text-center py-2">
            <img
              src={state.userAvatar}
              alt={state.userName}
              className="w-14 h-14 rounded-full mx-auto object-cover mb-1.5"
            />
            <h4 className="font-bold text-sm">{state.userName}</h4>
            <p className={`text-xs ${subtextClass}`}>Facebook</p>
          </div>

          {state.messengerMessages.map((msg) => {
            const isMe = msg.sender === 'me';
            return (
              <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                <div
                  className={`max-w-[75%] px-3.5 py-2 rounded-2xl text-[14px] leading-snug break-words ${
                    isMe
                      ? 'bg-gradient-to-r from-[#0084ff] to-[#00c6ff] text-white rounded-br-xs'
                      : isDark
                      ? 'bg-[#3a3b3c] text-[#e4e6eb] rounded-bl-xs'
                      : 'bg-[#e4e6eb] text-[#050505] rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className={`text-[10px] ${subtextClass} mt-0.5 px-1`}>{msg.timestamp}</span>
              </div>
            );
          })}
        </div>

        {/* Messenger Input */}
        <div className={`p-2 border-t ${borderClass} flex items-center space-x-2 text-[#0084ff]`}>
          <Camera className="w-5 h-5 cursor-pointer shrink-0" />
          <ImageIcon className="w-5 h-5 cursor-pointer shrink-0" />
          <Mic className="w-5 h-5 cursor-pointer shrink-0" />
          <div className={`flex-1 flex items-center rounded-full px-3 py-1.5 ${isDark ? 'bg-[#3a3b3c]' : 'bg-[#f0f2f5]'}`}>
            <input
              type="text"
              readOnly
              placeholder="Aa"
              className="bg-transparent text-sm w-full outline-hidden text-neutral-200 placeholder:text-neutral-400"
            />
            <Smile className="w-4 h-4 text-neutral-400 shrink-0" />
          </div>
          <ThumbsUp className="w-5 h-5 cursor-pointer shrink-0 fill-[#0084ff]" />
        </div>
      </div>
    );
  }

  // Newsfeed Post Mode
  return (
    <div className={`w-full h-full flex flex-col ${bgClass} select-none overflow-y-auto no-scrollbar`}>
      {/* Top Facebook Header */}
      <div className={`px-4 py-2.5 flex items-center justify-between border-b ${borderClass} ${cardBgClass}`}>
        <span className="text-[#1877f2] font-black text-2xl tracking-tighter">facebook</span>
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-full ${isDark ? 'bg-[#3a3b3c]' : 'bg-[#e4e6eb]'} flex items-center justify-center cursor-pointer`}>
            <MoreHorizontal className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Main Post Card */}
      <div className={`mt-2 ${cardBgClass} shadow-xs`}>
        {/* Post Header */}
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <img
              src={state.userAvatar}
              alt={state.userName}
              className="w-10 h-10 rounded-full object-cover border border-black/10"
            />
            <div>
              <span className="font-semibold text-sm leading-tight block hover:underline cursor-pointer">
                {state.userName}
              </span>
              <div className={`flex items-center space-x-1.5 text-xs ${subtextClass} mt-0.5`}>
                <span>{state.timestamp}</span>
                <span>·</span>
                {state.privacy === 'public' && <Globe className="w-3 h-3" />}
                {state.privacy === 'friends' && <Users className="w-3 h-3" />}
                {state.privacy === 'onlyme' && <Lock className="w-3 h-3" />}
              </div>
            </div>
          </div>
          <MoreHorizontal className={`w-5 h-5 ${subtextClass} cursor-pointer`} />
        </div>

        {/* Post Text */}
        <div className="px-3 pb-3 text-sm leading-relaxed whitespace-pre-wrap break-words">
          {state.postText}
        </div>

        {/* Post Media */}
        {state.hasMedia && state.mediaUrl && (
          <div className="w-full bg-neutral-900 max-h-72 overflow-hidden">
            <img
              src={state.mediaUrl}
              alt="Post Attachment"
              className="w-full max-h-72 object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* Metrics Bar: Reactions & Comments/Shares */}
        <div className={`px-3 py-2 flex items-center justify-between text-xs ${subtextClass} border-b ${borderClass}`}>
          {/* Reaction Icons Row */}
          <div className="flex items-center space-x-1">
            <div className="flex -space-x-1 items-center">
              <span className="w-4 h-4 rounded-full bg-[#1877f2] text-white flex items-center justify-center text-[9px] shadow-xs">
                👍
              </span>
              <span className="w-4 h-4 rounded-full bg-[#fa3e3e] text-white flex items-center justify-center text-[9px] shadow-xs">
                ❤️
              </span>
              <span className="w-4 h-4 rounded-full bg-[#f7b125] text-white flex items-center justify-center text-[9px] shadow-xs">
                🥰
              </span>
            </div>
            <span className="ml-1 font-medium">{formatNumber(totalReactions)}</span>
          </div>

          <div className="flex items-center space-x-3">
            <span>{formatNumber(state.commentsCount)} comments</span>
            <span>{formatNumber(state.sharesCount)} shares</span>
          </div>
        </div>

        {/* Action Buttons: Like, Comment, Share */}
        <div className={`px-2 py-1 flex items-center justify-around text-xs font-semibold ${subtextClass} border-b ${borderClass}`}>
          <button className={`flex items-center space-x-1.5 py-1.5 px-4 rounded-md hover:bg-neutral-500/10 cursor-pointer`}>
            <ThumbsUp className="w-4 h-4 text-[#1877f2]" />
            <span className="text-[#1877f2]">Like</span>
          </button>
          <button className="flex items-center space-x-1.5 py-1.5 px-4 rounded-md hover:bg-neutral-500/10 cursor-pointer">
            <MessageSquare className="w-4 h-4" />
            <span>Comment</span>
          </button>
          <button className="flex items-center space-x-1.5 py-1.5 px-4 rounded-md hover:bg-neutral-500/10 cursor-pointer">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>

        {/* Comments Section */}
        <div className="p-3 space-y-2.5">
          {state.comments.map((c) => (
            <div key={c.id} className="flex items-start space-x-2">
              <img
                src={c.avatar}
                alt={c.author}
                className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5"
              />
              <div className="flex-1">
                <div className={`rounded-2xl px-3 py-2 text-xs ${isDark ? 'bg-[#3a3b3c]' : 'bg-[#f0f2f5]'}`}>
                  <span className="font-bold block leading-tight hover:underline cursor-pointer">
                    {c.author}
                  </span>
                  <p className="mt-0.5">{c.text}</p>
                </div>
                <div className={`flex items-center space-x-3 text-[11px] font-semibold ${subtextClass} mt-1 ml-2`}>
                  <span className="cursor-pointer hover:underline">Like</span>
                  <span className="cursor-pointer hover:underline">Reply</span>
                  <span className="font-normal">{c.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

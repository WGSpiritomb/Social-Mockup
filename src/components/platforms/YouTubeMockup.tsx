import React from 'react';
import { YouTubeState, DeviceSettings } from '../../types';
import { YouTubeBadge } from '../common/Badges';
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  Download,
  Scissors,
  Bookmark,
  Bell,
  MoreVertical,
  Play,
  Maximize,
  ArrowLeft,
  Search,
  Cast,
  DollarSign,
  Send,
} from 'lucide-react';

interface YouTubeMockupProps {
  state: YouTubeState;
  deviceSettings: DeviceSettings;
}

export const YouTubeMockup: React.FC<YouTubeMockupProps> = ({ state, deviceSettings }) => {
  const isDark = deviceSettings.theme === 'dark';
  const bgClass = isDark ? 'bg-[#0f0f0f] text-white' : 'bg-white text-neutral-900';
  const subtextClass = isDark ? 'text-neutral-400' : 'text-neutral-600';
  const pillBgClass = isDark ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-neutral-100 hover:bg-neutral-200';

  // Live Stream Mode
  if (state.mode === 'live') {
    return (
      <div className={`w-full h-full flex flex-col ${bgClass} select-none overflow-hidden`}>
        {/* Video Player */}
        <div className="relative w-full aspect-video bg-black shrink-0">
          <img
            src={state.thumbnailUrl}
            alt="YouTube live feed"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Live Badge */}
          <div className="absolute top-2 left-2 flex items-center space-x-1.5">
            <span className="px-1.5 py-0.5 rounded bg-red-600 text-white font-extrabold text-[10px] uppercase tracking-wider animate-pulse">
              LIVE
            </span>
            <span className="bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded text-[11px] font-semibold text-white">
              {state.viewsCount} watching
            </span>
          </div>
        </div>

        {/* Video Info Header */}
        <div className="p-3 border-b border-neutral-800">
          <h3 className="font-bold text-sm leading-snug line-clamp-2">{state.title}</h3>
          <div className="flex items-center space-x-2 mt-2">
            <img
              src={state.channelAvatar}
              alt={state.channelName}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1">
                <span className="font-bold text-xs truncate">{state.channelName}</span>
                {state.isVerified && <YouTubeBadge className="w-3 h-3" />}
              </div>
              <span className={`text-[10px] ${subtextClass}`}>{state.subscribersCount} subscribers</span>
            </div>
            <button className="px-3 py-1 rounded-full bg-red-600 text-white font-bold text-xs">
              Subscribe
            </button>
          </div>
        </div>

        {/* Live Chat Replay Panel */}
        <div className="flex-1 flex flex-col justify-between p-3 overflow-hidden">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5 mb-2">
            <span className="font-bold text-xs uppercase tracking-wider text-neutral-400">
              Top Chat Replay
            </span>
            <MoreVertical className="w-4 h-4 text-neutral-400" />
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto no-scrollbar space-y-2">
            {state.liveChatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`p-1.5 rounded-lg text-xs flex items-start space-x-2 ${
                  msg.isSuperChat ? 'bg-amber-500/20 border border-amber-500/40' : ''
                }`}
              >
                <img
                  src={msg.avatar}
                  alt={msg.author}
                  className="w-6 h-6 rounded-full object-cover shrink-0 mt-0.5"
                />
                <div className="flex-1 min-w-0 leading-tight">
                  <div className="flex items-center space-x-1.5">
                    <span
                      className={`font-bold text-xs truncate ${
                        msg.isMod ? 'text-blue-400' : msg.isSuperChat ? 'text-amber-400' : 'text-neutral-300'
                      }`}
                    >
                      {msg.author}
                    </span>
                    {msg.isSuperChat && (
                      <span className="px-1.5 py-0.2 rounded bg-amber-500 text-black font-extrabold text-[10px]">
                        {msg.superChatAmount}
                      </span>
                    )}
                  </div>
                  <p className="text-white mt-0.5">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Live Chat Input */}
          <div className="pt-2 border-t border-neutral-800 flex items-center space-x-2">
            <div className="flex-1 bg-neutral-800 rounded-full px-3 py-1.5 text-xs text-neutral-400 flex items-center justify-between">
              <span>Chat as public viewer...</span>
              <DollarSign className="w-4 h-4 text-yellow-400" />
            </div>
            <button className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-300">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Channel Page Mode
  if (state.mode === 'channel') {
    return (
      <div className={`w-full h-full flex flex-col ${bgClass} select-none overflow-y-auto no-scrollbar`}>
        <div className="px-4 py-2 flex items-center justify-between">
          <ArrowLeft className="w-5 h-5 cursor-pointer" />
          <span className="font-bold text-sm truncate max-w-[160px]">{state.channelName}</span>
          <div className="flex items-center space-x-3">
            <Cast className="w-5 h-5" />
            <Search className="w-5 h-5" />
            <MoreVertical className="w-5 h-5" />
          </div>
        </div>

        {/* Channel Banner */}
        <div className="w-full h-24 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 relative">
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Channel Info */}
        <div className="px-4 pt-3 flex flex-col items-center text-center">
          <img
            src={state.channelAvatar}
            alt={state.channelName}
            className="w-16 h-16 rounded-full object-cover border-2 border-neutral-800 -mt-10 mb-2 shadow-lg"
          />
          <div className="flex items-center space-x-1">
            <h2 className="font-extrabold text-base">{state.channelName}</h2>
            {state.isVerified && <YouTubeBadge className="w-4 h-4" />}
          </div>
          <p className={`text-xs ${subtextClass} mt-0.5`}>
            @{state.channelName.toLowerCase().replace(/\s+/g, '')} · {state.subscribersCount} subscribers · 340 videos
          </p>
          <button
            className={`w-full mt-3 py-2 rounded-full font-semibold text-xs transition-colors ${
              state.isSubscribed
                ? isDark
                  ? 'bg-neutral-800 text-white'
                  : 'bg-neutral-200 text-neutral-900'
                : 'bg-white text-black'
            }`}
          >
            {state.isSubscribed ? 'Subscribed' : 'Subscribe'}
          </button>
        </div>

        {/* Channel Tabs */}
        <div className="flex border-b border-neutral-800 mt-4 px-4 text-xs font-semibold space-x-6">
          <span className="border-b-2 border-white pb-2 text-white">HOME</span>
          <span className={`${subtextClass} pb-2`}>VIDEOS</span>
          <span className={`${subtextClass} pb-2`}>SHORTS</span>
          <span className={`${subtextClass} pb-2`}>PLAYLISTS</span>
        </div>

        {/* Sample Video Item */}
        <div className="p-3">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-900 mb-2">
            <img
              src={state.thumbnailUrl}
              alt="Channel video"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-1.5 right-1.5 bg-black/80 px-1.5 py-0.5 rounded text-[10px] font-bold text-white">
              {state.duration}
            </span>
          </div>
          <h4 className="font-semibold text-xs leading-snug">{state.title}</h4>
          <p className={`text-[11px] ${subtextClass} mt-0.5`}>
            {state.viewsCount} views · {state.uploadDate}
          </p>
        </div>
      </div>
    );
  }

  // Standard Video Player UI
  return (
    <div className={`w-full h-full flex flex-col ${bgClass} select-none overflow-y-auto no-scrollbar`}>
      {/* Video Player Inset */}
      <div className="relative w-full aspect-video bg-black shrink-0">
        <img
          src={state.thumbnailUrl}
          alt="Video thumbnail"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-xs flex items-center justify-center text-white">
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </div>
        </div>

        {/* Bottom player controls & progress bar */}
        <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end">
          <div className="flex items-center justify-between text-[11px] text-white/90 font-medium mb-1">
            <span>
              16:24 / {state.duration}
            </span>
            <Maximize className="w-3.5 h-3.5" />
          </div>
          {/* Progress Red Line */}
          <div className="w-full h-1 bg-neutral-600 rounded-full relative overflow-hidden">
            <div
              className="h-full bg-red-600"
              style={{ width: `${state.progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Video Details */}
      <div className="p-3">
        {/* Title */}
        <h1 className="font-bold text-sm leading-snug mb-1">{state.title}</h1>

        {/* Views & Date */}
        <div className={`text-xs ${subtextClass} flex items-center space-x-2`}>
          <span>{state.viewsCount} views</span>
          <span>·</span>
          <span>{state.uploadDate}</span>
        </div>

        {/* Channel Bar */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-2.5">
            <img
              src={state.channelAvatar}
              alt={state.channelName}
              className="w-9 h-9 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-bold text-xs">{state.channelName}</span>
                {state.isVerified && <YouTubeBadge className="w-3 h-3" />}
              </div>
              <span className={`text-[11px] ${subtextClass}`}>{state.subscribersCount}</span>
            </div>
          </div>

          <button
            className={`px-4 py-1.5 rounded-full font-bold text-xs flex items-center space-x-1 transition-colors ${
              state.isSubscribed
                ? isDark
                  ? 'bg-neutral-800 text-white'
                  : 'bg-neutral-200 text-neutral-900'
                : 'bg-white text-black'
            }`}
          >
            {state.isSubscribed && <Bell className="w-3 h-3 mr-1" />}
            <span>{state.isSubscribed ? 'Subscribed' : 'Subscribe'}</span>
          </button>
        </div>

        {/* Actions Row (Like/Dislike, Share, Download, Remix) */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1 text-xs font-semibold">
          {/* Like/Dislike Pill */}
          <div className={`flex items-center rounded-full ${pillBgClass} px-3 py-1.5 shrink-0`}>
            <button className="flex items-center space-x-1.5 pr-2 border-r border-neutral-700">
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>{state.likesCount}</span>
            </button>
            <button className="pl-2">
              <ThumbsDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Share */}
          <button className={`flex items-center space-x-1.5 rounded-full ${pillBgClass} px-3 py-1.5 shrink-0`}>
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>

          {/* Download */}
          <button className={`flex items-center space-x-1.5 rounded-full ${pillBgClass} px-3 py-1.5 shrink-0`}>
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>

          {/* Remix */}
          <button className={`flex items-center space-x-1.5 rounded-full ${pillBgClass} px-3 py-1.5 shrink-0`}>
            <Scissors className="w-3.5 h-3.5" />
            <span>Remix</span>
          </button>
        </div>

        {/* Comments Teaser */}
        <div className={`mt-3 p-2.5 rounded-xl ${pillBgClass} text-xs`}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold">Comments · {state.commentsCount.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
              J
            </div>
            <p className={`line-clamp-1 ${subtextClass}`}>
              Mind-blowing editing and pacing! Best video on the topic by far.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

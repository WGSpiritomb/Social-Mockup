import React from 'react';
import { SnapchatState, DeviceSettings } from '../../types';
import {
  X,
  MoreVertical,
  Camera,
  Send,
  Phone,
  Video,
  ChevronLeft,
  Smile,
  Mic,
  Image as ImageIcon,
  Flame,
  Clock,
  Eye,
} from 'lucide-react';

interface SnapchatMockupProps {
  state: SnapchatState;
  deviceSettings: DeviceSettings;
}

export const SnapchatMockup: React.FC<SnapchatMockupProps> = ({ state }) => {
  // Mode 1: Snapchat Story / Snap Photo
  if (state.mode === 'story') {
    return (
      <div className="relative w-full h-full bg-black text-white flex flex-col justify-between overflow-hidden select-none">
        {/* Fullscreen Photo Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={state.mediaUrl}
            alt="Snap Story"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          {/* Subtle gradient vignette at top and bottom for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70 pointer-events-none" />
        </div>

        {/* Top Story Header & Segmented Progress Bar */}
        <div className="relative z-10 pt-2 px-3 space-y-2">
          {/* Top Story Progress Bar */}
          <div className="flex space-x-1 w-full">
            <div className="h-[2px] bg-white rounded-full flex-1" />
            <div className="h-[2px] bg-white/40 rounded-full flex-1" />
            <div className="h-[2px] bg-white/40 rounded-full flex-1" />
          </div>

          {/* User Info Bar */}
          <div className="flex items-center justify-between text-white drop-shadow-md">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-full border border-white/80 overflow-hidden bg-neutral-800 shadow-md">
                <img
                  src={state.avatarUrl}
                  alt={state.displayName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="leading-tight">
                <div className="flex items-center space-x-1.5">
                  <span className="font-bold text-sm tracking-tight">{state.displayName}</span>
                  <span className="text-[11px] text-white/80 font-medium">{state.timeElapsed}</span>
                </div>
                <div className="flex items-center space-x-1 text-[11px] text-white/70">
                  <span>@{state.username}</span>
                  {state.chatStreak > 0 && (
                    <span className="flex items-center text-amber-300 font-bold ml-1">
                      <Flame className="w-3 h-3 fill-amber-400 text-amber-400 inline mr-0.5" />
                      {state.chatStreak}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 font-semibold flex items-center space-x-1">
                <Clock className="w-3 h-3 text-amber-300" />
                <span>{state.timerDuration}</span>
              </span>
              <button className="p-1 rounded-full text-white/90 hover:text-white">
                <MoreVertical className="w-4 h-4" />
              </button>
              <button className="p-1 rounded-full text-white/90 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Signature Snapchat Overlay Text Banner */}
        {state.bannerText && (
          <div className="relative z-10 px-0 my-auto w-full">
            {state.bannerStyle === 'classic' ? (
              <div className="w-full py-2.5 px-4 bg-black/60 backdrop-blur-[2px] text-center font-medium text-white text-[15px] tracking-wide leading-snug">
                {state.bannerText}
              </div>
            ) : (
              <div className="px-6 text-center font-black text-2xl text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] tracking-tight">
                {state.bannerText}
              </div>
            )}
          </div>
        )}

        {/* Bottom Snapchat Reply Bar */}
        <div className="relative z-10 pb-4 px-3">
          <div className="flex items-center space-x-2">
            <div className="flex-1 flex items-center bg-black/50 backdrop-blur-md rounded-full border border-white/30 px-3.5 py-2 text-white/80">
              <span className="text-xs flex-1 text-white/70">Send a chat...</span>
              <Mic className="w-4 h-4 text-white/80 ml-2" />
            </div>

            <div className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
              <Camera className="w-4 h-4" />
            </div>

            <div className="w-9 h-9 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold shadow-md">
              <Send className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mode 2: Snapchat Chat View
  return (
    <div className="w-full h-full bg-white text-neutral-900 flex flex-col justify-between overflow-hidden select-none">
      {/* Top Chat Header */}
      <div className="px-3 pt-2 pb-2.5 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ChevronLeft className="w-6 h-6 text-neutral-600" />
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-neutral-300 bg-neutral-100">
            <img
              src={state.avatarUrl}
              alt={state.displayName}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="font-bold text-sm tracking-tight text-neutral-900">{state.displayName}</span>
              {state.chatStreak > 0 && (
                <span className="flex items-center text-amber-500 font-black text-xs">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 inline mr-0.5" />
                  {state.chatStreak}
                </span>
              )}
            </div>
            <span className="text-[11px] text-neutral-500 block">@{state.username}</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-neutral-600">
          <Phone className="w-4 h-4" />
          <Video className="w-4 h-4" />
        </div>
      </div>

      {/* Messages Thread Container */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar text-xs bg-white">
        <div className="text-center py-2">
          <span className="text-[11px] font-semibold text-neutral-400 bg-neutral-100 px-2.5 py-0.5 rounded-full">
            TODAY
          </span>
        </div>

        {state.chatMessages.map((msg) => (
          <div key={msg.id} className="space-y-1">
            {msg.type === 'snap' ? (
              <div
                className={`flex items-center space-x-2 ${
                  msg.sender === 'me' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div className="flex items-center space-x-1.5 p-2 rounded-xl bg-neutral-100 border border-neutral-200">
                  <div className="w-4 h-4 rounded-xs border-2 border-red-500 bg-red-500/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-xs" />
                  </div>
                  <span className="font-bold text-neutral-800 text-[11px]">
                    {msg.sender === 'me' ? 'Delivered Snap' : 'New Snap'}
                  </span>
                  <span className="text-[10px] text-neutral-400">{msg.timestamp}</span>
                </div>
              </div>
            ) : (
              <div
                className={`flex flex-col ${
                  msg.sender === 'me' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl ${
                    msg.sender === 'me'
                      ? 'bg-[#0096ff] text-white rounded-br-xs'
                      : 'bg-neutral-100 text-neutral-900 border-l-[3px] border-[#0096ff] rounded-bl-xs'
                  }`}
                >
                  <p className="text-[13px] leading-relaxed">{msg.text}</p>
                </div>
                <span className="text-[10px] text-neutral-400 px-1 mt-0.5">{msg.timestamp}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Chat Input Bar */}
      <div className="p-2 border-t border-neutral-200 bg-neutral-50 flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-700">
          <Camera className="w-4 h-4" />
        </div>
        <div className="flex-1 bg-white border border-neutral-300 rounded-full px-3 py-1.5 flex items-center">
          <span className="text-xs text-neutral-400 flex-1">Send a chat</span>
          <Smile className="w-4 h-4 text-neutral-500" />
        </div>
        <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-700">
          <Mic className="w-4 h-4" />
        </div>
        <div className="w-8 h-8 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold">
          <Send className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};

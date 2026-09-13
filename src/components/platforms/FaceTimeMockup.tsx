import React from 'react';
import { FaceTimeState, DeviceSettings } from '../../types';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  RefreshCw,
  Share2,
  Volume2,
  Sparkles,
} from 'lucide-react';

interface FaceTimeMockupProps {
  state: FaceTimeState;
  deviceSettings: DeviceSettings;
}

export const FaceTimeMockup: React.FC<FaceTimeMockupProps> = ({ state, deviceSettings }) => {
  // FaceTime Audio Call Mode
  if (state.mode === 'audio') {
    return (
      <div className="relative w-full h-full bg-gradient-to-b from-[#1a1c29] via-[#0d0e15] to-black text-white select-none flex flex-col justify-between p-6">
        {/* Top Info */}
        <div className="pt-6 flex flex-col items-center text-center">
          <h2 className="font-bold text-xl tracking-tight mb-1">{state.contactName}</h2>
          <p className="text-xs text-neutral-400 font-medium">FaceTime Audio</p>
          <p className="text-sm font-semibold text-neutral-300 mt-1">{state.duration}</p>
        </div>

        {/* Center Big Avatar with Subtle Ripple Ring */}
        <div className="flex flex-col items-center justify-center my-auto">
          <div className="relative">
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
              <img
                src={state.contactAvatar}
                alt={state.contactName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Floating Bottom Control Bar */}
        <div className="pb-4">
          <div className="bg-neutral-800/80 backdrop-blur-xl border border-white/10 rounded-full py-3 px-6 flex items-center justify-between shadow-2xl">
            <button
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                state.isMuted ? 'bg-white text-black' : 'bg-neutral-700 text-white'
              }`}
            >
              {state.isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <button className="w-12 h-12 rounded-full bg-neutral-700 text-white flex items-center justify-center">
              <Volume2 className="w-5 h-5" />
            </button>

            <button className="w-12 h-12 rounded-full bg-neutral-700 text-white flex items-center justify-center">
              <Video className="w-5 h-5" />
            </button>

            <button className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg shadow-red-600/40">
              <PhoneOff className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active FaceTime Video Call Mode
  return (
    <div className="relative w-full h-full bg-black text-white select-none overflow-hidden flex flex-col justify-between">
      {/* Fullscreen Video Background (Remote caller) */}
      <div className="absolute inset-0 z-0">
        <img
          src={state.backgroundMediaUrl}
          alt="FaceTime Remote Video Feed"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
      </div>

      {/* Top Header info */}
      <div className="relative z-10 px-4 pt-3 flex items-center justify-between">
        <div className="bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
          <span className="font-bold text-xs mr-2">{state.contactName}</span>
          <span className="text-[11px] text-neutral-300">{state.duration}</span>
        </div>

        <button className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white">
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Picture-in-Picture (PiP) Local Self-View Inset */}
      <div className="absolute right-4 top-14 w-28 h-40 rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl z-20 bg-neutral-900">
        <img
          src={state.selfieMediaUrl}
          alt="Selfie Camera Inset"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-1 right-1 bg-black/50 backdrop-blur-xs p-1 rounded-full text-white/80">
          <RefreshCw className="w-3 h-3" />
        </div>
      </div>

      {/* Floating Bottom iOS Call Control Bar */}
      <div className="relative z-10 p-4 pb-4">
        <div className="bg-neutral-900/80 backdrop-blur-2xl border border-white/15 rounded-full py-2.5 px-4 flex items-center justify-around shadow-2xl">
          {/* Mute toggle */}
          <button
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
              state.isMuted ? 'bg-white text-black' : 'bg-neutral-800 text-white'
            }`}
          >
            {state.isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Camera Flip */}
          <button className="w-11 h-11 rounded-full bg-neutral-800 text-white flex items-center justify-center">
            <RefreshCw className="w-5 h-5" />
          </button>

          {/* Camera On/Off */}
          <button className="w-11 h-11 rounded-full bg-neutral-800 text-white flex items-center justify-center">
            <Video className="w-5 h-5" />
          </button>

          {/* Effects */}
          <button className="w-11 h-11 rounded-full bg-neutral-800 text-white flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-amber-400" />
          </button>

          {/* End Call Button */}
          <button className="w-11 h-11 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg shadow-red-600/40">
            <PhoneOff className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { XVideosState, DeviceSettings } from '../../types';
import {
  Play,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bookmark,
  Search,
  Menu,
  CheckCircle,
  MessageSquare,
  Maximize,
  Volume2,
} from 'lucide-react';

interface XVideosMockupProps {
  state: XVideosState;
  deviceSettings: DeviceSettings;
}

export const XVideosMockup: React.FC<XVideosMockupProps> = ({ state }) => {
  return (
    <div className="w-full h-full bg-[#111111] text-neutral-200 flex flex-col overflow-y-auto custom-scrollbar select-none text-xs">
      {/* Top XVideos Red & Black Header */}
      <div className="bg-[#1e1e1e] border-b border-neutral-800 px-3 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2">
          {/* Authentic XVideos Logo Badge */}
          <div className="flex items-center">
            <div className="w-6 h-6 bg-[#d92323] rounded-xs flex items-center justify-center font-black text-white text-sm shadow-xs">
              X
            </div>
            <span className="font-extrabold text-white text-sm tracking-tighter ml-1">
              VIDEOS
            </span>
            <span className="text-[9px] text-[#d92323] font-bold ml-0.5">.COM</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-neutral-400">
          <Search className="w-4 h-4 hover:text-white" />
          <Menu className="w-5 h-5 hover:text-white" />
        </div>
      </div>

      {/* Video Player Canvas */}
      <div className="relative w-full aspect-video bg-black shrink-0 overflow-hidden group">
        <img
          src={state.thumbnailUrl}
          alt={state.videoTitle}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />

        {/* Big Center Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="w-12 h-12 rounded-full bg-[#d92323]/90 text-white flex items-center justify-center shadow-xl shadow-black/80 hover:scale-110 transition-transform">
            <Play className="w-6 h-6 fill-white ml-0.5" />
          </div>
        </div>

        {/* Bottom Video Controls & Red Seekbar */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-2.5 pb-1.5 pt-4">
          <div className="flex items-center justify-between text-[11px] text-white/90 mb-1 font-mono">
            <span>
              {Math.floor((state.progressPercent / 100) * 20)}:15 / {state.duration}
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-[9px] bg-[#d92323] px-1 py-0.2 rounded-xs font-bold text-white uppercase">
                1080p
              </span>
              <Volume2 className="w-3.5 h-3.5" />
              <Maximize className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Signature Red Progress Bar */}
          <div className="relative w-full h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 bottom-0 bg-[#d92323]"
              style={{ width: `${state.progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Video Information & Metrics */}
      <div className="p-3 space-y-3 flex-1">
        {/* Title */}
        <h2 className="font-bold text-sm text-white leading-snug">
          {state.videoTitle}
        </h2>

        {/* Views & Rating Row */}
        <div className="flex items-center justify-between pb-2 border-b border-neutral-800/80 text-neutral-400">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white text-xs">{state.viewsCount} views</span>
            <span>•</span>
            <span className="text-[11px]">{state.uploadDate}</span>
          </div>

          {/* Rating Percentage */}
          <div className="flex items-center space-x-1 text-green-400 font-bold bg-green-950/40 px-2 py-0.5 rounded border border-green-800/40">
            <ThumbsUp className="w-3 h-3 fill-green-400" />
            <span>{state.ratingPercent}%</span>
          </div>
        </div>

        {/* Action Buttons: Like, Dislike, Share, Favorite */}
        <div className="grid grid-cols-4 gap-1.5 py-1">
          <button className="flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-neutral-800/70 hover:bg-neutral-800 text-neutral-300">
            <ThumbsUp className="w-4 h-4 text-green-400 mb-0.5" />
            <span className="text-[10px] font-semibold">{state.likesCount}</span>
          </button>
          <button className="flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-neutral-800/70 hover:bg-neutral-800 text-neutral-300">
            <ThumbsDown className="w-4 h-4 text-neutral-400 mb-0.5" />
            <span className="text-[10px] font-semibold">{state.dislikesCount}</span>
          </button>
          <button className="flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-neutral-800/70 hover:bg-neutral-800 text-neutral-300">
            <Share2 className="w-4 h-4 text-blue-400 mb-0.5" />
            <span className="text-[10px] font-semibold">Share</span>
          </button>
          <button className="flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-neutral-800/70 hover:bg-neutral-800 text-neutral-300">
            <Bookmark className="w-4 h-4 text-amber-400 mb-0.5" />
            <span className="text-[10px] font-semibold">Save</span>
          </button>
        </div>

        {/* Uploader / Channel Details */}
        <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-neutral-700 bg-neutral-800">
              <img
                src={state.uploaderAvatar}
                alt={state.uploaderName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-bold text-white text-xs">{state.uploaderName}</span>
                {state.isVerified && (
                  <CheckCircle className="w-3.5 h-3.5 text-[#d92323] fill-[#d92323]/20" />
                )}
              </div>
              <span className="text-[11px] text-neutral-400">{state.subscribersCount} subscribers</span>
            </div>
          </div>

          <button className="px-3 py-1.5 rounded-lg bg-[#d92323] hover:bg-red-600 text-white font-bold text-xs shadow-md shadow-red-900/40">
            Subscribe
          </button>
        </div>

        {/* Tags / Categories */}
        {state.tags && state.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {state.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-neutral-800 text-neutral-300 text-[10px] font-medium hover:bg-neutral-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Comments Section */}
        <div className="pt-2 border-t border-neutral-800 space-y-2">
          <div className="flex items-center justify-between text-neutral-300 font-semibold">
            <div className="flex items-center space-x-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-neutral-400" />
              <span>Comments ({state.commentsCount})</span>
            </div>
          </div>

          {state.comments && state.comments.map((comment) => (
            <div key={comment.id} className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800/80 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <div className="w-5 h-5 rounded-full overflow-hidden bg-neutral-800">
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-bold text-neutral-300 text-[11px]">{comment.author}</span>
                </div>
                <span className="text-[10px] text-neutral-500">{comment.timestamp}</span>
              </div>
              <p className="text-[11px] text-neutral-300 pl-6 leading-relaxed">{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

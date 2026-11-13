import React from 'react';
import { PornhubState, DeviceSettings } from '../../types';
import { SafeImage } from '../common/SafeImage';
import {
  Play,
  ThumbsUp,
  ThumbsDown,
  Heart,
  Share2,
  BookmarkPlus,
  Search,
  Menu,
  CheckCircle2,
  MessageSquare,
  Volume2,
  Maximize,
} from 'lucide-react';

interface PornhubMockupProps {
  state: PornhubState;
  deviceSettings: DeviceSettings;
}

export const PornhubMockup: React.FC<PornhubMockupProps> = ({ state, deviceSettings }) => {
  const isDesktop = deviceSettings?.viewFormat === 'desktop';

  return (
    <div
      className={`w-full ${
        isDesktop ? 'h-auto overflow-visible' : 'h-full overflow-y-auto'
      } bg-[#0e0e0e] text-neutral-100 flex flex-col no-scrollbar select-none text-xs`}
    >
      {/* Top Pornhub Header */}
      <div className="bg-[#1b1b1b] border-b border-neutral-800 px-3.5 py-2.5 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2.5">
          <Menu className="w-5 h-5 text-neutral-300" />
          <div className="flex items-center font-black text-base tracking-tight">
            <span className="text-white">Porn</span>
            <span className="ml-0.5 px-1.5 py-0.5 rounded-sm bg-[#ff9000] text-black leading-none">
              hub
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-neutral-300">
          <Search className="w-4 h-4" />
        </div>
      </div>

      {/* Video Player */}
      <div className="relative w-full aspect-video bg-black shrink-0 overflow-hidden">
        <SafeImage
          src={state.thumbnailUrl}
          alt={state.videoTitle}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black/25">
          <div className="w-12 h-12 rounded-full bg-[#ff9000]/95 text-black flex items-center justify-center shadow-xl">
            <Play className="w-6 h-6 fill-black ml-0.5" />
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent px-3 pb-2 pt-5">
          <div className="flex items-center justify-between text-[11px] text-white/90 mb-1.5 font-mono tabular-nums">
            <span>
              {Math.floor((state.progressPercent / 100) * 31)}:10 / {state.duration}
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-[9px] bg-[#ff9000] px-1.5 py-0.5 rounded-xs font-extrabold text-black">
                4K
              </span>
              <Volume2 className="w-3.5 h-3.5" />
              <Maximize className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="relative w-full h-1 bg-white/25 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 bottom-0 bg-[#ff9000]"
              style={{ width: `${state.progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Video Info & Actions */}
      <div className="p-3.5 space-y-3 flex-1">
        <h2 className="font-bold text-[15px] text-white leading-snug break-words">
          {state.videoTitle}
        </h2>

        <div className="flex items-center justify-between pb-2.5 border-b border-neutral-800 text-neutral-400 tabular-nums">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-neutral-200">{state.viewsCount} views</span>
            <span>·</span>
            <span>{state.uploadDate}</span>
          </div>

          <div className="flex items-center space-x-1 text-[#ff9000] font-bold bg-[#ff9000]/10 px-2 py-0.5 rounded border border-[#ff9000]/30">
            <ThumbsUp className="w-3 h-3 fill-[#ff9000]" />
            <span>{state.ratingPercent}%</span>
          </div>
        </div>

        {/* Action Row */}
        <div className="grid grid-cols-5 gap-1.5 tabular-nums">
          <div className="flex flex-col items-center justify-center py-1.5 rounded-lg bg-[#1c1c1c] border border-neutral-800 text-neutral-200">
            <ThumbsUp className="w-4 h-4 text-[#ff9000] mb-0.5" />
            <span className="text-[10px] font-semibold">{state.likesCount}</span>
          </div>
          <div className="flex flex-col items-center justify-center py-1.5 rounded-lg bg-[#1c1c1c] border border-neutral-800 text-neutral-400">
            <ThumbsDown className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] font-semibold">{state.dislikesCount}</span>
          </div>
          <div className="flex flex-col items-center justify-center py-1.5 rounded-lg bg-[#1c1c1c] border border-neutral-800 text-neutral-300">
            <Heart className="w-4 h-4 text-rose-500 mb-0.5" />
            <span className="text-[10px] font-semibold">Favorite</span>
          </div>
          <div className="flex flex-col items-center justify-center py-1.5 rounded-lg bg-[#1c1c1c] border border-neutral-800 text-neutral-300">
            <BookmarkPlus className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] font-semibold">Save</span>
          </div>
          <div className="flex flex-col items-center justify-center py-1.5 rounded-lg bg-[#1c1c1c] border border-neutral-800 text-neutral-300">
            <Share2 className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] font-semibold">Share</span>
          </div>
        </div>

        {/* Channel Card */}
        <div className="p-2.5 rounded-xl bg-[#181818] border border-neutral-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5 min-w-0">
            <SafeImage
              src={state.channelAvatar}
              alt={state.channelName}
              fallbackText={state.channelName}
              className="w-10 h-10 rounded-full object-cover border border-neutral-700 shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center space-x-1">
                <span className="font-bold text-white truncate">{state.channelName}</span>
                {state.isVerified && (
                  <CheckCircle2 className="w-3.5 h-3.5 fill-[#ff9000] text-black shrink-0" />
                )}
              </div>
              <span className="text-[11px] text-neutral-400 tabular-nums">
                {state.subscribersCount} subscribers
              </span>
            </div>
          </div>

          <button className="px-3 py-1.5 rounded-lg bg-[#ff9000] hover:bg-[#e58100] text-black font-extrabold text-xs shrink-0">
            Subscribe
          </button>
        </div>

        {/* Categories / Tags */}
        {state.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {state.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-full bg-[#1b1b1b] border border-neutral-800 text-neutral-300 text-[10px] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Comments */}
        <div className="pt-2.5 border-t border-neutral-800 space-y-2">
          <div className="flex items-center space-x-1.5 font-bold text-neutral-200 tabular-nums">
            <MessageSquare className="w-3.5 h-3.5 text-[#ff9000]" />
            <span>Comments ({state.commentsCount})</span>
          </div>

          {state.comments.map((comment) => (
            <div
              key={comment.id}
              className="p-2.5 rounded-lg bg-[#161616] border border-neutral-800/80 space-y-1"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <SafeImage
                    src={comment.avatar}
                    alt={comment.author}
                    fallbackText={comment.author}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span className="font-bold text-neutral-200 text-[11px]">{comment.author}</span>
                </div>
                <span className="text-[10px] text-neutral-500">{comment.timestamp}</span>
              </div>
              <p className="text-[11px] text-neutral-300 pl-7 leading-relaxed">{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

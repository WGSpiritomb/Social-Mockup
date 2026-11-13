import React from 'react';
import { BlackedState, DeviceSettings } from '../../types';
import { SafeImage } from '../common/SafeImage';
import {
  Play,
  Star,
  Heart,
  Share2,
  Bookmark,
  Search,
  Menu,
  Volume2,
  Maximize,
  MessageSquare,
} from 'lucide-react';

interface BlackedMockupProps {
  state: BlackedState;
  deviceSettings: DeviceSettings;
}

export const BlackedMockup: React.FC<BlackedMockupProps> = ({ state, deviceSettings }) => {
  const isDesktop = deviceSettings?.viewFormat === 'desktop';

  return (
    <div
      className={`w-full ${
        isDesktop ? 'h-auto overflow-visible' : 'h-full overflow-y-auto'
      } bg-[#08080a] text-neutral-100 flex flex-col no-scrollbar select-none text-xs`}
    >
      {/* Top Luxury Editorial Studio Header */}
      <div className="bg-black border-b border-neutral-800/90 px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2">
          <span className="font-black text-white text-sm tracking-[0.28em] uppercase">
            BLACKED
          </span>
        </div>

        <div className="flex items-center space-x-3 text-neutral-300">
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#d4af37]">
            VIP
          </span>
          <Search className="w-4 h-4" />
          <Menu className="w-4 h-4" />
        </div>
      </div>

      {/* Cinematic 16:9 Scene Player */}
      <div className="relative w-full aspect-video bg-black shrink-0 overflow-hidden">
        <SafeImage
          src={state.thumbnailUrl}
          alt={state.sceneTitle}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex items-center justify-center">
          <div className="w-13 h-13 rounded-full bg-white/15 backdrop-blur-md border border-white/40 text-white flex items-center justify-center shadow-2xl">
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </div>
        </div>

        <div className="absolute top-2.5 left-3 flex items-center space-x-2">
          <span className="px-2 py-0.5 bg-black/75 border border-[#d4af37]/50 text-[#d4af37] font-bold text-[9px] tracking-[0.18em] uppercase">
            {state.qualityBadge}
          </span>
        </div>

        <div className="absolute bottom-0 inset-x-0 px-3 pb-2.5 pt-4">
          <div className="flex items-center justify-between text-[11px] text-white/90 mb-1.5 font-mono tabular-nums">
            <span>
              {Math.floor((state.progressPercent / 100) * 44)}:12 / {state.duration}
            </span>
            <div className="flex items-center space-x-2.5">
              <Volume2 className="w-3.5 h-3.5" />
              <Maximize className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="relative w-full h-1 bg-white/25 overflow-hidden">
            <div
              className="absolute left-0 top-0 bottom-0 bg-[#d4af37]"
              style={{ width: `${state.progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Scene Editorial Metadata */}
      <div className="p-4 space-y-3.5 flex-1">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] tracking-[0.16em] uppercase text-neutral-400">
            <span>{state.releaseDate}</span>
            <span className="tabular-nums">{state.viewsCount} VIEWS</span>
          </div>

          <h2 className="font-black text-base text-white tracking-wide uppercase leading-snug break-words">
            {state.sceneTitle}
          </h2>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center space-x-1.5 tabular-nums">
              <div className="flex items-center space-x-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3.5 h-3.5 ${
                      star <= Math.round(state.rating)
                        ? 'text-[#d4af37] fill-[#d4af37]'
                        : 'text-neutral-700'
                    }`}
                  />
                ))}
              </div>
              <span className="font-bold text-[#d4af37] text-xs">{state.rating.toFixed(1)}</span>
            </div>

            <div className="flex items-center space-x-3 text-neutral-300 tabular-nums">
              <span className="flex items-center space-x-1 text-[11px]">
                <Heart className="w-3.5 h-3.5 text-white" />
                <span>{state.likesCount}</span>
              </span>
              <Bookmark className="w-3.5 h-3.5" />
              <Share2 className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Cast & Director */}
        <div className="p-3 rounded-lg bg-[#111115] border border-neutral-800/90 flex items-center justify-between">
          <div className="flex items-center space-x-3 min-w-0">
            <SafeImage
              src={state.castAvatar}
              alt={state.castNames}
              fallbackText={state.castNames}
              className="w-10 h-10 rounded-full object-cover border border-[#d4af37]/50 shrink-0"
            />
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-widest text-neutral-400">
                Starring
              </div>
              <div className="font-bold text-white text-xs truncate">{state.castNames}</div>
              <div className="text-[10px] text-neutral-400 truncate">
                Directed by {state.directorName}
              </div>
            </div>
          </div>

          <span className="px-2.5 py-1 border border-white/25 text-white font-bold text-[10px] tracking-widest uppercase shrink-0">
            CAST
          </span>
        </div>

        {/* Synopsis */}
        <p className="text-xs text-neutral-300 leading-relaxed">{state.synopsis}</p>

        {/* Studio Tags */}
        {state.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {state.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-300 text-[9px] font-bold tracking-widest uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Member Comments */}
        <div className="pt-3 border-t border-neutral-800/90 space-y-2">
          <div className="flex items-center space-x-1.5 font-bold text-xs tracking-wider uppercase text-neutral-200 tabular-nums">
            <MessageSquare className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Member Reviews ({state.commentsCount})</span>
          </div>

          {state.comments.map((comment) => (
            <div
              key={comment.id}
              className="p-2.5 rounded-lg bg-[#111115] border border-neutral-800/80 space-y-1"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <SafeImage
                    src={comment.avatar}
                    alt={comment.author}
                    fallbackText={comment.author}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span className="font-bold text-white text-[11px]">{comment.author}</span>
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

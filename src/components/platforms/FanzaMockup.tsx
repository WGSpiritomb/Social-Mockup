import React from 'react';
import { FanzaState, DeviceSettings } from '../../types';
import { SafeImage } from '../common/SafeImage';
import {
  Play,
  Star,
  Heart,
  ShoppingCart,
  Search,
  Menu,
  CheckCircle2,
  Bookmark,
  ThumbsUp,
  Volume2,
  Maximize,
  Clock,
  Tag,
  Film,
  MessageSquare,
} from 'lucide-react';

interface FanzaMockupProps {
  state: FanzaState;
  deviceSettings: DeviceSettings;
}

export const FanzaMockup: React.FC<FanzaMockupProps> = ({ state, deviceSettings }) => {
  const isDark = deviceSettings.theme === 'dark';
  const isDesktop = deviceSettings?.viewFormat === 'desktop';
  const isStream = state.mode === 'stream';

  const bgClass = isDark ? 'bg-[#121214] text-neutral-100' : 'bg-[#f6f6f8] text-neutral-900';
  const cardClass = isDark ? 'bg-[#1a1a1f] border-neutral-800' : 'bg-white border-neutral-200';
  const mutedText = isDark ? 'text-neutral-400' : 'text-neutral-500';
  const subtleBg = isDark ? 'bg-neutral-800/80' : 'bg-neutral-100';
  const borderClass = isDark ? 'border-neutral-800' : 'border-neutral-200';

  const renderStars = (rating: number, sizeClass = 'w-3.5 h-3.5') => {
    const rounded = Math.round(rating);
    return (
      <div className="flex items-center space-x-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${
              star <= rounded
                ? 'text-amber-400 fill-amber-400'
                : isDark
                ? 'text-neutral-700'
                : 'text-neutral-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      className={`w-full ${
        isDesktop ? 'h-auto overflow-visible' : 'h-full overflow-y-auto'
      } ${bgClass} flex flex-col no-scrollbar select-none text-xs`}
    >
      {/* Top FANZA Header */}
      <div
        className={`px-3.5 py-2.5 flex items-center justify-between border-b shrink-0 ${
          isDark ? 'bg-[#18181c] border-neutral-800' : 'bg-white border-neutral-200'
        }`}
      >
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <span className="px-1.5 py-0.5 rounded-xs bg-[#e60012] text-white font-black text-xs tracking-wider leading-none">
              FANZA
            </span>
            {isStream && (
              <span className="ml-1.5 text-[10px] font-bold tracking-wide text-[#e60012] uppercase">
                TV Player
              </span>
            )}
          </div>
        </div>

        <div className={`flex items-center space-x-3 ${mutedText}`}>
          <Search className="w-4 h-4" />
          <div className="relative">
            <ShoppingCart className="w-4 h-4" />
            <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-[#e60012] text-white text-[8px] font-bold flex items-center justify-center tabular-nums">
              1
            </span>
          </div>
          <Menu className="w-4 h-4" />
        </div>
      </div>

      {/* Video Player / Package Sample Preview */}
      <div className="relative w-full aspect-video bg-black shrink-0 overflow-hidden">
        <SafeImage
          src={state.coverUrl}
          alt={state.title}
          className="w-full h-full object-cover"
        />

        {/* Center Play Trigger */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/25">
          <div className="w-12 h-12 rounded-full bg-[#e60012]/90 text-white flex items-center justify-center shadow-xl shadow-black/60 border border-white/25">
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </div>
        </div>

        {/* Top Corner Badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5">
          <span className="px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-xs text-white font-mono font-bold text-[10px] border border-white/15">
            {state.productCode}
          </span>
          {state.qualityBadge && (
            <span className="px-1.5 py-0.5 rounded bg-[#e60012] text-white font-bold text-[9px] uppercase tracking-wide">
              {state.qualityBadge}
            </span>
          )}
        </div>

        {/* Bottom Sample / Stream Bar */}
        {isStream ? (
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent px-3 pb-2 pt-5">
            <div className="flex items-center justify-between text-[11px] text-white/90 mb-1.5 font-mono tabular-nums">
              <span>
                {Math.floor((state.progressPercent / 100) * 142)}分 / {state.duration}
              </span>
              <div className="flex items-center space-x-2.5">
                <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded-xs font-bold">
                  1080p
                </span>
                <Volume2 className="w-3.5 h-3.5" />
                <Maximize className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="relative w-full h-1.5 bg-white/25 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 bottom-0 bg-[#e60012]"
                style={{ width: `${state.progressPercent}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/75 backdrop-blur-xs text-white font-semibold text-[10px] flex items-center space-x-1 tabular-nums">
            <Clock className="w-3 h-3 text-neutral-300" />
            <span>サンプル動画 · {state.duration}</span>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="p-3.5 space-y-3 flex-1">
        {/* Title & Rating Summary */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-semibold">
            <span className="text-[#e60012] font-mono tracking-wide">{state.productCode}</span>
            <span className={mutedText}>配信開始日: {state.releaseDate}</span>
          </div>

          <h2 className="font-bold text-[14px] leading-snug break-words">{state.title}</h2>

          <div className="flex items-center justify-between pt-0.5">
            <div className="flex items-center space-x-1.5 tabular-nums">
              {renderStars(state.rating)}
              <span className="font-bold text-amber-400 text-xs">{state.rating.toFixed(1)}</span>
              <span className={`text-[11px] ${mutedText}`}>
                ({state.reviewCount.toLocaleString()}件)
              </span>
            </div>

            <div className={`flex items-center space-x-1 text-[11px] font-semibold tabular-nums ${mutedText}`}>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>{state.favoritesCount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Storefront Price & CTA Card (Product Mode) */}
        {!isStream && (
          <div className={`p-3 rounded-xl border ${cardClass} space-y-2.5`}>
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline space-x-2 tabular-nums">
                {state.discountPercent > 0 && (
                  <span className="px-1.5 py-0.5 rounded bg-[#e60012] text-white font-extrabold text-[10px]">
                    {state.discountPercent}% OFF
                  </span>
                )}
                <span className="text-xl font-black text-[#e60012]">
                  ¥{state.priceYen.toLocaleString()}
                </span>
                {state.originalPriceYen > state.priceYen && (
                  <span className={`text-xs line-through ${mutedText}`}>
                    ¥{state.originalPriceYen.toLocaleString()}
                  </span>
                )}
              </div>
              <span className={`text-[10px] ${mutedText}`}>税込 / 即時再生</span>
            </div>

            <div className="grid grid-cols-5 gap-2">
              <button className="col-span-4 py-2 rounded-lg bg-[#e60012] hover:bg-[#cc0010] text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm">
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>バスケットに入れる</span>
              </button>
              <button
                className={`col-span-1 py-2 rounded-lg border flex items-center justify-center ${borderClass} ${subtleBg}`}
                aria-label="Favorite"
              >
                <Bookmark className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </div>
        )}

        {/* Performer & Maker Info */}
        <div className={`p-2.5 rounded-xl border ${cardClass} flex items-center justify-between`}>
          <div className="flex items-center space-x-2.5 min-w-0">
            <SafeImage
              src={state.performerAvatar}
              alt={state.performerName}
              fallbackText={state.performerName}
              className="w-10 h-10 rounded-full object-cover border border-[#e60012]/40 shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center space-x-1">
                <span className="font-bold text-xs truncate">{state.performerName}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#e60012] shrink-0" />
              </div>
              <div className={`flex items-center space-x-1.5 text-[11px] ${mutedText} truncate`}>
                <Film className="w-3 h-3 shrink-0" />
                <span>{state.makerName}</span>
              </div>
            </div>
          </div>

          <span className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] shrink-0 ${subtleBg}`}>
            フォロー中
          </span>
        </div>

        {/* Genre / Spec Tags */}
        {state.tags && state.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <Tag className={`w-3 h-3 ${mutedText} mr-0.5`} />
            {state.tags.map((tag, idx) => (
              <span
                key={idx}
                className={`px-2 py-0.5 rounded-md border text-[10px] font-medium ${borderClass} ${subtleBg}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* User Reviews */}
        <div className={`pt-2.5 border-t ${borderClass} space-y-2`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 font-bold text-xs">
              <MessageSquare className="w-3.5 h-3.5 text-[#e60012]" />
              <span className="tabular-nums">カスタマーレビュー ({state.reviewCount.toLocaleString()})</span>
            </div>
            <span className="text-[11px] text-[#e60012] font-semibold">すべて見る</span>
          </div>

          {state.reviews.map((review) => (
            <div key={review.id} className={`p-2.5 rounded-xl border ${cardClass} space-y-1.5`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {renderStars(review.rating, 'w-3 h-3')}
                  <span className="font-bold text-[11px]">{review.author}</span>
                </div>
                <span className={`text-[10px] tabular-nums ${mutedText}`}>{review.date}</span>
              </div>
              {review.title && <p className="font-bold text-xs">{review.title}</p>}
              <p className={`text-[11px] leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                {review.text}
              </p>
              <div className={`flex items-center space-x-1 text-[10px] tabular-nums ${mutedText} pt-0.5`}>
                <ThumbsUp className="w-3 h-3" />
                <span>参考になった ({review.helpfulCount})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

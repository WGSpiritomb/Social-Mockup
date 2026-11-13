import React from 'react';
import { DlsiteState, DeviceSettings } from '../../types';
import { SafeImage } from '../common/SafeImage';
import {
  Star,
  ShoppingCart,
  Search,
  Menu,
  Heart,
  Play,
  Volume2,
  Maximize,
  ThumbsUp,
  Headphones,
  MessageSquare,
} from 'lucide-react';

interface DlsiteMockupProps {
  state: DlsiteState;
  deviceSettings: DeviceSettings;
}

export const DlsiteMockup: React.FC<DlsiteMockupProps> = ({ state, deviceSettings }) => {
  const isDark = deviceSettings.theme === 'dark';
  const isDesktop = deviceSettings?.viewFormat === 'desktop';
  const isViewer = state.mode === 'viewer';

  const bgClass = isDark ? 'bg-[#12151c] text-neutral-100' : 'bg-[#f3f5f8] text-neutral-900';
  const cardClass = isDark ? 'bg-[#1a1f29] border-neutral-800' : 'bg-white border-neutral-200';
  const mutedClass = isDark ? 'text-neutral-400' : 'text-neutral-500';
  const borderClass = isDark ? 'border-neutral-800' : 'border-neutral-200';
  const subtleBg = isDark ? 'bg-neutral-800/80' : 'bg-neutral-100';

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
      {/* Top DLsite Header */}
      <div
        className={`px-3.5 py-2.5 flex items-center justify-between border-b shrink-0 ${
          isDark ? 'bg-[#151a24] border-neutral-800' : 'bg-[#004c98] text-white border-[#003f7f]'
        }`}
      >
        <div className="flex items-center space-x-2">
          <span className="font-black text-base tracking-tight text-white">
            DL<span className="text-[#45b6ff]">site</span>
          </span>
          <span className="px-1.5 py-0.5 rounded bg-white/15 text-white font-semibold text-[10px]">
            {state.workFormat}
          </span>
        </div>

        <div className="flex items-center space-x-3 text-white/90">
          <Search className="w-4 h-4" />
          <div className="relative">
            <ShoppingCart className="w-4 h-4" />
            <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-[#ff5a00] text-white text-[8px] font-bold flex items-center justify-center tabular-nums">
              1
            </span>
          </div>
          <Menu className="w-4 h-4" />
        </div>
      </div>

      {/* Cover Art / Preview Player */}
      <div className="relative w-full aspect-video bg-black shrink-0 overflow-hidden">
        <SafeImage
          src={state.coverUrl}
          alt={state.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black/25">
          <div className="w-12 h-12 rounded-full bg-[#005bac]/90 text-white flex items-center justify-center shadow-xl border border-white/25">
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </div>
        </div>

        <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5">
          <span className="px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-xs text-white font-mono font-bold text-[10px] border border-white/15">
            {state.workCode}
          </span>
          <span className="px-1.5 py-0.5 rounded bg-[#005bac] text-white font-bold text-[10px] flex items-center space-x-1">
            <Headphones className="w-2.5 h-2.5" />
            <span>{state.workFormat}</span>
          </span>
        </div>

        {isViewer ? (
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent px-3 pb-2 pt-5">
            <div className="flex items-center justify-between text-[11px] text-white/90 mb-1.5 font-mono tabular-nums">
              <span>Sample Track 01 · {state.progressPercent}%</span>
              <div className="flex items-center space-x-2">
                <Volume2 className="w-3.5 h-3.5" />
                <Maximize className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="relative w-full h-1.5 bg-white/25 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 bottom-0 bg-[#45b6ff]"
                style={{ width: `${state.progressPercent}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/75 text-white font-semibold text-[10px] tabular-nums">
            {state.durationOrSize}
          </div>
        )}
      </div>

      {/* Work Metadata & Store Card */}
      <div className="p-3.5 space-y-3 flex-1">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-semibold">
            <span className="text-[#45b6ff] font-mono">{state.workCode}</span>
            <span className={mutedClass}>公開日: {state.releaseDate}</span>
          </div>

          <h2 className="font-bold text-[14px] leading-snug break-words">{state.title}</h2>

          <div className="flex items-center justify-between pt-0.5 tabular-nums">
            <div className="flex items-center space-x-1.5">
              {renderStars(state.rating)}
              <span className="font-bold text-amber-400">{state.rating.toFixed(1)}</span>
              <span className={`text-[11px] ${mutedClass}`}>({state.reviewCount})</span>
            </div>

            <span className={`text-[11px] font-bold ${mutedTextColor(isDark)}`}>
              販売数: {state.salesCount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Circle Info */}
        <div className={`p-2.5 rounded-xl border ${cardClass} flex items-center justify-between`}>
          <div className="flex items-center space-x-2.5 min-w-0">
            <SafeImage
              src={state.circleAvatar}
              alt={state.circleName}
              fallbackText={state.circleName}
              className="w-9 h-9 rounded-lg object-cover border border-blue-500/30 shrink-0"
            />
            <div className="min-w-0">
              <div className={`text-[10px] ${mutedClass}`}>サークル名</div>
              <div className="font-bold text-xs truncate">{state.circleName}</div>
            </div>
          </div>
          <span className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] ${subtleBg}`}>
            フォロー中
          </span>
        </div>

        {/* Pricing Box (Product Mode) */}
        {!isViewer && (
          <div className={`p-3 rounded-xl border ${cardClass} space-y-2.5`}>
            <div className="flex items-baseline justify-between tabular-nums">
              <div className="flex items-baseline space-x-2">
                {state.discountPercent > 0 && (
                  <span className="px-1.5 py-0.5 rounded bg-[#ff5a00] text-white font-extrabold text-[10px]">
                    {state.discountPercent}% OFF
                  </span>
                )}
                <span className="text-xl font-black text-[#ff5a00]">
                  ¥{state.priceYen.toLocaleString()}
                </span>
                {state.originalPriceYen > state.priceYen && (
                  <span className={`text-xs line-through ${mutedClass}`}>
                    ¥{state.originalPriceYen.toLocaleString()}
                  </span>
                )}
              </div>
              <span className={`text-[10px] ${mutedClass}`}>DL版</span>
            </div>

            <div className="grid grid-cols-5 gap-2">
              <button className="col-span-4 py-2 rounded-lg bg-[#ff5a00] hover:bg-[#e55000] text-white font-bold text-xs flex items-center justify-center space-x-1.5">
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>カートに入れる</span>
              </button>
              <button
                className={`col-span-1 py-2 rounded-lg border flex items-center justify-center ${borderClass} ${subtleBg}`}
                aria-label="Favorite"
              >
                <Heart className="w-4 h-4 text-rose-500" />
              </button>
            </div>
          </div>
        )}

        {/* Tags */}
        {state.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
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

        {/* Reviews */}
        <div className={`pt-2.5 border-t ${borderClass} space-y-2`}>
          <div className="flex items-center space-x-1.5 font-bold text-xs">
            <MessageSquare className="w-3.5 h-3.5 text-[#45b6ff]" />
            <span className="tabular-nums">ユーザーレビュー ({state.reviewCount.toLocaleString()})</span>
          </div>

          {state.reviews.map((review) => (
            <div key={review.id} className={`p-2.5 rounded-xl border ${cardClass} space-y-1.5`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {renderStars(review.rating, 'w-3 h-3')}
                  <span className="font-bold text-[11px]">{review.author}</span>
                </div>
                <span className={`text-[10px] tabular-nums ${mutedClass}`}>{review.date}</span>
              </div>
              {review.title && <p className="font-bold text-xs">{review.title}</p>}
              <p className={`text-[11px] leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                {review.text}
              </p>
              <div className={`flex items-center space-x-1 text-[10px] tabular-nums ${mutedClass}`}>
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

function mutedTextColor(isDark: boolean): string {
  return isDark ? 'text-neutral-300' : 'text-neutral-700';
}

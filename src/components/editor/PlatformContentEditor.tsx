import React from 'react';
import { AppState } from '../../types';
import { ImageUploader } from '../common/ImageUploader';
import {
  FieldInput,
  FieldTextarea,
  FieldCheckbox,
  StatsTierBar,
} from './FormControls';
import {
  generateProportionateFanzaStats,
  generateProportionateDlsiteStats,
  generateProportionateCreatorClubStats,
  generateProportionateOnlyFansStats,
  generateProportionateXVideosStats,
} from '../../utils/statRandomizer';

interface PlatformContentEditorProps {
  state: AppState;
  onChange: (updater: (prev: AppState) => AppState) => void;
}

export const PlatformContentEditor: React.FC<PlatformContentEditorProps> = ({
  state,
  onChange,
}) => {
  const updatePlatformState = <K extends keyof AppState>(
    platform: K,
    key: keyof AppState[K],
    val: AppState[K][keyof AppState[K]]
  ) => {
    onChange((prev) => ({
      ...prev,
      [platform]: {
        ...(prev[platform] as object),
        [key]: val,
      },
    }));
  };

  switch (state.activePlatform) {
    case 'fanza':
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <FieldInput
              label="Product Code (品番)"
              mono
              value={state.fanza.productCode}
              onChange={(e) => updatePlatformState('fanza', 'productCode', e.target.value)}
            />
            <FieldInput
              label="Release Date"
              mono
              value={state.fanza.releaseDate}
              onChange={(e) => updatePlatformState('fanza', 'releaseDate', e.target.value)}
            />
          </div>

          <FieldTextarea
            label="Title"
            rows={2}
            value={state.fanza.title}
            onChange={(e) => updatePlatformState('fanza', 'title', e.target.value)}
          />

          <div className="grid grid-cols-2 gap-2">
            <FieldInput
              label="Performer / Actress"
              value={state.fanza.performerName}
              onChange={(e) => updatePlatformState('fanza', 'performerName', e.target.value)}
            />
            <FieldInput
              label="Maker / Studio"
              value={state.fanza.makerName}
              onChange={(e) => updatePlatformState('fanza', 'makerName', e.target.value)}
            />
          </div>

          <ImageUploader
            label="Performer Avatar"
            value={state.fanza.performerAvatar}
            onChange={(val) => updatePlatformState('fanza', 'performerAvatar', val)}
            aspectRatio="square"
          />

          <ImageUploader
            label="Cover / Sample Video Frame"
            value={state.fanza.coverUrl}
            onChange={(val) => updatePlatformState('fanza', 'coverUrl', val)}
            aspectRatio="video"
          />

          <div className="grid grid-cols-2 gap-2">
            <FieldInput
              label="Duration"
              mono
              value={state.fanza.duration}
              onChange={(e) => updatePlatformState('fanza', 'duration', e.target.value)}
            />
            <FieldInput
              label="Quality Badge"
              value={state.fanza.qualityBadge}
              onChange={(e) => updatePlatformState('fanza', 'qualityBadge', e.target.value)}
            />
          </div>

          {state.fanza.mode === 'product' && (
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-800/80">
              <FieldInput
                label="Price (¥)"
                type="number"
                mono
                value={state.fanza.priceYen}
                onChange={(e) => updatePlatformState('fanza', 'priceYen', Number(e.target.value))}
              />
              <FieldInput
                label="Original (¥)"
                type="number"
                mono
                value={state.fanza.originalPriceYen}
                onChange={(e) =>
                  updatePlatformState('fanza', 'originalPriceYen', Number(e.target.value))
                }
              />
              <FieldInput
                label="Discount %"
                type="number"
                mono
                value={state.fanza.discountPercent}
                onChange={(e) =>
                  updatePlatformState('fanza', 'discountPercent', Number(e.target.value))
                }
              />
            </div>
          )}

          {state.fanza.mode === 'stream' && (
            <div>
              <div className="flex justify-between text-neutral-300 font-semibold text-xs">
                <label>Playback Seekbar</label>
                <span className="tabular-nums">{state.fanza.progressPercent}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={state.fanza.progressPercent}
                onChange={(e) =>
                  updatePlatformState('fanza', 'progressPercent', Number(e.target.value))
                }
                className="w-full accent-[#e60012] mt-1 cursor-pointer"
              />
            </div>
          )}

          <div className="space-y-2.5 pt-2 border-t border-neutral-800/80">
            <StatsTierBar
              title="Ratings & Favorites"
              onRandomize={(tier) => {
                const stats = generateProportionateFanzaStats(tier);
                onChange((prev) => ({
                  ...prev,
                  fanza: { ...prev.fanza, ...stats },
                }));
              }}
            />

            <div className="grid grid-cols-3 gap-2">
              <FieldInput
                label="Rating (0–5)"
                type="number"
                step="0.1"
                min="1"
                max="5"
                mono
                value={state.fanza.rating}
                onChange={(e) => updatePlatformState('fanza', 'rating', Number(e.target.value))}
              />
              <FieldInput
                label="Reviews"
                type="number"
                mono
                value={state.fanza.reviewCount}
                onChange={(e) =>
                  updatePlatformState('fanza', 'reviewCount', Number(e.target.value))
                }
              />
              <FieldInput
                label="Favorites"
                type="number"
                mono
                value={state.fanza.favoritesCount}
                onChange={(e) =>
                  updatePlatformState('fanza', 'favoritesCount', Number(e.target.value))
                }
              />
            </div>
          </div>

          <FieldInput
            label="Genre Tags (comma-separated)"
            value={state.fanza.tags.join(', ')}
            onChange={(e) =>
              updatePlatformState(
                'fanza',
                'tags',
                e.target.value
                  .split(',')
                  .map((t) => t.trim())
                  .filter(Boolean)
              )
            }
          />
        </div>
      );

    case 'fanbox':
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <FieldInput
              label="Creator Name"
              value={state.fanbox.creatorName}
              onChange={(e) => updatePlatformState('fanbox', 'creatorName', e.target.value)}
            />
            <FieldInput
              label="Handle (@)"
              value={state.fanbox.handle}
              onChange={(e) => updatePlatformState('fanbox', 'handle', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <FieldInput
              label="Supporter Plan Name"
              value={state.fanbox.planName}
              onChange={(e) => updatePlatformState('fanbox', 'planName', e.target.value)}
            />
            <FieldInput
              label="Plan Price (¥/月)"
              type="number"
              mono
              value={state.fanbox.planPriceYen}
              onChange={(e) =>
                updatePlatformState('fanbox', 'planPriceYen', Number(e.target.value))
              }
            />
          </div>

          <ImageUploader
            label="Creator Avatar"
            value={state.fanbox.avatarUrl}
            onChange={(val) => updatePlatformState('fanbox', 'avatarUrl', val)}
            aspectRatio="square"
          />

          <FieldInput
            label="Post Title"
            value={state.fanbox.postTitle}
            onChange={(e) => updatePlatformState('fanbox', 'postTitle', e.target.value)}
          />

          <FieldTextarea
            label="Post Content"
            rows={3}
            value={state.fanbox.postText}
            onChange={(e) => updatePlatformState('fanbox', 'postText', e.target.value)}
          />

          <ImageUploader
            label="Post Preview Media"
            value={state.fanbox.mediaUrl}
            onChange={(val) => updatePlatformState('fanbox', 'mediaUrl', val)}
            aspectRatio="video"
          />

          <FieldInput
            label="Published Timestamp"
            value={state.fanbox.timestamp}
            onChange={(e) => updatePlatformState('fanbox', 'timestamp', e.target.value)}
          />

          <div className="space-y-2.5 pt-2 border-t border-neutral-800/80">
            <StatsTierBar
              title="Engagement Stats"
              onRandomize={(tier) => {
                const stats = generateProportionateCreatorClubStats(tier);
                onChange((prev) => ({
                  ...prev,
                  fanbox: {
                    ...prev.fanbox,
                    likes: stats.likes,
                    commentsCount: stats.commentsCount,
                  },
                }));
              }}
            />
            <div className="grid grid-cols-2 gap-2">
              <FieldInput
                label="Likes"
                type="number"
                mono
                value={state.fanbox.likes}
                onChange={(e) => updatePlatformState('fanbox', 'likes', Number(e.target.value))}
              />
              <FieldInput
                label="Comments"
                type="number"
                mono
                value={state.fanbox.commentsCount}
                onChange={(e) =>
                  updatePlatformState('fanbox', 'commentsCount', Number(e.target.value))
                }
              />
            </div>
          </div>
        </div>
      );

    case 'dlsite':
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <FieldInput
              label="Work Code (RJ品番)"
              mono
              value={state.dlsite.workCode}
              onChange={(e) => updatePlatformState('dlsite', 'workCode', e.target.value)}
            />
            <FieldInput
              label="Format Badge"
              value={state.dlsite.workFormat}
              onChange={(e) => updatePlatformState('dlsite', 'workFormat', e.target.value)}
            />
          </div>

          <FieldTextarea
            label="Work Title"
            rows={2}
            value={state.dlsite.title}
            onChange={(e) => updatePlatformState('dlsite', 'title', e.target.value)}
          />

          <div className="grid grid-cols-2 gap-2">
            <FieldInput
              label="Circle Name"
              value={state.dlsite.circleName}
              onChange={(e) => updatePlatformState('dlsite', 'circleName', e.target.value)}
            />
            <FieldInput
              label="Release Date"
              value={state.dlsite.releaseDate}
              onChange={(e) => updatePlatformState('dlsite', 'releaseDate', e.target.value)}
            />
          </div>

          <ImageUploader
            label="Circle Avatar"
            value={state.dlsite.circleAvatar}
            onChange={(val) => updatePlatformState('dlsite', 'circleAvatar', val)}
            aspectRatio="square"
          />

          <ImageUploader
            label="Cover Art"
            value={state.dlsite.coverUrl}
            onChange={(val) => updatePlatformState('dlsite', 'coverUrl', val)}
            aspectRatio="video"
          />

          <FieldInput
            label="Duration / File Size"
            value={state.dlsite.durationOrSize}
            onChange={(e) => updatePlatformState('dlsite', 'durationOrSize', e.target.value)}
          />

          {state.dlsite.mode === 'product' && (
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-800/80">
              <FieldInput
                label="Price (¥)"
                type="number"
                mono
                value={state.dlsite.priceYen}
                onChange={(e) =>
                  updatePlatformState('dlsite', 'priceYen', Number(e.target.value))
                }
              />
              <FieldInput
                label="Original (¥)"
                type="number"
                mono
                value={state.dlsite.originalPriceYen}
                onChange={(e) =>
                  updatePlatformState('dlsite', 'originalPriceYen', Number(e.target.value))
                }
              />
              <FieldInput
                label="Discount %"
                type="number"
                mono
                value={state.dlsite.discountPercent}
                onChange={(e) =>
                  updatePlatformState('dlsite', 'discountPercent', Number(e.target.value))
                }
              />
            </div>
          )}

          {state.dlsite.mode === 'viewer' && (
            <div>
              <div className="flex justify-between text-neutral-300 font-semibold text-xs">
                <label>Sample Progress</label>
                <span className="tabular-nums">{state.dlsite.progressPercent}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={state.dlsite.progressPercent}
                onChange={(e) =>
                  updatePlatformState('dlsite', 'progressPercent', Number(e.target.value))
                }
                className="w-full accent-[#005bac] mt-1 cursor-pointer"
              />
            </div>
          )}

          <div className="space-y-2.5 pt-2 border-t border-neutral-800/80">
            <StatsTierBar
              title="Sales & Ratings"
              onRandomize={(tier) => {
                const stats = generateProportionateDlsiteStats(tier);
                onChange((prev) => ({
                  ...prev,
                  dlsite: { ...prev.dlsite, ...stats },
                }));
              }}
            />

            <div className="grid grid-cols-3 gap-2">
              <FieldInput
                label="Rating (0–5)"
                type="number"
                step="0.1"
                min="1"
                max="5"
                mono
                value={state.dlsite.rating}
                onChange={(e) => updatePlatformState('dlsite', 'rating', Number(e.target.value))}
              />
              <FieldInput
                label="Reviews"
                type="number"
                mono
                value={state.dlsite.reviewCount}
                onChange={(e) =>
                  updatePlatformState('dlsite', 'reviewCount', Number(e.target.value))
                }
              />
              <FieldInput
                label="Sales Count"
                type="number"
                mono
                value={state.dlsite.salesCount}
                onChange={(e) =>
                  updatePlatformState('dlsite', 'salesCount', Number(e.target.value))
                }
              />
            </div>
          </div>

          <FieldInput
            label="Genre Tags (comma-separated)"
            value={state.dlsite.tags.join(', ')}
            onChange={(e) =>
              updatePlatformState(
                'dlsite',
                'tags',
                e.target.value
                  .split(',')
                  .map((t) => t.trim())
                  .filter(Boolean)
              )
            }
          />
        </div>
      );

    case 'fantia':
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <FieldInput
              label="Fanclub Name"
              value={state.fantia.fanclubName}
              onChange={(e) => updatePlatformState('fantia', 'fanclubName', e.target.value)}
            />
            <FieldInput
              label="Creator Name"
              value={state.fantia.creatorName}
              onChange={(e) => updatePlatformState('fantia', 'creatorName', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <FieldInput
              label="Plan Name"
              value={state.fantia.planName}
              onChange={(e) => updatePlatformState('fantia', 'planName', e.target.value)}
            />
            <FieldInput
              label="Plan Price (¥)"
              type="number"
              mono
              value={state.fantia.planPriceYen}
              onChange={(e) =>
                updatePlatformState('fantia', 'planPriceYen', Number(e.target.value))
              }
            />
            <FieldInput
              label="Fans Count"
              type="number"
              mono
              value={state.fantia.fansCount}
              onChange={(e) =>
                updatePlatformState('fantia', 'fansCount', Number(e.target.value))
              }
            />
          </div>

          <ImageUploader
            label="Fanclub Avatar"
            value={state.fantia.avatarUrl}
            onChange={(val) => updatePlatformState('fantia', 'avatarUrl', val)}
            aspectRatio="square"
          />

          <FieldInput
            label="Post Title"
            value={state.fantia.postTitle}
            onChange={(e) => updatePlatformState('fantia', 'postTitle', e.target.value)}
          />

          <FieldTextarea
            label="Post Content"
            rows={3}
            value={state.fantia.postText}
            onChange={(e) => updatePlatformState('fantia', 'postText', e.target.value)}
          />

          <ImageUploader
            label="Post Preview Photo"
            value={state.fantia.mediaUrl}
            onChange={(val) => updatePlatformState('fantia', 'mediaUrl', val)}
            aspectRatio="video"
          />

          <FieldInput
            label="Published Timestamp"
            value={state.fantia.timestamp}
            onChange={(e) => updatePlatformState('fantia', 'timestamp', e.target.value)}
          />

          <div className="space-y-2.5 pt-2 border-t border-neutral-800/80">
            <StatsTierBar
              title="Engagement Stats"
              onRandomize={(tier) => {
                const stats = generateProportionateCreatorClubStats(tier);
                onChange((prev) => ({
                  ...prev,
                  fantia: { ...prev.fantia, ...stats },
                }));
              }}
            />
            <div className="grid grid-cols-2 gap-2">
              <FieldInput
                label="Likes"
                type="number"
                mono
                value={state.fantia.likes}
                onChange={(e) => updatePlatformState('fantia', 'likes', Number(e.target.value))}
              />
              <FieldInput
                label="Comments"
                type="number"
                mono
                value={state.fantia.commentsCount}
                onChange={(e) =>
                  updatePlatformState('fantia', 'commentsCount', Number(e.target.value))
                }
              />
            </div>
          </div>
        </div>
      );

    case 'onlyfans':
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <FieldInput
              label="Creator Name"
              value={state.onlyfans.creatorName}
              onChange={(e) => updatePlatformState('onlyfans', 'creatorName', e.target.value)}
            />
            <FieldInput
              label="Username"
              value={state.onlyfans.username}
              onChange={(e) => updatePlatformState('onlyfans', 'username', e.target.value)}
            />
          </div>

          <ImageUploader
            label="Creator Avatar"
            value={state.onlyfans.avatarUrl}
            onChange={(val) => updatePlatformState('onlyfans', 'avatarUrl', val)}
            aspectRatio="square"
          />

          {state.onlyfans.mode !== 'chat' && (
            <>
              <ImageUploader
                label="Post Media Photo"
                value={state.onlyfans.mediaUrl}
                onChange={(val) => updatePlatformState('onlyfans', 'mediaUrl', val)}
                aspectRatio="square"
              />

              <FieldTextarea
                label="Post Text"
                rows={2}
                value={state.onlyfans.postText}
                onChange={(e) => updatePlatformState('onlyfans', 'postText', e.target.value)}
              />

              <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                <FieldCheckbox
                  label="Paywall Blur & Unlock Overlay"
                  checked={state.onlyfans.mode === 'locked' || state.onlyfans.isLocked}
                  onChange={(checked) =>
                    onChange((prev) => ({
                      ...prev,
                      onlyfans: {
                        ...prev.onlyfans,
                        isLocked: checked,
                        mode: checked ? 'locked' : 'post',
                      },
                    }))
                  }
                  accentClass="accent-[#00aff0]"
                />
                {(state.onlyfans.mode === 'locked' || state.onlyfans.isLocked) && (
                  <FieldInput
                    label="Unlock Price ($)"
                    type="number"
                    step="0.5"
                    mono
                    value={state.onlyfans.unlockPrice}
                    onChange={(e) =>
                      updatePlatformState('onlyfans', 'unlockPrice', Number(e.target.value))
                    }
                  />
                )}
              </div>

              <div className="space-y-2.5 pt-2 border-t border-neutral-800/80">
                <StatsTierBar
                  title="Engagement Stats"
                  onRandomize={(tier) => {
                    const stats = generateProportionateOnlyFansStats(tier);
                    onChange((prev) => ({
                      ...prev,
                      onlyfans: { ...prev.onlyfans, ...stats },
                    }));
                  }}
                />

                <div className="grid grid-cols-3 gap-2">
                  <FieldInput
                    label="Tip ($)"
                    type="number"
                    mono
                    value={state.onlyfans.tipAmount}
                    onChange={(e) =>
                      updatePlatformState('onlyfans', 'tipAmount', Number(e.target.value))
                    }
                  />
                  <FieldInput
                    label="Likes"
                    type="number"
                    mono
                    value={state.onlyfans.likes}
                    onChange={(e) => updatePlatformState('onlyfans', 'likes', Number(e.target.value))}
                  />
                  <FieldInput
                    label="Comments"
                    type="number"
                    mono
                    value={state.onlyfans.comments}
                    onChange={(e) =>
                      updatePlatformState('onlyfans', 'comments', Number(e.target.value))
                    }
                  />
                </div>
              </div>
            </>
          )}
        </div>
      );

    case 'fansly':
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <FieldInput
              label="Creator Name"
              value={state.fansly.creatorName}
              onChange={(e) => updatePlatformState('fansly', 'creatorName', e.target.value)}
            />
            <FieldInput
              label="Username"
              value={state.fansly.username}
              onChange={(e) => updatePlatformState('fansly', 'username', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-2 items-center">
            <FieldInput
              label="Subscription Tier Name"
              value={state.fansly.tierName}
              onChange={(e) => updatePlatformState('fansly', 'tierName', e.target.value)}
            />
            <div className="pt-4">
              <FieldCheckbox
                label="Verified Creator"
                checked={state.fansly.isVerified}
                onChange={(val) => updatePlatformState('fansly', 'isVerified', val)}
                accentClass="accent-[#1fa2f1]"
              />
            </div>
          </div>

          <ImageUploader
            label="Creator Avatar"
            value={state.fansly.avatarUrl}
            onChange={(val) => updatePlatformState('fansly', 'avatarUrl', val)}
            aspectRatio="square"
          />

          {state.fansly.mode !== 'chat' && (
            <>
              <ImageUploader
                label="Post Media Photo"
                value={state.fansly.mediaUrl}
                onChange={(val) => updatePlatformState('fansly', 'mediaUrl', val)}
                aspectRatio="square"
              />

              <FieldInput
                label="Timestamp"
                value={state.fansly.timestamp}
                onChange={(e) => updatePlatformState('fansly', 'timestamp', e.target.value)}
              />

              <FieldTextarea
                label="Post Caption"
                rows={2}
                value={state.fansly.postText}
                onChange={(e) => updatePlatformState('fansly', 'postText', e.target.value)}
              />

              {state.fansly.mode === 'locked' && (
                <FieldInput
                  label="Unlock Price ($)"
                  type="number"
                  step="0.5"
                  mono
                  value={state.fansly.unlockPrice}
                  onChange={(e) =>
                    updatePlatformState('fansly', 'unlockPrice', Number(e.target.value))
                  }
                />
              )}

              <div className="space-y-2.5 pt-2 border-t border-neutral-800/80">
                <StatsTierBar
                  title="Engagement Stats"
                  onRandomize={(tier) => {
                    const stats = generateProportionateOnlyFansStats(tier);
                    onChange((prev) => ({
                      ...prev,
                      fansly: {
                        ...prev.fansly,
                        likes: stats.likes,
                        commentsCount: stats.comments,
                      },
                    }));
                  }}
                />

                <div className="grid grid-cols-3 gap-2">
                  <FieldInput
                    label="Tip ($)"
                    type="number"
                    mono
                    value={state.fansly.tipAmount}
                    onChange={(e) =>
                      updatePlatformState('fansly', 'tipAmount', Number(e.target.value))
                    }
                  />
                  <FieldInput
                    label="Likes"
                    type="number"
                    mono
                    value={state.fansly.likes}
                    onChange={(e) => updatePlatformState('fansly', 'likes', Number(e.target.value))}
                  />
                  <FieldInput
                    label="Comments"
                    type="number"
                    mono
                    value={state.fansly.commentsCount}
                    onChange={(e) =>
                      updatePlatformState('fansly', 'commentsCount', Number(e.target.value))
                    }
                  />
                </div>
              </div>
            </>
          )}
        </div>
      );

    case 'xvideos':
      return (
        <div className="space-y-3">
          <FieldInput
            label="Video Title"
            value={state.xvideos.videoTitle}
            onChange={(e) => updatePlatformState('xvideos', 'videoTitle', e.target.value)}
          />

          <div className="grid grid-cols-2 gap-2">
            <FieldInput
              label="Uploader Name"
              value={state.xvideos.uploaderName}
              onChange={(e) => updatePlatformState('xvideos', 'uploaderName', e.target.value)}
            />
            <FieldInput
              label="Subscribers"
              mono
              value={state.xvideos.subscribersCount}
              onChange={(e) => updatePlatformState('xvideos', 'subscribersCount', e.target.value)}
            />
          </div>

          <FieldCheckbox
            label="Verified Model Badge"
            checked={state.xvideos.isVerified}
            onChange={(val) => updatePlatformState('xvideos', 'isVerified', val)}
            accentClass="accent-[#d92323]"
          />

          <ImageUploader
            label="Uploader Profile Avatar"
            value={state.xvideos.uploaderAvatar}
            onChange={(val) => updatePlatformState('xvideos', 'uploaderAvatar', val)}
            aspectRatio="square"
          />

          <ImageUploader
            label="Video Thumbnail Image"
            value={state.xvideos.thumbnailUrl}
            onChange={(val) => updatePlatformState('xvideos', 'thumbnailUrl', val)}
            aspectRatio="video"
          />

          <div className="space-y-2.5 pt-2 border-t border-neutral-800/80">
            <StatsTierBar
              title="Video Metrics"
              onRandomize={(tier) => {
                const stats = generateProportionateXVideosStats(tier);
                onChange((prev) => ({
                  ...prev,
                  xvideos: {
                    ...prev.xvideos,
                    viewsCount: stats.viewsCount,
                    likesCount: stats.likesCount,
                    dislikesCount: stats.dislikesCount,
                    ratingPercent: stats.ratingPercent,
                    commentsCount: stats.commentsCount,
                  },
                }));
              }}
            />

            <div className="grid grid-cols-3 gap-2">
              <FieldInput
                label="Views"
                mono
                value={state.xvideos.viewsCount}
                onChange={(e) => updatePlatformState('xvideos', 'viewsCount', e.target.value)}
              />
              <FieldInput
                label="Rating %"
                type="number"
                mono
                value={state.xvideos.ratingPercent}
                onChange={(e) =>
                  updatePlatformState('xvideos', 'ratingPercent', Number(e.target.value))
                }
              />
              <FieldInput
                label="Duration"
                mono
                value={state.xvideos.duration}
                onChange={(e) => updatePlatformState('xvideos', 'duration', e.target.value)}
              />
              <FieldInput
                label="Likes"
                mono
                value={state.xvideos.likesCount}
                onChange={(e) => updatePlatformState('xvideos', 'likesCount', e.target.value)}
              />
              <FieldInput
                label="Dislikes"
                mono
                value={state.xvideos.dislikesCount}
                onChange={(e) => updatePlatformState('xvideos', 'dislikesCount', e.target.value)}
              />
              <FieldInput
                label="Comments"
                mono
                value={state.xvideos.commentsCount}
                onChange={(e) => updatePlatformState('xvideos', 'commentsCount', e.target.value)}
              />
            </div>
          </div>

          <FieldInput
            label="Upload Date"
            value={state.xvideos.uploadDate}
            onChange={(e) => updatePlatformState('xvideos', 'uploadDate', e.target.value)}
          />

          <div>
            <div className="flex justify-between text-neutral-300 font-semibold text-xs">
              <label>Seekbar Progress</label>
              <span className="tabular-nums">{state.xvideos.progressPercent}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={state.xvideos.progressPercent}
              onChange={(e) =>
                updatePlatformState('xvideos', 'progressPercent', Number(e.target.value))
              }
              className="w-full accent-[#d92323] mt-1 cursor-pointer"
            />
          </div>

          <FieldInput
            label="Tags (comma-separated)"
            value={state.xvideos.tags.join(', ')}
            onChange={(e) =>
              updatePlatformState(
                'xvideos',
                'tags',
                e.target.value
                  .split(',')
                  .map((t) => t.trim())
                  .filter(Boolean)
              )
            }
          />
        </div>
      );

    case 'pornhub':
      return (
        <div className="space-y-3">
          <FieldInput
            label="Video Title"
            value={state.pornhub.videoTitle}
            onChange={(e) => updatePlatformState('pornhub', 'videoTitle', e.target.value)}
          />

          <div className="grid grid-cols-2 gap-2">
            <FieldInput
              label="Channel / Model Name"
              value={state.pornhub.channelName}
              onChange={(e) => updatePlatformState('pornhub', 'channelName', e.target.value)}
            />
            <FieldInput
              label="Subscribers"
              mono
              value={state.pornhub.subscribersCount}
              onChange={(e) => updatePlatformState('pornhub', 'subscribersCount', e.target.value)}
            />
          </div>

          <FieldCheckbox
            label="Verified Channel Badge"
            checked={state.pornhub.isVerified}
            onChange={(val) => updatePlatformState('pornhub', 'isVerified', val)}
            accentClass="accent-[#ff9000]"
          />

          <ImageUploader
            label="Channel Avatar"
            value={state.pornhub.channelAvatar}
            onChange={(val) => updatePlatformState('pornhub', 'channelAvatar', val)}
            aspectRatio="square"
          />

          <ImageUploader
            label="Video Thumbnail"
            value={state.pornhub.thumbnailUrl}
            onChange={(val) => updatePlatformState('pornhub', 'thumbnailUrl', val)}
            aspectRatio="video"
          />

          <div className="space-y-2.5 pt-2 border-t border-neutral-800/80">
            <StatsTierBar
              title="Video Metrics"
              onRandomize={(tier) => {
                const stats = generateProportionateXVideosStats(tier);
                onChange((prev) => ({
                  ...prev,
                  pornhub: {
                    ...prev.pornhub,
                    viewsCount: stats.viewsCompact,
                    likesCount: stats.likesCount,
                    dislikesCount: stats.dislikesCount,
                    ratingPercent: stats.ratingPercent,
                    commentsCount: stats.commentsCount,
                  },
                }));
              }}
            />

            <div className="grid grid-cols-3 gap-2">
              <FieldInput
                label="Views"
                mono
                value={state.pornhub.viewsCount}
                onChange={(e) => updatePlatformState('pornhub', 'viewsCount', e.target.value)}
              />
              <FieldInput
                label="Rating %"
                type="number"
                mono
                value={state.pornhub.ratingPercent}
                onChange={(e) =>
                  updatePlatformState('pornhub', 'ratingPercent', Number(e.target.value))
                }
              />
              <FieldInput
                label="Duration"
                mono
                value={state.pornhub.duration}
                onChange={(e) => updatePlatformState('pornhub', 'duration', e.target.value)}
              />
              <FieldInput
                label="Likes"
                mono
                value={state.pornhub.likesCount}
                onChange={(e) => updatePlatformState('pornhub', 'likesCount', e.target.value)}
              />
              <FieldInput
                label="Dislikes"
                mono
                value={state.pornhub.dislikesCount}
                onChange={(e) => updatePlatformState('pornhub', 'dislikesCount', e.target.value)}
              />
              <FieldInput
                label="Comments"
                mono
                value={state.pornhub.commentsCount}
                onChange={(e) => updatePlatformState('pornhub', 'commentsCount', e.target.value)}
              />
            </div>
          </div>

          <FieldInput
            label="Upload Date"
            value={state.pornhub.uploadDate}
            onChange={(e) => updatePlatformState('pornhub', 'uploadDate', e.target.value)}
          />

          <div>
            <div className="flex justify-between text-neutral-300 font-semibold text-xs">
              <label>Seekbar Progress</label>
              <span className="tabular-nums">{state.pornhub.progressPercent}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={state.pornhub.progressPercent}
              onChange={(e) =>
                updatePlatformState('pornhub', 'progressPercent', Number(e.target.value))
              }
              className="w-full accent-[#ff9000] mt-1 cursor-pointer"
            />
          </div>

          <FieldInput
            label="Tags (comma-separated)"
            value={state.pornhub.tags.join(', ')}
            onChange={(e) =>
              updatePlatformState(
                'pornhub',
                'tags',
                e.target.value
                  .split(',')
                  .map((t) => t.trim())
                  .filter(Boolean)
              )
            }
          />
        </div>
      );

    case 'blacked':
      return (
        <div className="space-y-3">
          <FieldInput
            label="Scene Title"
            value={state.blacked.sceneTitle}
            onChange={(e) => updatePlatformState('blacked', 'sceneTitle', e.target.value)}
          />

          <div className="grid grid-cols-2 gap-2">
            <FieldInput
              label="Starring Cast"
              value={state.blacked.castNames}
              onChange={(e) => updatePlatformState('blacked', 'castNames', e.target.value)}
            />
            <FieldInput
              label="Director"
              value={state.blacked.directorName}
              onChange={(e) => updatePlatformState('blacked', 'directorName', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <FieldInput
              label="Release Date"
              value={state.blacked.releaseDate}
              onChange={(e) => updatePlatformState('blacked', 'releaseDate', e.target.value)}
            />
            <FieldInput
              label="Runtime"
              mono
              value={state.blacked.duration}
              onChange={(e) => updatePlatformState('blacked', 'duration', e.target.value)}
            />
            <FieldInput
              label="Quality Badge"
              value={state.blacked.qualityBadge}
              onChange={(e) => updatePlatformState('blacked', 'qualityBadge', e.target.value)}
            />
          </div>

          <ImageUploader
            label="Lead Cast Portrait"
            value={state.blacked.castAvatar}
            onChange={(val) => updatePlatformState('blacked', 'castAvatar', val)}
            aspectRatio="square"
          />

          <ImageUploader
            label="Scene Poster Frame"
            value={state.blacked.thumbnailUrl}
            onChange={(val) => updatePlatformState('blacked', 'thumbnailUrl', val)}
            aspectRatio="video"
          />

          <FieldTextarea
            label="Scene Synopsis"
            rows={2}
            value={state.blacked.synopsis}
            onChange={(e) => updatePlatformState('blacked', 'synopsis', e.target.value)}
          />

          <div className="space-y-2.5 pt-2 border-t border-neutral-800/80">
            <StatsTierBar
              title="Scene Metrics"
              onRandomize={(tier) => {
                const stats = generateProportionateXVideosStats(tier);
                onChange((prev) => ({
                  ...prev,
                  blacked: {
                    ...prev.blacked,
                    viewsCount: stats.viewsCompact,
                    likesCount: stats.likesCount,
                    rating: stats.ratingDecimal,
                    commentsCount: stats.commentsCount,
                  },
                }));
              }}
            />
            <div className="grid grid-cols-4 gap-1.5">
              <FieldInput
                label="Views"
                mono
                value={state.blacked.viewsCount}
                onChange={(e) => updatePlatformState('blacked', 'viewsCount', e.target.value)}
              />
              <FieldInput
                label="Rating"
                type="number"
                step="0.1"
                min="1"
                max="5"
                mono
                value={state.blacked.rating}
                onChange={(e) => updatePlatformState('blacked', 'rating', Number(e.target.value))}
              />
              <FieldInput
                label="Likes"
                mono
                value={state.blacked.likesCount}
                onChange={(e) => updatePlatformState('blacked', 'likesCount', e.target.value)}
              />
              <FieldInput
                label="Comments"
                mono
                value={state.blacked.commentsCount}
                onChange={(e) => updatePlatformState('blacked', 'commentsCount', e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-neutral-300 font-semibold text-xs">
              <label>Player Seekbar</label>
              <span className="tabular-nums">{state.blacked.progressPercent}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={state.blacked.progressPercent}
              onChange={(e) =>
                updatePlatformState('blacked', 'progressPercent', Number(e.target.value))
              }
              className="w-full accent-[#d4af37] mt-1 cursor-pointer"
            />
          </div>

          <FieldInput
            label="Tags (comma-separated)"
            value={state.blacked.tags.join(', ')}
            onChange={(e) =>
              updatePlatformState(
                'blacked',
                'tags',
                e.target.value
                  .split(',')
                  .map((t) => t.trim())
                  .filter(Boolean)
              )
            }
          />
        </div>
      );
  }
};

import { SocialPlatform } from '../types';

export interface PlatformConfig {
  id: SocialPlatform;
  name: string;
  icon: string;
}

export const PLATFORMS: PlatformConfig[] = [
  { id: 'fanza', name: 'FANZA', icon: '🎬' },
  { id: 'fanbox', name: 'DMM Fanbox', icon: '🎨' },
  { id: 'dlsite', name: 'DLsite', icon: '🎧' },
  { id: 'fantia', name: 'Fantia', icon: '🍀' },
  { id: 'onlyfans', name: 'OnlyFans', icon: '💎' },
  { id: 'fansly', name: 'Fansly', icon: '🩵' },
  { id: 'xvideos', name: 'XVideos', icon: '🔞' },
  { id: 'pornhub', name: 'Pornhub', icon: '🟠' },
  { id: 'blacked', name: 'Blacked', icon: '🖤' },
];

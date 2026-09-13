import { SocialPlatform } from '../types';

export interface PlatformConfig {
  id: SocialPlatform;
  name: string;
  shortLabel: string;
  icon: string;
  accentColor: string;
}

export const PLATFORMS: PlatformConfig[] = [
  { id: 'twitter', name: 'X / Twitter', shortLabel: '𝕏 Tweet', icon: '𝕏', accentColor: 'bg-white text-black' },
  { id: 'instagram', name: 'Instagram', shortLabel: '📸 IG Feed', icon: '📸', accentColor: 'bg-gradient-to-r from-purple-500 via-rose-500 to-amber-500 text-white' },
  { id: 'tiktok', name: 'TikTok', shortLabel: '🎵 TikTok', icon: '🎵', accentColor: 'bg-[#fe2c55] text-white' },
  { id: 'facebook', name: 'Facebook', shortLabel: '👤 Facebook', icon: '👤', accentColor: 'bg-[#1877f2] text-white' },
  { id: 'youtube', name: 'YouTube', shortLabel: '▶️ YouTube', icon: '▶️', accentColor: 'bg-[#ff0000] text-white' },
  { id: 'onlyfans', name: 'OnlyFans', shortLabel: '💎 OnlyFans', icon: '💎', accentColor: 'bg-[#00aff0] text-white' },
  { id: 'imessage', name: 'iMessage', shortLabel: '💬 iMessage', icon: '💬', accentColor: 'bg-[#007aff] text-white' },
  { id: 'facetime', name: 'FaceTime', shortLabel: '📹 FaceTime', icon: '📹', accentColor: 'bg-[#34c759] text-white' },
  { id: 'snapchat', name: 'Snapchat', shortLabel: '👻 Snapchat', icon: '👻', accentColor: 'bg-[#fffc00] text-black' },
  { id: 'xvideos', name: 'XVideos', shortLabel: '🔞 XVideos', icon: '🔞', accentColor: 'bg-[#d92323] text-white' },
];

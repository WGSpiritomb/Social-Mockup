export type SocialPlatform =
  | 'twitter'
  | 'instagram'
  | 'tiktok'
  | 'facebook'
  | 'youtube'
  | 'onlyfans'
  | 'imessage'
  | 'facetime'
  | 'snapchat'
  | 'xvideos';

export type TwitterMode = 'post' | 'chat';
export type InstagramMode = 'post' | 'chat' | 'live';
export type TikTokMode = 'feed' | 'live';
export type FacebookMode = 'post' | 'messenger';
export type YouTubeMode = 'video' | 'channel' | 'live';
export type OnlyFansMode = 'post' | 'locked' | 'chat';
export type IMessageMode = 'single' | 'group';
export type FaceTimeMode = 'video' | 'audio';
export type SnapchatMode = 'story' | 'chat';
export type XVideosMode = 'video';

export type VerifiedBadge = 'none' | 'blue' | 'gold' | 'gray';

export type CanvasBackdrop = 'mesh' | 'dark' | 'light' | 'transparent';

export type ViewFormat = 'iphone' | 'desktop'; // iPhone (portrait) vs Desktop (landscape)
export type PhoneFrameStyle = 'none' | 'iphone16'; // 'none' (No Device / Screenshot - default) vs 'iphone16' (iPhone Frame)

export interface DeviceSettings {
  viewFormat: ViewFormat;
  phoneFrame: PhoneFrameStyle;
  osType: 'ios' | 'android';
  time: string;
  batteryLevel: number;
  isCharging: boolean;
  signalStrength: number; // 1 - 4
  wifi: boolean;
  networkType: '5G' | 'LTE' | '4G' | 'WiFi';
  theme: 'light' | 'dark';
  frameStyle?: 'iphone16' | 'android' | 'borderless' | 'none';
  showStatusBar: boolean;
  showHomeIndicator: boolean;
  showDynamicIsland: boolean;
  zoomScale: number; // 0.8, 1, 1.2
  canvasBackdrop?: CanvasBackdrop;
  showGlassGlare?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'me' | 'them';
  senderName?: string;
  senderAvatar?: string;
  text: string;
  mediaUrl?: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
  liked?: boolean;
}

export interface CommentItem {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
  likes: number;
  isVerified?: boolean;
  replies?: CommentItem[];
}

export interface TwitterState {
  mode: TwitterMode;
  displayName: string;
  handle: string;
  avatarUrl: string;
  verifiedBadge: VerifiedBadge;
  tweetText: string;
  mediaUrl: string;
  timestamp: string;
  date: string;
  client: string; // e.g., 'Twitter for iPhone'
  retweets: number;
  quotes: number;
  likes: number;
  bookmarks: number;
  views: number;
  repliesCount: number;
  hasMedia: boolean;
  replies: Array<{
    id: string;
    displayName: string;
    handle: string;
    avatarUrl: string;
    verifiedBadge: VerifiedBadge;
    text: string;
    timestamp: string;
    likes: number;
  }>;
  chatMessages: ChatMessage[];
}

export interface InstagramState {
  mode: InstagramMode;
  username: string;
  fullName: string;
  avatarUrl: string;
  isVerified: boolean;
  hasStoryRing: boolean;
  location: string;
  postMediaUrl: string;
  caption: string;
  likesCount: number;
  likedByUsername: string;
  timestamp: string;
  comments: CommentItem[];
  // Live mode extras
  liveViewers: string;
  liveComments: Array<{
    id: string;
    username: string;
    avatarUrl: string;
    message: string;
    badge?: string;
  }>;
  liveHeartsEnabled: boolean;
  chatMessages: ChatMessage[];
}

export interface TikTokState {
  mode: TikTokMode;
  username: string;
  handle: string;
  avatarUrl: string;
  isVerified: boolean;
  caption: string;
  soundTitle: string;
  likes: number;
  commentsCount: number;
  shares: number;
  bookmarks: number;
  backgroundMediaUrl: string;
  // Live mode extras
  liveHostName: string;
  liveViewers: string;
  liveCoins: number;
  liveGift: 'rose' | 'dragon' | 'galaxy' | 'heart' | 'none';
  topGifters: Array<{
    id: string;
    avatarUrl: string;
    rank: number;
  }>;
  liveChatMessages: Array<{
    id: string;
    user: string;
    message: string;
    level: number;
  }>;
}

export interface FacebookState {
  mode: FacebookMode;
  userName: string;
  userAvatar: string;
  timestamp: string;
  privacy: 'public' | 'friends' | 'onlyme';
  postText: string;
  mediaUrl: string;
  hasMedia: boolean;
  reactions: {
    like: number;
    love: number;
    care: number;
    haha: number;
    wow: number;
    sad: number;
    angry: number;
  };
  commentsCount: number;
  sharesCount: number;
  comments: CommentItem[];
  messengerMessages: ChatMessage[];
}

export interface YouTubeState {
  mode: YouTubeMode;
  title: string;
  channelName: string;
  channelAvatar: string;
  isVerified: boolean;
  subscribersCount: string;
  viewsCount: string;
  uploadDate: string;
  likesCount: string;
  dislikesCount: string;
  isSubscribed: boolean;
  thumbnailUrl: string;
  duration: string;
  progressPercent: number;
  commentsCount: number;
  liveChatMessages: Array<{
    id: string;
    author: string;
    avatar: string;
    message: string;
    isSuperChat?: boolean;
    superChatAmount?: string;
    isMod?: boolean;
  }>;
}

export interface OnlyFansState {
  mode: OnlyFansMode;
  creatorName: string;
  username: string;
  avatarUrl: string;
  bannerUrl: string;
  isSubscribed: boolean;
  isLocked: boolean;
  unlockPrice: number;
  postText: string;
  mediaUrl: string;
  tipAmount: number;
  likes: number;
  comments: number;
  chatMessages: ChatMessage[];
}

export interface IMessageState {
  mode: IMessageMode;
  contactName: string;
  contactAvatar: string;
  groupMembersCount?: number;
  messageType: 'imessage' | 'sms';
  chatBubbles: ChatMessage[];
  showTypingIndicator: boolean;
  receiptText: string; // e.g. "Delivered" or "Read 10:42 AM"
  carrierName: string;
}

export interface FaceTimeState {
  mode: FaceTimeMode;
  contactName: string;
  contactAvatar: string;
  duration: string;
  callStatus: string; // e.g., '08:45' or 'FaceTime Video'
  isMuted: boolean;
  isCameraFlipped: boolean;
  isEffectsOn: boolean;
  backgroundMediaUrl: string;
  selfieMediaUrl: string;
}

export interface SnapchatState {
  mode: SnapchatMode;
  username: string;
  displayName: string;
  avatarUrl: string;
  mediaUrl: string;
  bannerText: string;
  bannerStyle: 'classic' | 'large';
  timeElapsed: string;
  timerDuration: string;
  chatStreak: number;
  isFriend: boolean;
  chatMessages: Array<{
    id: string;
    sender: 'me' | 'them';
    type: 'text' | 'snap';
    text?: string;
    snapOpened?: boolean;
    timestamp: string;
  }>;
}

export interface XVideosState {
  mode: XVideosMode;
  videoTitle: string;
  uploaderName: string;
  uploaderAvatar: string;
  isVerified: boolean;
  viewsCount: string;
  duration: string;
  progressPercent: number;
  ratingPercent: number;
  likesCount: string;
  dislikesCount: string;
  thumbnailUrl: string;
  subscribersCount: string;
  uploadDate: string;
  tags: string[];
  commentsCount: string;
  comments: Array<{
    id: string;
    author: string;
    avatar: string;
    text: string;
    timestamp: string;
    likes: number;
  }>;
}

export interface AppState {
  activePlatform: SocialPlatform;
  deviceSettings: DeviceSettings;
  twitter: TwitterState;
  instagram: InstagramState;
  tiktok: TikTokState;
  facebook: FacebookState;
  youtube: YouTubeState;
  onlyfans: OnlyFansState;
  imessage: IMessageState;
  facetime: FaceTimeState;
  snapchat: SnapchatState;
  xvideos: XVideosState;
}

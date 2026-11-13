export type SocialPlatform =
  | 'fanza'
  | 'onlyfans'
  | 'xvideos'
  | 'fanbox'
  | 'fansly'
  | 'dlsite'
  | 'fantia'
  | 'pornhub'
  | 'blacked';

export type FanzaMode = 'product' | 'stream';
export type OnlyFansMode = 'post' | 'locked' | 'chat';
export type XVideosMode = 'video';
export type FanboxMode = 'post' | 'locked';
export type FanslyMode = 'post' | 'locked' | 'chat';
export type DlsiteMode = 'product' | 'viewer';
export type FantiaMode = 'post' | 'locked';
export type PornhubMode = 'video';
export type BlackedMode = 'scene';

export type CanvasBackdrop = 'mesh' | 'dark' | 'light' | 'transparent';

export type ViewFormat = 'iphone' | 'desktop'; // iPhone (portrait) vs Desktop (landscape)
export type PhoneFrameStyle = 'none' | 'iphone16'; // 'none' (No Device / Screenshot - default) vs 'iphone16' (iPhone Frame)

export interface DeviceSettings {
  viewFormat: ViewFormat;
  phoneFrame: PhoneFrameStyle;
  time: string;
  batteryLevel: number;
  isCharging: boolean;
  signalStrength: number; // 1 - 4
  wifi: boolean;
  networkType: '5G' | 'LTE' | '4G' | 'WiFi';
  theme: 'light' | 'dark';
  showStatusBar: boolean;
  showHomeIndicator: boolean;
  showDynamicIsland: boolean;
  zoomScale: number; // 0.5 - 1.3
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

export interface SimpleComment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
  likes: number;
}

export interface StoreReview {
  id: string;
  author: string;
  rating: number;
  title: string;
  text: string;
  date: string;
  helpfulCount: number;
}

export interface FanzaState {
  mode: FanzaMode;
  productCode: string;
  title: string;
  performerName: string;
  performerAvatar: string;
  makerName: string;
  releaseDate: string;
  duration: string;
  qualityBadge: string;
  coverUrl: string;
  rating: number;
  reviewCount: number;
  favoritesCount: number;
  priceYen: number;
  originalPriceYen: number;
  discountPercent: number;
  progressPercent: number;
  tags: string[];
  reviews: StoreReview[];
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
  comments: SimpleComment[];
}

export interface FanboxState {
  mode: FanboxMode;
  creatorName: string;
  handle: string;
  avatarUrl: string;
  planName: string;
  planPriceYen: number;
  postTitle: string;
  postText: string;
  mediaUrl: string;
  timestamp: string;
  likes: number;
  commentsCount: number;
  comments: SimpleComment[];
}

export interface FanslyState {
  mode: FanslyMode;
  creatorName: string;
  username: string;
  avatarUrl: string;
  isVerified: boolean;
  tierName: string;
  unlockPrice: number;
  postText: string;
  mediaUrl: string;
  timestamp: string;
  tipAmount: number;
  likes: number;
  commentsCount: number;
  comments: SimpleComment[];
  chatMessages: ChatMessage[];
}

export interface DlsiteState {
  mode: DlsiteMode;
  workCode: string;
  workFormat: string;
  title: string;
  circleName: string;
  circleAvatar: string;
  coverUrl: string;
  releaseDate: string;
  durationOrSize: string;
  rating: number;
  reviewCount: number;
  salesCount: number;
  priceYen: number;
  originalPriceYen: number;
  discountPercent: number;
  progressPercent: number;
  tags: string[];
  reviews: StoreReview[];
}

export interface FantiaState {
  mode: FantiaMode;
  fanclubName: string;
  creatorName: string;
  avatarUrl: string;
  planName: string;
  planPriceYen: number;
  fansCount: number;
  postTitle: string;
  postText: string;
  mediaUrl: string;
  timestamp: string;
  likes: number;
  commentsCount: number;
  comments: SimpleComment[];
}

export interface PornhubState {
  mode: PornhubMode;
  videoTitle: string;
  channelName: string;
  channelAvatar: string;
  isVerified: boolean;
  subscribersCount: string;
  viewsCount: string;
  uploadDate: string;
  duration: string;
  progressPercent: number;
  ratingPercent: number;
  likesCount: string;
  dislikesCount: string;
  thumbnailUrl: string;
  tags: string[];
  commentsCount: string;
  comments: SimpleComment[];
}

export interface BlackedState {
  mode: BlackedMode;
  sceneTitle: string;
  castNames: string;
  directorName: string;
  castAvatar: string;
  releaseDate: string;
  duration: string;
  progressPercent: number;
  qualityBadge: string;
  rating: number;
  likesCount: string;
  viewsCount: string;
  synopsis: string;
  thumbnailUrl: string;
  tags: string[];
  commentsCount: string;
  comments: SimpleComment[];
}

export interface AppState {
  activePlatform: SocialPlatform;
  deviceSettings: DeviceSettings;
  fanza: FanzaState;
  onlyfans: OnlyFansState;
  xvideos: XVideosState;
  fanbox: FanboxState;
  fansly: FanslyState;
  dlsite: DlsiteState;
  fantia: FantiaState;
  pornhub: PornhubState;
  blacked: BlackedState;
}

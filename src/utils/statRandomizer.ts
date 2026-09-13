// Utility for generating authentic, statistically proportionate social media metrics
// and retrieving real user local time and date.

export interface FormattedUserTimeAndDate {
  time12: string; // e.g. "10:42 AM"
  time24: string; // e.g. "10:42"
  dateFormatted: string; // e.g. "Sep 13, 2026"
  dateIso: string; // e.g. "2026-09-13"
  dateLong: string; // e.g. "September 13, 2026"
}

/**
 * Returns current user local time and date formatted for social media mockups
 */
export function getUserLocalTimeAndDate(): FormattedUserTimeAndDate {
  const now = new Date();

  // 12-hour time format (e.g. "10:42 AM")
  const time12 = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  // 24-hour time format for status bar (e.g. "10:42" or "09:41")
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const time24 = `${hours}:${minutes}`;

  // Short month format (e.g. "Sep 13, 2026")
  const dateFormatted = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Full month format (e.g. "September 13, 2026")
  const dateLong = now.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // ISO date (e.g. "2026-09-13")
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const dateIso = `${year}-${month}-${day}`;

  return {
    time12,
    time24,
    dateFormatted,
    dateIso,
    dateLong,
  };
}

export type StatTier = 'micro' | 'trending' | 'viral' | 'mega';

export interface TwitterProportionateStats {
  views: number;
  likes: number;
  retweets: number;
  quotes: number;
  bookmarks: number;
  repliesCount: number;
}

/**
 * Helper to round numbers realistically like real social platforms
 */
function roundStat(num: number): number {
  if (num >= 10_000_000) {
    return Math.round(num / 100_000) * 100_000;
  }
  if (num >= 1_000_000) {
    return Math.round(num / 10_000) * 10_000;
  }
  if (num >= 100_000) {
    return Math.round(num / 1_000) * 1_000;
  }
  if (num >= 10_000) {
    return Math.round(num / 100) * 100;
  }
  if (num >= 1_000) {
    return Math.round(num / 10) * 10;
  }
  return Math.max(1, Math.round(num));
}

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Generates statistically proportionate Twitter/X stats based on tier
 */
export function generateProportionateTwitterStats(
  tier?: StatTier
): TwitterProportionateStats {
  // If no tier specified, pick randomly weighted towards trending & viral
  const selectedTier: StatTier =
    tier ||
    (['micro', 'trending', 'trending', 'viral', 'viral', 'mega'][
      Math.floor(Math.random() * 6)
    ] as StatTier);

  let views: number;
  let likeRatio: number;
  let retweetRatio: number;
  let quoteRatio: number;
  let bookmarkRatio: number;
  let replyRatio: number;

  switch (selectedTier) {
    case 'micro':
      // 1.5K - 9K views
      views = roundStat(randomInRange(1_500, 9_500));
      likeRatio = randomInRange(0.04, 0.08); // 4% - 8%
      retweetRatio = randomInRange(0.06, 0.14); // 6% - 14% of likes
      quoteRatio = randomInRange(0.12, 0.26); // 12% - 26% of retweets
      bookmarkRatio = randomInRange(0.1, 0.28);
      replyRatio = randomInRange(0.03, 0.09);
      break;

    case 'trending':
      // 60K - 550K views
      views = roundStat(randomInRange(60_000, 550_000));
      likeRatio = randomInRange(0.028, 0.058); // 2.8% - 5.8%
      retweetRatio = randomInRange(0.07, 0.16);
      quoteRatio = randomInRange(0.12, 0.24);
      bookmarkRatio = randomInRange(0.15, 0.35);
      replyRatio = randomInRange(0.02, 0.06);
      break;

    case 'viral':
      // 1.2M - 9.5M views (Matches user screenshot: 8.9M views, 184K likes, 14.2K RTs, 3.2K quotes)
      views = roundStat(randomInRange(1_200_000, 9_800_000));
      likeRatio = randomInRange(0.018, 0.038); // ~2% - 3.8%
      retweetRatio = randomInRange(0.07, 0.14); // ~7% - 14% of likes
      quoteRatio = randomInRange(0.14, 0.25); // ~14% - 25% of retweets
      bookmarkRatio = randomInRange(0.18, 0.38);
      replyRatio = randomInRange(0.015, 0.045);
      break;

    case 'mega':
      // 12M - 85M views
      views = roundStat(randomInRange(12_000_000, 85_000_000));
      likeRatio = randomInRange(0.014, 0.032);
      retweetRatio = randomInRange(0.08, 0.18);
      quoteRatio = randomInRange(0.12, 0.22);
      bookmarkRatio = randomInRange(0.2, 0.45);
      replyRatio = randomInRange(0.01, 0.035);
      break;
  }

  const rawLikes = views * likeRatio;
  const rawRetweets = rawLikes * retweetRatio;
  const rawQuotes = rawRetweets * quoteRatio;
  const rawBookmarks = rawLikes * bookmarkRatio;
  const rawReplies = rawLikes * replyRatio;

  return {
    views,
    likes: roundStat(rawLikes),
    retweets: roundStat(rawRetweets),
    quotes: roundStat(rawQuotes),
    bookmarks: roundStat(rawBookmarks),
    repliesCount: roundStat(rawReplies),
  };
}

/**
 * Recalculate realistic proportionate stats from a given view count
 */
export function calculateTwitterStatsFromViews(views: number): TwitterProportionateStats {
  const safeViews = Math.max(100, views);
  let likeRatio = 0.03;
  if (safeViews > 10_000_000) likeRatio = 0.022;
  else if (safeViews > 1_000_000) likeRatio = 0.025;
  else if (safeViews < 10_000) likeRatio = 0.055;

  const rawLikes = safeViews * likeRatio;
  const rawRetweets = rawLikes * 0.1;
  const rawQuotes = rawRetweets * 0.2;
  const rawBookmarks = rawLikes * 0.25;
  const rawReplies = rawLikes * 0.035;

  return {
    views: safeViews,
    likes: roundStat(rawLikes),
    retweets: roundStat(rawRetweets),
    quotes: roundStat(rawQuotes),
    bookmarks: roundStat(rawBookmarks),
    repliesCount: roundStat(rawReplies),
  };
}

/**
 * Proportionate Instagram stats
 */
export function generateProportionateInstagramStats(tier?: StatTier) {
  const selectedTier = tier || 'trending';
  switch (selectedTier) {
    case 'micro':
      return { likes: roundStat(randomInRange(80, 480)), comments: roundStat(randomInRange(6, 28)) };
    case 'trending':
      return { likes: roundStat(randomInRange(3_500, 32_000)), comments: roundStat(randomInRange(85, 950)) };
    case 'viral':
      return { likes: roundStat(randomInRange(95_000, 680_000)), comments: roundStat(randomInRange(1_800, 18_000)) };
    case 'mega':
      return { likes: roundStat(randomInRange(950_000, 4_800_000)), comments: roundStat(randomInRange(25_000, 140_000)) };
  }
}

/**
 * Proportionate TikTok stats
 */
export function generateProportionateTikTokStats(tier?: StatTier) {
  const selectedTier = tier || 'trending';
  let views: number;
  switch (selectedTier) {
    case 'micro':
      views = randomInRange(2_000, 15_000);
      break;
    case 'trending':
      views = randomInRange(80_000, 650_000);
      break;
    case 'viral':
      views = randomInRange(1_500_000, 12_000_000);
      break;
    case 'mega':
      views = randomInRange(15_000_000, 95_000_000);
      break;
  }

  const likes = roundStat(views * randomInRange(0.06, 0.14));
  const commentsCount = roundStat(likes * randomInRange(0.015, 0.04));
  const bookmarks = roundStat(likes * randomInRange(0.08, 0.22));
  const shares = roundStat(likes * randomInRange(0.03, 0.12));

  return {
    views: roundStat(views),
    likes,
    commentsCount,
    bookmarks,
    shares,
  };
}

/**
 * Proportionate YouTube stats
 */
export function generateProportionateYouTubeStats(tier?: StatTier) {
  const selectedTier = tier || 'viral';
  let views: number;
  let subCount: string;

  switch (selectedTier) {
    case 'micro':
      views = roundStat(randomInRange(1_200, 18_000));
      subCount = `${(randomInRange(2, 25)).toFixed(1)}K`;
      break;
    case 'trending':
      views = roundStat(randomInRange(85_000, 750_000));
      subCount = `${(randomInRange(120, 650)).toFixed(0)}K`;
      break;
    case 'viral':
      views = roundStat(randomInRange(1_800_000, 14_000_000));
      subCount = `${(randomInRange(1.2, 6.8)).toFixed(2)}M`;
      break;
    case 'mega':
      views = roundStat(randomInRange(18_000_000, 120_000_000));
      subCount = `${(randomInRange(12, 45)).toFixed(1)}M`;
      break;
  }

  const likes = roundStat(views * randomInRange(0.03, 0.07));
  return {
    viewsCount: views >= 1_000_000 ? `${(views / 1_000_000).toFixed(1)}M` : `${(views / 1_000).toFixed(0)}K`,
    likesCount: likes >= 1_000_000 ? `${(likes / 1_000_000).toFixed(1)}M` : `${(likes / 1_000).toFixed(0)}K`,
    subscribersCount: subCount,
  };
}

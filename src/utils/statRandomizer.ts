// Utility for generating authentic, statistically proportionate mockup metrics
// and retrieving real user local time and date.

export interface FormattedUserTimeAndDate {
  time12: string; // e.g. "10:42 AM"
  time24: string; // e.g. "10:42"
  dateFormatted: string; // e.g. "Sep 13, 2026"
  dateIso: string; // e.g. "2026-09-13"
  dateLong: string; // e.g. "September 13, 2026"
}

/**
 * Returns current user local time and date formatted for mockups
 */
export function getUserLocalTimeAndDate(): FormattedUserTimeAndDate {
  const now = new Date();

  const time12 = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const time24 = `${hours}:${minutes}`;

  const dateFormatted = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const dateLong = now.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

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

function formatCompact(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return String(num);
}

/**
 * Proportionate FANZA stats
 */
export function generateProportionateFanzaStats(tier?: StatTier) {
  const selectedTier = tier || 'trending';
  switch (selectedTier) {
    case 'micro':
      return {
        rating: Number(randomInRange(3.9, 4.4).toFixed(1)),
        reviewCount: roundStat(randomInRange(18, 95)),
        favoritesCount: roundStat(randomInRange(420, 2_200)),
      };
    case 'trending':
      return {
        rating: Number(randomInRange(4.4, 4.8).toFixed(1)),
        reviewCount: roundStat(randomInRange(180, 920)),
        favoritesCount: roundStat(randomInRange(5_400, 19_500)),
      };
    case 'viral':
      return {
        rating: Number(randomInRange(4.6, 4.9).toFixed(1)),
        reviewCount: roundStat(randomInRange(1_100, 3_800)),
        favoritesCount: roundStat(randomInRange(24_000, 78_000)),
      };
    case 'mega':
      return {
        rating: Number(randomInRange(4.8, 5.0).toFixed(1)),
        reviewCount: roundStat(randomInRange(4_200, 12_500)),
        favoritesCount: roundStat(randomInRange(85_000, 240_000)),
      };
  }
}

/**
 * Proportionate DLsite stats
 */
export function generateProportionateDlsiteStats(tier?: StatTier) {
  const selectedTier = tier || 'viral';
  switch (selectedTier) {
    case 'micro':
      return {
        rating: Number(randomInRange(4.1, 4.6).toFixed(1)),
        reviewCount: roundStat(randomInRange(14, 65)),
        salesCount: roundStat(randomInRange(250, 1_400)),
      };
    case 'trending':
      return {
        rating: Number(randomInRange(4.5, 4.8).toFixed(1)),
        reviewCount: roundStat(randomInRange(120, 540)),
        salesCount: roundStat(randomInRange(3_500, 14_000)),
      };
    case 'viral':
      return {
        rating: Number(randomInRange(4.7, 4.9).toFixed(1)),
        reviewCount: roundStat(randomInRange(650, 2_400)),
        salesCount: roundStat(randomInRange(18_000, 62_000)),
      };
    case 'mega':
      return {
        rating: Number(randomInRange(4.8, 5.0).toFixed(1)),
        reviewCount: roundStat(randomInRange(2_800, 8_500)),
        salesCount: roundStat(randomInRange(75_000, 220_000)),
      };
  }
}

/**
 * Proportionate Fanbox & Fantia post stats
 */
export function generateProportionateCreatorClubStats(tier?: StatTier) {
  const selectedTier = tier || 'trending';
  switch (selectedTier) {
    case 'micro':
      return {
        likes: roundStat(randomInRange(45, 290)),
        commentsCount: roundStat(randomInRange(4, 24)),
        fansCount: roundStat(randomInRange(280, 1_400)),
      };
    case 'trending':
      return {
        likes: roundStat(randomInRange(650, 3_400)),
        commentsCount: roundStat(randomInRange(35, 190)),
        fansCount: roundStat(randomInRange(3_500, 16_000)),
      };
    case 'viral':
      return {
        likes: roundStat(randomInRange(4_200, 18_000)),
        commentsCount: roundStat(randomInRange(220, 980)),
        fansCount: roundStat(randomInRange(22_000, 75_000)),
      };
    case 'mega':
      return {
        likes: roundStat(randomInRange(22_000, 85_000)),
        commentsCount: roundStat(randomInRange(1_100, 4_500)),
        fansCount: roundStat(randomInRange(90_000, 320_000)),
      };
  }
}

/**
 * Proportionate OnlyFans & Fansly stats
 */
export function generateProportionateOnlyFansStats(tier?: StatTier) {
  const selectedTier = tier || 'trending';
  switch (selectedTier) {
    case 'micro':
      return { likes: roundStat(randomInRange(45, 280)), comments: roundStat(randomInRange(4, 24)) };
    case 'trending':
      return { likes: roundStat(randomInRange(850, 4_800)), comments: roundStat(randomInRange(45, 320)) };
    case 'viral':
      return { likes: roundStat(randomInRange(6_500, 28_000)), comments: roundStat(randomInRange(380, 1_900)) };
    case 'mega':
      return { likes: roundStat(randomInRange(35_000, 140_000)), comments: roundStat(randomInRange(2_100, 8_400)) };
  }
}

/**
 * Proportionate XVideos & Pornhub stats
 */
export function generateProportionateXVideosStats(tier?: StatTier) {
  const selectedTier = tier || 'viral';
  let views: number;
  switch (selectedTier) {
    case 'micro':
      views = roundStat(randomInRange(4_500, 42_000));
      break;
    case 'trending':
      views = roundStat(randomInRange(180_000, 950_000));
      break;
    case 'viral':
      views = roundStat(randomInRange(1_800_000, 8_500_000));
      break;
    case 'mega':
      views = roundStat(randomInRange(12_000_000, 68_000_000));
      break;
  }

  const likes = roundStat(views * randomInRange(0.008, 0.018));
  const ratingPercent = Math.round(randomInRange(89, 99));
  const dislikes = roundStat(likes * ((100 - ratingPercent) / ratingPercent));
  const comments = roundStat(likes * randomInRange(0.03, 0.08));

  return {
    viewsCount: views.toLocaleString(),
    viewsCompact: formatCompact(views),
    likesCount: formatCompact(likes),
    dislikesCount: formatCompact(Math.max(12, dislikes)),
    ratingPercent,
    commentsCount: comments.toLocaleString(),
    ratingDecimal: Number((4.4 + (ratingPercent - 89) * 0.06).toFixed(1)),
  };
}

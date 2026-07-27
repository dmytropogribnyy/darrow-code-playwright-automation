export const zodiacSigns = [
  { name: 'Aries', slug: 'aries', dateRange: 'Mar 21 – Apr 19' },
  { name: 'Taurus', slug: 'taurus', dateRange: 'Apr 20 – May 20' },
  { name: 'Gemini', slug: 'gemini', dateRange: 'May 21 – Jun 20' },
  { name: 'Cancer', slug: 'cancer', dateRange: 'Jun 21 – Jul 22' },
  { name: 'Leo', slug: 'leo', dateRange: 'Jul 23 – Aug 22' },
  { name: 'Virgo', slug: 'virgo', dateRange: 'Aug 23 – Sep 22' },
  { name: 'Libra', slug: 'libra', dateRange: 'Sep 23 – Oct 22' },
  { name: 'Scorpio', slug: 'scorpio', dateRange: 'Oct 23 – Nov 21' },
  { name: 'Sagittarius', slug: 'sagittarius', dateRange: 'Nov 22 – Dec 21' },
  { name: 'Capricorn', slug: 'capricorn', dateRange: 'Dec 22 – Jan 19' },
  { name: 'Aquarius', slug: 'aquarius', dateRange: 'Jan 20 – Feb 18' },
  { name: 'Pisces', slug: 'pisces', dateRange: 'Feb 19 – Mar 20' },
] as const;

export type ZodiacSign = (typeof zodiacSigns)[number];

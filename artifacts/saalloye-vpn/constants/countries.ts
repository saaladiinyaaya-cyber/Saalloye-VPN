export const countries = [
  'United States',
  'United Kingdom',
  'Netherlands',
  'Germany',
  'Canada',
  'Japan',
  'Singapore',
  'Sweden',
  'Switzerland',
  'Ethiopia',
] as const;

export type Country = (typeof countries)[number];

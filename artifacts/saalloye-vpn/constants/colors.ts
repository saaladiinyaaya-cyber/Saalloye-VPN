/**
 * Semantic design tokens for the mobile app.
 *
 * These tokens mirror the naming conventions used in web artifacts (index.css)
 * so that multi-artifact projects share a cohesive visual identity.
 *
 * Replace the placeholder values below with values that match the project's
 * brand. If a sibling web artifact exists, read its index.css and convert the
 * HSL values to hex so both artifacts use the same palette.
 *
 * To add dark mode, add a `dark` key with the same token names.
 * The useColors() hook will automatically pick it up.
 */

const darkPalette = {
  text: '#F4F8FF',
  tint: '#45A5FF',
  background: '#07111F',
  foreground: '#F4F8FF',
  card: '#101E30',
  cardForeground: '#F4F8FF',
  primary: '#238CFF',
  primaryForeground: '#FFFFFF',
  secondary: '#14263B',
  secondaryForeground: '#E7F0FC',
  muted: '#17283C',
  mutedForeground: '#8FA4BC',
  accent: '#0E332E',
  accentForeground: '#6EE7B7',
  destructive: '#FB7185',
  destructiveForeground: '#FFFFFF',
  border: '#20344B',
  input: '#20344B',
  success: '#42D6A4',
  shadow: '#000000',
  surfaceRaised: '#14243A',
  surfaceInset: '#0B1828',
};

const colors = {
  light: darkPalette,
  dark: darkPalette,
  radius: 20,
};

export default colors;

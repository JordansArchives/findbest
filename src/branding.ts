/**
 * FindBest brand tokens.
 * Single source of truth — every color, font, radius, shadow, and spacing
 * value used anywhere in the extension must come from this file.
 *
 * To rebrand: change values here only. Nothing else in the codebase
 * should hardcode a color, font name, or radius value.
 */

export const colors = {
  primary: "#37481c",        // deep forest green — active states, badges
  primaryDark: "#1a2d14",    // main text
  accent: "#a82226",         // crimson — CTAs, links, highlights
  accentHover: "#8c1c1f",
  background: "#f1e9e7",     // warm beige
  surface: "#e9dfdb",
  surfaceElevated: "#f5edeb",
  textMuted: "#5a6b4e",      // sage
  textFaint: "#8a9a7e",
  border: "#cdc4c1",         // warm gray
  selectionBg: "rgba(168, 34, 38, 0.12)",
  selectionText: "#a82226",
} as const;

export const fonts = {
  display: {
    family: '"Awesome Serif"',
    fallback: 'Georgia, "Times New Roman", Times, serif',
    weights: [300, 400, 500, 700] as const,
  },
  body: {
    family: '"Trip Sans"',
    fallback: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
    weights: [400, 500, 700, 900] as const,
  },
  mono: {
    family: '"Trip Sans Mono"',
    fallback: 'ui-monospace, "SF Mono", Menlo, monospace',
    weights: [400] as const,
  },
} as const;

export const fontSize = {
  xs: "12px",
  sm: "14px",
  base: "16px",
  lg: "18px",
  xl: "20px",
  "2xl": "24px",
  "3xl": "32px",
  "4xl": "40px",
  hero: "56px",
} as const;

export const tracking = {
  nav: "0.06em",   // uppercase nav labels, weight 700
  pill: "0.08em",  // uppercase pills/badges, weight 700
} as const;

export const radius = {
  sm: "4px",
  md: "6px",       // default
  lg: "10px",
  full: "9999px",
} as const;

export const shadow = {
  card: "0 2px 8px rgba(26, 45, 20, 0.06)",
  cardHover: "0 8px 24px rgba(26, 45, 20, 0.12)",
} as const;

export const motion = {
  easeOut: "cubic-bezier(0.16, 1, 0.3, 1)",
  easeSpring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  durationFast: "150ms",
  durationNormal: "250ms",
  durationSlow: "400ms",
} as const;

export const space = {
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  6: "24px",
  8: "32px",
  12: "48px",
  16: "64px",
} as const;

/**
 * Font filenames in public/fonts/. Used by both the @font-face builder
 * and the manifest's web_accessible_resources entries — keeping the list
 * in one place means adding a new weight only requires editing here.
 */
export const fontFiles = [
  "awesome-serif-300.woff2",
  "awesome-serif-400.woff2",
  "awesome-serif-500.woff2",
  "awesome-serif-700.woff2",
  "trip-sans-400.woff2",
  "trip-sans-500.woff2",
  "trip-sans-700.woff2",
  "trip-sans-900.woff2",
  "trip-sans-mono-400.woff2",
] as const;

/** Strings — kept here so a fork can rebrand without touching logic. */
export const brand = {
  name: "FindBest",
  tagline: "Sort what matters.",
} as const;

import {
  colors,
  fonts,
  fontSize,
  radius,
  shadow,
  motion,
  space,
  tracking,
} from "../branding";

/**
 * Compiles the brand token system into a CSS string of custom properties
 * scoped to either :host (inside Shadow DOM) or :root (popup/options page).
 *
 * This is what makes branding.ts the single source of truth — every UI
 * surface reads from the same compiled tokens.
 */
export function buildTokensCSS(scope: ":host" | ":root" = ":host"): string {
  const stack = (f: { family: string; fallback: string }): string =>
    `${f.family}, ${f.fallback}`;

  return `${scope} {
  --color-primary: ${colors.primary};
  --color-primary-dark: ${colors.primaryDark};
  --color-accent: ${colors.accent};
  --color-accent-hover: ${colors.accentHover};
  --color-background: ${colors.background};
  --color-surface: ${colors.surface};
  --color-surface-elevated: ${colors.surfaceElevated};
  --color-text-muted: ${colors.textMuted};
  --color-text-faint: ${colors.textFaint};
  --color-border: ${colors.border};
  --color-selection-bg: ${colors.selectionBg};
  --color-selection-text: ${colors.selectionText};

  --font-display: ${stack(fonts.display)};
  --font-body: ${stack(fonts.body)};
  --font-mono: ${stack(fonts.mono)};

  --text-xs: ${fontSize.xs};
  --text-sm: ${fontSize.sm};
  --text-base: ${fontSize.base};
  --text-lg: ${fontSize.lg};
  --text-xl: ${fontSize.xl};
  --text-2xl: ${fontSize["2xl"]};
  --text-3xl: ${fontSize["3xl"]};
  --text-4xl: ${fontSize["4xl"]};
  --text-hero: ${fontSize.hero};

  --tracking-nav: ${tracking.nav};
  --tracking-pill: ${tracking.pill};

  --radius-sm: ${radius.sm};
  --radius-md: ${radius.md};
  --radius-lg: ${radius.lg};
  --radius-full: ${radius.full};

  --shadow-card: ${shadow.card};
  --shadow-card-hover: ${shadow.cardHover};

  --ease-out: ${motion.easeOut};
  --ease-spring: ${motion.easeSpring};
  --duration-fast: ${motion.durationFast};
  --duration-normal: ${motion.durationNormal};
  --duration-slow: ${motion.durationSlow};

  --space-1: ${space[1]};
  --space-2: ${space[2]};
  --space-3: ${space[3]};
  --space-4: ${space[4]};
  --space-6: ${space[6]};
  --space-8: ${space[8]};
  --space-12: ${space[12]};
  --space-16: ${space[16]};

  font-family: var(--font-body);
  color: var(--color-primary-dark);
  font-size: var(--text-base);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

${scope} *,
${scope} *::before,
${scope} *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

${scope} ::selection {
  background: var(--color-selection-bg);
  color: var(--color-selection-text);
}
`;
}

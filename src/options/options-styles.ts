import { buildFontFaceCSS } from "../shared/fonts";
import { buildTokensCSS } from "../shared/styles";

export function applyOptionsStyles(): void {
  const fontStyle = document.createElement("style");
  fontStyle.textContent = buildFontFaceCSS();
  document.head.appendChild(fontStyle);

  const tokensStyle = document.createElement("style");
  tokensStyle.textContent = buildTokensCSS(":root");
  document.head.appendChild(tokensStyle);

  const layoutStyle = document.createElement("style");
  layoutStyle.textContent = OPTIONS_CSS;
  document.head.appendChild(layoutStyle);
}

const OPTIONS_CSS = `
  body {
    margin: 0;
    min-height: 100vh;
    background: var(--color-background);
    color: var(--color-primary-dark);
    font-family: var(--font-body);
  }

  main {
    max-width: 720px;
    margin: 0 auto;
    padding: var(--space-12) var(--space-6);
  }

  .opt-hero {
    border-bottom: 1px solid var(--color-border);
    padding-bottom: var(--space-6);
    margin-bottom: var(--space-8);
  }

  .opt-hero__brand {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: var(--text-4xl);
    color: var(--color-primary);
    line-height: 1.1;
    letter-spacing: -0.02em;
  }

  .opt-hero__tagline {
    margin-top: var(--space-2);
    font-size: var(--text-sm);
    text-transform: uppercase;
    letter-spacing: var(--tracking-nav);
    font-weight: 700;
    color: var(--color-text-muted);
  }

  .opt-section {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-6);
    margin-bottom: var(--space-4);
  }

  .opt-section h2 {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: var(--text-xl);
    color: var(--color-primary-dark);
    margin-bottom: var(--space-3);
  }

  .opt-section p {
    color: var(--color-text-muted);
    font-size: var(--text-sm);
    line-height: 1.6;
  }
`;

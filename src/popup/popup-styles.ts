import { buildFontFaceCSS } from "../shared/fonts";
import { buildTokensCSS } from "../shared/styles";

/**
 * Injects brand fonts + tokens + popup-local layout CSS into the popup
 * document head. Popup is a regular extension page, so no Shadow DOM
 * needed — but we still go through buildTokensCSS so the source of
 * truth stays branding.ts.
 */
export function applyPopupStyles(): void {
  const fontStyle = document.createElement("style");
  fontStyle.textContent = buildFontFaceCSS();
  document.head.appendChild(fontStyle);

  const tokensStyle = document.createElement("style");
  tokensStyle.textContent = buildTokensCSS(":root");
  document.head.appendChild(tokensStyle);

  const layoutStyle = document.createElement("style");
  layoutStyle.textContent = POPUP_CSS;
  document.head.appendChild(layoutStyle);
}

const POPUP_CSS = `
  body {
    width: 320px;
    margin: 0;
    background: var(--color-background);
    color: var(--color-primary-dark);
    font-family: var(--font-body);
  }

  .hero {
    padding: var(--space-6) var(--space-6) var(--space-4);
    border-bottom: 1px solid var(--color-border);
  }

  .hero__brand {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: var(--text-3xl);
    color: var(--color-primary);
    letter-spacing: -0.01em;
    line-height: 1.1;
  }

  .hero__tagline {
    margin-top: var(--space-1);
    color: var(--color-text-muted);
    font-size: var(--text-xs);
    text-transform: uppercase;
    letter-spacing: var(--tracking-nav);
    font-weight: 700;
  }

  .status {
    padding: var(--space-4) var(--space-6);
    background: var(--color-surface);
  }

  .status__label {
    font-size: var(--text-xs);
    text-transform: uppercase;
    letter-spacing: var(--tracking-pill);
    font-weight: 700;
    color: var(--color-text-faint);
    margin-bottom: var(--space-1);
  }

  .status__value {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
  }

  .status__value strong {
    color: var(--color-primary-dark);
    font-weight: 500;
  }

  .btn {
    display: block;
    width: calc(100% - calc(var(--space-6) * 2));
    margin: var(--space-4) var(--space-6);
    padding: var(--space-3) var(--space-4);
    background: var(--color-accent);
    color: var(--color-background);
    border: none;
    border-radius: var(--radius-md);
    font-family: var(--font-body);
    font-weight: 700;
    font-size: var(--text-sm);
    text-transform: uppercase;
    letter-spacing: var(--tracking-nav);
    cursor: pointer;
    transition:
      background var(--duration-fast) var(--ease-out),
      transform var(--duration-fast) var(--ease-out);
  }

  .btn:hover:not(:disabled) {
    background: var(--color-accent-hover);
  }

  .btn:active:not(:disabled) {
    transform: scale(0.98);
  }

  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .footer {
    padding: var(--space-3) var(--space-6) var(--space-4);
    border-top: 1px solid var(--color-border);
    font-size: var(--text-xs);
    color: var(--color-text-faint);
    text-transform: uppercase;
    letter-spacing: var(--tracking-pill);
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

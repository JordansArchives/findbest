import { buildFontFaceCSS } from "./fonts";
import { buildTokensCSS } from "./styles";

/**
 * Shadow DOM mounting utility for FindBest content scripts.
 *
 * Every piece of UI injected into instagram.com or tiktok.com lives
 * inside a Shadow DOM root, so host-page CSS cannot affect our styles
 * and ours cannot bleed into theirs.
 *
 * The host element is attached to <html> rather than <body> because
 * Instagram sometimes wipes and re-renders <body> on SPA navigation;
 * attaching one level up reduces cleanup churn.
 */

const HOST_PREFIX = "findbest-";
const HEAD_FONT_STYLE_ID = "findbest-fonts";

export interface MountResult {
  host: HTMLElement;
  root: ShadowRoot;
}

export function mountShadowUI(id: string): MountResult {
  ensureHeadFonts();

  const hostId = `${HOST_PREFIX}${id}`;
  const existing = document.getElementById(hostId);
  if (existing && existing.shadowRoot) {
    return { host: existing, root: existing.shadowRoot };
  }

  const host = document.createElement("div");
  host.id = hostId;
  // Cover the viewport but stay click-through; child UI re-enables
  // pointer-events on its own clickable surfaces.
  host.style.position = "fixed";
  host.style.inset = "0";
  host.style.zIndex = "2147483647";
  host.style.pointerEvents = "none";
  document.documentElement.appendChild(host);

  const root = host.attachShadow({ mode: "open" });

  const fontStyle = document.createElement("style");
  fontStyle.textContent = buildFontFaceCSS();
  root.appendChild(fontStyle);

  const tokensStyle = document.createElement("style");
  tokensStyle.textContent = buildTokensCSS(":host");
  root.appendChild(tokensStyle);

  return { host, root };
}

/**
 * Some Chromium versions need @font-face declared in the main document
 * for font URLs to resolve reliably inside shadow contexts. Belt-and-
 * suspenders: declare in both places. Fonts download once (URL-cached).
 */
function ensureHeadFonts(): void {
  if (document.getElementById(HEAD_FONT_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = HEAD_FONT_STYLE_ID;
  style.textContent = buildFontFaceCSS();
  document.head.appendChild(style);
}

export function unmountShadowUI(id: string): void {
  document.getElementById(`${HOST_PREFIX}${id}`)?.remove();
}

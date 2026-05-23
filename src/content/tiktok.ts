import { mountShadowUI } from "../shared/shadow-mount";
import { renderPhase0Badge } from "../shared/phase0-badge";
import { ensureLoaded } from "../selectors/adapter";

/**
 * TikTok content script — Phase 0.
 * Mounts an isolated Shadow DOM root and renders the proof-of-life badge.
 * Phase 3 replaces this with the sort toolbar.
 */
async function init(): Promise<void> {
  try {
    await ensureLoaded();
    const { root } = mountShadowUI("tiktok");
    renderPhase0Badge(root, "TikTok");
  } catch (err) {
    console.error("[FindBest] TikTok init failed", err);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}

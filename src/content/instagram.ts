import { mountShadowUI } from "../shared/shadow-mount";
import { renderPhase0Badge } from "../shared/phase0-badge";
import { ensureLoaded } from "../selectors/adapter";

/**
 * Instagram content script — Phase 0.
 * Mounts an isolated Shadow DOM root and renders the proof-of-life badge.
 * Phase 1 replaces this with the sort toolbar.
 */
async function init(): Promise<void> {
  try {
    await ensureLoaded();
    const { root } = mountShadowUI("instagram");
    renderPhase0Badge(root, "Instagram");
  } catch (err) {
    console.error("[FindBest] Instagram init failed", err);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}

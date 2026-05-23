import { getSelectors } from "../selectors/loader";

/**
 * MV3 service worker for FindBest.
 *
 * Responsibilities:
 *   - Fetch selectors.json on install and browser startup.
 *   - Handle force-refresh messages from the popup.
 *
 * Service workers in MV3 are ephemeral — they spin up on demand and
 * get terminated when idle. State that needs to persist lives in
 * chrome.storage.local, not in module-level variables.
 */

chrome.runtime.onInstalled.addListener(async () => {
  console.log("[FindBest] installed — fetching selectors");
  await getSelectors();
});

chrome.runtime.onStartup.addListener(async () => {
  console.log("[FindBest] browser startup — refreshing selectors");
  await getSelectors();
});

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg?.type === "FINDBEST_REFRESH_SELECTORS") {
    getSelectors(true)
      .then((config) =>
        sendResponse({ ok: true, version: config.version, updatedAt: config.updatedAt })
      )
      .catch((err) => sendResponse({ ok: false, error: String(err) }));
    return true; // keep the message channel open for async sendResponse
  }
  return false;
});

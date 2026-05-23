import type { SelectorsConfig } from "./schema";
import defaults from "./defaults.json";

/**
 * Remote selector loader with 24h refresh and graceful fallback.
 *
 * Resolution order:
 *   1. If cached entry is fresh (< 24h), use it.
 *   2. Try to fetch the remote URL. If valid, cache and use.
 *   3. If fetch fails, use the (possibly stale) cached entry.
 *   4. If no cache exists, fall back to bundled defaults.json.
 *
 * Called by the service worker on install/startup and by the popup's
 * "Check for selector updates" button (with force=true).
 */

const REMOTE_URL =
  "https://raw.githubusercontent.com/JordansArchives/findbest/main/selectors.json";

const STORAGE_KEY = "findbest:selectors";
const CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000;

interface CachedEntry {
  config: SelectorsConfig;
  fetchedAt: number;
}

export async function getSelectors(force = false): Promise<SelectorsConfig> {
  const cached = await readCache();
  const isFresh = cached && Date.now() - cached.fetchedAt < CACHE_MAX_AGE_MS;

  if (cached && isFresh && !force) {
    return cached.config;
  }

  const remote = await fetchRemote();
  if (remote) {
    await writeCache(remote);
    return remote;
  }

  if (cached) return cached.config;
  return defaults as SelectorsConfig;
}

export async function getLastFetchedAt(): Promise<number | null> {
  const cached = await readCache();
  return cached?.fetchedAt ?? null;
}

async function fetchRemote(): Promise<SelectorsConfig | null> {
  try {
    const res = await fetch(REMOTE_URL, { cache: "no-store" });
    if (!res.ok) {
      console.warn(`[FindBest] selectors fetch HTTP ${res.status}`);
      return null;
    }
    const json = (await res.json()) as SelectorsConfig;
    if (!validate(json)) {
      console.warn("[FindBest] selectors.json failed schema check");
      return null;
    }
    return json;
  } catch (err) {
    console.warn("[FindBest] selector fetch failed", err);
    return null;
  }
}

function validate(json: unknown): json is SelectorsConfig {
  if (!json || typeof json !== "object") return false;
  const c = json as Partial<SelectorsConfig>;
  return (
    typeof c.version === "number" &&
    typeof c.updatedAt === "string" &&
    !!c.instagram &&
    typeof c.instagram === "object" &&
    !!c.tiktok &&
    typeof c.tiktok === "object"
  );
}

async function readCache(): Promise<CachedEntry | null> {
  const result = await chrome.storage.local.get(STORAGE_KEY);
  return (result[STORAGE_KEY] as CachedEntry | undefined) ?? null;
}

async function writeCache(config: SelectorsConfig): Promise<void> {
  const entry: CachedEntry = { config, fetchedAt: Date.now() };
  await chrome.storage.local.set({ [STORAGE_KEY]: entry });
}

import type { SelectorsConfig, PlatformSelectors } from "./schema";
import { getSelectors } from "./loader";

/**
 * Thin selector adapter. The whole codebase reads from this — nothing
 * else should touch raw selectors or call document.querySelector for
 * platform-specific lookups. When IG/TT change, only this module and
 * the remote selectors.json need updates.
 *
 * Phase 0 ships the interface and `ensureLoaded()` plumbing. Phase 1
 * implements `getPosts(...)` for Instagram, Phase 3 for TikTok.
 */

export type Platform = "instagram" | "tiktok";

let cached: SelectorsConfig | null = null;

export async function ensureLoaded(): Promise<void> {
  if (!cached) cached = await getSelectors();
}

export function getPlatformConfig(platform: Platform): PlatformSelectors {
  if (!cached) {
    throw new Error(
      "[FindBest] adapter not loaded. Call ensureLoaded() before use."
    );
  }
  return cached[platform];
}

export interface PostRecord {
  url: string;
  type: "post" | "reel" | "video";
  date: string;           // ISO 8601
  likes: number | null;
  comments: number | null;
  views: number | null;
  shares: number | null;
  saves: number | null;
  caption: string | null;
}

/**
 * Phase 1 (Instagram) and Phase 3 (TikTok) implement this.
 * Returning [] in Phase 0 keeps call sites compilable.
 */
export async function getPosts(_platform: Platform): Promise<PostRecord[]> {
  return [];
}

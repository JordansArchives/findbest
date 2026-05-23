/**
 * Schema for the remote-fetched selectors.json.
 *
 * The whole point of this file: when Instagram or TikTok change their
 * page structure, we update selectors.json in the public repo and every
 * installed extension picks it up within 24 hours — no extension update
 * required.
 *
 * Phase 0 ships the schema with empty selectors. Phase 1+ populates them
 * via reverse-engineering the live pages.
 */

export interface SelectorsConfig {
  version: number;
  updatedAt: string;
  instagram: PlatformSelectors;
  tiktok: PlatformSelectors;
}

export interface PlatformSelectors {
  posts?: ExtractRule;
  likes?: ExtractRule;
  comments?: ExtractRule;
  views?: ExtractRule;
  shares?: ExtractRule;
  saves?: ExtractRule;
  caption?: ExtractRule;
  date?: ExtractRule;
  url?: ExtractRule;
  type?: ExtractRule;
}

/**
 * A single extraction rule. Tries `jsonPath` first (faster and more
 * stable against DOM churn). Falls back to `domSelector`. `parse`
 * normalizes the extracted value before it reaches the sort/export layer.
 */
export interface ExtractRule {
  jsonPath?: string;          // e.g., "data.user.edge_owner_to_timeline_media.edges"
  domSelector?: string;       // e.g., 'article a[href*="/p/"]'
  attribute?: string;         // e.g., "href", "datetime"
  parse?: "int" | "abbreviated" | "iso-date";
}

/**
 * Builds the @font-face CSS block for FindBest's self-hosted fonts.
 *
 * Font files live in public/fonts/ and are declared in manifest.json's
 * web_accessible_resources so content scripts can fetch them on
 * instagram.com and tiktok.com. URLs resolve via chrome.runtime.getURL.
 */

interface FontFaceEntry {
  family: string;
  weight: number;
  file: string;
}

const FACES: FontFaceEntry[] = [
  { family: "Awesome Serif", weight: 300, file: "awesome-serif-300.woff2" },
  { family: "Awesome Serif", weight: 400, file: "awesome-serif-400.woff2" },
  { family: "Awesome Serif", weight: 500, file: "awesome-serif-500.woff2" },
  { family: "Awesome Serif", weight: 700, file: "awesome-serif-700.woff2" },
  { family: "Trip Sans", weight: 400, file: "trip-sans-400.woff2" },
  { family: "Trip Sans", weight: 500, file: "trip-sans-500.woff2" },
  { family: "Trip Sans", weight: 700, file: "trip-sans-700.woff2" },
  { family: "Trip Sans", weight: 900, file: "trip-sans-900.woff2" },
  { family: "Trip Sans Mono", weight: 400, file: "trip-sans-mono-400.woff2" },
];

function fontUrl(filename: string): string {
  return chrome.runtime.getURL(`fonts/${filename}`);
}

export function buildFontFaceCSS(): string {
  return FACES.map(
    ({ family, weight, file }) =>
      `@font-face {
  font-family: "${family}";
  src: url("${fontUrl(file)}") format("woff2");
  font-weight: ${weight};
  font-style: normal;
  font-display: swap;
}`
  ).join("\n\n");
}

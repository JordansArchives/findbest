import { defineManifest } from "@crxjs/vite-plugin";
import { fontFiles } from "./src/branding";

const fontResources = fontFiles.map((f) => `fonts/${f}`);

export default defineManifest({
  manifest_version: 3,
  name: "FindBest",
  version: "0.0.1",
  description: "Sort and export Instagram and TikTok feeds.",
  action: {
    default_popup: "src/popup/index.html",
  },
  options_page: "src/options/index.html",
  background: {
    service_worker: "src/background/service-worker.ts",
    type: "module",
  },
  content_scripts: [
    {
      matches: ["*://*.instagram.com/*"],
      js: ["src/content/instagram.ts"],
      run_at: "document_idle",
    },
    {
      matches: ["*://*.tiktok.com/*"],
      js: ["src/content/tiktok.ts"],
      run_at: "document_idle",
    },
  ],
  host_permissions: [
    "*://*.instagram.com/*",
    "*://*.tiktok.com/*",
    "https://raw.githubusercontent.com/*",
  ],
  permissions: ["storage"],
  web_accessible_resources: [
    {
      resources: fontResources,
      matches: ["*://*.instagram.com/*", "*://*.tiktok.com/*"],
    },
  ],
});

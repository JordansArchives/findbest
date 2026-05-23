import { brand } from "../branding";
import { applyPopupStyles } from "./popup-styles";
import { getLastFetchedAt } from "../selectors/loader";

applyPopupStyles();
void render();

async function render(): Promise<void> {
  const root = document.getElementById("root");
  if (!root) return;

  const lastFetched = await getLastFetchedAt();
  const lastFetchedStr = lastFetched
    ? new Date(lastFetched).toLocaleString()
    : "never";

  root.innerHTML = `
    <header class="hero">
      <div class="hero__brand">${brand.name}</div>
      <div class="hero__tagline">${brand.tagline}</div>
    </header>
    <section class="status">
      <div class="status__label">Selector pack</div>
      <div class="status__value">Last updated: <strong>${lastFetchedStr}</strong></div>
    </section>
    <button id="findbest-refresh" class="btn" type="button">
      Check for selector updates
    </button>
    <footer class="footer">
      <span>v0.0.1</span>
      <span>Phase 0</span>
    </footer>
  `;

  const btn = document.getElementById("findbest-refresh") as HTMLButtonElement | null;
  btn?.addEventListener("click", () => void onRefresh(btn));
}

async function onRefresh(btn: HTMLButtonElement): Promise<void> {
  const originalText = btn.textContent ?? "Check for selector updates";
  btn.disabled = true;
  btn.textContent = "Refreshing...";
  try {
    const res = await chrome.runtime.sendMessage({
      type: "FINDBEST_REFRESH_SELECTORS",
    });
    btn.textContent = res?.ok ? "Updated" : "Update failed";
  } catch {
    btn.textContent = "Update failed";
  }
  setTimeout(() => {
    btn.disabled = false;
    btn.textContent = originalText;
    void render();
  }, 1200);
}

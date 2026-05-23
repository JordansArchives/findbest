import { brand } from "../branding";
import { applyOptionsStyles } from "./options-styles";

applyOptionsStyles();
render();

function render(): void {
  const root = document.getElementById("root");
  if (!root) return;

  root.innerHTML = `
    <header class="opt-hero">
      <div class="opt-hero__brand">${brand.name}</div>
      <div class="opt-hero__tagline">${brand.tagline}</div>
    </header>

    <section class="opt-section">
      <h2>Filter presets</h2>
      <p>Save your favorite sort + filter combinations here. Wired up in Phase 4.</p>
    </section>

    <section class="opt-section">
      <h2>Maintenance</h2>
      <p>Force-refresh selectors and report extraction issues. Wired up in Phase 5.</p>
    </section>
  `;
}

import { brand } from "../branding";

/**
 * Phase 0 proof-of-life badge. Confirms that the Shadow DOM mount and
 * @font-face loading both work on instagram.com and tiktok.com.
 * Replaced in Phase 1 by the real sorting toolbar.
 */
export function renderPhase0Badge(root: ShadowRoot, platformLabel: string): void {
  const wrap = document.createElement("div");
  wrap.className = "findbest-badge";

  const localStyle = document.createElement("style");
  localStyle.textContent = `
    .findbest-badge {
      position: absolute;
      bottom: var(--space-6);
      right: var(--space-6);
      pointer-events: auto;
      background: var(--color-surface-elevated);
      color: var(--color-primary-dark);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      padding: var(--space-3) var(--space-4);
      box-shadow: var(--shadow-card);
      display: flex;
      align-items: center;
      gap: var(--space-3);
      transition: box-shadow var(--duration-normal) var(--ease-out),
                  transform var(--duration-normal) var(--ease-out);
    }

    .findbest-badge:hover {
      box-shadow: var(--shadow-card-hover);
      transform: translateY(-1px);
    }

    .findbest-badge__mark {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: var(--text-lg);
      color: var(--color-primary);
      line-height: 1;
    }

    .findbest-badge__divider {
      width: 1px;
      height: 16px;
      background: var(--color-border);
    }

    .findbest-badge__label {
      font-family: var(--font-body);
      font-size: var(--text-xs);
      text-transform: uppercase;
      letter-spacing: var(--tracking-pill);
      font-weight: 700;
      color: var(--color-text-muted);
    }
  `;
  root.appendChild(localStyle);

  wrap.innerHTML = `
    <span class="findbest-badge__mark">${brand.name}</span>
    <span class="findbest-badge__divider"></span>
    <span class="findbest-badge__label">Ready on ${platformLabel}</span>
  `;
  root.appendChild(wrap);
}

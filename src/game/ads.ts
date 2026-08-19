/** Advertising configuration. Ads appear on every screen, but never on top of a decision. */
export const adsConfig = {
  enabled: true,
  provider: "placeholder" as "placeholder" | "adsense",
  slots: {
    menu: { id: "survive-menu", label: "MENU", enabled: true },
    missions: { id: "survive-missions", label: "MISSIONS", enabled: true },
    result: { id: "survive-result", label: "RESULT", enabled: true },
    endings: { id: "survive-endings", label: "ENDINGS", enabled: true },
    stats: { id: "survive-stats", label: "STATS", enabled: true },
    settings: { id: "survive-settings", label: "SETTINGS", enabled: true },
    transition: { id: "survive-transition", label: "LOADING", enabled: true },
    play: { id: "survive-play", label: "IN-GAME", enabled: true },
  },
};

export type AdPlacement = keyof typeof adsConfig.slots;

export function isAdEnabled(placement: AdPlacement) {
  return adsConfig.enabled && adsConfig.slots[placement].enabled;
}

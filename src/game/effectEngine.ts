import type { Effects, GameState, StatKey } from "./types";

const clamp = (n: number) => Math.max(0, Math.min(100, n));

export function applyEffects(state: GameState, effects?: Effects): GameState {
  if (!effects) return state;

  const next: GameState = {
    ...state,
    stats: { ...state.stats },
    inventory: [...state.inventory],
    clues: [...state.clues],
    flags: [...state.flags],
    relationships: { ...state.relationships },
  };

  if (effects.stats) {
    for (const [key, delta] of Object.entries(effects.stats)) {
      if (typeof delta !== "number") continue;
      const k = key as StatKey;
      next.stats[k] = clamp(next.stats[k] + delta);
    }
  }

  for (const item of effects.addItems ?? []) {
    if (!next.inventory.includes(item)) next.inventory.push(item);
  }
  for (const item of effects.removeItems ?? []) {
    next.inventory = next.inventory.filter((i) => i !== item);
  }
  for (const clue of effects.addClues ?? []) {
    if (!next.clues.includes(clue)) next.clues.push(clue);
  }
  for (const flag of effects.setFlags ?? []) {
    if (!next.flags.includes(flag)) next.flags.push(flag);
  }
  for (const flag of effects.clearFlags ?? []) {
    next.flags = next.flags.filter((f) => f !== flag);
  }

  if (effects.rel) {
    for (const [charId, delta] of Object.entries(effects.rel)) {
      const current = next.relationships[charId] ?? { trust: 0, fear: 0, suspicion: 0 };
      next.relationships[charId] = {
        trust: clamp(current.trust + (delta.trust ?? 0)),
        fear: clamp(current.fear + (delta.fear ?? 0)),
        suspicion: clamp(current.suspicion + (delta.suspicion ?? 0)),
      };
    }
  }

  return next;
}

import type { Conditions, GameState, StatKey, StatRange } from "./types";

function inRange(value: number, range: StatRange): boolean {
  if (range.min !== undefined && value < range.min) return false;
  if (range.max !== undefined && value > range.max) return false;
  return true;
}

export function checkConditions(cond: Conditions | undefined, state: GameState): boolean {
  if (!cond) return true;

  if (cond.items?.some((i) => !state.inventory.includes(i))) return false;
  if (cond.notItems?.some((i) => state.inventory.includes(i))) return false;
  if (cond.clues?.some((c) => !state.clues.includes(c))) return false;
  if (cond.flags?.some((f) => !state.flags.includes(f))) return false;
  if (cond.notFlags?.some((f) => state.flags.includes(f))) return false;
  if (cond.visited?.some((l) => !state.visitedLocations.includes(l))) return false;
  if (cond.minClues !== undefined && state.clues.length < cond.minClues) return false;

  if (cond.stats) {
    for (const [key, range] of Object.entries(cond.stats)) {
      if (!range) continue;
      if (!inRange(state.stats[key as StatKey], range)) return false;
    }
  }

  if (cond.rel) {
    for (const [charId, spec] of Object.entries(cond.rel)) {
      const rel = state.relationships[charId] ?? { trust: 0, fear: 0, suspicion: 0 };
      for (const [key, range] of Object.entries(spec)) {
        if (!range) continue;
        if (!inRange(rel[key as "trust" | "fear" | "suspicion"] ?? 0, range)) return false;
      }
    }
  }

  return true;
}

export function describeLock(cond: Conditions | undefined): string | null {
  if (!cond) return null;
  if (cond.items?.length) return "تحتاج شيئًا لا تملكه.";
  if (cond.clues?.length) return "لا تعرف ما يكفي بعد.";
  if (cond.flags?.length) return "لم يحدث ما يسمح بهذا.";
  return "غير متاح الآن.";
}

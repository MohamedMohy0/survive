import type { GameState, SaveData } from "./types";

const KEY = "survive.save.v1";

const empty: SaveData = {
  version: 1,
  activeRun: null,
  progress: {},
  settings: { sound: true, music: true, motion: true, quality: "high" },
};

export function loadSave(): SaveData {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as SaveData;
    return { ...empty, ...parsed, settings: { ...empty.settings, ...parsed.settings } };
  } catch {
    return empty;
  }
}

export function writeSave(data: SaveData) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* storage unavailable */
  }
}

export function saveRun(state: GameState | null) {
  const data = loadSave();
  data.activeRun = state;
  writeSave(data);
}

export function recordEnding(
  missionId: string,
  endingId: string,
  grade: string,
  clues: string[],
) {
  const data = loadSave();
  const prev = data.progress[missionId] ?? {
    completed: false,
    endings: [],
    clues: [],
    runs: 0,
  };
  const endings = prev.endings.includes(endingId) ? prev.endings : [...prev.endings, endingId];
  const mergedClues = Array.from(new Set([...prev.clues, ...clues]));
  const order = ["D", "C", "B", "A", "A+", "S"];
  const best =
    prev.bestGrade && order.indexOf(prev.bestGrade) > order.indexOf(grade) ? prev.bestGrade : grade;
  data.progress[missionId] = {
    completed: true,
    endings,
    clues: mergedClues,
    runs: prev.runs + 1,
    bestGrade: best,
  };
  data.activeRun = null;
  writeSave(data);
  return data;
}

export const emptySave = empty;

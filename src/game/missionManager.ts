import { missions } from "@/data/missions";
import type { Mission, SaveData } from "./types";

export function getMissions(): Mission[] {
  return [...missions].sort((a, b) => a.index - b.index);
}

export function getMission(id: string): Mission | undefined {
  return missions.find((m) => m.id === id);
}

export type MissionStatus = "locked" | "available" | "completed";

export function getMissionStatus(mission: Mission, save: SaveData): MissionStatus {
  const progress = save.progress[mission.id];
  if (progress?.completed) return "completed";
  if (!mission.unlockAfter) return "available";
  return save.progress[mission.unlockAfter]?.completed ? "available" : "locked";
}

export function statusLabel(status: MissionStatus) {
  return status === "completed" ? "مكتملة" : status === "available" ? "متاحة" : "مقفلة";
}

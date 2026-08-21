import type { Mission } from "@/game/types";
import room207 from "./mission-001-room-207.json";
import lastTrain from "./mission-002-last-train.json";
import signal from "./mission-003-signal.json";

export const missions: Mission[] = [
  room207 as unknown as Mission,
  lastTrain as unknown as Mission,
  signal as unknown as Mission,
];

/** Missions announced in the mission list but not yet playable. */
export const upcomingMissions = [
  { code: "04", title: "القبو", subtitle: "ما نزل، لم يصعد." },
  { code: "05", title: "الرجل الذي لا يتذكر", subtitle: "كل صباح يبدأ من نفس الجملة." },
  { code: "06", title: "حافلة منتصف الليل ", subtitle: "رحلة أسرار غامضة في منتصف الليل." },
  { code: "07", title: "الظل الخامس", subtitle: "أربعة أشخاص في الغرفة, وخمسة ظلال علي الجدار." },
  { code: "08", title: "الكوابيس الأزلية", subtitle: "كلما اقتربت من نهاية الكابوس تكتشف انها البداية" },


];

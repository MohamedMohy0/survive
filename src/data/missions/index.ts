import type { Mission } from "@/game/types";
import room207 from "./mission-001-room-207.json";
import lastTrain from "./mission-002-last-train.json";

export const missions: Mission[] = [
  room207 as unknown as Mission,
  lastTrain as unknown as Mission,
];

/** Missions announced in the mission list but not yet playable. */
export const upcomingMissions = [
  { code: "03", title: "الإشارة", subtitle: "أحدهم يبثّ من مكان لا يوجد فيه أحد." },
  { code: "04", title: "القبو", subtitle: "ما نزل، لم يصعد." },
  { code: "05", title: "الرجل الذي لا يتذكر", subtitle: "كل صباح يبدأ من نفس الجملة." },
  { code: "06", title: "حافلة منتصف الليل ", subtitle: "رحلة أسرار غامضة في منتصف الليل." },
    { code: "07", title: "الظل الخامس", subtitle: "أربعة أشخاص في الغرفة, وخمسة ظلال علي الجدار." },


];

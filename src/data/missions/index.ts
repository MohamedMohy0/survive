import type { Mission } from "@/game/types";
import room207 from "./mission-001-room-207.json";

export const missions: Mission[] = [room207 as unknown as Mission];

/** Missions announced in the mission list but not yet playable. */
export const upcomingMissions = [
  { code: "02", title: "آخر قطار", subtitle: "المحطة الأخيرة ليست محطة." },
  { code: "03", title: "الإشارة", subtitle: "أحدهم يبثّ من مكان لا يوجد فيه أحد." },
  { code: "04", title: "القبو", subtitle: "ما نزل، لم يصعد." },
  { code: "05", title: "الرجل الذي لا يتذكر", subtitle: "كل صباح يبدأ من نفس الجملة." },
];

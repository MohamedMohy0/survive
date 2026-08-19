import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdSlot } from "@/components/game/AdSlot";
import { Scene } from "@/components/game/Scene";
import { getMissions, getMissionStatus, statusLabel } from "@/game/missionManager";
import { loadSave } from "@/game/storage";
import { upcomingMissions } from "@/data/missions";
import type { SaveData } from "@/game/types";
import { emptySave } from "@/game/storage";

export const Route = createFileRoute("/missions")({
  head: () => ({
    meta: [
      { title: "المهام — SURVIVE" },
      {
        name: "description",
        content:
          "استعرض مهام SURVIVE المتاحة. كل مهمة قصة مستقلة بفروعها وأسرارها ونهاياتها. ابدأ رحلتك وطوّر سجل نجاتك.",
      },
      { property: "og:title", content: "المهام — SURVIVE" },
      {
        property: "og:description",
        content:
          "قائمة مهام SURVIVE. كل مهمة عالم منفصل بقرارات متفرعة ونهايات متعددة. ابدأ واكتشف ما يمكن أن تُخفيه الأبواب المغلقة.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MissionsPage,
});

function MissionsPage() {
  const [save, setSave] = useState<SaveData>(emptySave);
  useEffect(() => setSave(loadSave()), []);

  return (
    <Scene location="missions">
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-12">
        <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">
          ← القائمة الرئيسية
        </Link>
        <h1 className="title-display mt-6 text-3xl text-foreground">المهام</h1>
        <p className="mt-2 text-sm text-muted-foreground">كل مهمة قصة كاملة. اللعب مفتوح دائمًا.</p>

        <div className="mt-8 space-y-4">
          {getMissions().map((mission) => {
            const status = getMissionStatus(mission, save);
            const progress = save.progress[mission.id];
            return (
              <article key={mission.id} className="panel p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <p className="text-[0.7rem] tracking-[0.3em] text-primary/80">
                      المهمة {mission.code}
                    </p>
                    <h2 className="title-display mt-1 text-2xl text-foreground">{mission.title}</h2>
                  </div>
                  <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                    {statusLabel(status)}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-7 text-foreground/80">«{mission.subtitle}»</p>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">{mission.preview}</p>

                {progress && (
                  <p className="mt-3 text-xs text-muted-foreground">
                    النهايات المكتشفة: {progress.endings.length} / {mission.endings.length} · أفضل
                    تقييم: {progress.bestGrade ?? "—"} · المحاولات: {progress.runs}
                  </p>
                )}

                <div className="mt-5 flex gap-3">
                  <Link
                    to="/play/$missionId"
                    params={{ missionId: mission.id }}
                    search={{ resume: false }}
                    className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    {progress?.completed ? "رحلة جديدة" : "ابدأ المهمة"}
                  </Link>
                </div>
              </article>
            );
          })}

          {upcomingMissions.map((m) => (
            <article key={m.code} className="rounded-xl border border-border/60 bg-secondary/20 p-6 opacity-70">
              <div className="flex items-baseline justify-between gap-2">
                <div>
                  <p className="text-[0.7rem] tracking-[0.3em] text-muted-foreground">
                    المهمة {m.code}
                  </p>
                  <h2 className="title-display mt-1 text-xl text-muted-foreground">{m.title}</h2>
                </div>
                <span className="text-xs text-muted-foreground">مقفلة 🔒</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">«{m.subtitle}»</p>
            </article>
          ))}
        </div>
      </main>

      <AdSlot placement="missions" className="mb-6 px-4" />
    </Scene>
  );
}

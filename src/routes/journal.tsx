import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdSlot } from "@/components/game/AdSlot";
import { Scene } from "@/components/game/Scene";
import { getMissions } from "@/game/missionManager";
import { emptySave, loadSave } from "@/game/storage";
import type { SaveData } from "@/game/types";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "سجل النجاة — SURVIVE" },
      {
        name: "description",
        content: "إحصاءات رحلاتك في SURVIVE: الأدلة المكتشفة، المحاولات، وأفضل تقييم في كل مهمة.",
      },
      { property: "og:title", content: "سجل النجاة — SURVIVE" },
      { property: "og:description", content: "ما جمعته حتى الآن من أدلة ونهايات." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JournalPage,
});

function JournalPage() {
  const [save, setSave] = useState<SaveData>(emptySave);
  useEffect(() => setSave(loadSave()), []);

  return (
    <Scene location="journal">
      <AdSlot placement="stats" className="mt-6 px-4" />

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-12">
        <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">
          ← القائمة الرئيسية
        </Link>
        <h1 className="title-display mt-6 text-3xl text-foreground">سجل النجاة</h1>

        {getMissions().map((mission) => {
          const p = save.progress[mission.id];
          const clues = mission.clues.filter((c) => p?.clues.includes(c.id));
          return (
            <section key={mission.id} className="panel mt-8 p-6">
              <h2 className="title-display text-xl text-foreground">
                {mission.code} — {mission.title}
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ["الحالة", p?.completed ? "مكتملة" : "لم تنتهِ بعد"],
                  ["المحاولات", String(p?.runs ?? 0)],
                  ["أفضل تقييم", p?.bestGrade ?? "—"],
                  ["النهايات", `${p?.endings.length ?? 0}/${mission.endings.length}`],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg border border-border/70 bg-secondary/30 px-3 py-3 text-center">
                    <p className="text-[0.6rem] tracking-[0.2em] text-muted-foreground">{label}</p>
                    <p className="mt-1 text-sm text-primary">{value}</p>
                  </div>
                ))}
              </div>

              <h3 className="mt-6 text-sm text-muted-foreground">
                الأدلة المكتشفة ({clues.length}/{mission.clues.length})
              </h3>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {mission.clues.map((c) => {
                  const known = clues.some((k) => k.id === c.id);
                  return (
                    <li key={c.id} className="text-sm">
                      <p className={known ? "text-primary" : "text-muted-foreground/60"}>
                        {known ? c.name : "???"}
                      </p>
                      {known && <p className="text-xs leading-6 text-muted-foreground">{c.description}</p>}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </main>

      <AdSlot placement="stats" className="mb-6 px-4" />
    </Scene>
  );
}

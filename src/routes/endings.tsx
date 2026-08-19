import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdSlot } from "@/components/game/AdSlot";
import { Scene } from "@/components/game/Scene";
import { getMissions } from "@/game/missionManager";
import { emptySave, loadSave } from "@/game/storage";
import type { SaveData } from "@/game/types";

export const Route = createFileRoute("/endings")({
  head: () => ({
    meta: [
      { title: "سجل النهايات — SURVIVE" },
      {
        name: "description",
        content: "تتبّع النهايات التي اكتشفتها في SURVIVE، وابحث عن النهاية السرية والنهاية الحقيقية.",
      },
      { property: "og:title", content: "سجل النهايات — SURVIVE" },
      { property: "og:description", content: "كل نهاية اسم، وكل اسم طريق مختلف." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EndingsPage,
});

function EndingsPage() {
  const [save, setSave] = useState<SaveData>(emptySave);
  useEffect(() => setSave(loadSave()), []);

  return (
    <Scene location="endings">
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-12">
        <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">
          ← القائمة الرئيسية
        </Link>
        <h1 className="title-display mt-6 text-3xl text-foreground">سجل النهايات</h1>

        {getMissions().map((mission) => {
          const found = save.progress[mission.id]?.endings ?? [];
          return (
            <section key={mission.id} className="mt-8">
              <h2 className="text-sm tracking-[0.2em] text-primary/80">
                {mission.code} — {mission.title} ({found.length}/{mission.endings.length})
              </h2>
              <ul className="mt-4 space-y-3">
                {mission.endings.map((e) => {
                  const discovered = found.includes(e.id);
                  return (
                    <li
                      key={e.id}
                      className={`rounded-lg border p-4 ${
                        discovered
                          ? "border-primary/40 bg-surface"
                          : "border-border/60 bg-secondary/20"
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <p className={discovered ? "text-base text-primary" : "text-base text-muted-foreground"}>
                          {String(e.index).padStart(2, "0")} — {discovered ? e.name : "???"}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {discovered ? "✓ مكتشفة" : "🔒"}
                        </span>
                      </div>
                      {discovered && (
                        <p className="mt-2 text-sm leading-7 text-foreground/80">«{e.tagline}»</p>
                      )}
                      {discovered && e.kind !== "normal" && (
                        <p className="mt-1 text-xs text-primary/70">
                          {e.kind === "true" ? "نهاية حقيقية" : "نهاية سرية"}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </main>

      <AdSlot placement="endings" className="mb-6 px-4" />
    </Scene>
  );
}

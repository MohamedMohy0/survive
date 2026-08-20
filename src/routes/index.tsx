import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdSlot } from "@/components/game/AdSlot";
import logo from "@/assets/survive-logo.png";
import { Scene } from "@/components/game/Scene";
import { loadSave } from "@/game/storage";
import { getMission } from "@/game/missionManager";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SURVIVE — لعبة قصصية تفاعلية | كل قرار يترك أثرًا" },
      {
        name: "description",
        content:
          "SURVIVE: لعبة نجاة عربية تفاعلية. اختر مسارك، اجمع الأدلة، قرّر من تثق به، واكتشف نهايات متعددة في مهام منفصلة مليئة بالغموض والتوتر.",
      },
      { property: "og:title", content: "SURVIVE — كل قرار يترك أثرًا" },
      {
        property: "og:description",
        content:
          "لعبة قصصية عربية تفاعلية: قرارات متفرعة، أدلة، حقيبة، ونهايات متعددة. اكتشف ما يحدث حين تختار بعناية — أو بتهوّر.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MainMenu,
});

const menu = [
  { to: "/missions" as const, label: "المهام", hint: "اختر مهمة وابدأ" },
  { to: "/journal" as const, label: "سجل النجاة", hint: "تقدمك وإحصاءاتك" },
  { to: "/endings" as const, label: "سجل النهايات", hint: "ما اكتشفته حتى الآن" },
  { to: "/settings" as const, label: "الإعدادات", hint: "الصوت والحركة" },
];

function MainMenu() {
  const [hasRun, setHasRun] = useState<string | null>(null);

  useEffect(() => {
    const save = loadSave();
    if (save.activeRun) setHasRun(save.activeRun.missionId);
  }, []);

  const resumeMission = hasRun ? getMission(hasRun) : undefined;

  return (
    <Scene location="menu" flicker>
      <AdSlot placement="menu" className="mt-6 px-4" />

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <p className="text-sm tracking-[0.5em] text-primary/80">لعبة نجاة قصصية</p>
        <h1 className="mt-6">
          <img
            src={logo}
            alt="SURVIVE"
            width={1152}
            height={576}
            className="mx-auto w-[min(90vw,34rem)] drop-shadow-[0_18px_40px_oklch(0.12_0.02_250/0.8)]"
          />
        </h1>
        <p className="mt-6 text-lg text-foreground/85 sm:text-xl">«كل قرار يترك أثرًا.»</p>

        <nav className="mt-12 w-full max-w-md space-y-3.5">
          {resumeMission && (
            <Link
              to="/play/$missionId"
              params={{ missionId: resumeMission.id }}
              search={{ resume: true }}
              className="group flex w-full items-center justify-between rounded-xl border border-primary/40 bg-primary/10 px-6 py-5 text-right transition-colors hover:bg-primary/20"
            >
              <span className="text-xl text-primary">متابعة</span>
              <span className="text-sm text-muted-foreground">{resumeMission.title}</span>
            </Link>
          )}
          {menu.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex w-full items-center justify-between rounded-xl border border-border bg-surface px-6 py-5 text-right transition-colors hover:border-primary/50 hover:bg-secondary/60"
            >
              <span className="text-xl text-foreground">{item.label}</span>
              <span className="text-sm text-muted-foreground">{item.hint}</span>
            </Link>
          ))}
        </nav>
      </main>

      <AdSlot placement="menu" className="mb-6 px-4" />
    </Scene>
  );
}

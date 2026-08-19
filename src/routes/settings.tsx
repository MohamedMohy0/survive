import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdSlot } from "@/components/game/AdSlot";
import { Scene } from "@/components/game/Scene";
import { startAmbient, stopAmbient } from "@/game/audio";
import { emptySave, loadSave, writeSave } from "@/game/storage";
import type { SaveData } from "@/game/types";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "الإعدادات — SURVIVE" },
      { name: "description", content: "اضبط الصوت والموسيقى وحركة النص وجودة الخلفيات في SURVIVE." },
      { property: "og:title", content: "الإعدادات — SURVIVE" },
      { property: "og:description", content: "تحكم بسيط في تجربة اللعب." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsPage,
});

function Toggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="flex w-full items-center justify-between rounded-xl border border-border bg-surface px-6 py-5 text-right transition-colors hover:bg-secondary/60"
    >
      <span className="text-lg text-foreground">{label}</span>
      <span className={`text-sm ${value ? "text-primary" : "text-muted-foreground"}`}>
        {value ? "مفعّل" : "متوقف"}
      </span>
    </button>
  );
}

function SettingsPage() {
  const [save, setSave] = useState<SaveData>(emptySave);
  useEffect(() => setSave(loadSave()), []);

  const update = (patch: Partial<SaveData["settings"]>) => {
    const next = { ...save, settings: { ...save.settings, ...patch } };
    setSave(next);
    writeSave(next);
  };

  return (
    <Scene location="manager_office">
      <main className="mx-auto w-full max-w-md flex-1 px-5 py-14">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← القائمة الرئيسية
        </Link>
        <h1 className="title-display mt-6 text-4xl text-foreground">الإعدادات</h1>

        <div className="mt-8 space-y-3">
          <Toggle label="الصوت" value={save.settings.sound} onChange={(v) => update({ sound: v })} />
          <Toggle
            label="الموسيقى"
            value={save.settings.music}
            onChange={(v) => {
              update({ music: v });
              if (v) void startAmbient();
              else stopAmbient();
            }}
          />

          <Toggle
            label="حركة النص"
            value={save.settings.motion}
            onChange={(v) => update({ motion: v })}
          />
          <Toggle
            label="جودة الخلفيات العالية"
            value={save.settings.quality === "high"}
            onChange={(v) => update({ quality: v ? "high" : "low" })}
          />
        </div>

        <p className="mt-8 text-sm leading-7 text-muted-foreground">
          اللغة: العربية. لغات أخرى لاحقًا. الموسيقى تُولَّد داخل المتصفح، وقد يحتاج المتصفح لضغطة
          واحدة قبل تشغيلها.
        </p>
      </main>

      <AdSlot placement="settings" className="mb-6 px-4" />
    </Scene>
  );
}

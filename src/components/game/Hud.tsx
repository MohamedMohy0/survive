import { useState } from "react";
import type { GameState, Mission } from "@/game/types";

export function Hud({
  mission,
  state,
  actName,
  onExit,
}: {
  mission: Mission;
  state: GameState;
  actName?: string | undefined;
  onExit: () => void;
}) {
  const [panel, setPanel] = useState<"none" | "items" | "clues">("none");

  const items = mission.items.filter((i) => state.inventory.includes(i.id));
  const clues = mission.clues.filter((c) => state.clues.includes(c.id));
  const locationName = mission.locations.find((l) => l.id === state.nodeId)?.name;

  return (
    <div className="safe-top px-4 pt-3">
      <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[0.65rem] tracking-[0.3em] text-primary/80">
            {mission.code} — {mission.title}
          </p>
          <p className="truncate text-xs text-muted-foreground">{actName ?? locationName}</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setPanel(panel === "items" ? "none" : "items")}
            className="rounded-md border border-border bg-secondary/60 px-3 py-1.5 text-xs text-secondary-foreground transition-colors hover:bg-secondary"
          >
            الحقيبة {items.length}
          </button>
          <button
            onClick={() => setPanel(panel === "clues" ? "none" : "clues")}
            className="rounded-md border border-border bg-secondary/60 px-3 py-1.5 text-xs text-secondary-foreground transition-colors hover:bg-secondary"
          >
            الأدلة {clues.length}/{mission.clues.length}
          </button>
          <button
            onClick={onExit}
            className="rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            خروج
          </button>
        </div>
      </div>

      {panel !== "none" && (
        <div className="panel mx-auto mt-3 w-full max-w-4xl p-4">
          {panel === "items" && (
            <ul className="grid gap-3 sm:grid-cols-2">
              {items.length === 0 && (
                <li className="text-sm text-muted-foreground">لا تحمل شيئًا بعد.</li>
              )}
              {items.map((i) => (
                <li key={i.id}>
                  <p className="text-sm text-primary">{i.name}</p>
                  <p className="text-xs leading-6 text-muted-foreground">{i.description}</p>
                </li>
              ))}
            </ul>
          )}
          {panel === "clues" && (
            <ul className="grid gap-3 sm:grid-cols-2">
              {clues.length === 0 && (
                <li className="text-sm text-muted-foreground">لم تكتشف أي دليل بعد.</li>
              )}
              {clues.map((c) => (
                <li key={c.id}>
                  <p className="text-sm text-primary">{c.name}</p>
                  <p className="text-xs leading-6 text-muted-foreground">{c.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

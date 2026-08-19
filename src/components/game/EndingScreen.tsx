import { Link } from "@tanstack/react-router";
import { AdSlot } from "./AdSlot";
import type { Ending, GameState, Mission } from "@/game/types";

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-border/70 bg-secondary/30 px-4 py-3 text-center">
      <p className="text-[0.65rem] tracking-[0.2em] text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg text-primary">{value}</p>
    </div>
  );
}

export function EndingScreen({
  mission,
  state,
  ending,
  grade,
  secrets,
  onReplay,
}: {
  mission: Mission;
  state: GameState;
  ending: Ending;
  grade: string;
  secrets: number;
  onReplay: () => void;
}) {
  const minutes = Math.max(1, Math.round((Date.now() - state.startedAt) / 60000));
  const keyChoices = state.choices.slice(-6).reverse();
  const characters = mission.characters.filter((c) => state.charactersMet.includes(c.id));
  const usedItems = mission.items.filter((i) => state.inventory.includes(i.id));

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-14 safe-bottom">
      <p className="animate-line-in text-center text-xs tracking-[0.4em] text-muted-foreground">
        انتهت الرحلة
      </p>

      <h1 className="title-display mt-6 animate-line-in text-center text-3xl text-primary sm:text-4xl">
        النهاية — {ending.name}
      </h1>
      <p className="mt-3 animate-line-in text-center text-base text-foreground/85">
        «{ending.tagline}»
      </p>

      <div className="panel mt-8 animate-line-in p-6">
        <p className="text-[1.02rem] leading-[2.1] text-foreground/90">{ending.description}</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="التقييم" value={grade} />
        <Stat label="الأدلة" value={`${state.clues.length} / ${mission.clues.length}`} />
        <Stat label="الأسرار" value={secrets} />
        <Stat label="القرارات" value={state.choices.length} />
        <Stat label="الشخصيات" value={characters.length} />
        <Stat label="الأماكن" value={state.visitedLocations.length} />
        <Stat label="العناصر" value={usedItems.length} />
        <Stat label="الوقت" value={`${minutes} د`} />
      </div>

      {characters.length > 0 && (
        <div className="mt-6">
          <h2 className="text-sm text-muted-foreground">الشخصيات التي قابلتها</h2>
          <p className="mt-2 text-sm text-foreground/85">
            {characters.map((c) => c.name).join(" · ")}
          </p>
        </div>
      )}

      {keyChoices.length > 0 && (
        <div className="mt-6">
          <h2 className="text-sm text-muted-foreground">القرارات الأخيرة</h2>
          <ul className="mt-2 space-y-2">
            {keyChoices.map((c, i) => (
              <li key={`${c.nodeId}-${i}`} className="text-sm leading-7 text-foreground/80">
                — {c.text}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <button
          onClick={onReplay}
          className="rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          رحلة جديدة
        </button>
        <Link
          to="/endings"
          className="rounded-md border border-border px-5 py-3 text-sm transition-colors hover:bg-secondary"
        >
          سجل النهايات
        </Link>
        <Link
          to="/missions"
          className="rounded-md border border-border px-5 py-3 text-sm transition-colors hover:bg-secondary"
        >
          العودة إلى المهام
        </Link>
      </div>

      <AdSlot placement="result" className="mt-12" />
    </div>
  );
}

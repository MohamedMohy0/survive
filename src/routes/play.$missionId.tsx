import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AdSlot } from "@/components/game/AdSlot";
import { EndingScreen } from "@/components/game/EndingScreen";
import { Hud } from "@/components/game/Hud";
import { LoadingScreen } from "@/components/game/LoadingScreen";
import { NarrativeLines } from "@/components/game/NarrativeLines";
import { Scene } from "@/components/game/Scene";
import { getMission } from "@/game/missionManager";
import { createState } from "@/game/stateManager";
import { loadSave, recordEnding, saveRun } from "@/game/storage";
import { chooseOption, computeGrade, enterNode, getNode, resolveChoices } from "@/game/storyEngine";
import type { GameState } from "@/game/types";

export const Route = createFileRoute("/play/$missionId")({
  validateSearch: (search: Record<string, unknown>) => ({
    resume: search["resume"] === true || search["resume"] === "true",
  }),
  head: ({ params }) => {
    const m = getMission(params.missionId);
    const title = `${m?.title ?? "مهمة"} — SURVIVE`;
    const desc = m?.preview ?? "قصة تفاعلية مرعبة بقرارات متفرعة ونهايات متعددة.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: m?.subtitle ?? desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PlayPage,
});

function PlayPage() {
  const { missionId } = Route.useParams();
  const { resume } = Route.useSearch();
  const navigate = useNavigate();

  const mission = getMission(missionId);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState<GameState | null>(null);
  const [motion, setMotion] = useState(true);
  const [linesDone, setLinesDone] = useState(false);
  const [recorded, setRecorded] = useState(false);

  useEffect(() => {
    if (!mission) return;
    const save = loadSave();
    setMotion(save.settings.motion);
    const existing = save.activeRun;
    if (resume && existing && existing.missionId === mission.id) {
      setState(existing);
    } else {
      setState(enterNode(mission, createState(mission), mission.start));
    }
  }, [mission, resume]);

  useEffect(() => {
    if (state && !state.nodeId.startsWith("n_end")) saveRun(state);
  }, [state]);

  const node = useMemo(
    () => (mission && state ? getNode(mission, state.nodeId) : null),
    [mission, state],
  );

  const ending = useMemo(() => {
    if (!mission || !node?.ending) return null;
    return mission.endings.find((e) => e.id === node.ending) ?? null;
  }, [mission, node]);

  useEffect(() => {
    if (!mission || !state || !ending || recorded) return;
    const { grade } = computeGrade(mission, state);
    recordEnding(mission.id, ending.id, grade, state.clues);
    setRecorded(true);
  }, [mission, state, ending, recorded]);

  const restart = useCallback(() => {
    if (!mission) return;
    setRecorded(false);
    setLinesDone(false);
    setState(enterNode(mission, createState(mission), mission.start));
  }, [mission]);

  const onLinesComplete = useCallback(() => setLinesDone(true), []);

  if (!mission) {
    return (
      <Scene location="street">
        <main className="flex flex-1 items-center justify-center px-6 text-center">
          <p className="text-sm text-muted-foreground">هذه المهمة غير متاحة.</p>
        </main>
      </Scene>
    );
  }

  if (loading) {
    return (
      <Scene location="hotel_exterior" flicker>
        <LoadingScreen
          line={mission.loadingLine}
          title={mission.title}
          onDone={() => setLoading(false)}
        />
      </Scene>
    );
  }

  if (!state || !node) return null;

  if (ending) {
    const { grade, secrets } = computeGrade(mission, state);
    return (
      <Scene location={node.location}>
        <EndingScreen
          mission={mission}
          state={state}
          ending={ending}
          grade={grade}
          secrets={secrets}
          onReplay={restart}
        />
      </Scene>
    );
  }

  const choices = resolveChoices(node, state);
  const actName = mission.acts.find((a) => a.id === node.act)?.name;

  return (
    <Scene location={node.location} flicker={node.location === "hallway2"}>
      <AdSlot placement="play" compact className="px-4 pt-4" />

      <Hud
        mission={mission}
        state={state}
        actName={actName}
        onExit={() => navigate({ to: "/missions" })}
      />

      <main className="flex flex-1 flex-col justify-end">
        <div className="scene-veil w-full">
          <div className="mx-auto w-full max-w-2xl px-5 pb-6 pt-16">
            <NarrativeLines
              key={node.id}
              lines={node.lines}
              nodeId={node.id}
              motion={motion}
              onComplete={onLinesComplete}
            />
          </div>
        </div>

        <div className="w-full bg-surface-strong safe-bottom">
          <div className="mx-auto w-full max-w-2xl space-y-2.5 px-5 py-5">
            {(linesDone || !motion) &&
              choices.map(({ choice, available, lockReason }, i) => (
                <button
                  key={choice.id}
                  disabled={!available}
                  onClick={() => {
                    setLinesDone(false);
                    setState((s) => (s ? chooseOption(mission, s, node, choice) : s));
                    window.scrollTo({ top: 0 });
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg border px-4 py-3.5 text-right text-sm transition-colors sm:text-base ${
                    available
                      ? "animate-line-in border-border bg-secondary/50 text-foreground hover:border-primary/60 hover:bg-secondary"
                      : "border-border/50 bg-secondary/20 text-muted-foreground/70"
                  }`}
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <span className="leading-7">{choice.text}</span>
                  {!available && lockReason && (
                    <span className="shrink-0 text-[0.7rem] text-muted-foreground">
                      🔒 {lockReason}
                    </span>
                  )}
                </button>
              ))}

            {choices.length === 0 && (
              <button
                onClick={restart}
                className="w-full rounded-lg bg-primary px-4 py-3 text-sm text-primary-foreground"
              >
                ابدأ رحلة جديدة
              </button>
            )}

          </div>
        </div>
      </main>

    </Scene>
  );
}

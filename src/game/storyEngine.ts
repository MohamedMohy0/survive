import { checkConditions, describeLock } from "./conditionEngine";
import { applyEffects } from "./effectEngine";
import { markNode } from "./stateManager";
import type { Choice, GameState, Mission, StoryNode } from "./types";

export interface ResolvedChoice {
  choice: Choice;
  available: boolean;
  lockReason: string | null;
}

export function getNode(mission: Mission, id: string): StoryNode {
  const node = mission.nodes.find((n) => n.id === id);
  if (!node) {
    return {
      id: "missing",
      lines: ["انقطع الخيط هنا.", "شيء ما في هذه القصة لم يُكتب بعد."],
      choices: [],
    };
  }
  return node;
}

/** Enters a node: marks visit and applies its onEnter effects (once per visit). */
export function enterNode(mission: Mission, state: GameState, nodeId: string): GameState {
  const node = getNode(mission, nodeId);
  let next = markNode(state, node);
  next = applyEffects(next, node.onEnter);
  return next;
}

export function resolveChoices(node: StoryNode, state: GameState): ResolvedChoice[] {
  const list = node.choices ?? [];
  return list
    .filter((c) => checkConditions(c.hiddenUnless, state))
    .map((c) => {
      const available = checkConditions(c.required, state);
      return {
        choice: c,
        available,
        lockReason: available ? null : (c.lockedText ?? describeLock(c.required)),
      };
    });
}

export function chooseOption(
  mission: Mission,
  state: GameState,
  node: StoryNode,
  choice: Choice,
): GameState {
  let next: GameState = {
    ...state,
    choices: [...state.choices, { nodeId: node.id, choiceId: choice.id, text: choice.text }],
  };
  next = applyEffects(next, choice.effects);
  return enterNode(mission, next, choice.next);
}

export function computeGrade(mission: Mission, state: GameState) {
  const clueRatio = state.clues.length / Math.max(1, mission.clues.length);
  const secrets = state.flags.filter((f) => f.startsWith("secret_")).length;
  const score =
    clueRatio * 60 +
    Math.min(state.choices.length, 30) +
    secrets * 4 +
    (state.stats.health > 60 ? 6 : 0);
  const grade =
    score >= 90 ? "S" : score >= 78 ? "A+" : score >= 65 ? "A" : score >= 50 ? "B" : score >= 35 ? "C" : "D";
  return {
    grade,
    secrets,
    clueCount: state.clues.length,
    totalClues: mission.clues.length,
  };
}

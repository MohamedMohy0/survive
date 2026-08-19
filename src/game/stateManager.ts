import type { GameState, Mission } from "./types";

export function createState(mission: Mission): GameState {
  return {
    missionId: mission.id,
    nodeId: mission.start,
    inventory: [],
    clues: [],
    flags: [],
    stats: { ...mission.initialStats },
    relationships: {},
    visitedLocations: [],
    visitedNodes: [],
    choices: [],
    charactersMet: [],
    startedAt: Date.now(),
  };
}

export function markNode(
  state: GameState,
  node: { id: string; location?: string; character?: string },
): GameState {
  const next: GameState = {
    ...state,
    nodeId: node.id,
    visitedNodes: state.visitedNodes.includes(node.id)
      ? state.visitedNodes
      : [...state.visitedNodes, node.id],
    visitedLocations: [...state.visitedLocations],
    charactersMet: [...state.charactersMet],
  };
  if (node.location && !next.visitedLocations.includes(node.location)) {
    next.visitedLocations.push(node.location);
  }
  if (node.character && !next.charactersMet.includes(node.character)) {
    next.charactersMet.push(node.character);
  }
  return next;
}

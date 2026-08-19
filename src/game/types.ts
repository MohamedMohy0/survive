export type StatKey = "health" | "fear" | "trust" | "suspicion";

export interface Stats {
  health: number;
  fear: number;
  trust: number;
  suspicion: number;
}

export interface RelationshipValue {
  trust?: number;
  fear?: number;
  suspicion?: number;
}

export interface Effects {
  stats?: Partial<Record<StatKey, number>>;
  addItems?: string[];
  removeItems?: string[];
  addClues?: string[];
  setFlags?: string[];
  clearFlags?: string[];
  rel?: Record<string, RelationshipValue>;
}

export interface StatRange {
  min?: number;
  max?: number;
}

export interface Conditions {
  items?: string[];
  notItems?: string[];
  clues?: string[];
  flags?: string[];
  notFlags?: string[];
  visited?: string[];
  stats?: Partial<Record<StatKey, StatRange>>;
  rel?: Record<string, Partial<Record<"trust" | "fear" | "suspicion", StatRange>>>;
  minClues?: number;
}

export interface Choice {
  id: string;
  text: string;
  next: string;
  note?: string;
  required?: Conditions;
  hiddenUnless?: Conditions;
  lockedText?: string;
  effects?: Effects;
}

export interface StoryNode {
  id: string;
  act?: string;
  location?: string;
  character?: string;
  lines: string[];
  onEnter?: Effects;
  choices?: Choice[];
  ending?: string;
  auto?: string;
}

export interface Ending {
  id: string;
  index: number;
  name: string;
  tagline: string;
  description: string;
  kind?: "normal" | "secret" | "true";
  mood?: "calm" | "dark" | "warm" | "danger";
}

export interface GameItem {
  id: string;
  name: string;
  description: string;
}

export interface GameClue {
  id: string;
  name: string;
  description: string;
}

export interface GameLocation {
  id: string;
  name: string;
  mood?: string;
}

export interface GameCharacter {
  id: string;
  name: string;
  description: string;
}

export interface Mission {
  id: string;
  index: number;
  code: string;
  title: string;
  subtitle: string;
  preview: string;
  loadingLine: string;
  unlockAfter?: string | null;
  acts: { id: string; name: string }[];
  start: string;
  initialStats: Stats;
  items: GameItem[];
  clues: GameClue[];
  locations: GameLocation[];
  characters: GameCharacter[];
  endings: Ending[];
  nodes: StoryNode[];
}

export interface GameState {
  missionId: string;
  nodeId: string;
  inventory: string[];
  clues: string[];
  flags: string[];
  stats: Stats;
  relationships: Record<string, Required<RelationshipValue>>;
  visitedLocations: string[];
  visitedNodes: string[];
  choices: { nodeId: string; choiceId: string; text: string }[];
  charactersMet: string[];
  startedAt: number;
}

export interface MissionProgress {
  completed: boolean;
  endings: string[];
  bestGrade?: string;
  clues: string[];
  runs: number;
}

export interface SaveData {
  version: number;
  activeRun: GameState | null;
  progress: Record<string, MissionProgress>;
  settings: {
    sound: boolean;
    music: boolean;
    motion: boolean;
    quality: "high" | "low";
  };
}

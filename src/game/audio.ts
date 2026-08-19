/**
 * Ambient score engine (Web Audio API — no external files).
 * Tone: modern investigative thriller — a steady pulse, a minor arpeggio that
 * keeps moving, and a soft sub-bass. Not horror, not cozy: focused and alive.
 * Browsers block autoplay, so start() should follow a user gesture;
 * we also arm a one-shot listener as a fallback.
 */

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let nodes: { stop: () => void } | null = null;
let armed = false;
let wanted = false;
const listeners = new Set<(playing: boolean) => void>();

function notify() {
  const playing = isPlaying();
  listeners.forEach((l) => l(playing));
}

export function onAudioChange(cb: (playing: boolean) => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export function isPlaying() {
  return Boolean(nodes && ctx && ctx.state === "running");
}

/** A short plucked note — the arpeggio voice. */
function pluck(at: number, freq: number, out: AudioNode, gain: number) {
  if (!ctx) return;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "triangle";
  o.frequency.setValueAtTime(freq, at);
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(gain, at + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, at + 0.5);
  o.connect(g).connect(out);
  o.start(at);
  o.stop(at + 0.55);
}

/** Tight low pulse — the "heartbeat of the investigation". */
function pulse(at: number, out: AudioNode) {
  if (!ctx) return;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "sine";
  o.frequency.setValueAtTime(110, at);
  o.frequency.exponentialRampToValueAtTime(46, at + 0.16);
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(0.5, at + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, at + 0.34);
  o.connect(g).connect(out);
  o.start(at);
  o.stop(at + 0.4);
}

function build() {
  if (typeof window === "undefined") return;
  const AC =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return;
  if (!ctx) ctx = new AC();
  if (!master) {
    master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
  }
  if (nodes) return;

  const audio = ctx;
  const now = audio.currentTime;

  // Shared reverb-ish delay for space.
  const delay = audio.createDelay(1);
  delay.delayTime.value = 0.28;
  const feedback = audio.createGain();
  feedback.gain.value = 0.34;
  const delayTone = audio.createBiquadFilter();
  delayTone.type = "lowpass";
  delayTone.frequency.value = 2200;
  delay.connect(feedback).connect(delayTone).connect(delay);
  delay.connect(master);

  // Arpeggio bus.
  const arpBus = audio.createGain();
  arpBus.gain.value = 0.5;
  const arpTone = audio.createBiquadFilter();
  arpTone.type = "lowpass";
  arpTone.frequency.value = 2600;
  arpTone.Q.value = 0.6;
  arpBus.connect(arpTone);
  arpTone.connect(master);
  arpTone.connect(delay);

  // Percussive pulse bus.
  const pulseBus = audio.createGain();
  pulseBus.gain.value = 0.55;
  pulseBus.connect(master);

  // Sustained sub bass — grounded, realistic weight.
  const sub = audio.createOscillator();
  sub.type = "sine";
  sub.frequency.value = 55;
  const subGain = audio.createGain();
  subGain.gain.value = 0.16;
  sub.connect(subGain).connect(master);
  sub.start(now);

  // A slow-moving pad for warmth (kept quiet so it never muddies).
  const pad = audio.createOscillator();
  pad.type = "sawtooth";
  pad.frequency.value = 164.81; // E3
  const padFilter = audio.createBiquadFilter();
  padFilter.type = "lowpass";
  padFilter.frequency.value = 500;
  const padGain = audio.createGain();
  padGain.gain.value = 0.05;
  pad.connect(padFilter).connect(padGain).connect(master);
  pad.start(now);

  const lfo = audio.createOscillator();
  lfo.frequency.value = 0.06;
  const lfoGain = audio.createGain();
  lfoGain.gain.value = 260;
  lfo.connect(lfoGain).connect(padFilter.frequency);
  lfo.start(now);

  // Sequencer: 16th-note arpeggio at ~96 BPM, chords rotating every 2 bars.
  const bpm = 96;
  const step = 60 / bpm / 4;
  const chords = [
    [220, 261.63, 329.63, 440], // Am
    [174.61, 261.63, 349.23, 440], // F
    [196, 293.66, 392, 493.88], // G(add9)
    [164.81, 246.94, 329.63, 415.3], // E
  ];
  const pattern = [0, 2, 1, 3, 2, 1, 3, 2];

  let stepIndex = 0;
  let nextTime = now + 0.12;

  const schedule = () => {
    if (!ctx || !wanted) return;
    const horizon = ctx.currentTime + 0.4;
    while (nextTime < horizon) {
      const bar = Math.floor(stepIndex / 16) % (chords.length * 2);
      const chord = chords[Math.floor(bar / 2)] ?? chords[0]!;
      const inBar = stepIndex % 16;

      if (inBar % 2 === 0) {
        const noteIdx = pattern[(inBar / 2) % pattern.length] ?? 0;
        const freq = chord[noteIdx] ?? chord[0]!;
        const accent = inBar === 0 ? 0.2 : 0.12;
        pluck(nextTime, freq, arpBus, accent);
        if (inBar % 8 === 4) pluck(nextTime + step, freq * 2, arpBus, 0.06);
      }

      // Pulse on beats 1 and 3, with a pickup before the bar turn.
      if (inBar === 0 || inBar === 8) pulse(nextTime, pulseBus);
      if (inBar === 14) pulse(nextTime, pulseBus);

      nextTime += step;
      stepIndex += 1;
    }
  };

  const timer = window.setInterval(schedule, 120);
  schedule();

  nodes = {
    stop: () => {
      window.clearInterval(timer);
      sub.stop();
      pad.stop();
      lfo.stop();
    },
  };
}

function fadeTo(value: number, seconds = 2) {
  if (!ctx || !master) return;
  const now = ctx.currentTime;
  master.gain.cancelScheduledValues(now);
  master.gain.setValueAtTime(master.gain.value, now);
  master.gain.linearRampToValueAtTime(value, now + seconds);
}

export async function startAmbient(volume = 0.5) {
  wanted = true;
  build();
  if (!ctx) return;
  try {
    await ctx.resume();
  } catch {
    /* blocked until a gesture */
  }
  fadeTo(0.34 * volume, 1.8);
  notify();
  if (ctx.state !== "running") armGesture();
}

export function stopAmbient() {
  wanted = false;
  if (!ctx || !master) return;
  fadeTo(0, 0.8);
  window.setTimeout(() => {
    if (wanted) return;
    nodes?.stop();
    nodes = null;
    notify();
  }, 900);
  notify();
}

/** Resume playback on the first user interaction if autoplay was blocked. */
export function armGesture() {
  if (armed || typeof window === "undefined") return;
  armed = true;
  const handler = () => {
    if (wanted) void startAmbient();
    window.removeEventListener("pointerdown", handler);
    window.removeEventListener("keydown", handler);
    armed = false;
  };
  window.addEventListener("pointerdown", handler, { once: true });
  window.addEventListener("keydown", handler, { once: true });
}

/** Short interface blip; respects the sound setting handled by the caller. */
export function playBlip(freq = 440) {
  build();
  if (!ctx) return;
  void ctx.resume();
  const now = ctx.currentTime;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "square";
  o.frequency.setValueAtTime(freq, now);
  o.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.06);
  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(0.05, now + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
  o.connect(g).connect(ctx.destination);
  o.start(now);
  o.stop(now + 0.2);
}

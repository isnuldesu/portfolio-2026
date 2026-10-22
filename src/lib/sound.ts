"use client";

import { useSyncExternalStore } from "react";

/**
 * Interface sound, modelled on huyml.co: off until the visitor turns it on,
 * a soft tick when the showcase or a case study steps to the next project, a
 * crisp tap on press, and a short glassy sparkle when sound is switched on.
 *
 * Built from clicks and glass taps in Kenney's Interface Sounds pack, CC0
 * (public/sfx, licence beside them), laid out on the rhythm measured off
 * huyml.co: the tap is three clicks at 0, 100 and 130 ms, the step three ticks
 * at 130, 210 and 280 ms over a 90 Hz thump, the sparkle four glass taps
 * between 40 and 290 ms. Volumes match huyml's. Nothing is fetched until
 * someone opts in.
 */

const STORAGE_KEY = "sound";

const SOUNDS = {
  /** Project changed. huyml plays its tick at 0.23. */
  step: { src: "/sfx/step.mp3?v=2", volume: 0.23 },
  /** A press. huyml plays its click at 0.4. */
  tap: { src: "/sfx/tap.mp3?v=2", volume: 0.4 },
  /** Sound switched on. */
  sparkle: { src: "/sfx/sparkle.mp3?v=2", volume: 0.3 },
} as const;

export type SoundName = keyof typeof SOUNDS;

const listeners = new Set<() => void>();
let enabled = false;
let ctx: AudioContext | null = null;
const buffers = new Map<SoundName, AudioBuffer>();
let loading: Promise<void> | null = null;

try {
  enabled = typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY) === "on";
} catch {
  // Storage blocked: sound simply starts off.
}

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

/** Fetch and decode every sample once. Small files, so all three at once. */
function load(context: AudioContext) {
  loading ??= Promise.all(
    (Object.keys(SOUNDS) as SoundName[]).map(async (name) => {
      try {
        const response = await fetch(SOUNDS[name].src);
        buffers.set(name, await context.decodeAudioData(await response.arrayBuffer()));
      } catch {
        // A missing sample stays silent; nothing else depends on it.
      }
    }),
  ).then(() => undefined);
  return loading;
}

function start(context: AudioContext, name: SoundName) {
  const buffer = buffers.get(name);
  if (!buffer) return;
  const source = context.createBufferSource();
  source.buffer = buffer;
  const gain = context.createGain();
  gain.gain.value = SOUNDS[name].volume;
  source.connect(gain).connect(context.destination);
  source.start();
}

/** Play a sound if the visitor has turned sound on. Safe to call anywhere. */
export function play(name: SoundName) {
  if (!enabled) return;
  const context = audio();
  if (!context) return;
  if (buffers.has(name)) start(context, name);
  else void load(context).then(() => start(context, name));
}

export function setSound(on: boolean) {
  enabled = on;
  try {
    window.localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
  } catch {
    // Not remembered, still applies for this visit.
  }
  // Created inside the click that turned it on, so the browser lets it play.
  if (on) play("sparkle");
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useSound(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => enabled,
    () => false,
  );
}

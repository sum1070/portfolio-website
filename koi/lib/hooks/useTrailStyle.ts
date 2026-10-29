"use client";

import { useSyncExternalStore } from "react";

export const TRAIL_STYLES = ["glow", "star", "heart", "square", "kawaii", "off"] as const;
export type TrailStyle = (typeof TRAIL_STYLES)[number];

const STORAGE_KEY = "trail-style";
const listeners = new Set<() => void>();
let current: TrailStyle | null = null;
let preview: TrailStyle | null = null;

const isTrailStyle = (value: unknown): value is TrailStyle => TRAIL_STYLES.includes(value as TrailStyle);

const getSavedSnapshot = (): TrailStyle => {
  if (current === null) {
    let saved: string | null = null;
    try {
      saved = sessionStorage.getItem(STORAGE_KEY);
    } catch {}
    current = isTrailStyle(saved) ? saved : "glow";
  }
  return current;
};

const subscribe = (callback: () => void) => {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
};

const getSnapshot = (): TrailStyle => preview ?? getSavedSnapshot();

const notify = () => listeners.forEach((callback) => callback());

export const previewTrailStyle = (style: TrailStyle | null) => {
  if (preview === style) return;
  preview = style;
  notify();
};

export const setTrailStyle = (style: TrailStyle) => {
  current = style;
  preview = null;
  try {
    sessionStorage.setItem(STORAGE_KEY, style);
  } catch {}
  notify();
};

export function useSavedTrailStyle() {
  return useSyncExternalStore(subscribe, getSavedSnapshot, (): TrailStyle => "glow");
}

export default function useTrailStyle() {
  return useSyncExternalStore(subscribe, getSnapshot, (): TrailStyle => "glow");
}

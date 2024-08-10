import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const darkMode = window.matchMedia("(prefers-color-scheme: dark)");
export const modeAtom = atomWithStorage<string>("color-mode", "system");
export const systemModeAtom = atom<boolean>(darkMode.matches);
export const themeAtom = atom<string>((get) => {
  return get(modeAtom) !== "system"
    ? get(modeAtom)
    : get(systemModeAtom)
    ? "dark"
    : "light";
});
export const dateTextAtom = atomWithStorage<string>("date-text", "en");


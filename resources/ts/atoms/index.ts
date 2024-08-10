import { atom } from "jotai";
import { memberState, scheduleState } from "../interfaces";
import { format } from "date-fns";

export const scheduleIdAtom = atom<number>(1);
export const editIdAtom = atom<number>(1);
export const editMemberAtom = atom<memberState | null>(null);
export const dayAtom = atom<string>(format(new Date(), "yyyy-MM-dd"));

export const memberListAtom = atom<memberState[]>([]);
export const scheduleListAtom = atom<scheduleState[]>([]);

export const isClickedAtom = atom<boolean>(false);
export const clickedScheduleIdAtom = atom<number>(0);
export const clickedEditIdAtom = atom<number>(0);

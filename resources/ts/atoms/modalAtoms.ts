import { atom } from "jotai";
import { css, SerializedStyles } from "@emotion/react";

export const hasOpenedScheduleModalAtom = atom<boolean>(false);
export const scheduleModalStyleAtom = atom<SerializedStyles>((get) => {
  return get(hasOpenedScheduleModalAtom)
    ? css`
        visibility: visible;
        opacity: 1;
      `
    : css`
        visibility: hidden;
        opacity: 0;
      `;
});

export const hasOpenedEditModalAtom = atom<boolean>(false);
export const editModalStyleAtom = atom<SerializedStyles>((get) => {
  return get(hasOpenedEditModalAtom)
    ? css`
        visibility: visible;
        opacity: 1;
      `
    : css`
        visibility: hidden;
        opacity: 0;
      `;
});

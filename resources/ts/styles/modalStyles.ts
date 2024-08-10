import { useAtomValue } from "jotai";
import { themeAtom } from "../atoms/settingAtoms";
import { css } from "@emotion/react";
import { bp } from "../utils";

export const modalStyles = () => {
  const modalStyle = {
    modal: css`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      backdrop-filter: blur(3px);
      cursor: pointer;
      transition: 0.3s;
      z-index: 3;
    `,

    container: css`
      border-radius: 10px;
      position: relative;
      cursor: default;
    `,

    button: css`
      background-color: transparent;
      border: none;
      color: var(--text);
      font-size: 16px;
      cursor: pointer;
      transition: 0.3s;

      margin-right: 20px;
      margin-bottom: 15px;
      margin-top: 10px;

      @media (min-width: ${bp.tablet}) {
        border-radius: 5px;
        height: 34px;
        padding: 2px 20px;
        margin-right: 10px;
        margin-bottom: 15px;
        margin-top: 10px;
        box-shadow: 0px 0px 8px 0 var(--shadow), 2px 2px 4px 0 var(--shadow);
      }
      :hover {
        opacity: 0.8;
        @media (min-width: ${bp.tablet}) {
          background-color: var(--button);
          font-size: 17px;

          margin-top: 9px;
          margin-bottom: 14px;
          margin-right: 8px;

          height: 36px;
          padding: 2.5px 20.5px;
          box-shadow: 0px 0px 12px 0 var(--shadow), 5px 5px 10px 0 var(--shadow);

          opacity: 1;
        }
      }
    `,
    buttonBefore: css`
      :hover {
        opacity: 0.8;
        @media (min-width: ${bp.tablet}) {
          background-color: var(--button);
          font-size: 16px;

          margin-top: 11px;
          margin-bottom: 16px;
          margin-right: 9.5px;

          height: 32px;
          padding: 2px 19px;
          box-shadow: 0px 0px 8px 0 var(--shadow), 2px 2px 4px 0 var(--shadow);

          opacity: 1;
        }
      }
    `,
    buttonAfter: css`
      @media (min-width: ${bp.tablet}) {
        border-radius: 5px;
        background-color: var(--button);
        font-size: 17px;

        margin-top: 9px;
        margin-bottom: 14px;
        margin-right: 8px;

        height: 36px;
        padding: 2.5px 20.5px;
        box-shadow: 0px 0px 12px 0 var(--shadow), 5px 5px 10px 0 var(--shadow);

        opacity: 1;
      }
    `,
  };

  const getModalBackStyle = () => {
    const theme = useAtomValue(themeAtom);
    return theme === "light"
      ? css`
          background-color: rgba(222, 234, 236, 0.5);
        `
      : theme === "dark" &&
          css`
            background-color: rgba(111, 115, 120, 0.4);
          `;
  };

  const getModalContainerStyle = () => {
    const theme = useAtomValue(themeAtom);
    return theme === "light"
      ? css`
          background-color: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(5px);
          box-shadow: 0 0 15px 6px rgba(115, 120, 121, 0.2);
        `
      : theme === "dark" &&
          css`
            background-color: rgba(68, 72, 78, 0.9);
            backdrop-filter: blur(20px);
            box-shadow: 0 0 10px 8px rgba(135, 139, 142, 0.1);
          `;
  };

  return { modalStyle, getModalBackStyle, getModalContainerStyle };
};

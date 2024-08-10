import { useAtomValue } from "jotai";
import { themeAtom } from "../atoms/settingAtoms";
import { bp } from "../utils";
import { css } from "@emotion/react";
import "normalize.css";

export const globalStyle = css`
  @import url("https://fonts.googleapis.com/css2?family=Krona+One&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap");

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  body {
    font-family: "Noto sans JP", sans-serif;
    letter-spacing: 2px;
    position: relative;
    background-color: var(--back);
    color: var(--text);
  }
  .container {
    width: 100%;
    margin: 0 auto;
    margin-top: 45px;
    padding-top: 20px;
    padding-bottom: 50px;
    @media (min-width: ${bp.tablet}) {
      margin-top: 56px;
      padding-top: 24px;
      padding-bottom: 0;
      padding-right: 64px;
    }
    @media (min-width: ${bp.pc}) {
      margin-top: 60px;
      padding-top: 26px;
      padding-right: 75px;
    }
  }
  .link {
    text-decoration: none;
    color: inherit;
  }
  ul {
    margin: 0;
    padding: 0;
  }
  p {
    margin: 0;
  }

  .react-datepicker-popper[data-placement^="bottom"]
    .react-datepicker__triangle {
    fill: var(--gray);
    color: var(--gray);
    stroke: var(--border);
  }
`;

export const getColorStyle = () => {
  const theme = useAtomValue(themeAtom);
  return theme === "light"
    ? css`
        :root {
          --main: #457f8c;
          --header: #457f8c;
          --icon: #426975;
          --work: #fff;
          --out: #f5f4ea;
          --gray: #f4f4f4;
          --border: #9d9d9d;
          --text: #60554f;
          --textLight: #726863;
          --back: #fff;
          --shadow: #dadada;
          --shadowLight: #ebebeb;
          --shadowButton: #f4f4f4;
          --button: #fff;
          --title: #f4f4f4;
          --err: #d7a182;
        }
      `
    : theme === "dark" &&
        css`
          :root {
            --main: #d2d4d5;
            --header: #3b3d44;
            --icon: #e0dddd;
            --work: #3b3d44;
            --out: #494547;
            --gray: #57565b;
            --border: #a29d9d;
            --text: #f1ebeb;
            --textLight: #d4c7c7;
            --back: #4d5259;
            --shadow: #35363c;
            --shadowLight: #6e6f72;
            --shadowButton: #6e6f72;
            --button: #565b63;
            --title: #e0dddd;
            --err: #d7a182;
          }
        `;
};

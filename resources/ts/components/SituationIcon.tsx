import { useAtomValue } from "jotai";
import { themeAtom } from "../atoms/settingAtoms";
import { init } from "../utils";
import { css } from "@emotion/react";

type SituationProps = {
  s: number;
};

const SituationIcon = ({ s }: SituationProps) => {
  const { situationList } = init();
  const situationName = situationList.find(({ id }) => id === s)!.name;
  return <div css={[styles.container, icon, back(s)]}>{situationName}</div>;
};

export default SituationIcon;

const styles = {
  container: css`
    width: 50px;
    font-size: 14px;
    margin-right: 10px;
    border-radius: 3px;
    padding-top: 2px;
    height: 20px;
    text-align: center;
  `,
};

const icon = () => {
  const theme = useAtomValue(themeAtom);
  return (
    theme === "dark" && [
      css`
        font-weight: 500;
      `,
    ]
  );
};

const back = (i: number) => {
  const theme = useAtomValue(themeAtom);
  switch (i) {
    case 1:
      return [
        css`
          background-color: var(--main);
          color: var(--back);
        `,
      ];
    case 2:
      return [
        css`
          background-color: var(--textLight);
          color: var(--back);
        `,
      ];
    case 3:
      return theme === "light"
        ? [
            css`
              background-color: var(--gray);
              color: var(--text);
              border: 1px solid var(--text);
              padding-top: 1.5px;
            `,
          ]
        : theme === "dark" && [
            css`
              background-color: var(--gray);
              color: var(--text);
              font-weight: 400;
              border: none;
              padding-top: 1.5px;
            `,
          ];
    case 4:
      return [
        css`
          background-color: var(--border);
          color: var(--back);
        `,
      ];
    default:
      return [
        css`
          background-color: var(--back);
        `,
      ];
  }
};

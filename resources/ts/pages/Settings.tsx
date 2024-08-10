import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { dayAtom } from "../atoms";
import { modeAtom, dateTextAtom } from "../atoms/settingAtoms";

import { css } from "@emotion/react";
import { bp } from "../utils";
import { formStyle } from "../styles/formStyle";
import { format } from "date-fns";
import { ja } from "date-fns/locale/ja";

const Settings = () => {
  const [mode, setMode] = useAtom(modeAtom);
  const day = useAtomValue(dayAtom);
  const [dateText] = useAtom(dateTextAtom);
  const setDateText = useSetAtom(dateTextAtom);
  const modeList = [
    { id: 1, name: "light", text: "ライト" },
    { id: 2, name: "dark", text: "ダーク" },
    { id: 3, name: "system", text: "システム設定を使用" },
  ];
  const dateList = [
    { id: 1, name: "en", text: `${format(day, "yyyy/M/dd EEEE")}` },
    {
      id: 2,
      name: "ja",
      text: `${format(day, "yyyy年 M月d日 EEEE", { locale: ja })}`,
    },
  ];
  const handleChangeMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMode(e.target.value);
  };
  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateText(e.target.value);
  };

  return (
    <div css={styles.container}>
      <div css={styles.item}>
        <p css={styles.title}>カラー</p>
        {modeList.map((value) => {
          return (
            <div css={formStyle.radio} key={value.id}>
              <input
                type="radio"
                name="mode"
                value={value.name}
                onChange={handleChangeMode}
                checked={value.name == mode}
                id={value.name}
              />
              <label htmlFor={value.name} className="radioLabel">
                {value.text}
              </label>
            </div>
          );
        })}
      </div>
      <div css={styles.item}>
        <p css={styles.title}>日付表示</p>
        {dateList.map((value) => {
          return (
            <div css={formStyle.radio} key={value.id}>
              <input
                type="radio"
                name="date"
                value={value.name}
                onChange={handleChangeText}
                checked={value.name == dateText}
                id={value.name}
              />
              <label htmlFor={value.name} className="radioLabel">
                {value.text}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Settings;

const styles = {
  container: css`
    width: 80%;
    margin: 0 auto;
    label {
      cursor: pointer;
      transition: 0.3s;
      :hover {
        opacity: 0.8;
      }
    }
    @media (min-width: ${bp.tablet}) {
      display: flex;
    }
  `,

  title: css`
    font-size: 18px;
    color: var(--main);
    font-weight: 600;
    margin-bottom: 16px;
  `,

  item: css`
    margin-bottom: 30px;
    @media (min-width: ${bp.tablet}) {
      width: 240px;
      margin-bottom: 0;
    }
  `,
};

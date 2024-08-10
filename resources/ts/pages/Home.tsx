import { useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { dayAtom, memberListAtom } from "../atoms";
import { dateTextAtom } from "../atoms/settingAtoms";
import { getMemberList, getScheduleList } from "../utils/functions";

import { formDataState } from "../interfaces";
import { useForm, FormProvider } from "react-hook-form";

import { css } from "@emotion/react";
import { bp } from "../utils";
import { format } from "date-fns";
import { ja } from "date-fns/locale/ja";

import List from "../components/List";
import Schedule from "../components/modals/Schedule";
import Edit from "../components/modals/Edit";

const Home = () => {
  const memberList = useAtomValue(memberListAtom);
  const dateText = useAtomValue(dateTextAtom);
  const [day, setDay] = useAtom(dayAtom);
  const [gridStyle, setGridStyle] = useState([
    css`
      opacity: 1;
    `,
  ]);
  const today = format(new Date(), "yyyy-MM-dd");
  const methods = useForm<formDataState>();

  getMemberList();
  getScheduleList();

  const handleClick = () => {
    today < day ? prevStyle(new Date()) : nextStyle(new Date());
  };

  const handlePrevClick = () => {
    const dateObject = new Date(day);
    dateObject.setDate(dateObject.getDate() - 1);
    prevStyle(dateObject);
  };

  const handleNextClick = () => {
    const dateObject = new Date(day);
    dateObject.setDate(dateObject.getDate() + 1);
    nextStyle(dateObject);
  };

  const prevStyle = (dateObject: Date) => {
    setGridStyle([
      css`
        transform: translateX(7px);
        opacity: 0;
      `,
    ]);
    setTimeout(() => {
      setDay(format(dateObject, "yyyy-MM-dd"));
      setGridStyle([
        css`
          transform: translateX(-15px);
          opacity: 0;
        `,
      ]);
    }, 100);
    setTimeout(() => {
      setGridStyle([
        css`
          transform: translateX(0px);
          opacity: 1;
        `,
      ]);
    }, 200);
  };

  const nextStyle = (dateObject: Date) => {
    setGridStyle([
      css`
        transform: translateX(-7px);
        opacity: 0;
      `,
    ]);
    setTimeout(() => {
      setDay(format(dateObject, "yyyy-MM-dd"));
      setGridStyle([
        css`
          transform: translateX(15px);
          opacity: 0;
        `,
      ]);
    }, 100);
    setTimeout(() => {
      setGridStyle([
        css`
          transform: translateX(0px);
          opacity: 1;
        `,
      ]);
    }, 200);
  };

  return (
    <div>
      <div css={styles.dateCotainer}>
        <div
          css={[styles.chevron, styles.prev]}
          onClick={handlePrevClick}
        ></div>
        <p css={styles.date}>
          {dateText === "en"
            ? format(day, "yyyy/M/d EEEE")
            : dateText === "ja" &&
              format(day, "yyyy年 M月d日 EEEE", { locale: ja })}
        </p>
        <div
          css={[styles.chevron, styles.next]}
          onClick={handleNextClick}
        ></div>
      </div>
      <p css={[styles.title, titleStyle]} onClick={handleClick}>
        {day === today ? "本日の予定" : "本日を表示"}
      </p>
      <FormProvider {...methods}>
        <div css={[styles.grid, gridStyle]}>
          {memberList ? (
            memberList.map((member) => {
              return (
                <div key={member.id}>
                  <List memberId={member.id} />
                </div>
              );
            })
          ) : (
            <div>
              <p style={{ marginTop: "20px", textAlign: "center" }}>
                データが存在しません
              </p>
            </div>
          )}
        </div>
        <Schedule />

        <Edit />
      </FormProvider>
    </div>
  );
};

export default Home;

const styles = {
  dateCotainer: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 340px;
    margin: 0 auto;
    margin-bottom: 20px;

    @media (min-width: ${bp.tablet}) {
      width: 540px;
    }
    @media (min-width: ${bp.pc}) {
      width: 800px;
    }
    @media (min-width: ${bp.xl}) {
      width: 1060px;
    }
  `,
  date: css`
    font-size: 20px;
    color: var(--main);
    text-align: center;
    font-weight: 500;
    @media (min-width: ${bp.tablet}) {
      font-size: 24px;
    }
  `,

  chevron: css`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: 0.2s;
    cursor: pointer;
    @media (min-width: ${bp.tablet}) {
      width: 50px;
      height: 50px;
    }
    :hover {
      background-color: var(--shadowButton);
      box-shadow: 0 0 1px 1px var(--shadowButton);
    }

    position: relative;
    ::before {
      position: absolute;
      top: 13px;
      display: block;
      content: "";
      width: 16px;
      height: 16px;
      @media (min-width: ${bp.tablet}) {
        top: 16px;
        width: 20px;
        height: 20px;
      }
      border-top: 1px solid var(--main);
      border-left: 1px solid var(--main);
      transition: 0.3s;
    }
  `,

  prev: css`
    ::before {
      left: 15px;
      @media (min-width: ${bp.tablet}) {
        left: 19px;
      }
      transform: rotate(-45deg);
    }
  `,

  next: css`
    ::before {
      left: 8px;
      @media (min-width: ${bp.tablet}) {
        left: 10px;
      }
      transform: rotate(135deg);
    }
  `,

  title: css`
    width: 280px;
    height: 25px;
    font-size: 14px;
    border-radius: 5px;
    padding-top: 3px;
    margin: 0 auto 12px;
    text-align: center;
    color: var(--title);
    background-color: var(--header);
    box-shadow: 0 1px 6px 3px var(--shadow);
    border: 1px solid transparent;
    pointer-events: none;
    transition: 0.1s;
    @media (min-width: ${bp.tablet}) {
      width: 540px;
      height: 28px;
      font-size: 14px;
      padding-top: 4.5px;
      margin-bottom: 14px;
    }
    @media (min-width: ${bp.pc}) {
      width: 800px;
    }
    @media (min-width: ${bp.xl}) {
      width: 1060px;
    }
  `,

  grid: css`
    display: grid;
    width: 240px;
    grid-template-columns: 240px;
    row-gap: 12px;
    margin: 0 auto;
    transition: 0.2s;
    @media (min-width: ${bp.tablet}) {
      grid-template-columns: 240px 240px;
      column-gap: 14px;
      row-gap: 14px;
      width: 494px;
    }
    @media (min-width: ${bp.pc}) {
      grid-template-columns: 240px 240px 240px;
      column-gap: 16px;
      row-gap: 16px;
      width: 752px;
    }
    @media (min-width: ${bp.xl}) {
      grid-template-columns: 240px 240px 240px 240px;
      column-gap: 16px;
      row-gap: 16px;
      width: 1008px;
    }
  `,
};

const titleStyle = () => {
  //const { dayAtom } = atoms();
  const day = useAtomValue(dayAtom);
  const today = format(new Date(), "yyyy-MM-dd");
  return (
    day !== today &&
    css`
      color: var(--header);
      background-color: var(--title);
      border: 1px solid var(--header);
      box-shadow: none;
      font-weight: 400;
      cursor: pointer;
      pointer-events: all;
      transition: 0.3s;
      :hover {
        opacity: 0.8;
      }
    `
  );
};

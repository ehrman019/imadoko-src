import { useFormContext } from "react-hook-form";
import { atom, useSetAtom, useAtomValue } from "jotai";
import {
  scheduleIdAtom,
  editIdAtom,
  dayAtom,
  isClickedAtom,
  clickedScheduleIdAtom,
  clickedEditIdAtom,
} from "../atoms";
import {
  hasOpenedScheduleModalAtom,
  hasOpenedEditModalAtom,
} from "../atoms/modalAtoms";
import { init } from "../utils";
import { getMember, getSchedule } from "../utils/functions";

import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import SituationIcon from "./SituationIcon";

type ListProps = {
  memberId: number;
};

const List = ({ memberId }: ListProps) => {
  const { setValue } = useFormContext();
  const member = getMember(memberId);
  const schedule = getSchedule(memberId);
  const setScheduleId = useSetAtom(scheduleIdAtom);
  const setEditId = useSetAtom(editIdAtom);
  const day = useAtomValue(dayAtom);
  const setHasOpenedScheduleModal = useSetAtom(hasOpenedScheduleModalAtom);
  const setHasOpenedEditModal = useSetAtom(hasOpenedEditModalAtom);
  const { openingTime, closingTime } = init();
  const setClickedScheduleId = useSetAtom(clickedScheduleIdAtom);
  const setClickedEditId = useSetAtom(clickedEditIdAtom);
  const setIsClicked = useSetAtom(isClickedAtom);

  const getListStyle = (memberId: number) => {
    const clickedScheduleId = useAtomValue(clickedScheduleIdAtom);
    if (memberId === clickedScheduleId) {
      return css`
        width: 236px;
        height: 58px;
        margin: 1px 2px;
        transition: 0.07s;
      `;
    } else {
      return css`
        width: 240px;
        height: 60px;
        transition: 0.3s;
      `;
    }
  };

  const getIconStyle = (memberId: number) => {
    const clickedEditId = useAtomValue(clickedEditIdAtom);
    const isClicked = useAtomValue(isClickedAtom);
    if (memberId === clickedEditId && isClicked) {
      return css`
        :hover {
          transform: translateY(0px);
          transition: 0.2s;
        }
      `;
    } else if (memberId === clickedEditId && !isClicked) {
      return css`
        transform: translateY(-3px);
        transition: 0.2s;
        :hover {
          transform: translateY(-3px);
        }
      `;
    } else {
      return css`
        transform: translateY(0px);
        transition: 0.3s;
        :hover {
          transform: translateY(-3px);
        }
      `;
    }
  };

  const openSchedule = (memberId: number) => {
    setClickedScheduleId(memberId);
    setTimeout(() => {
      setClickedScheduleId(0);
      setScheduleId(memberId);
      setHasOpenedScheduleModal(true);
    }, 150);
  };

  const openEdit = (memberId: number) => {
    setClickedEditId(memberId);
    setIsClicked(true);
    setTimeout(() => {
      setHasOpenedEditModal(true);

      setEditId(memberId);
      setIsClicked(false);

      member && schedule
        ? [
            setValue("id", schedule.id),
            setValue("member_id", member.id),
            setValue("date", schedule.date),
            setValue("situation", schedule.situation),
            setValue("depature_time", schedule.depature_time),
            setValue("return_time", schedule.return_time),
            setValue("comment", schedule.comment),
          ]
        : member && [
            setValue("id", null),
            setValue("member_id", member.id),
            setValue("date", day),
            setValue("situation", 1),
            setValue("depature_time", openingTime),
            setValue("return_time", closingTime),
            setValue("comment", ""),
          ];
    }, 150);
  };

  return (
    <div>
      {schedule && member ? (
        <div
          css={[
            styles.container,
            getListBackStyle(schedule.situation),
            getListStyle(memberId),
          ]}
        >
          <div css={[getListBackStyle(schedule.situation), styles.listContent]}>
            <div
              onClick={() => openSchedule(memberId)}
              css={styles.scheduleClickable}
            >
              <p css={styles.name}>{member.name}</p>
              <div css={styles.scheduleFlex}>
                <SituationIcon s={schedule.situation} />
                {schedule.situation === 2 &&
                  (schedule.return_time ? (
                    <span>~{schedule.return_time.slice(0, 5)}</span>
                  ) : (
                    <span>直帰</span>
                  ))}
              </div>
            </div>
            <div
              onClick={() => openEdit(memberId)}
              css={[styles.editClickable, getIconStyle(memberId)]}
            >
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
        </div>
      ) : (
        <div
          css={[styles.container, getListBackStyle(0), getListStyle(memberId)]}
        >
          <div css={styles.listContent}>
            <div
              css={styles.scheduleClickable}
              onClick={() => openSchedule(memberId)}
            >
              {member ? (
                <p css={styles.name}>{member.name}</p>
              ) : (
                <p>該当データが存在しません</p>
              )}
            </div>
            <div
              onClick={() => openEdit(memberId)}
              css={[styles.editClickable, getIconStyle(memberId)]}
            >
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;

const styles = {
  container: css`
    border-radius: 5px;
    padding: 6px 14px;
    box-shadow: 0px 0px 8px 0 var(--shadow), 2px 2px 4px 0 var(--shadow);
    :hover {
      box-shadow: 0px 0px 8px 2px var(--shadow), 2px 2px 4px 2px var(--shadow);
    }
  `,

  listContent: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  name: css`
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 8px;
    color: var(--text);
  `,

  scheduleClickable: css`
    cursor: pointer;
    width: 80%;
    height: 48px;
  `,

  scheduleFlex: css`
    display: flex;
  `,

  editClickable: css`
    cursor: pointer;
    padding-left: 6px;
    transition: 0.3s;
    :hover {
      transform: translateY(-3px);
    }
  `,
};

export const getListBackStyle = (i: number) => {
  switch (i) {
    case 1:
      return [
        css`
          background-color: var(--work);
        `,
      ];
    case 2:
      return [
        css`
          background-color: var(--out);
        `,
      ];
    case 3:
      return [
        css`
          background-color: var(--out);
        `,
      ];
    case 4:
      return [
        css`
          background-color: var(--gray);
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

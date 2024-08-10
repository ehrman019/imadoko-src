import { useAtomValue, useSetAtom } from "jotai";
import { dayAtom, scheduleIdAtom } from "../../atoms";
import {
  scheduleModalStyleAtom,
  hasOpenedScheduleModalAtom,
} from "../../atoms/modalAtoms";
import { dateTextAtom } from "../../atoms/settingAtoms";
import { getMember, getSchedule } from "../../utils/functions";

import { css } from "@emotion/react";
import { bp } from "../../utils";
import { modalStyles } from "../../styles/modalStyles";
import { getListBackStyle } from "../List";

import { format } from "date-fns";
import { ja } from "date-fns/locale/ja";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneFlip } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

import SituationIcon from "../SituationIcon";

const Schedule = () => {
  const { modalStyle, getModalBackStyle, getModalContainerStyle } =
    modalStyles();
  const scheduleId = useAtomValue(scheduleIdAtom);
  const member = getMember(scheduleId);
  const schedule = getSchedule(scheduleId);
  const day = useAtomValue(dayAtom);
  const dateText = useAtomValue(dateTextAtom);
  const scheduleModalStyle = useAtomValue(scheduleModalStyleAtom);
  const setHasOpenedScheduleModal = useSetAtom(hasOpenedScheduleModalAtom);

  const closeScheduleModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const scheduleModal = document.getElementById("scheduleModal");
    e.target === scheduleModal && setHasOpenedScheduleModal(false);
  };

  return (
    <div
      css={[modalStyle.modal, getModalBackStyle, scheduleModalStyle]}
      id="scheduleModal"
      onClick={closeScheduleModal}
    >
      {scheduleId && (
        <div
          css={[styles.container, modalStyle.container, getModalContainerStyle]}
        >
          <p css={styles.date}>
            {dateText === "en"
              ? format(day, "yyyy/M/d E")
              : format(day, "yyyy年 M年d日 (E)", { locale: ja })}
          </p>
          {member && (
            <div css={styles.member}>
              <p css={styles.name}>{member.name}</p>
              <a href={`tel:${member.tel}`} css={styles.icon}>
                <FontAwesomeIcon icon={faPhoneFlip} />
              </a>
              <a href={`tel:${member.email}`} css={styles.icon}>
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </div>
          )}
          {schedule && (
            <div>
              <div
                css={[styles.schedule, getListBackStyle(schedule.situation)]}
              >
                <SituationIcon s={schedule.situation} />
                {schedule.situation !== 4 && (
                  <p css={styles.scheduleText}>
                    {schedule.depature_time
                      ? schedule.depature_time.slice(0, 5)
                      : "直行"}
                    ~
                    {schedule.return_time
                      ? schedule.return_time.slice(0, 5)
                      : "直帰"}
                  </p>
                )}
              </div>
              <div css={[styles.schedule, styles.comment]}>
                {schedule.comment ? schedule.comment : "---"}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Schedule;

const styles = {
  container: css`
    width: 300px;
    margin: 20% auto;
    color: var(--text);
    background-color: var(--back);
    padding: 10px 20px 15px;
    @media (min-width: ${bp.tablet}) {
      width: 450px;
      padding: 12px 20px 20px;
      margin: 10% auto;
    }
  `,
  date: css`
    font-size: 16px;
    width: 100%;
    border-bottom: 1px solid var(--main);
    padding-bottom: 2px;
    margin-bottom: 10px;
    color: var(--main);
    @media (min-width: ${bp.tablet}) {
      font-size: 18px;
      margin-bottom: 14px;
    }
  `,

  member: css`
    display: flex;
    margin: 0 auto 10px;
    width: fit-content;
    @media (min-width: ${bp.tablet}) {
      margin: 0 auto 14px;
    }
  `,

  name: css`
    font-size: 18px;
    margin-right: 12px;
    @media (min-width: ${bp.tablet}) {
      font-size: 20px;
      margin-right: 18px;
    }
  `,

  icon: css`
    color: var(--textLight);
    font-size: 18px;
    margin-right: 12px;
    @media (min-width: ${bp.tablet}) {
      font-size: 20px;
      margin-right: 14px;
    }
  `,

  schedule: css`
    display: flex;
    width: 240px;
    height: 30px;
    margin: 0 auto 6px;
    padding: 6px 16px;
    border-radius: 5px;
    box-shadow: 0px 0px 6px 0 var(--shadow), 1.5px 1.5px 3px 0 var(--shadow);
    @media (min-width: ${bp.tablet}) {
      width: 300px;
      height: 36px;
      margin: 0 auto 10px;
      padding: 8px 20px;
      border-radius: 5px;
      box-shadow: 0px 0px 8px 0 var(--shadow), 2px 2px 4px 0 var(--shadow);
    }
  `,

  scheduleText: css`
    margin-left: 10px;
    @media (min-width: ${bp.tablet}) {
      margin-left: 16px;
    }
  `,

  comment: css`
    min-height: 60px;
    background-color: var(--back);

    @media (min-width: ${bp.tablet}) {
      min-height: 80px;
    }
  `,
};

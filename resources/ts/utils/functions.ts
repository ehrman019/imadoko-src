import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { memberListAtom, scheduleListAtom, dayAtom } from "../atoms";
import { hasOpenedEditModalAtom } from "../atoms/modalAtoms";

export const getMemberList = () => {
  const setMemberList = useSetAtom(memberListAtom);
  useEffect(() => {
    fetch("/api/member-list")
      .then((res) => res.json())
      .then((res) => {
        setMemberList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
};

export const getScheduleList = () => {
  const setScheduleList = useSetAtom(scheduleListAtom);
  const day = useAtomValue(dayAtom);
  const hasOpenedEditModal = useAtomValue(hasOpenedEditModalAtom);
  useEffect(() => {
    fetch(`/api/schedule-list/${day}`)
      .then((res) => res.json())
      .then((res) => {
        setScheduleList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [day, hasOpenedEditModal]);
};

export const getSchedule = (scheduleId: number) => {
  const scheduleList = useAtomValue(scheduleListAtom);
  return scheduleList &&
    scheduleList.find(({ member_id }) => member_id === scheduleId)
    ? scheduleList.find(({ member_id }) => member_id === scheduleId)
    : undefined;
};

export const getMember = (memberId: number) => {
  const memberList = useAtomValue(memberListAtom);
  return memberList.find(({ id }) => id === memberId)
    ? memberList.find(({ id }) => id === memberId)
    : undefined;
};

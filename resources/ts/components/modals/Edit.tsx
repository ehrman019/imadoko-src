import { useState, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { editIdAtom, clickedEditIdAtom } from "../../atoms";
import {
  editModalStyleAtom,
  hasOpenedEditModalAtom,
} from "../../atoms/modalAtoms";

import { css } from "@emotion/react";
import { bp } from "../../utils";
import { formStyle } from "../../styles/formStyle";
import { modalStyles } from "../../styles/modalStyles";

import NameForm from "../forms/NameForm";
import DateForm from "../forms/DateForm";
import SituationForm from "../forms/SituationForm";
import DepatureTimeForm from "../forms/DepatureTimeForm";
import ReturnTimeForm from "../forms/ReturnTimeForm";
import CommentForm from "../forms/CommentForm";

const buttonStyleAtom = atom(css`
  @media (min-width: ${bp.tablet}) {
    height: 34px;
    padding: 2px 20px;
    margin-right: 10px;
    box-shadow: 0px 0px 8px 0 var(--shadow), 2px 2px 4px 0 var(--shadow);
  }
`);

const Edit = () => {
  const { modalStyle, getModalBackStyle, getModalContainerStyle } =
    modalStyles();
  const editId = useAtomValue(editIdAtom);
  const [editModalStyle] = useAtom(editModalStyleAtom);
  const [updateText, setUpdateText] = useState("更新しました");
  const [updateTextStyle, setUpdateTextStyle] = useState(css`
    visibility: hidden;
    opacity: 0;
  `);
  const { getValues } = useFormContext();
  const setHasOpenedEditModal = useSetAtom(hasOpenedEditModalAtom);
  const buttonStyle = useAtomValue(buttonStyleAtom);
  const setButtonStyle = useSetAtom(buttonStyleAtom);
  const setClickedEditId = useSetAtom(clickedEditIdAtom);

  const closeEditModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const editModal = document.getElementById("editModal");
    e.target === editModal && [
      setClickedEditId(0),
      setHasOpenedEditModal(false),
      setUpdateTextStyle(css`
        visibility: hidden;
        opacity: 0;
      `),
    ];
  };

  const metaCsrfToken = document.querySelector(
    "meta[name='csrf-token']"
  ) as HTMLMetaElement;
  const csrfToken = useRef<string>(metaCsrfToken.content);

  const updateData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonStyle(modalStyle.buttonBefore);
    setTimeout(() => {
      setButtonStyle(modalStyle.buttonAfter);
      setUpdateText("更新中です..");
      setUpdateTextStyle(css`
        visibility: visible;
        opacity: 1;
      `);
      const data = getValues();
      fetch("/api/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken.current,
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          setUpdateText("更新しました");
          setTimeout(() => {
            setClickedEditId(0), setHasOpenedEditModal(false);
            setButtonStyle(modalStyle.button);
            setUpdateTextStyle(css`
              visibility: hidden;
              opacity: 0;
            `);
          }, 1000);
        })
        .catch((err) => {
          setUpdateText("更新に失敗しました");
          setUpdateTextStyle(css`
            visibility: visible;
            opacity: 1;
          `);
          console.log(err);
        });
    }, 150);
  };

  return (
    <div
      css={[modalStyle.modal, getModalBackStyle, editModalStyle]}
      id="editModal"
      onClick={closeEditModal}
    >
      <p css={styles.modalTitle}>編集</p>
      {editId && (
        <div
          css={[modalStyle.container, styles.container, getModalContainerStyle]}
        >
          <form action="" onSubmit={updateData}>
            <NameForm />
            <DateForm />
            <SituationForm />
            <div css={formStyle.item}>
              <label css={formStyle.label} htmlFor="">
                時間
              </label>

              <DepatureTimeForm />
              <span css={styles.timeText}> - </span>
              <ReturnTimeForm />
            </div>
            <CommentForm />
            <div css={styles.submit}>
              <button css={[modalStyle.button, buttonStyle]} type="submit">
                更新
              </button>
            </div>
          </form>
          <div
            onClick={() => {
              setHasOpenedEditModal(false), setClickedEditId(0);
            }}
          >
            <button css={styles.cancel}>キャンセル</button>
          </div>
        </div>
      )}
      <p css={[styles.updateTextStyle, updateTextStyle]}>{updateText}</p>
    </div>
  );
};

export default Edit;

const styles = {
  container: css`
    width: 300px;
    margin: 20px auto 0;
    padding: 30px 25px 0;

    @media (min-width: ${bp.tablet}) {
      margin: 20px auto 0;
      width: 420px;
      height: 430px;
      padding: 30px 60px 0;
    }
  `,

  modalTitle: css`
    text-align: center;
    font-size: 22px;
    font-weight: 300;
    letter-spacing: 5px;
    margin-top: 36px;
    color: var(--text);
  `,

  date: css`
    font-size: 16px;
    width: 100%;
    border-bottom: 1px solid var(--main);
    color: var(--main);
  `,

  timeText: css`
    display: inline-block;
    width: 20px;
    font-size: 20px;
    text-align: center;
    @media (min-width: ${bp.tablet}) {
      font-size: 24px;
      font-weight: 300;
    }
  `,

  submit: css`
    width: 300px;
    margin-left: -25px;
    @media (min-width: ${bp.tablet}) {
      width: 420px;
      margin-top: 20px;
      margin-left: -75px;
    }
    font-weight: 500;
    text-align: right;
  `,

  cancel: css`
    background-color: transparent;
    color: var(--text);
    border: none;
    position: absolute;
    font-size: 16px;
    font-weight: 300;
    bottom: 15px;
    left: 20px;
    transition: 0.3s;
    cursor: pointer;
    :hover {
      opacity: 0.8;
    }
    @media (min-width: ${bp.tablet}) {
      bottom: 20px;
    }
  `,

  updateTextStyle: css`
    text-align: center;
    font-size: 20px;
    font-weight: 300;
    letter-spacing: 5px;
    margin-top: 16px;
    color: var(--text);
    transition: 0.3s;
  `,
};

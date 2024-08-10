import { css } from "@emotion/react";
import { bp } from "../utils";

export const formStyle = {
  container: css`
    margin-bottom: 20px;

    input[type="text"],
    select,
    textarea {
      color: var(--text);
      background-color: var(--back);
      padding: 0 8px;
      border-radius: 5px;
      border: 1px solid var(--border);
      box-shadow: 0 0 3px 0 var(--border);
      transition: 0.3s;
    }
    input[type="text"]:focus,
    select:focus,
    textarea:focus {
      border: 1px solid transparent;
      outline: 1px solid var(--textLight);
      box-shadow: 0 0 4px 0 var(--textLight);
    }

    input[type="text"],
    select {
      height: 30px;
    }

    @media (min-width: ${bp.tablet}) {
      input[type="text"],
      select {
        height: 36px;
      }
    }
    select {
      transition: 0.2s;
      cursor: pointer;
    }

    select:disabled {
      background-color: transparent;
    }

    textarea {
      resize: none;
      padding: 6px 8px;
      height: 60px;
      line-height: 1.5;
    }

    @media (min-width: ${bp.tablet}) {
      textarea {
        width: 250px;
        height: 72px;
      }
    }

    .react-datepicker-popper {
      border: 1px solid var(--border);
      border-radius: 10px;
      box-shadow: 0 0 2px 2px var(--shadow);
      background-color: var(--back);
    }

    .react-datepicker {
      font-family: "Noto sans JP", sans-serif;
      display: block;
      border: none;
    }

    .react-datepicker__triangle {
      color: var(--back);
      fill: var(--back);
      stroke: none;
    }

    .react-datepicker-wrapper,
    .react-datepicker__input-container {
      display: block;
    }

    .react-datepicker-wrapper input {
      width: 120px;
      cursor: text;
    }

    .react-datepicker__header {
      border-bottom: none;
      background-color: var(--gray);
      border-radius: 10px 10px 0 0;
    }

    .react-datepicker__current-month,
    .react-datepicker__day-name {
      color: var(--text);
    }

    .react-datepicker__month-container {
      background-color: transparent;
      border: none;
    }

    .react-datepicker__day {
      color: var(--text);
      border-radius: 50%;
      transition: 0.1s;
      border: 1px solid transparent;
    }

    .react-datepicker__day:hover {
      background-color: var(--back);
      color: var(--text);
      border: 1px solid var(--main);
    }

    .react-datepicker__day--selected {
      color: var(--back);
      background-color: var(--main);
    }
  `,

  label: css`
    width: 50px;
    display: block;
    padding-top: 3px;
    font-weight: 500;
    @media (min-width: ${bp.tablet}) {
      padding-top: 6px;
    }
  `,

  item: css`
    display: flex;
  `,

  selectName: css`
    width: 150px;
    cursor: pointer;

    @media (min-width: ${bp.tablet}) {
      width: 180px;
      cursor: pointer;
    }
  `,
  selectTime: css`
    margin-bottom: 6px;
    select {
      width: 80px;
      transition: 0.3s;
    }
  `,

  radio: css`
    margin-right: 6px;
    margin-bottom: 8px;
    font-weight: 400;
    @media (min-width: ${bp.tablet}) {
      padding-top: 6px;
    }
    .radioLabel {
      cursor: pointer;
      transition: 0.3s;
      :hover {
        opacity: 0.8;
      }
    }
    input[type="radio"] {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;

      position: relative;
      width: 14px;
      height: 14px;
      background-color: var(--back);
      border: 1px solid var(--border);
      box-shadow: 0 0 2px 0.5px var(--border);
      border-radius: 50%;
      vertical-align: -1px;
      margin-right: 6px;
      cursor: pointer;
      transition: 0.3s;
    }

    input[type="radio"]:before {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 1px solid var(--text);

      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--text);
      content: "";

      visibility: hidden;
      opacity: 0;
      transition: 0.2s;
    }

    input[type="radio"]:checked:before {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: var(--back);
      border: 1px solid var(--text);

      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--text);
      content: "";

      visibility: visible;
      opacity: 1;
    }
  `,

  checkbox: css`
    input[type="checkbox"] {
      display: none;
    }
    .checkboxLabel {
      box-sizing: border-box;
      cursor: pointer;
      display: inline-block;
      padding: 2px 24px;
      position: relative;
      width: auto;
      font-size: 14px;
      cursor: pointer;
    }
    .checkboxLabel::before {
      background: var(--back);
      border: 1px solid var(--border);
      box-shadow: 0 0 2px 0.5px var(--border);
      border-radius: 3px;
      content: "";
      display: block;
      height: 14px;
      width: 14px;

      left: 5px;
      margin-top: -6px;
      position: absolute;
      top: 50%;
    }
    .checkboxLabel::after {
      border-right: 2px solid var(--text);
      border-bottom: 2px solid var(--text);
      content: "";
      height: 18px;
      width: 10px;

      left: 8px;
      top: -4px;
      visibility: hidden;
      opacity: 0;
      position: absolute;

      transform: rotate(45deg);
      transition: 0.2s ease-in-out;
    }
    input[type="checkbox"]:checked + label::before {
      border: 1px solid var(--text);
      box-shadow: 0 0 2px 0.5px var(--text);
    }
    input[type="checkbox"]:checked + label::after {
      visibility: visible;
      opacity: 1;
      transform: rotate(45deg);
    }
    input[type="checkbox"]:disabled + label::before {
      background-color: transparent;
    }
  `,
};

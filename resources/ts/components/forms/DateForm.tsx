import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useSetAtom } from "jotai";
import { dayAtom } from "../../atoms";
import { formDataState } from "../../interfaces";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ja } from "date-fns/locale";
import { format } from "date-fns";
import { formStyle } from "../../styles/formStyle";
import { init } from "../../utils";

const DateForm = () => {
  const { getValues, setValue } = useFormContext();
  const [startDate, setStartDate] = useState(new Date());
  const { openingTime, closingTime } = init();

  registerLocale("ja", ja);
  const setDay = useSetAtom(dayAtom);

  const handleChange = (date: Date) => {
    setStartDate(date);
    const dateStr = format(date, "yyyy-MM-dd");
    setDay(dateStr);
    fetch(`api/schedule/${getValues("member_id")}/${dateStr}`)
      .then((res) => res.json())
      .then((res: formDataState) => {
        Object.keys(res).length !== 0
          ? [
              setValue("id", res.id),
              setValue("member_id", res.member_id),
              setValue("date", res.date),
              setValue("situation", res.situation),
              setValue("depature_time", res.depature_time),
              setValue("return_time", res.return_time),
              setValue("comment", res.comment),
            ]
          : [
              setValue("id", null),
              setValue("member_id", getValues("member_id")),
              setValue("date", dateStr),
              setValue("situation", 1),
              setValue("depature_time", openingTime),
              setValue("return_time", closingTime),
              setValue("comment", ""),
            ];
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div css={formStyle.container}>
      <div css={formStyle.item}>
        <label css={formStyle.label} htmlFor="">
          日付
        </label>
        <DatePicker
          dateFormat="yyyy/MM/dd"
          locale="ja"
          selected={startDate}
          onChange={(date) => handleChange(date!)}
        />
      </div>
    </div>
  );
};

export default DateForm;

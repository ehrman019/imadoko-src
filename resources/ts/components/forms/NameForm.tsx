import { useFormContext } from "react-hook-form";
import { formDataState } from "../../interfaces";
import { useAtomValue } from "jotai";
import { dayAtom, memberListAtom } from "../../atoms";
import { init } from "../../utils";
import { formStyle } from "../../styles/formStyle";

const NameForm = () => {
  const { setValue, watch } = useFormContext();
  const memberList = useAtomValue(memberListAtom);
  const day = useAtomValue(dayAtom);
  const { openingTime, closingTime } = init();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue("member_id", Number(e.target.value));
    fetch(`api/schedule/${watch("member_id")}/${day}`)
      .then((res) => res.json())
      .then((res: formDataState) => {
        Object.keys(res).length !== 0
          ? [
              setValue("id", res.id),
              setValue("situation", res.situation),
              setValue("depature_time", res.depature_time),
              setValue("return_time", res.return_time),
              setValue("comment", res.comment),
            ]
          : [
              setValue("id", null),
              setValue("situation", 1),
              setValue("depature_time", openingTime),
              setValue("return_time", closingTime),
              setValue("comment", closingTime),
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
          名前
        </label>
        <select
          name="name"
          css={formStyle.selectName}
          id=""
          onChange={handleChange}
        >
          {memberList.map((value) => {
            return (
              <option
                key={value.id}
                selected={value.id === watch("member_id")}
                value={value.id}
              >
                {value.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default NameForm;

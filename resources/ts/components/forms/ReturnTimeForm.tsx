import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useAtomValue } from "jotai";
import { hasOpenedEditModalAtom } from "../../atoms/modalAtoms";
import { init } from "../../utils";
import { formStyle } from "../../styles/formStyle";

const ReturnTimeForm = () => {
  const { register, getValues, setValue, watch } = useFormContext();
  const [check, setCheck] = useState(false);
  const { selectTimeList, closingTime } = init();
  const hasOpenedEditModal = useAtomValue(hasOpenedEditModalAtom);

  useEffect(() => {
    getValues("return_time") ? setCheck(false) : setCheck(true);
  }, [hasOpenedEditModal]);

  const handleChangeNull = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheck(e.target.checked);
    e.target.checked
      ? setValue("return_time", "")
      : setValue("return_time", closingTime);
  };

  return (
    <div>
      {watch("situation") !== 4 ? (
        <div css={[formStyle.container, formStyle.checkbox]}>
          <div>
            <div css={formStyle.selectTime}>
              <select
                value={
                  watch("return_time") ? watch("return_time").slice(0, 5) : ""
                }
                {...register("return_time")}
                disabled={check}
              >
                {check && (
                  <option value="" selected>
                    -- : --
                  </option>
                )}
                {!check &&
                  selectTimeList.map((value) => {
                    return <option value={value}>{value}</option>;
                  })}
              </select>
            </div>
            <input
              type="checkbox"
              id="returnTime"
              checked={check}
              onChange={handleChangeNull}
            />
            <label htmlFor="returnTime" className="checkboxLabel">
              直帰
            </label>
          </div>
        </div>
      ) : (
        <div css={[formStyle.container, formStyle.checkbox]}>
          <div>
            <div css={formStyle.selectTime}>
              <select name="return_time" value="" disabled>
                <option value="" selected>
                  -- : --
                </option>
              </select>
            </div>
            <input id="returnTime" type="checkbox" disabled />
            <label
              style={{ color: "var(--border)" }}
              htmlFor="returnTime"
              className="checkboxLabel"
            >
              直帰
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReturnTimeForm;

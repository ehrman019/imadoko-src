import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useAtomValue } from "jotai";
import { hasOpenedEditModalAtom } from "../../atoms/modalAtoms";
import { init } from "../../utils";
import { formStyle } from "../../styles/formStyle";

const DepatureTimeForm = () => {
  const { register, getValues, setValue, watch } = useFormContext();
  const [check, setCheck] = useState(false);
  const { selectTimeList, openingTime } = init();
  const hasOpenedEditModal = useAtomValue(hasOpenedEditModalAtom);

  useEffect(() => {
    getValues("depature_time") ? setCheck(false) : setCheck(true);
  }, [hasOpenedEditModal]);

  const handleChangeNull = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheck(e.target.checked);
    e.target.checked
      ? setValue("depature_time", "")
      : setValue("depature_time", openingTime);
  };

  return (
    <div>
      {watch("situation") !== 4 ? (
        <div css={[formStyle.container, formStyle.checkbox]}>
          <div>
            <div css={formStyle.selectTime}>
              <select
                value={
                  watch("depature_time")
                    ? watch("depature_time").slice(0, 5)
                    : ""
                }
                {...register("depature_time")}
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
              id="depatureTime"
              checked={check}
              onChange={handleChangeNull}
            />
            <label htmlFor="depatureTime" className="checkboxLabel">
              直行
            </label>
          </div>
        </div>
      ) : (
        <div css={[formStyle.container, formStyle.checkbox]}>
          <div>
            <div css={formStyle.selectTime}>
              <select name="depature_time" value="" disabled>
                <option value="" selected>
                  -- : --
                </option>
              </select>
            </div>
            <input id="depatureTime" type="checkbox" disabled />
            <label
              style={{ color: "var(--border)" }}
              htmlFor="depatureTime"
              className="checkboxLabel"
            >
              直行
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepatureTimeForm;

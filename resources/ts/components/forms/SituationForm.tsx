import { useFormContext } from "react-hook-form";
import { init } from "../../utils";
import { css } from "@emotion/react";
import { bp } from "../../utils";
import { formStyle } from "../../styles/formStyle";

const SituationForm = () => {
  const { setValue, watch } = useFormContext();
  const { situationList, openingTime, closingTime } = init();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const s = Number(e.target.value);
    setValue("situation", s);
    s === 4 && [
      setValue("depature_time", openingTime),
      setValue("return_time", closingTime),
    ];
  };

  return (
    <div css={formStyle.container}>
      <div css={formStyle.item}>
        <label css={formStyle.label} htmlFor="">
          区分
        </label>
        <div css={styles.container}>
          {situationList.map((value) => {
            return (
              <div css={formStyle.radio} key={value.id}>
                <input
                  type="radio"
                  name="situation"
                  value={value.id}
                  id={`${value.id}`}
                  onChange={handleChange}
                  checked={value.id === watch("situation")}
                />
                <label htmlFor={`${value.id}`} className="radioLabel">
                  {value.name}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SituationForm;

const styles = {
  container: css`
    display: flex;
    flex-wrap: wrap;
    width: 200px;
    @media (min-width: ${bp.tablet}) {
      width: fit-content;
    }
  `,
};

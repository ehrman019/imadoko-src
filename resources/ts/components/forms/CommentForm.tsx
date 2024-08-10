import { useFormContext } from "react-hook-form";
import { formStyle } from "../../styles/formStyle";

const CommentForm = () => {
  const { register, watch } = useFormContext();
  return (
    <div css={formStyle.container}>
      <div css={formStyle.item}>
        <label css={formStyle.label} htmlFor="">
          備考
        </label>
        <textarea
          value={watch("comment") ? watch("comment") : ""}
          {...register("comment")}
        />
      </div>
    </div>
  );
};

export default CommentForm;

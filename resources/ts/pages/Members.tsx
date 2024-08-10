import { css } from "@emotion/react";

const Members = () => {
  return (
    <div css={styles.container}>
      <p css={styles.title}>メンバー</p>
    </div>
  );
};

export default Members;

const styles = {
  container: css`
    width: 80%;
    margin: 0 auto;
  `,

  title: css`
    font-size: 18px;
    font-weight: 600;
    color: var(--main);
  `,
};

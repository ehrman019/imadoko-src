import { css } from "@emotion/react";
import { bp } from "../utils";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header css={styles.header}>
      <div css={styles.container}>
        <Link to="/" className="link">
          <p css={styles.logo}>imadoko</p>
        </Link>
        <p css={styles.title}>〇〇会社 営業部</p>
      </div>
    </header>
  );
};

export default Header;

const styles = {
  header: css`
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0px 20px;
    background-color: var(--header);
    color: var(--title);

    @media (min-width: ${bp.tablet}) {
      height: 40px;
      padding: 0px 20px;
    }
    @media (min-width: ${bp.pc}) {
      height: 45px;
      padding: 0px 30px;
    }
  `,

  container: css`
    display: flex;
    align-items: baseline;
  `,

  logo: css`
    font-family: "Krona One";
    font-size: 20px;
    margin-right: 24px;
    @media (min-width: ${bp.tablet}) {
      font-size: 22px;
      margin-right: 30px;
    }
    @media (min-width: ${bp.pc}) {
      font-size: 24px;
      margin-right: 36px;
    }
  `,

  title: css`
    font-size: 14px;
    font-weight: 300;
    @media (min-width: ${bp.tablet}) {
      font-size: 14px;
    }
    @media (min-width: ${bp.pc}) {
      font-size: 14px;
    }
  `,
};

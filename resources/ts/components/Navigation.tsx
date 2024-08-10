import { Link } from "react-router-dom";
import { useAtomValue } from "jotai";
import { themeAtom } from "../atoms/settingAtoms";

import { css } from "@emotion/react";
import { bp } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const Navigations = () => {
  return (
    <div css={[styles.container, back]}>
      <ul css={styles.icons}>
        <li css={styles.iconsItem}>
          <Link to="/" className="link">
            <FontAwesomeIcon icon={faHouse} />
          </Link>
        </li>
        {/* <li css={styles.iconsItem}>
          <Link to="/members" className="link">
            <FontAwesomeIcon icon={faUserGroup} />
          </Link>
        </li> */}
        <li css={styles.iconsItem}>
          <Link to="/settings" className="link">
            <FontAwesomeIcon icon={faGear} />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigations;

const styles = {
  container: css`
    z-index: 2;
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    backdrop-filter: blur(3px);

    @media (min-width: ${bp.tablet}) {
      top: 40px;
      right: 0;
      width: 64px;
      height: 100%;
      box-shadow: none;
      border-left: 1.5px solid var(--shadowLight);
    }
    @media (min-width: ${bp.pc}) {
      top: 45px;
      right: 0;
      width: 75px;
      height: 100%;
    }
  `,
  icons: css`
    list-style: none;
    width: 200px;
    margin: 12px auto;
    display: flex;
    justify-content: space-between;
    font-size: 24px;
    color: var(--icon);
    @media (min-width: ${bp.tablet}) {
      width: 36px;
      font-size: 24px;
      margin: 36px auto;
      display: block;
      text-align: center;
    }
    @media (min-width: ${bp.pc}) {
      margin: 40px auto;
    }
  `,

  iconsItem: css`
    @media (min-width: ${bp.tablet}) {
      margin-bottom: 36px;
    }
    @media (min-width: ${bp.pc}) {
      margin-bottom: 40px;
    }
    transition: 0.3s;
    :hover {
      opacity: 0.8;
    }
  `,
};

const back = () => {
  const theme = useAtomValue(themeAtom);
  return theme === "light"
    ? css`
        box-shadow: 0px -10px 10px -5px var(--shadow);
        background-color: rgba(255, 255, 255, 0.8);
      `
    : theme === "dark" &&
        css`
          box-shadow: 0px -6px 10px -4px var(--shadowLight);
          background-color: rgba(77, 82, 89, 0.8);
        `;
};

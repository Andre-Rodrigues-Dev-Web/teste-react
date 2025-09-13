import { FaRightFromBracket, FaRightToBracket, FaUser } from "react-icons/fa6";
import "./AccountLoginIndicator.css";
import { Link } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { truncateText } from "../../util";
export const AccountLoginIndicator = () => {
  const auth = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const [smallScreen, setSmallScreen] = useState(
    window.matchMedia("(max-width: 30rem)").matches,
  );
  const [smallerScreen, setSmallerScreen] = useState(
    window.matchMedia("(max-width: 20rem)").matches,
  );
  useEffect(() => {
    window
      .matchMedia("(max-width: 30rem)")
      .addEventListener("change", (e) => setSmallScreen(e.matches));
    window
      .matchMedia("(max-width: 20rem)")
      .addEventListener("change", (e) => setSmallerScreen(e.matches));
  }, []);

  const truncatedName = auth.userInfo
    ? truncateText(
        auth.userInfo.name,
        smallerScreen ? 4 : smallScreen ? 10 : 20,
      )
    : "";

  return (
    <div className="account-login-indicator">
      {auth.userInfo ? (
        <>
          <button
            onClick={() => {
              setShowMenu(!showMenu);
            }}
            type="button"
            className={`account-login-indicator__button ${showMenu ? "account-login-indicator__button--open" : ""}`}
          >
            <FaUser />
            {truncatedName}
          </button>
          {showMenu ? (
            <div className="account-login-indicator__menu">
              <button
                className="account-login-indicator__button account-login-indicator__button--menu account-login-indicator__button--logout"
                onClick={() => {
                  auth.events
                    .onLogout()
                    .then(() => {
                      setShowMenu(false);
                    })
                    .catch((e) => console.log(e));
                }}
                type="button"
              >
                <FaRightFromBracket /> Sair
              </button>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <Link to="/login" className="account-login-indicator__button">
          <FaRightToBracket />
          Entrar
        </Link>
      )}
    </div>
  );
};

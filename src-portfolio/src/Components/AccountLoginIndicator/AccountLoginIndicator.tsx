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
    <>
      {auth.userInfo ? (
        <>
          <div className="account-login-indicator">
            <button
              onClick={() => {
                setShowMenu(!showMenu);
              }}
              type="button"
              className={`account-button ${showMenu ? "open" : ""}`}
            >
              <FaUser />
              {truncatedName}
            </button>
            {showMenu ? (
              <div className="account-menu">
                <button
                  onClick={() => {
                    auth.events
                      .onLogout()
                      .then(() => {
                        setShowMenu(false);
                      })
                      .catch((e) => console.log(e));
                  }}
                  type="button"
                  className="logout"
                >
                  <FaRightFromBracket /> Sair
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <Link to="/login" className="account-login-indicator login">
          <FaRightToBracket />
          <span className="login-indicator-text">Entrar</span>
        </Link>
      )}
    </>
  );
};

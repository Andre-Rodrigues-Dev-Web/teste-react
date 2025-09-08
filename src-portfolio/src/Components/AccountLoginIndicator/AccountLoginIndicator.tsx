import { FaRightFromBracket, FaRightToBracket, FaUser } from "react-icons/fa6";
import "./AccountLoginIndicator.css";
import { Link } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { truncateText } from "../../util";
export const AccountLoginIndicator = () => {
  const auth = useContext(AuthContext);
  const [hovering, setHovering] = useState(false);
  const [hideText, setHideText] = useState(
    window.matchMedia("(min-width: 50rem)").matches,
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 50rem)")
      .addEventListener("change", (e) => setHideText(e.matches));
  }, []);

  useEffect(() => {
    console.log(hideText);
  }, [hideText]);
  return (
    <>
      {auth.userInfo ? (
        <button
          style={{
            minWidth:
              !auth.userInfo || !hideText
                ? "7rem"
                : `${truncateText(auth.userInfo.name, 20).length > 7 ? truncateText(auth.userInfo.name, 20).length : 7}rem`,
          }}
          type="button"
          onClick={() => {
            auth.events
              .onLogout()
              .then(() => {
                setHovering(false);
              })
              .catch((e) => console.log(e));
          }}
          onMouseOver={() => {
            setHovering(true);
          }}
          onMouseOut={() => {
            setHovering(false);
          }}
          className="account-login-indicator logged-in"
          aria-label="Sair"
        >
          {hovering ? (
            <>
              <FaRightFromBracket />
              <span className="login-indicator-text">Sair?</span>
            </>
          ) : (
            <>
              <FaUser />
              <span className="login-indicator-text">
                {truncateText(auth.userInfo.name, 20)}
              </span>
            </>
          )}
        </button>
      ) : (
        <Link to="/login" className="account-login-indicator">
          <FaRightToBracket />
          <span className="login-indicator-text">Entrar</span>
        </Link>
      )}
    </>
  );
};

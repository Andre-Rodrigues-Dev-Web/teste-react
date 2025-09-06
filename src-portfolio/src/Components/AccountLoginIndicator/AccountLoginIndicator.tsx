import { FaRightFromBracket, FaRightToBracket, FaUser } from "react-icons/fa6";
import "./AccountLoginIndicator.css";
import { Link } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { truncateText } from "../../util";
export const AccountLoginIndicator = () => {
  const auth = useContext(AuthContext);
  const [hovering, setHovering] = useState(false);
  return (
    <>
      {auth.userInfo ? (
        <button
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
        >
          {hovering ? (
            <>
              <FaRightFromBracket /> <div>Sair?</div>
            </>
          ) : (
            <>
              <FaUser /> {truncateText(auth.userInfo.name, 10)}
            </>
          )}
        </button>
      ) : (
        <Link to="/login" className="account-login-indicator">
          <FaRightToBracket /> Entrar
        </Link>
      )}
    </>
  );
};

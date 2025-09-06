import { useContext, useState } from "react";
import "./Login.css";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router";
import { addUser } from "../../API/usersApi";
export const Login = ({ newAccount }: { newAccount?: boolean }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const auth = useContext(AuthContext);
  return (
    <div className="login-container">
      <form
        onSubmit={(e) => {
          if (newAccount) {
            addUser({ name, username, password })
              .then((userInfo) => {
                auth.events.onAccountCreation(userInfo);
              })
              .catch((e) => {
                console.error(e);
              });
          } else {
            auth.events.onLogin(username, password).catch((e) => {
              console.error(e);
            });
          }
          e.preventDefault();
        }}
      >
        <h1>{newAccount ? "Criar Conta" : "Login"}</h1>
        {newAccount ? (
          <div className="labeled-input">
            <label htmlFor="name-input">Nome</label>
            <input
              id="name-input"
              type="text"
              value={name}
              placeholder="Nome"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
        ) : (
          <></>
        )}
        <div className="labeled-input">
          <label htmlFor="username-input">Usuário</label>
          <input
            id="username-input"
            type="text"
            value={username}
            placeholder="Usuário"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="labeled-input">
          <label htmlFor="password-input">Senha</label>
          <input
            id="password-input"
            type="password"
            value={password}
            placeholder="Senha"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="login-button-row">
          {newAccount ? (
            <>
              <button className="login" type="submit">
                Criar conta
              </button>
              <Link to="/login" className="create" type="button">
                Cancelar
              </Link>
            </>
          ) : (
            <>
              <button className="login" type="submit">
                Entrar
              </button>
              <Link to="/newAccount" className="create" type="button">
                Criar conta
              </Link>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

import { useContext, useState } from "react";
import "./Login.css";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router";
import { addUser } from "../../API/usersApi";
import { parseAPIError, type APIError } from "../../util";
import { InfoBanner } from "../../Components/InfoBanner/InfoBanner";
export const Login = ({ newAccount }: { newAccount?: boolean }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<APIError | null>(null);

  const auth = useContext(AuthContext);
  return (
    <div className="login-container">
      <form
        onSubmit={(e) => {
          setLoading(true);
          setError(null);
          if (newAccount) {
            addUser({ name, username, password })
              .then((userInfo) => {
                auth.events.onAccountCreation(userInfo);
              })
              .catch((e) => {
                setError(parseAPIError(e));
              });
          } else {
            auth.events.onLogin(username, password).catch((e) => {
              setError(parseAPIError(e));
            });
          }
          setLoading(false);

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
              <Link
                to="/login"
                onClick={() => {
                  setError(null);
                }}
                className="create"
                type="button"
              >
                Cancelar
              </Link>
            </>
          ) : (
            <>
              <button className="login" type="submit">
                Entrar
              </button>
              <Link
                to="/newAccount"
                onClick={() => {
                  setError(null);
                }}
                className="create"
                type="button"
              >
                Criar conta
              </Link>
            </>
          )}
        </div>
      </form>
      <div className="status">
        {loading ? (
          <>Carregando...</>
        ) : error ? (
          <InfoBanner
            level="error"
            title={newAccount ? "Erro ao criar conta" : "Erro ao entrar"}
            content={error.message}
            details={error.details}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

import { useContext, useState } from "react";
import "./Login.css";
import { AuthContext } from "../../Context/AuthContext";
import { addUser } from "../../API/usersApi";
import { parseAPIError, type APIError } from "../../util";
import { InfoBanner } from "../../Components/InfoBanner/InfoBanner";
import { Button } from "../../Components/Button/Button";
import { LabeledInput } from "../../Components/LabeledInput/LabeledInput";
export const Login = ({ newAccount }: { newAccount?: boolean }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<APIError | null>(null);

  const auth = useContext(AuthContext);
  return (
    <div className="login">
      <form
        className="login__form"
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
          <LabeledInput
            title="Nome"
            id="name-input"
            value={name}
            placeholder="Nome"
            className="login__input"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        ) : (
          <></>
        )}
        <LabeledInput
          title="Usuário"
          id="username-input"
          value={username}
          placeholder="Usuário"
          className="login__input"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <LabeledInput
          title="Senha"
          id="password-input"
          type="password"
          value={password}
          placeholder="Senha"
          className="login__input"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="login__button-row">
          <Button className="login__button" type="submit" color="primary">
            {newAccount ? "Criar conta" : "Entrar"}
          </Button>

          <Button
            type="link"
            color="secondary"
            to={newAccount ? "/login" : "/newAccount"}
            className="login__button"
            onClick={() => {
              setError(null);
            }}
          >
            {newAccount ? "Cancelar" : "Criar Conta"}
          </Button>
        </div>
      </form>
      <div className="login__status">
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

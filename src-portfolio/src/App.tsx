import { Link, Outlet } from "react-router";
import "./App.css";
import { ThemeSwitcher } from "./Components/ThemeSwitcher/ThemeSwitcher";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./Context/ThemeContext";
import { AccountLoginIndicator } from "./Components/AccountLoginIndicator/AccountLoginIndicator";
import type { UserInfo } from "./Entities/UserInfo";
import { AuthContext } from "./Context/AuthContext";
import { login } from "./API/loginApi";
import { useNavigate } from "react-router";

export const App = () => {
  const [theme, setTheme] = useState("dark");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const navigate = useNavigate();
  const onLogin = async (username: string, password: string) => {
    const userInfo = await login(username, password);
    setUserInfo(userInfo);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    await navigate("/");
  };
  const onAccountCreation = (userInfo: UserInfo) => {
    setUserInfo(userInfo);

    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    navigate("/");
  };
  const onLogout = async () => {
    setUserInfo(null);
    localStorage.removeItem("userInfo");
  };
  const onAuthFail = async () => {};
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.querySelector("body")?.setAttribute("data-theme", savedTheme);
      setTheme(savedTheme);
    }
    const savedUser = localStorage.getItem("userInfo");

    if (savedUser) {
      setUserInfo(JSON.parse(savedUser) as UserInfo);
    }
  }, []);
  const onThemeChange = (theme: string) => {
    setTheme(theme);
  };
  const authContext = useMemo(() => {
    return {
      userInfo,
      events: { onAuthFail, onLogin, onLogout, onAccountCreation },
    };
  }, [userInfo, onLogin]);
  return (
    <AuthContext value={authContext}>
      <ThemeContext value={theme}>
        <div className="app">
          <header>
            <nav>
              <ul className="navigation">
                <li>
                  <Link to="/">Portfólio</Link>
                </li>
                <li>
                  <Link to="/news">Notícias</Link>
                </li>
              </ul>
            </nav>
            <div className="header-right">
              <div className="themes">
                <div className="theme-options">
                  {theme === "dark" ? (
                    <ThemeSwitcher
                      Icon={FaSun}
                      themeName="light"
                      onClick={onThemeChange}
                    />
                  ) : (
                    <ThemeSwitcher
                      Icon={FaMoon}
                      themeName="dark"
                      onClick={onThemeChange}
                    />
                  )}
                </div>
              </div>
              <AccountLoginIndicator />
            </div>
          </header>
          <Outlet />
        </div>
      </ThemeContext>
    </AuthContext>
  );
};

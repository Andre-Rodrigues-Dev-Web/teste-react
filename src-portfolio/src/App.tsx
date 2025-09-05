import { Link, Outlet } from "react-router";
import "./App.css";
import { ThemeSwitcher } from "./Components/ThemeSwitcher/ThemeSwitcher";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { ThemeContext } from "./Context/ThemeContext";

export const App = () => {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.querySelector("body")?.setAttribute("data-theme", savedTheme);
      setTheme(savedTheme);
    }
  }, []);
  const onThemeChange = (theme: string) => {
    setTheme(theme);
  };
  return (
    <ThemeContext value={theme}>
      <div className="app">
        <header>
          <ul className="navigation">
            <li>
              <Link to="/">Portfólio</Link>
            </li>
            <li>
              <Link to="/news">Notícias</Link>
            </li>
          </ul>
          <div className="themes">
            <span>Mudar tema</span>
            <div className="theme-options">
              <ThemeSwitcher
                Icon={FaSun}
                themeName="light"
                onClick={onThemeChange}
              />
              <ThemeSwitcher
                Icon={FaMoon}
                themeName="dark"
                onClick={onThemeChange}
              />
            </div>
          </div>
        </header>
        <Outlet />
      </div>
    </ThemeContext>
  );
};

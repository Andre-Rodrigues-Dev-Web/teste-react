import "./ThemeSwitcher.css";
import type { IconType } from "react-icons";
export const ThemeSwitcher = ({
  themeName,
  Icon,
  onClick,
}: {
  themeName: string;
  Icon: IconType;
  onClick: (theme: string) => void;
}) => {
  const setTheme = () => {
    document.querySelector("body")?.setAttribute("data-theme", themeName);
    localStorage.setItem("theme", themeName);
  };
  return (
    <button
      className={`theme-button theme-${themeName}`}
      type="button"
      onClick={() => {
        setTheme();
        onClick(themeName);
      }}
      aria-label={`Mudar para o tema ${themeName}`}
    >
      <Icon />
    </button>
  );
};

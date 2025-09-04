import { Link, Outlet } from "react-router";
import "./App.css";

export const App = () => {
  return (
    <div className="app">
      <header>
        <ul>
          <li>
            <Link to="/">Portfólio</Link>
          </li>
          <li>
            <Link to="/news">Notícias</Link>
          </li>
        </ul>
      </header>
      <Outlet />
    </div>
  );
};

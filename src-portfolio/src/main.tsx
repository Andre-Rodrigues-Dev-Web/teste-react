import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Portfolio } from "./Routes/Portfolio/Portfolio.tsx";
import { News } from "./Routes/News/News.tsx";
import "@fontsource-variable/roboto";
import { App } from "./App.tsx";
import "./darkTheme.css";
import "./lightTheme.css";
import { SingleNews } from "./Routes/SingleNews/SingleNews.tsx";
import { Login } from "./Routes/Login/Login.tsx";
import { EditNews } from "./Routes/EditNews/EditNews.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Portfolio />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<SingleNews />} />
          <Route path="/news/:id/edit" element={<EditNews />} />
          <Route path="/login" element={<Login />} />
          <Route path="/newAccount" element={<Login newAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);

import React from "react";
import ReactDOM from "react-dom/client";
import { TodoApp } from "./components/TodoApp";

// импортируем шрифты из npm
import "@fontsource/nunito-sans/400.css";
import "@fontsource/nunito-sans/600.css";

// ⚠️ сюда CSS не вставляем, только шрифты и React
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TodoApp />
  </React.StrictMode>
);

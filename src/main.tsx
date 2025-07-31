import { createRoot } from "react-dom/client";
import "./index.css";
import "./assets/global/global.css";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

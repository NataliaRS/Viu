import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// 1) Tokens (variables CSS + temas) — define --color-*, --space-*, --font-*, etc.
import "@viu/design-tokens/css";
// 2) Estilos de los componentes VIU.
import "@viu/ui/styles";

import { App } from "./App";

// Tema black-first por defecto (o "light"). También se puede setear en <html>.
document.documentElement.setAttribute("data-theme", "dark");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Tokens (CSS variables + themes) — the single source of truth the components consume.
// Consumers install @viu/design-tokens and do: import "@viu/design-tokens/css";
import "../../../dist/tokens.css";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

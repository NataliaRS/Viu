import { useEffect, type ReactNode } from "react";
import type { Preview } from "@storybook/react";
// VIU tokens — CSS variables + themes. The single source the components consume.
import "../../dist/tokens.css";
import theme from "./theme";
import ViuDocs from "./ViuDocs";

// El toggle de tema maneja el `data-theme` del <html> del preview → tiñe TODO el
// preview (canvas de componentes + páginas de docs/ViuDocs + fondos), no solo el
// render de los ejemplos. Todo el contenido usa tokens, así que light se resuelve
// bien. (El shell propio de Storybook —sidebar/toolbar— se pinta aparte en theme.ts.)
function ThemeSync({ theme: t, children }: { theme: "dark" | "light"; children: ReactNode }) {
  // Sync inmediato (sin flash) + efecto por si cambia el global.
  if (typeof document !== "undefined") document.documentElement.setAttribute("data-theme", t);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", t);
  }, [t]);
  return <>{children}</>;
}

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    backgrounds: { disable: true },
    a11y: { context: "#storybook-root" },
    docs: { theme, page: ViuDocs },
    options: {
      storySort: {
        method: "alphabetical",
        order: [
          "Get started",
          "Foundations",
          ["Tokens", "Colors", "Typography", "Spacing & Radius", "Grid", "Effects"],
          "Components",
          ["Atoms", "Molecules", "Organisms", "Patterns"],
          "*",
        ],
      },
    },
  },
  // Slot props are ReactNode — disable their Controls so they don't render the
  // raw React.element object dump. They still appear (with type/description) in
  // the Docs args table.
  argTypes: {
    icon: { control: false },
    leadingIcon: { control: false },
    trailingIcon: { control: false },
    link: { control: false },
    action: { control: false },
    avatar: { control: false },
  },
  globalTypes: {
    locale: {
      description: "Idioma de la documentación / Documentation language",
      defaultValue: "en",
      toolbar: {
        title: "Language",
        icon: "globe",
        items: [
          { value: "en", title: "English", right: "🇬🇧" },
          { value: "es", title: "Español", right: "🇪🇸" },
        ],
        dynamicTitle: true,
      },
    },
    theme: {
      description: "Tema VIU (black-first) — tiñe todo el preview (canvas + docs)",
      defaultValue: "dark",
      toolbar: {
        title: "Tema",
        icon: "contrast",
        items: [
          { value: "dark", title: "Dark" },
          { value: "light", title: "Light" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const t = (context.globals.theme as "dark" | "light") ?? "dark";
      const isDocs = context.viewMode === "docs";
      return (
        // `data-theme` va en el <html> del preview (ThemeSync) → tiñe todo, no solo
        // este wrapper. El wrapper solo aporta layout/fondo del área del ejemplo.
        <ThemeSync theme={t}>
          <div
            style={{
              background: "var(--color-bg-base)",
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-family-body)",
              padding: isDocs ? "var(--space-lg)" : "var(--space-2xl)",
              minHeight: isDocs ? "auto" : "100vh",
              borderRadius: isDocs ? "var(--radius-surface)" : 0,
            }}
          >
            <Story />
          </div>
        </ThemeSync>
      );
    },
  ],
};

export default preview;

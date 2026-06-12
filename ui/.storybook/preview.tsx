import { useEffect } from "react";
import type { Preview } from "@storybook/react";
// VIU tokens — CSS variables + themes. The single source the components consume.
import "../../dist/tokens.css";
import theme from "./theme";
import ViuDocs from "./ViuDocs";

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    backgrounds: { disable: true },
    a11y: { context: "#storybook-root" },
    // Dark, on-brand Docs pages + the reusable VIU docs template for every component.
    docs: { theme, page: ViuDocs },
    options: {
      storySort: { order: ["Get started", "Foundations", "Components", "*"] },
    },
  },
  globalTypes: {
    theme: {
      description: "Tema VIU (black-first)",
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
      const t = context.globals.theme as "dark" | "light";
      const isDocs = context.viewMode === "docs";
      useEffect(() => {
        document.documentElement.setAttribute("data-theme", t);
      }, [t]);
      return (
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
      );
    },
  ],
};

export default preview;

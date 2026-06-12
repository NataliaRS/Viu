import { useEffect } from "react";
import type { Preview } from "@storybook/react";
// VIU tokens — CSS variables + themes. The single source the components consume.
import "../../dist/tokens.css";

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    backgrounds: { disable: true },
    a11y: { context: "#storybook-root" },
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
      const theme = context.globals.theme as "dark" | "light";
      useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
      }, [theme]);
      return (
        <div
          style={{
            background: "var(--color-bg-base)",
            color: "var(--color-text-primary)",
            fontFamily: "var(--font-family-body)",
            padding: "var(--space-2xl)",
            minHeight: "100vh",
          }}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;

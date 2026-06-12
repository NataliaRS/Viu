import type { Preview } from "@storybook/react";
// VIU tokens — CSS variables + themes. The single source the components consume.
import "../../dist/tokens.css";
import theme from "./theme";
import ViuDocs from "./ViuDocs";

// Keep the Docs chrome + prose always dark (brand). The theme toolbar only flips
// the story canvas (scoped on the wrapper below), never the documentation — so
// token-colored text never ends up dark-on-dark.
if (typeof document !== "undefined") {
  document.documentElement.setAttribute("data-theme", "dark");
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
    theme: {
      description: "Tema VIU (black-first) — afecta el canvas de componentes",
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
        // data-theme is scoped HERE (not on <html>) so it only themes the story.
        <div
          data-theme={t}
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

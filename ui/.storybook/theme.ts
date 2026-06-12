import { create } from "@storybook/theming/create";

// VIU-branded Storybook chrome — black-first, crimson accent, brand fonts.
// Mirrors the design tokens so the tool itself feels like the product.
export default create({
  base: "dark",

  brandTitle: "VIU Design System",
  brandUrl: "https://nataliars.github.io/Viu/",
  brandTarget: "_self",

  colorPrimary: "#b5262e", // crimson (color/red/500)
  colorSecondary: "#f07178", // text/brand — used for selected/hover accents

  // surfaces (neutral primitives)
  appBg: "#0a0a0b",
  appContentBg: "#0a0a0b",
  appPreviewBg: "#0a0a0b",
  appBorderColor: "#ffffff29", // alpha/white-16
  appBorderRadius: 8, // radius/control

  // text
  textColor: "#f5f5f7", // text/primary
  textInverseColor: "#0a0a0b",
  textMutedColor: "#a8a8ad", // text/secondary

  // toolbar / sidebar
  barTextColor: "#a8a8ad",
  barSelectedColor: "#f07178",
  barHoverColor: "#f07178",
  barBg: "#141416", // neutral/850

  // form controls
  inputBg: "#141416",
  inputBorder: "#ffffff47", // alpha/white-28
  inputTextColor: "#f5f5f7",
  inputBorderRadius: 8,

  fontBase: '"General Sans", "Inter", system-ui, sans-serif',
  fontCode: '"JetBrains Mono", ui-monospace, monospace',
});

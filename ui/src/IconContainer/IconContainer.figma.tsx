import figma from "@figma/code-connect";
import { IconContainer } from "./IconContainer";
import { Icon } from "../Icon/Icon";

/**
 * Code Connect — IconContainer (Figma 574:150), 3 ejes mapeados 1:1:
 * Size × Style (Filled/Stroke) × Tone (8). Paridad completa jun-2026.
 */
figma.connect(
  IconContainer,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=574-150",
  {
    props: {
      size: figma.enum("Size", { Large: "lg", Medium: "md", Small: "sm" }),
      appearance: figma.enum("Style", { Filled: "filled", Stroke: "stroke" }),
      tone: figma.enum("Tone", {
        Brand: "brand",
        Neutral: "neutral",
        Inverse: "inverse",
        Danger: "danger",
        Warning: "warning",
        Success: "success",
        Info: "info",
        Disable: "disabled",
      }),
    },
    example: ({ size, appearance, tone }) => (
      <IconContainer size={size} appearance={appearance} tone={tone} icon={<Icon glyph="Info" />} />
    ),
  },
);

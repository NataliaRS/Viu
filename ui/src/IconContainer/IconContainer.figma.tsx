import figma from "@figma/code-connect";
import { IconContainer } from "./IconContainer";
import { Icon } from "../Icon/Icon";

// NOTA de paridad: el nodo Figma 574:150 tiene 3 ejes (Size × style Filled/Stroke ×
// tone Brand/Neutral/Inverse/Danger/Warning/Success/Info/Disable = 48 variantes).
// El IconContainer de código hoy solo expone `size`; Code Connect mapea esa API real.
// El gap (style/tone) queda anotado como deuda en el skill (code-build §14).
figma.connect(
  IconContainer,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=574-150",
  {
    props: {
      size: figma.enum("Size", { Large: "lg", Medium: "md", Small: "sm" }),
    },
    example: ({ size }) => <IconContainer size={size} icon={<Icon glyph="Info" />} />,
  },
);

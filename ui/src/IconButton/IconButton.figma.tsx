import figma from "@figma/code-connect";
import { IconButton } from "./IconButton";
import { Icon } from "../Icon/Icon";

figma.connect(
  IconButton,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=393-190",
  {
    props: {
      variant: figma.enum("Variant", {
        Primary: "primary",
        Secondary: "secondary",
        Tertiary: "tertiary",
      }),
      size: figma.enum("Size", { SM: "sm", MD: "md", LG: "lg" }),
      disabled: figma.enum("State", { Disabled: true }),
    },
    example: ({ variant, size, disabled }) => (
      <IconButton
        variant={variant}
        size={size}
        disabled={disabled}
        aria-label="Acción"
        icon={<Icon glyph="Plus" />}
      />
    ),
  },
);

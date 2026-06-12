import figma from "@figma/code-connect";
import { Button } from "./Button";

/**
 * Code Connect — maps the Figma Button (set 8:53) to <Button/>.
 * Publish with: `npx figma connect publish` (needs a Figma access token).
 */
figma.connect(
  Button,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=8-53",
  {
    props: {
      label: figma.string("Label"),
      variant: figma.enum("Variant", {
        Primary: "primary",
        Secondary: "secondary",
        Tertiary: "tertiary",
      }),
      size: figma.enum("Size", { MD: "md", SM: "sm", LG: "lg" }),
      disabled: figma.enum("State", { Disabled: true }),
      leadingIcon: figma.boolean("Icono izquierda", {
        true: figma.instance("Icono izq"),
        false: undefined,
      }),
      trailingIcon: figma.boolean("Icono derecha", {
        true: figma.instance("Icono der"),
        false: undefined,
      }),
    },
    example: ({ label, variant, size, disabled, leadingIcon, trailingIcon }) => (
      <Button
        variant={variant}
        size={size}
        disabled={disabled}
        leadingIcon={leadingIcon}
        trailingIcon={trailingIcon}
      >
        {label}
      </Button>
    ),
  },
);

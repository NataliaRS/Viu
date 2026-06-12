import figma from "@figma/code-connect";
import { Chip } from "./Chip";

figma.connect(
  Chip,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=17-67",
  {
    props: {
      variant: figma.enum("Type", {
        Input: "input",
        "Con avatar": "avatar",
        Choice: "choice",
      }),
      disabled: figma.enum("State", { Disabled: true }),
    },
    example: ({ variant, disabled }) => (
      <Chip variant={variant} disabled={disabled} label="Etiqueta" onRemove={() => {}} />
    ),
  },
);

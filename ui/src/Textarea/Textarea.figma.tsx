import figma from "@figma/code-connect";
import { Textarea } from "./Textarea";

figma.connect(
  Textarea,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=26-250",
  {
    props: {
      error: figma.enum("State", { Error: true }),
      disabled: figma.enum("State", { Disabled: true }),
    },
    example: ({ error, disabled }) => <Textarea error={error} disabled={disabled} />,
  },
);

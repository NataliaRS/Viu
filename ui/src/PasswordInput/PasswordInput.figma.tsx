import figma from "@figma/code-connect";
import { PasswordInput } from "./PasswordInput";

figma.connect(
  PasswordInput,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=407-6",
  {
    props: {
      error: figma.enum("State", { Error: true }),
      disabled: figma.enum("State", { Disabled: true }),
    },
    example: ({ error, disabled }) => <PasswordInput error={error} disabled={disabled} />,
  },
);

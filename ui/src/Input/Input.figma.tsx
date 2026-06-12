import figma from "@figma/code-connect";
import { Input } from "./Input";

figma.connect(
  Input,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=26-197",
  {
    props: {
      error: figma.enum("State", { Error: true }),
      disabled: figma.enum("State", { Disabled: true }),
      placeholder: figma.string("texto"),
    },
    example: ({ error, disabled, placeholder }) => (
      <Input error={error} disabled={disabled} placeholder={placeholder} />
    ),
  },
);

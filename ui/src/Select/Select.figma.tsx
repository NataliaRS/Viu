import figma from "@figma/code-connect";
import { Select } from "./Select";

figma.connect(
  Select,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=26-293",
  {
    props: {
      error: figma.enum("State", { Error: true }),
      disabled: figma.enum("State", { Disabled: true }),
    },
    example: ({ error, disabled }) => (
      <Select error={error} disabled={disabled}>
        <option>Opción</option>
      </Select>
    ),
  },
);

import figma from "@figma/code-connect";
import { Pill } from "./Pill";

figma.connect(
  Pill,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=16-63",
  {
    props: {
      selected: figma.enum("State", { Selected: true }),
      disabled: figma.enum("State", { Disabled: true }),
    },
    example: ({ selected, disabled }) => (
      <Pill selected={selected} disabled={disabled}>
        Filtro
      </Pill>
    ),
  },
);

import figma from "@figma/code-connect";
import { Checkbox } from "./Checkbox";

figma.connect(
  Checkbox,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=24-167",
  {
    props: {
      checked: figma.enum("Seleccion", { Checked: true }),
      indeterminate: figma.enum("Seleccion", { Indeterminate: true }),
      disabled: figma.enum("Estado", { Disabled: true }),
    },
    example: ({ checked, indeterminate, disabled }) => (
      <Checkbox checked={checked} indeterminate={indeterminate} disabled={disabled} />
    ),
  },
);

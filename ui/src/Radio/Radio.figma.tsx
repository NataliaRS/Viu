import figma from "@figma/code-connect";
import { Radio } from "./Radio";

figma.connect(
  Radio,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=24-227",
  {
    props: {
      checked: figma.enum("Seleccion", { Checked: true }),
      disabled: figma.enum("Estado", { Disabled: true }),
    },
    example: ({ checked, disabled }) => <Radio checked={checked} disabled={disabled} />,
  },
);

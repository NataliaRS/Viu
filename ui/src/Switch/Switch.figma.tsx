import figma from "@figma/code-connect";
import { Switch } from "./Switch";

figma.connect(
  Switch,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=24-279",
  {
    props: {
      checked: figma.boolean("Seleccion"),
      disabled: figma.enum("Estado", { Disabled: true }),
    },
    example: ({ checked, disabled }) => <Switch checked={checked} disabled={disabled} />,
  },
);

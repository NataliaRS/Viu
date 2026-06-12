import figma from "@figma/code-connect";
import { MenuItem } from "./MenuItem";

figma.connect(
  MenuItem,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=170-21",
  {
    props: {
      label: figma.string("label"),
      shortcut: figma.boolean("atajo", { true: figma.string("textoAtajo"), false: undefined }),
      disabled: figma.enum("estado", { Deshabilitado: true }),
    },
    example: ({ label, shortcut, disabled }) => (
      <MenuItem shortcut={shortcut} disabled={disabled}>
        {label}
      </MenuItem>
    ),
  },
);

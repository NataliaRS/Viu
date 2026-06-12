import figma from "@figma/code-connect";
import { Tab } from "./Tab";

figma.connect(
  Tab,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=161-43",
  {
    props: {
      label: figma.string("label"),
      variant: figma.enum("Estilo", { "Línea": "line", Segmentado: "segmented" }),
      active: figma.enum("Estado", { Activo: true }),
      disabled: figma.enum("Estado", { Deshabilitado: true }),
    },
    example: ({ label, variant, active, disabled }) => (
      <Tab variant={variant} active={active} disabled={disabled}>
        {label}
      </Tab>
    ),
  },
);

import figma from "@figma/code-connect";
import { Tab } from "./Tab";
import { Icon } from "../Icon/Icon";

figma.connect(
  Tab,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=161-43",
  {
    props: {
      label: figma.string("label"),
      variant: figma.enum("Estilo", { "Línea": "line", Segmentado: "segmented" }),
      active: figma.enum("Estado", { Activo: true }),
      disabled: figma.enum("Estado", { Deshabilitado: true }),
      // Figma `Icono fin` (bool, default off): tab cerrable → close por defecto.
      trailingIcon: figma.boolean("Icono fin", {
        true: <Icon glyph="close" size={16} />,
        false: undefined,
      }),
    },
    example: ({ label, variant, active, disabled, trailingIcon }) => (
      <Tab variant={variant} active={active} disabled={disabled} trailingIcon={trailingIcon}>
        {label}
      </Tab>
    ),
  },
);

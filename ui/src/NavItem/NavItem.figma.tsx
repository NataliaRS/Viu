import figma from "@figma/code-connect";
import { NavItem } from "./NavItem";

figma.connect(
  NavItem,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=233-19",
  {
    props: {
      label: figma.string("label"),
      active: figma.enum("estado", { Activo: true }),
    },
    example: ({ label, active }) => (
      <NavItem href="#" active={active}>
        {label}
      </NavItem>
    ),
  },
);

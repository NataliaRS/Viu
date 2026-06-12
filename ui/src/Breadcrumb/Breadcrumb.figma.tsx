import figma from "@figma/code-connect";
import { Breadcrumb } from "./Breadcrumb";

figma.connect(
  Breadcrumb,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=163-19",
  {
    props: { separator: figma.enum("Separador", { Chevron: "chevron", Barra: "slash" }) },
    example: ({ separator }) => (
      <Breadcrumb
        separator={separator}
        items={[
          { label: "Inicio", href: "#" },
          { label: "Proyectos", href: "#" },
          { label: "Rediseño 2026" },
        ]}
      />
    ),
  },
);

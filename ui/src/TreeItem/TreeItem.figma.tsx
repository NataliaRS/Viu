import figma from "@figma/code-connect";
import { TreeItem } from "./TreeItem";

figma.connect(
  TreeItem,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=411-19",
  {
    props: {
      label: figma.string("label"),
      selected: figma.enum("estado", { Seleccionado: true }),
    },
    example: ({ label, selected }) => <TreeItem label={label} hasChildren selected={selected} />,
  },
);

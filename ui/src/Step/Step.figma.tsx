import figma from "@figma/code-connect";
import { Step } from "./Step";

figma.connect(
  Step,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=189-25",
  {
    props: {
      number: figma.string("numero"),
      label: figma.string("etiqueta"),
      connector: figma.boolean("conector"),
      status: figma.enum("Estado", {
        Completado: "complete",
        Actual: "current",
        Pendiente: "upcoming",
      }),
    },
    example: ({ number, label, connector, status }) => (
      <Step status={status} number={number} label={label} connector={connector} />
    ),
  },
);

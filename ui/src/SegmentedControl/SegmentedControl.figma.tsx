import figma from "@figma/code-connect";
import { SegmentedControl } from "./SegmentedControl";

figma.connect(
  SegmentedControl,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=724-28",
  {
    props: {
      active: figma.enum("Activo", {
        Izquierda: "left",
        Centro: "center",
        Derecha: "right",
      }),
    },
    example: ({ active }) => (
      <SegmentedControl
        aria-label="Vista"
        value={active}
        onValueChange={() => {}}
        options={[
          { value: "left", label: "Uno" },
          { value: "center", label: "Dos" },
          { value: "right", label: "Tres" },
        ]}
      />
    ),
  },
);

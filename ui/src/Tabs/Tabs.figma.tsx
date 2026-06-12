import figma from "@figma/code-connect";
import { Tabs } from "./Tabs";

figma.connect(
  Tabs,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=366-6",
  {
    example: () => (
      <Tabs
        aria-label="Secciones"
        value="resumen"
        onValueChange={() => {}}
        items={[
          { value: "resumen", label: "Resumen" },
          { value: "actividad", label: "Actividad" },
        ]}
      />
    ),
  },
);

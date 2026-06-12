import figma from "@figma/code-connect";
import { Wizard } from "./Wizard";
import { FormField } from "../FormField/FormField";
import { Input } from "../Input/Input";

figma.connect(
  Wizard,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=288-7",
  {
    example: () => (
      <Wizard
        current={1}
        onStepChange={() => {}}
        steps={[
          { label: "Detalles", content: <FormField label="Nombre del proyecto" htmlFor="name"><Input id="name" /></FormField> },
          { label: "Equipo", content: <FormField label="Invitar" htmlFor="team"><Input id="team" /></FormField> },
          { label: "Ajustes", content: "Ajustes del proyecto." },
          { label: "Resumen", content: "Revisá y confirmá." },
        ]}
      />
    ),
  },
);

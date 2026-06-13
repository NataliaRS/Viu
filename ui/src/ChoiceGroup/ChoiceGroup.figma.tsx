import figma from "@figma/code-connect";
import { ChoiceGroup } from "./ChoiceGroup";

figma.connect(
  ChoiceGroup,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=728-35",
  {
    example: () => (
      <ChoiceGroup
        type="radio"
        label="Etiqueta del grupo"
        helper="Texto de ayuda opcional"
        defaultValue="uno"
        options={[
          { value: "uno", label: "Opción uno" },
          { value: "dos", label: "Opción dos" },
          { value: "tres", label: "Opción tres" },
        ]}
      />
    ),
  },
);

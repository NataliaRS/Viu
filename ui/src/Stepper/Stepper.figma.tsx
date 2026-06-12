import figma from "@figma/code-connect";
import { Stepper } from "./Stepper";

figma.connect(
  Stepper,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=339-66",
  {
    example: () => (
      <Stepper
        steps={[
          { label: "Cuenta", status: "complete" },
          { label: "Plan", status: "complete" },
          { label: "Pago", status: "current" },
          { label: "Listo", status: "upcoming" },
        ]}
      />
    ),
  },
);

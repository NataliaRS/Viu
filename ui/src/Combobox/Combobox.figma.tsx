import figma from "@figma/code-connect";
import { Combobox } from "./Combobox";

figma.connect(
  Combobox,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=730-40",
  {
    example: () => (
      <Combobox
        aria-label="País"
        placeholder="Buscar país…"
        options={[
          { value: "ar", label: "Argentina" },
          { value: "br", label: "Brasil" },
          { value: "cl", label: "Chile" },
        ]}
      />
    ),
  },
);

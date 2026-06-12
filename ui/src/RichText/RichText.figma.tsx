import figma from "@figma/code-connect";
import { RichText } from "./RichText";

figma.connect(
  RichText,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=402-7",
  {
    example: () => (
      <RichText>
        <h2>Título</h2>
        <p>Contenido con formato.</p>
      </RichText>
    ),
  },
);

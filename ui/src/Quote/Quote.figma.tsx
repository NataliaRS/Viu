import figma from "@figma/code-connect";
import { Quote } from "./Quote";

figma.connect(
  Quote,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=413-7",
  {
    example: () => (
      <Quote author="Natalia Rodríguez" source="Directora de UX">
        El mejor sistema de diseño es el que el equipo realmente usa todos los días.
      </Quote>
    ),
  },
);

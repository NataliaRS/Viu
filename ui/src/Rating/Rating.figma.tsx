import figma from "@figma/code-connect";
import { Rating } from "./Rating";

figma.connect(
  Rating,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=410-43",
  {
    example: () => <Rating value={3} readOnly />,
  },
);

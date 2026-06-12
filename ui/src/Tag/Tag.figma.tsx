import figma from "@figma/code-connect";
import { Tag } from "./Tag";

figma.connect(
  Tag,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=15-42",
  {
    example: () => <Tag tone="neutral">Etiqueta</Tag>,
  },
);

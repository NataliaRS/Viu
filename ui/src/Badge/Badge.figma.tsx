import figma from "@figma/code-connect";
import { Badge } from "./Badge";

figma.connect(
  Badge,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=14-77",
  {
    example: () => <Badge tone="neutral">Nuevo</Badge>,
  },
);

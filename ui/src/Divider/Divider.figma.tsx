import figma from "@figma/code-connect";
import { Divider } from "./Divider";

figma.connect(
  Divider,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=20-97",
  {
    example: () => <Divider orientation="horizontal" />,
  },
);

import figma from "@figma/code-connect";
import { Progress } from "./Progress";

figma.connect(
  Progress,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=22-184",
  {
    example: () => <Progress value={60} />,
  },
);

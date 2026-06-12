import figma from "@figma/code-connect";
import { Status } from "./Status";

figma.connect(
  Status,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=20-150",
  {
    example: () => <Status status="online" label />,
  },
);

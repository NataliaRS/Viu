import figma from "@figma/code-connect";
import { Skeleton } from "./Skeleton";

figma.connect(
  Skeleton,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=229-10",
  {
    example: () => <Skeleton variant="text" width={200} />,
  },
);

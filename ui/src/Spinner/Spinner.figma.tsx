import figma from "@figma/code-connect";
import { Spinner } from "./Spinner";

figma.connect(
  Spinner,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=20-209",
  {
    props: { size: figma.enum("Size", { SM: "sm", MD: "md", LG: "lg" }) },
    example: ({ size }) => <Spinner size={size} />,
  },
);

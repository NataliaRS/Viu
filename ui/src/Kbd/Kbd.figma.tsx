import figma from "@figma/code-connect";
import { Kbd } from "./Kbd";

figma.connect(
  Kbd,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=721-7",
  {
    props: {
      tecla: figma.string("Tecla"),
    },
    example: ({ tecla }) => <Kbd>{tecla}</Kbd>,
  },
);

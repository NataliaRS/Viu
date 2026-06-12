import figma from "@figma/code-connect";
import { Slider } from "./Slider";

figma.connect(
  Slider,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=225-16",
  {
    example: () => <Slider defaultValue={60} />,
  },
);

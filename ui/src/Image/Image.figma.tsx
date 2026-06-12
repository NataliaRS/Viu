import figma from "@figma/code-connect";
import { Image } from "./Image";

figma.connect(
  Image,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=543-62",
  {
    props: {
      ratio: figma.enum("Aspect ratio", {
        "16:9": "16:9",
        "4:3": "4:3",
        "1:1": "1:1",
        "3:2": "3:2",
        Libre: "free",
      }),
      state: figma.enum("Estado", {
        Default: "default",
        Loading: "loading",
        Error: "error",
      }),
    },
    example: ({ ratio, state }) => <Image ratio={ratio} state={state} src="https://picsum.photos/480/270" />,
  },
);

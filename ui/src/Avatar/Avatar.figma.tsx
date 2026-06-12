import figma from "@figma/code-connect";
import { Avatar } from "./Avatar";

figma.connect(
  Avatar,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=19-90",
  {
    props: {
      initials: figma.string("Iniciales"),
      size: figma.enum("Size", { XS: "xs", SM: "sm", MD: "md", LG: "lg", XL: "xl" }),
      src: figma.enum("Type", { Imagen: "https://i.pravatar.cc/128", Iniciales: undefined }),
    },
    example: ({ initials, size, src }) => <Avatar size={size} initials={initials} src={src} />,
  },
);

import figma from "@figma/code-connect";
import { Link } from "./Link";

figma.connect(
  Link,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=22-137",
  {
    props: { disabled: figma.enum("State", { Disabled: true }) },
    example: ({ disabled }) => (
      <Link href="#" disabled={disabled}>
        Ver más
      </Link>
    ),
  },
);

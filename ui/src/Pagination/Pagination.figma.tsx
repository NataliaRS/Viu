import figma from "@figma/code-connect";
import { Pagination } from "./Pagination";

figma.connect(
  Pagination,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=168-32",
  {
    props: { variant: figma.enum("tipo", { Numerada: "numbered", Simple: "simple" }) },
    example: ({ variant }) => <Pagination variant={variant} page={1} total={10} onPageChange={() => {}} />,
  },
);

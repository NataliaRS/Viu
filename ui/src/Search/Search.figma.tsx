import figma from "@figma/code-connect";
import { Search } from "./Search";

figma.connect(
  Search,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=26-347",
  {
    props: { disabled: figma.enum("State", { Disabled: true }) },
    example: ({ disabled }) => <Search disabled={disabled} aria-label="Buscar" onClear={() => {}} />,
  },
);

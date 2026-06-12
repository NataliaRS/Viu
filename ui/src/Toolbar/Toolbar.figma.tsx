import figma from "@figma/code-connect";
import { Toolbar } from "./Toolbar";
import { IconButton } from "../IconButton/IconButton";
import { Icon } from "../Icon/Icon";

figma.connect(
  Toolbar,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=172-29",
  {
    example: () => (
      <Toolbar aria-label="Formato">
        <IconButton variant="tertiary" aria-label="Buscar" icon={<Icon glyph="Search" />} />
        <IconButton variant="tertiary" aria-label="Agregar" icon={<Icon glyph="Plus" />} />
      </Toolbar>
    ),
  },
);

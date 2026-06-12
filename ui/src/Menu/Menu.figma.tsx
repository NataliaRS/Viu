import figma from "@figma/code-connect";
import { Menu } from "./Menu";
import { MenuItem } from "../MenuItem/MenuItem";

figma.connect(
  Menu,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=377-6",
  {
    example: () => (
      <Menu aria-label="Acciones">
        <MenuItem shortcut="⌘K">Buscar</MenuItem>
        <MenuItem>Nuevo</MenuItem>
        <MenuItem disabled>Archivar</MenuItem>
      </Menu>
    ),
  },
);

import figma from "@figma/code-connect";
import { Nav } from "./Nav";
import { NavItem } from "../NavItem/NavItem";

figma.connect(
  Nav,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=401-7",
  {
    example: () => (
      <Nav aria-label="Principal">
        <NavItem href="#" active>
          Inicio
        </NavItem>
        <NavItem href="#">Buscar</NavItem>
      </Nav>
    ),
  },
);

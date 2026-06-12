import figma from "@figma/code-connect";
import { AppShell } from "./AppShell";
import { Nav } from "../Nav/Nav";
import { NavItem } from "../NavItem/NavItem";
import { Breadcrumb } from "../Breadcrumb/Breadcrumb";
import { Button } from "../Button/Button";

figma.connect(
  AppShell,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=274-7",
  {
    example: () => (
      <AppShell
        sidebar={
          <Nav aria-label="Principal">
            <NavItem active>Proyectos</NavItem>
            <NavItem>Tareas</NavItem>
            <NavItem>Equipo</NavItem>
          </Nav>
        }
        topbar={
          <>
            <Breadcrumb aria-label="Ubicación" items={[{ label: "Inicio", href: "#" }, { label: "Proyectos" }]} />
            <Button size="sm">Nuevo proyecto</Button>
          </>
        }
      >
        Contenido de la página.
      </AppShell>
    ),
  },
);

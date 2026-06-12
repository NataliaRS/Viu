import figma from "@figma/code-connect";
import { Popover } from "./Popover";
import { Button } from "../Button/Button";

figma.connect(
  Popover,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=187-69",
  {
    props: {
      side: figma.enum("Posición", { Abajo: "bottom", Arriba: "top" }),
      title: figma.boolean("titulo", {
        true: figma.string("textoTitulo"),
        false: undefined,
      }),
      showClose: figma.boolean("cerrar"),
      body: figma.string("textoCuerpo"),
    },
    example: ({ side, title, showClose, body }) => (
      <Popover
        open
        side={side}
        title={title}
        showClose={showClose}
        onOpenChange={() => {}}
        trigger={<Button variant="secondary">Filtros</Button>}
        actions={
          <>
            <Button size="sm" variant="secondary">
              Después
            </Button>
            <Button size="sm" variant="primary">
              Aplicar
            </Button>
          </>
        }
      >
        {body}
      </Popover>
    ),
  },
);

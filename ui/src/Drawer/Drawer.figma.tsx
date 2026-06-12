import figma from "@figma/code-connect";
import { Drawer } from "./Drawer";
import { Button } from "../Button/Button";

figma.connect(
  Drawer,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=227-53",
  {
    props: {
      title: figma.string("titulo"),
      showClose: figma.boolean("cerrar"),
    },
    example: ({ title, showClose }) => (
      <Drawer
        open
        title={title}
        showClose={showClose}
        onClose={() => {}}
        footer={
          <>
            <Button variant="secondary">Cancelar</Button>
            <Button variant="primary">Guardar cambios</Button>
          </>
        }
      >
        Contenido del panel.
      </Drawer>
    ),
  },
);

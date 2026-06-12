import figma from "@figma/code-connect";
import { Modal } from "./Modal";
import { Button } from "../Button/Button";

figma.connect(
  Modal,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=140-57",
  {
    props: {
      size: figma.enum("Tamaño", { SM: "sm", MD: "md", LG: "lg" }),
      title: figma.string("titulo"),
      subtitle: figma.boolean("subtitulo", {
        true: figma.string("textoSubtitulo"),
        false: undefined,
      }),
      showClose: figma.boolean("cerrar"),
      body: figma.string("textoCuerpo"),
    },
    example: ({ size, title, subtitle, showClose, body }) => (
      <Modal
        open
        size={size}
        title={title}
        subtitle={subtitle}
        showClose={showClose}
        onClose={() => {}}
        footer={
          <>
            <Button variant="secondary">Cancelar</Button>
            <Button variant="primary">Confirmar</Button>
          </>
        }
      >
        {body}
      </Modal>
    ),
  },
);

import figma from "@figma/code-connect";
import { Toast } from "./Toast";

figma.connect(
  Toast,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=176-101",
  {
    props: {
      tone: figma.enum("tono", { Info: "info", Success: "success", Warning: "warning", Danger: "danger" }),
      title: figma.string("textoTitulo"),
      message: figma.string("textoMensaje"),
    },
    example: ({ tone, title, message }) => (
      <Toast tone={tone} title={title} onClose={() => {}}>
        {message}
      </Toast>
    ),
  },
);

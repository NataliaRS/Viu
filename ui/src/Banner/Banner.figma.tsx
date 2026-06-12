import figma from "@figma/code-connect";
import { Banner } from "./Banner";

figma.connect(
  Banner,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=135-84",
  {
    props: {
      tone: figma.enum("tono", {
        Info: "info",
        Success: "success",
        Warning: "warning",
        Danger: "danger",
        Neutral: "neutral",
      }),
      title: figma.string("textoTitulo"),
      message: figma.string("textoMensaje"),
    },
    example: ({ tone, title, message }) => (
      <Banner tone={tone} title={title} onClose={() => {}}>
        {message}
      </Banner>
    ),
  },
);

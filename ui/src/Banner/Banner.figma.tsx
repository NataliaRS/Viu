import figma from "@figma/code-connect";
import { Banner } from "./Banner";
import { Link } from "../Link/Link";

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
      title: figma.boolean("titulo", { true: figma.string("textoTitulo"), false: undefined }),
      message: figma.boolean("mensaje", { true: figma.string("textoMensaje"), false: undefined }),
      link: figma.boolean("link", {
        true: (
          <Link href="#" style={{ textDecoration: "underline" }}>
            Más información
          </Link>
        ),
        false: undefined,
      }),
      onClose: figma.boolean("cerrar", { true: () => {}, false: undefined }),
    },
    example: ({ tone, title, message, link, onClose }) => (
      <Banner tone={tone} title={title} link={link} onClose={onClose}>
        {message}
      </Banner>
    ),
  },
);

import figma from "@figma/code-connect";
import { PageHeader } from "./PageHeader";
import { Button } from "../Button/Button";

figma.connect(
  PageHeader,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=147-89",
  {
    props: {
      title: figma.string("titulo"),
      subtitle: figma.boolean("subtitulo", { true: figma.string("textoSubtitulo"), false: undefined }),
      variant: figma.enum("variante", { "Estándar": "standard", Compacto: "compact", Centrado: "centered" }),
      divider: figma.boolean("divider"),
    },
    example: ({ title, subtitle, variant, divider }) => (
      <PageHeader
        title={title}
        subtitle={subtitle}
        variant={variant}
        divider={divider}
        actions={<Button variant="primary">Editar</Button>}
      />
    ),
  },
);

import figma from "@figma/code-connect";
import { EmptyState } from "./EmptyState";
import { Button } from "../Button/Button";

figma.connect(
  EmptyState,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=157-55",
  {
    props: {
      variant: figma.enum("variante", { "Primer uso": "first", "Sin resultados": "empty", Error: "error" }),
      title: figma.string("titulo"),
      description: figma.string("textoDescripcion"),
    },
    example: ({ variant, title, description }) => (
      <EmptyState variant={variant} title={title} description={description} actions={<Button variant="primary">Crear</Button>} />
    ),
  },
);

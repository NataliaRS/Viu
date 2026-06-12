import figma from "@figma/code-connect";
import { Card } from "./Card";
import { Image } from "../Image/Image";
import { Button } from "../Button/Button";

figma.connect(
  Card,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=434-6",
  {
    props: {
      surface: figma.enum("Superficie", { Elevated: "elevated", Outlined: "outlined", Filled: "filled" }),
      orientation: figma.enum("Disposición", { Arriba: "vertical", Lateral: "horizontal", Abajo: "vertical" }),
    },
    example: ({ surface, orientation }) => (
      <Card
        surface={surface}
        orientation={orientation}
        media={<Image ratio="16:9" src="https://picsum.photos/480/270" />}
        footer={<Button variant="primary" size="sm">Abrir</Button>}
      >
        <h3 className="viu-type-title-s">Título</h3>
        <p className="viu-type-body-m">Descripción de la tarjeta.</p>
      </Card>
    ),
  },
);

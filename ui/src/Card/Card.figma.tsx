import figma from "@figma/code-connect";
import { Card } from "./Card";
import { Image } from "../Image/Image";
import { Button } from "../Button/Button";
import { Tag } from "../Tag/Tag";
import { Badge } from "../Badge/Badge";
import { Link } from "../Link/Link";
import { Avatar } from "../Avatar/Avatar";
import { Icon } from "../Icon/Icon";

figma.connect(
  Card,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=434-6",
  {
    props: {
      surface: figma.enum("Superficie", {
        Elevated: "elevated",
        Outlined: "outlined",
        Filled: "filled",
      }),
      orientation: figma.enum("Disposición", {
        Arriba: "vertical",
        Lateral: "horizontal",
        Abajo: "media-bottom",
      }),
      eyebrow: figma.string("Texto eyebrow"),
      title: figma.string("Título"),
      subtitle: figma.string("Texto subtítulo"),
      body: figma.string("Texto cuerpo"),
      authorName: figma.string("Autor nombre"),
      authorMeta: figma.string("Autor meta"),
    },
    example: ({ surface, orientation, eyebrow, title, subtitle, body, authorName, authorMeta }) => (
      <Card
        surface={surface}
        orientation={orientation}
        media={<Image ratio="16:9" src="https://picsum.photos/480/270" />}
        badge={<Badge>Etiqueta</Badge>}
        tags={
          <>
            <Tag>Diseño</Tag>
            <Tag>Investigación</Tag>
            <Tag>Sistemas</Tag>
          </>
        }
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        action={<Icon glyph="Plus" size={20} />}
        body={body}
        link={<Link href="#">Leer más</Link>}
        primaryAction={<Button variant="primary" size="sm">Aplicar</Button>}
        secondaryAction={<Button variant="secondary" size="sm">Después</Button>}
        author={{ name: authorName, meta: authorMeta, avatar: <Avatar initials="NR" /> }}
      />
    ),
  },
);

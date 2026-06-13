import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
import { Image } from "../Image/Image";
import { Button } from "../Button/Button";
import { Tag } from "../Tag/Tag";
import { Badge } from "../Badge/Badge";
import { Link } from "../Link/Link";
import { Avatar } from "../Avatar/Avatar";
import { Icon } from "../Icon/Icon";

const meta = {
  title: "Components/Organisms/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=434-6",
      overview: "Superficie de contenido con anatomía completa: media, badge, barra de acento, ícono, tags, encabezado (eyebrow/título/subtítulo + acción), cuerpo, link, footer (1–2 botones) y bloque de autor. 3 superficies × 3 disposiciones × estados.",
      whenToUse: ["Agrupar contenido relacionado en una unidad (artículo, proyecto, recurso).", "Grillas de contenido escaneable.", "Tarjetas seleccionables (estado Selected)."],
      whenNotToUse: ["Listas densas → usá List.", "Contenido de página completa → no necesita Card."],
      anatomy: [
        "Media (opcional) + Badge flotante + Barra de acento.",
        "Ícono (caja 48×48 desacoplada) + Tags.",
        "Encabezado: eyebrow + título + subtítulo, con acción a la derecha.",
        "Cuerpo + Link ('Leer más').",
        "Footer: botón primario y/o secundario.",
        "Autor: avatar + nombre + meta, tras un divisor.",
      ],
      accessibility: [
        "Con `interactive`/`onClick` la card es operable por teclado (Enter/Espacio) y muestra foco.",
        "Selected usa superficie brand-2 + borde (color + signifier, no solo color).",
        "Las imágenes llevan alt.",
      ],
      dos: ["Una acción primaria por card.", "Jerarquía clara: eyebrow → título → cuerpo."],
      donts: ["No metas elementos que compitan.", "No anides controles interactivos si la card entera es clickable."],
    },
  },
  decorators: [(S) => <div style={{ width: 360 }}>{S()}</div>],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const fullProps = {
  media: <Image ratio="16:9" src="https://picsum.photos/seed/viu/480/270" alt="Portada" />,
  badge: <Badge>Etiqueta</Badge>,
  tags: (
    <>
      <Tag>Diseño</Tag>
      <Tag>Investigación</Tag>
      <Tag>Sistemas</Tag>
    </>
  ),
  eyebrow: "Categoría",
  title: "Título de la card",
  subtitle: "Subtítulo o metadato",
  action: <Icon glyph="Plus" size={20} />,
  body: "Texto de cuerpo de la card: una descripción breve que da contexto al contenido y guía la siguiente acción.",
  link: <Link href="#">Leer más</Link>,
  primaryAction: (
    <Button variant="primary" size="sm">
      Aplicar
    </Button>
  ),
  secondaryAction: (
    <Button variant="secondary" size="sm">
      Después
    </Button>
  ),
  author: {
    name: "Natalia Rodríguez",
    meta: "12 may 2026 · 5 min de lectura",
    avatar: <Avatar initials="NR" />,
  },
} as const;

/** The full anatomy, mirroring the Figma component. */
export const Default: Story = { args: { ...fullProps } };

/** Elevated · Outlined · Filled. */
export const Surfaces: Story = {
  parameters: { controls: { disable: true } },
  decorators: [(S) => <div style={{ display: "grid", gap: "var(--space-lg)", gridTemplateColumns: "repeat(3, 280px)" }}>{S()}</div>],
  render: () => (
    <>
      {(["elevated", "outlined", "filled"] as const).map((surface) => (
        <Card
          key={surface}
          surface={surface}
          eyebrow={surface}
          title="Título de la card"
          body="Una descripción breve del contenido."
          link={<Link href="#">Leer más</Link>}
        />
      ))}
    </>
  ),
};

/** Media on top, beside, or at the bottom. */
export const Orientations: Story = {
  parameters: { controls: { disable: true } },
  decorators: [(S) => <div style={{ display: "grid", gap: "var(--space-lg)", width: 520 }}>{S()}</div>],
  render: () => (
    <>
      {(["vertical", "horizontal", "media-bottom"] as const).map((orientation) => (
        <Card
          key={orientation}
          orientation={orientation}
          media={<Image ratio="16:9" src="https://picsum.photos/seed/viu2/480/270" alt="" />}
          eyebrow={orientation}
          title="Título de la card"
          body="Una descripción breve del contenido."
        />
      ))}
    </>
  ),
};

/** Selectable card (persistent selected state). */
export const Selected: Story = {
  args: {
    selected: true,
    interactive: true,
    title: "Tarjeta seleccionada",
    body: "Estado persistente: superficie brand-2 + borde.",
    tags: <Tag tone="indigo">Elegida</Tag>,
  },
};

/** Disabled. */
export const Disabled: Story = {
  args: {
    disabled: true,
    title: "Tarjeta deshabilitada",
    body: "No disponible por ahora.",
    primaryAction: (
      <Button variant="primary" size="sm" disabled>
        Aplicar
      </Button>
    ),
  },
};

/** Minimal — just the pieces you need. */
export const Minimal: Story = {
  args: {
    surface: "outlined",
    title: "Solo título y cuerpo",
    body: "La anatomía es opcional: pasá únicamente las partes que necesités.",
  },
};

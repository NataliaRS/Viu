import type { Meta, StoryObj } from "@storybook/react";
import { Card, type CardSurface, type CardOrientation, type CardTitleSize } from "./Card";
import { Image } from "../Image/Image";
import { Button } from "../Button/Button";
import { Tag } from "../Tag/Tag";
import { Badge } from "../Badge/Badge";
import { Link } from "../Link/Link";
import { Avatar } from "../Avatar/Avatar";
import { Icon } from "../Icon/Icon";

/**
 * Friendly control args (mirrors the Figma component properties): booleans to
 * show/hide each anatomy piece, text fields for the copy, and selects for the
 * variants. The render maps them to the real `ReactNode` props of <Card/>, so
 * the Docs "Propiedades" panel is fully usable (toggle parts on/off, edit text;
 * clear a text field to remove that piece).
 */
interface CardDemoArgs {
  surface: CardSurface;
  orientation: CardOrientation;
  selected: boolean;
  disabled: boolean;
  interactive: boolean;
  accent: boolean;
  media: boolean;
  badge: boolean;
  showIcon: boolean;
  tags: boolean;
  showAction: boolean;
  showLink: boolean;
  primaryAction: boolean;
  secondaryAction: boolean;
  showAuthor: boolean;
  eyebrow: string;
  title: string;
  titleSize: CardTitleSize;
  subtitle: string;
  body: string;
}

const sampleTags = (
  <>
    <Tag>Diseño</Tag>
    <Tag>Investigación</Tag>
    <Tag>Sistemas</Tag>
  </>
);

const renderCard = (a: CardDemoArgs) => (
  <Card
    surface={a.surface}
    orientation={a.orientation}
    selected={a.selected}
    disabled={a.disabled}
    interactive={a.interactive}
    accent={a.accent}
    media={a.media ? <Image ratio="16:9" src="https://picsum.photos/seed/viu/480/270" alt="Portada" /> : undefined}
    badge={a.badge ? <Badge>Etiqueta</Badge> : undefined}
    icon={a.showIcon ? <Icon glyph="Info" size={24} /> : undefined}
    tags={a.tags ? sampleTags : undefined}
    eyebrow={a.eyebrow || undefined}
    title={a.title || undefined}
    titleSize={a.titleSize}
    subtitle={a.subtitle || undefined}
    action={a.showAction ? <Icon glyph="Plus" size={20} /> : undefined}
    body={a.body || undefined}
    link={a.showLink ? <Link href="#">Leer más</Link> : undefined}
    primaryAction={a.primaryAction ? <Button variant="primary" size="sm">Aplicar</Button> : undefined}
    secondaryAction={a.secondaryAction ? <Button variant="secondary" size="sm">Después</Button> : undefined}
    author={a.showAuthor ? { name: "Natalia Rodríguez", meta: "12 may 2026 · 5 min de lectura", avatar: <Avatar initials="NR" /> } : undefined}
  />
);

const meta = {
  title: "Components/Organisms/Card",
  component: Card,
  tags: ["autodocs"],
  render: renderCard,
  args: {
    surface: "elevated",
    orientation: "vertical",
    selected: false,
    disabled: false,
    interactive: false,
    accent: false,
    media: true,
    badge: true,
    showIcon: false,
    tags: true,
    showAction: true,
    showLink: true,
    primaryAction: true,
    secondaryAction: true,
    showAuthor: true,
    eyebrow: "Categoría",
    title: "Título de la card",
    titleSize: "title-s",
    subtitle: "Subtítulo o metadato",
    body: "Texto de cuerpo de la card: una descripción breve que da contexto al contenido y guía la siguiente acción.",
  },
  argTypes: {
    surface: { type: { name: "enum", value: ["elevated", "outlined", "filled"] }, control: "inline-radio", options: ["elevated", "outlined", "filled"], description: "Estilo de superficie: Elevated (sombra) · Outlined (borde) · Filled (relleno sutil).", table: { category: "Variante" } },
    orientation: { type: { name: "enum", value: ["vertical", "horizontal", "media-bottom"] }, control: "inline-radio", options: ["vertical", "horizontal", "media-bottom"], description: "Posición de la media: arriba (vertical), al lado (horizontal) o al pie (media-bottom).", table: { category: "Variante" } },
    selected: { type: { name: "boolean" }, control: "boolean", description: "Estado seleccionado persistente (superficie brand-2 + borde).", table: { category: "Estado" } },
    disabled: { type: { name: "boolean" }, control: "boolean", description: "Deshabilitada: texto atenuado y no interactiva.", table: { category: "Estado" } },
    interactive: { type: { name: "boolean" }, control: "boolean", description: "Hace toda la card operable (click + teclado) con foco visible.", table: { category: "Estado" } },
    accent: { type: { name: "boolean" }, control: "boolean", description: "Barra de acento crimson en el borde superior.", table: { category: "Estructura" } },
    media: { type: { name: "boolean" }, control: "boolean", description: "Imagen/medio (en la story, una Image 16:9).", table: { category: "Estructura" } },
    badge: { type: { name: "boolean" }, control: "boolean", description: "Badge flotante sobre la esquina superior derecha.", table: { category: "Estructura" } },
    showIcon: { type: { name: "boolean" }, control: "boolean", description: "Caja de ícono 48×48 al tope del contenido (desacoplada de la media).", table: { category: "Estructura" } },
    tags: { type: { name: "boolean" }, control: "boolean", description: "Fila de tags de clasificación.", table: { category: "Estructura" } },
    showAction: { type: { name: "boolean" }, control: "boolean", description: "Acción del encabezado: ícono a la derecha del eyebrow (ej. +, ⋯, guardar).", table: { category: "Estructura" } },
    showLink: { type: { name: "boolean" }, control: "boolean", description: "Enlace 'Leer más' debajo del cuerpo.", table: { category: "Estructura" } },
    primaryAction: { type: { name: "boolean" }, control: "boolean", description: "Botón primario del footer.", table: { category: "Estructura" } },
    secondaryAction: { type: { name: "boolean" }, control: "boolean", description: "Botón secundario del footer.", table: { category: "Estructura" } },
    showAuthor: { type: { name: "boolean" }, control: "boolean", description: "Bloque de autor (avatar + nombre + meta) tras un divisor.", table: { category: "Estructura" } },
    eyebrow: { type: { name: "string" }, control: "text", description: "Kicker sobre el título. Vaciá el campo para quitarlo.", table: { category: "Texto" } },
    title: { type: { name: "string" }, control: "text", description: "Título. Vaciá para quitarlo.", table: { category: "Texto" } },
    titleSize: { type: { name: "enum", value: ["title-s", "title-m", "title-l", "headline-s", "headline-m", "headline-l", "display-s", "display-m", "display-l", "oversize-s", "oversize-m", "oversize-l"] }, control: "select", options: ["title-s", "title-m", "title-l", "headline-s", "headline-m", "headline-l", "display-s", "display-m", "display-l", "oversize-s", "oversize-m", "oversize-l"], description: "Tamaño del título según la escala tipográfica del sistema (title → headline → display → oversize).", table: { category: "Texto" } },
    subtitle: { type: { name: "string" }, control: "text", description: "Subtítulo / metadato. Vaciá para quitarlo.", table: { category: "Texto" } },
    body: { type: { name: "string" }, control: "text", description: "Texto de cuerpo. Vaciá para quitarlo.", table: { category: "Texto" } },
  },
  parameters: {
    controls: {
      include: [
        "surface", "orientation", "selected", "disabled", "interactive", "accent",
        "media", "badge", "showIcon", "tags", "showAction", "showLink", "primaryAction",
        "secondaryAction", "showAuthor", "eyebrow", "title", "titleSize", "subtitle", "body",
      ],
    },
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=434-6",
      overview: "Superficie de contenido con anatomía completa: media, badge, barra de acento, ícono, tags, encabezado (eyebrow/título/subtítulo + acción), cuerpo, link, footer (1–2 botones) y bloque de autor. 3 superficies × 3 disposiciones × estados. Probá los controles para mostrar/quitar cada parte.",
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
} satisfies Meta<CardDemoArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Toggle each part on/off and edit the copy from the Controls panel. */
export const Playground: Story = {};

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
  parameters: { controls: { disable: true } },
  render: () => (
    <Card
      selected
      interactive
      title="Tarjeta seleccionada"
      body="Estado persistente: superficie brand-2 + borde."
      tags={<Tag tone="indigo">Elegida</Tag>}
    />
  ),
};

/** Disabled. */
export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Card
      disabled
      title="Tarjeta deshabilitada"
      body="No disponible por ahora."
      primaryAction={
        <Button variant="primary" size="sm" disabled>
          Aplicar
        </Button>
      }
    />
  ),
};

/** Minimal — just the pieces you need. */
export const Minimal: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Card
      surface="outlined"
      title="Solo título y cuerpo"
      body="La anatomía es opcional: pasá únicamente las partes que necesités."
    />
  ),
};

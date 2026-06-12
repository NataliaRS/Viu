import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
import { Image } from "../Image/Image";
import { Button } from "../Button/Button";
import { Tag } from "../Tag/Tag";
import { Badge } from "../Badge/Badge";

const meta = {
  title: "Components/Organisms/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=434-6",
      overview: "Superficie contenedora flexible: media, contenido y footer, en 3 superficies y 2 orientaciones.",
      whenToUse: ["Agrupar información relacionada en una unidad.", "Grillas de contenido (proyectos, artículos)."],
      whenNotToUse: ["Listas densas → usá List.", "Contenido de página completa → no necesita Card."],
      anatomy: ["Media (opcional).", "Cuerpo (slots libres).", "Footer (acciones).", "Badge / barra de acento / orientación."],
      accessibility: ["Si es clickable, hacela operable por teclado (envolvé el contenido en un link/botón).", "Las imágenes llevan alt."],
      dos: ["Una acción primaria por card.", "Jerarquía clara (título > cuerpo)."],
      donts: ["No metas demasiados elementos compitiendo.", "No la hagas clickable sin foco/teclado."],
    },
  },
  args: { surface: "elevated", orientation: "vertical" },
  argTypes: {
    surface: { control: "inline-radio", options: ["elevated", "outlined", "filled"] },
    orientation: { control: "inline-radio", options: ["vertical", "horizontal"] },
    accent: { control: "boolean" },
  },
  decorators: [(S) => <div style={{ width: 360 }}>{S()}</div>],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card
      {...args}
      media={<Image ratio="16:9" src="https://picsum.photos/seed/card/480/270" alt="Portada" />}
      badge={<Badge tone="brand">Nuevo</Badge>}
      footer={<Button variant="primary" size="sm">Abrir</Button>}
    >
      <Tag tone="indigo">Proyecto</Tag>
      <h3 className="viu-type-title-s" style={{ margin: 0, color: "var(--color-text-primary)" }}>
        Rediseño del sistema
      </h3>
      <p className="viu-type-body-m" style={{ margin: 0, color: "var(--color-text-secondary)" }}>
        Una breve descripción del contenido de la tarjeta y su propósito.
      </p>
    </Card>
  ),
};

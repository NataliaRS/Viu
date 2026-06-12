import type { Meta, StoryObj } from "@storybook/react";
import { NotificationBadge } from "./NotificationBadge";
import { IconButton } from "../IconButton/IconButton";
import { Icon } from "../Icon/Icon";

const meta = {
  title: "Components/Atoms/NotificationBadge",
  component: NotificationBadge,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=18-75",
      overview: "Indicador de notificaciones sobre un ícono: punto o conteo (con overflow “99+”).",
      whenToUse: ["Señalar items nuevos o no leídos sobre un ícono/avatar.", "Conteo de pendientes."],
      whenNotToUse: ["Etiqueta de estado de contenido → usá Badge.", "Como tag o categoría."],
      anatomy: ["Pastilla crimson con anillo bg/base.", "Punto (dot) o conteo (con `max`)."],
      accessibility: ["Acompañá con texto accesible (ej. “3 sin leer”).", "No comuniques solo por el punto."],
      dos: ["Posicioná sobre la esquina del ícono.", "Usá `max` para evitar números largos."],
      donts: ["No metas texto largo.", "No lo uses como Badge de contenido."],
    },
  },
  args: { count: 5, max: 99, dot: false },
  argTypes: { dot: { control: "boolean" } },
} satisfies Meta<typeof NotificationBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Count: Story = {};
export const Overflow: Story = { args: { count: 128 } };
export const Dot: Story = { args: { dot: true } };

export const OnIcon: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <span style={{ position: "relative", display: "inline-flex" }}>
      <IconButton variant="tertiary" aria-label="Notificaciones" icon={<Icon glyph="Info" />} />
      <span style={{ position: "absolute", top: -2, right: -2 }}>
        <NotificationBadge count={3} />
      </span>
    </span>
  ),
};

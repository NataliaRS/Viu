import type { Meta, StoryObj } from "@storybook/react";
import { Status, type StatusKind } from "./Status";

const kinds: StatusKind[] = ["online", "busy", "away", "offline"];

const meta = {
  title: "Components/Atoms/Status",
  component: Status,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=20-150",
      overview: "Indicador de presencia/disponibilidad: online, busy, away, offline.",
      whenToUse: ["Mostrar presencia de un usuario o servicio.", "Junto a un Avatar o nombre."],
      whenNotToUse: ["Para feedback de proceso → usá Badge/feedback.", "Para progreso → Progress."],
      anatomy: ["Punto de color (8px).", "Label opcional (Label/S)."],
      accessibility: ["El punto expone aria-label con el estado.", "No comuniques solo por color: mostrá el label cuando importe."],
      dos: ["Mostrá el label si el color no alcanza.", "Colores consistentes (online = success)."],
      donts: ["No uses solo el punto en contextos críticos."],
    },
  },
  args: { status: "online", label: true },
  argTypes: {
    status: { control: "inline-radio", options: kinds },
    label: { control: "boolean" },
  },
} satisfies Meta<typeof Status>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const DotOnly: Story = { args: { label: false } };
export const All: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-lg)", flexWrap: "wrap" }}>
      {kinds.map((k) => (
        <Status key={k} status={k} label />
      ))}
    </div>
  ),
};

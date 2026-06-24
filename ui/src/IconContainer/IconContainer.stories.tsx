import type { Meta, StoryObj } from "@storybook/react";
import { IconContainer } from "./IconContainer";
import { Icon } from "../Icon/Icon";

const meta = {
  title: "Components/Atoms/IconContainer",
  component: IconContainer,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      overview: "Superficie enmarcada para un ícono (bg/elevated + border/subtle + radius). 3 tamaños. Derivado del recipe de Card (sin nodo propio en Figma).",
      whenToUse: ["Destacar un ícono como featurette (empty states, cards).", "Dar peso visual a un glifo."],
      whenNotToUse: ["Para acciones → usá Icon button.", "Ícono inline en texto → Icon."],
      anatomy: ["Contenedor (24/32/40) con superficie + borde.", "Ícono centrado (16/24/32) — 1:1 con Figma 574:150."],
      accessibility: ["Hereda la semántica del ícono que contenga (decorativo o titulado)."],
      dos: ["Usalo para jerarquizar un ícono no interactivo."],
      donts: ["No lo hagas clickable → eso es Icon button."],
    },
  },
  args: { size: "lg", icon: <Icon glyph="Info" /> },
  argTypes: { size: { control: "inline-radio", options: ["sm", "md", "lg"] } },
} satisfies Meta<typeof IconContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
      <IconContainer size="sm" icon={<Icon glyph="Search" />} />
      <IconContainer size="md" icon={<Icon glyph="Search" />} />
      <IconContainer size="lg" icon={<Icon glyph="Search" />} />
    </div>
  ),
};

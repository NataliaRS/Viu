import type { Meta, StoryObj } from "@storybook/react";
import { IconContainer, type IconContainerTone } from "./IconContainer";
import { Icon } from "../Icon/Icon";

const TONES: IconContainerTone[] = [
  "brand",
  "neutral",
  "inverse",
  "danger",
  "warning",
  "success",
  "info",
  "disabled",
];

const meta = {
  title: "Components/Atoms/IconContainer",
  component: IconContainer,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=574-150",
      overview:
        "Marco circular para un ícono (Figma 574:150). 3 tamaños × 8 tonos × 2 estilos (filled/stroke). El color del ícono lo hereda del tono.",
      whenToUse: ["Destacar un ícono como featurette (empty states, listas, feedback).", "Dar peso visual y semántica de color a un glifo."],
      whenNotToUse: ["Para acciones → usá Icon button.", "Ícono inline en texto → Icon."],
      anatomy: ["Círculo (radius/pill) con superficie (filled) o borde (stroke).", "Ícono centrado 16/24/32, coloreado por el tono."],
      accessibility: ["Hereda la semántica del ícono que contenga (decorativo o titulado).", "No comuniques estado SOLO por el color del tono — acompañá con el glifo."],
      dos: ["Elegí el tono según la semántica (danger/success/info…).", "Usá stroke para un acento más liviano."],
      donts: ["No lo hagas clickable → eso es Icon button."],
    },
  },
  args: { size: "lg", tone: "brand", appearance: "filled", icon: <Icon glyph="Info" /> },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    tone: { control: "select", options: TONES },
    appearance: { control: "inline-radio", options: ["filled", "stroke"] },
  },
} satisfies Meta<typeof IconContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
      <IconContainer size="sm" tone="brand" icon={<Icon glyph="Search" />} />
      <IconContainer size="md" tone="brand" icon={<Icon glyph="Search" />} />
      <IconContainer size="lg" tone="brand" icon={<Icon glyph="Search" />} />
    </div>
  ),
};

export const Tones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-md)" }}>
      {(["filled", "stroke"] as const).map((appearance) => (
        <div key={appearance} style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
          {TONES.map((tone) => (
            <IconContainer key={tone} tone={tone} appearance={appearance} icon={<Icon glyph="Info" />} />
          ))}
        </div>
      ))}
    </div>
  ),
};

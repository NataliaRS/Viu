import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Pill } from "./Pill";

const meta = {
  title: "Components/Atoms/Pill",
  component: Pill,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=16-63",
      overview: "Chip de filtro accionable y seleccionable (toggle on/off).",
      whenToUse: ["Filtros rápidos seleccionables (categorías).", "Conjunto de opciones tipo toggle."],
      whenNotToUse: ["Para una etiqueta no interactiva → usá Tag/Badge.", "Para entrada removible → usá Chip input."],
      anatomy: ["Contenedor pill con borde.", "Estados: default · hover · selected (brand) · disabled · focus."],
      accessibility: ["Es un <button> con aria-pressed.", "Foco visible; Enter/Espacio."],
      dos: ["Indicá la selección con `selected`.", "Agrupá pills relacionadas."],
      donts: ["No lo uses como etiqueta estática."],
    },
  },
  args: { children: "Filtro", selected: false },
  argTypes: { selected: { control: "boolean" }, disabled: { control: "boolean" } },
} satisfies Meta<typeof Pill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Selected: Story = { args: { selected: true } };
export const Disabled: Story = { args: { disabled: true } };

export const ToggleGroup: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const options = ["Todos", "Diseño", "Código", "Docs"];
    const [active, setActive] = useState("Todos");
    return (
      <div style={{ display: "flex", gap: "var(--space-sm)", flexWrap: "wrap" }}>
        {options.map((o) => (
          <Pill key={o} selected={active === o} onClick={() => setActive(o)}>
            {o}
          </Pill>
        ))}
      </div>
    );
  },
};

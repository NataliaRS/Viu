import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";
import { Icon } from "../Icon/Icon";

const meta = {
  title: "Components/Molecules/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=366-6",
      overview: "Grupo de pestañas (Tab) con navegación por teclado, en estilo línea o segmentado.",
      whenToUse: ["Alternar entre vistas del mismo contexto.", "Secciones de una misma página/panel."],
      whenNotToUse: ["Navegación entre páginas → usá Nav.", "Pasos secuenciales → usá Stepper."],
      anatomy: ["role=tablist con varias Tab.", "Indicador activo (subrayado o fondo segmentado)."],
      accessibility: ["Roving tabindex + flechas ←/→ para moverse.", "aria-selected en la activa; pasá un aria-label al grupo.", "Conectá cada tab con su panel (aria-controls) en tu layout."],
      dos: ["Mantené pocas pestañas con labels cortos.", "Recordá la pestaña activa por contexto."],
      donts: ["No uses Tabs para flujos secuenciales."],
    },
  },
  args: { items: [], value: "", onValueChange: () => {} },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { value: "resumen", label: "Resumen", icon: <Icon glyph="Info" /> },
  { value: "actividad", label: "Actividad" },
  { value: "ajustes", label: "Ajustes" },
  { value: "archivo", label: "Archivo", disabled: true },
];

export const Line: Story = {
  render: () => {
    const [v, setV] = useState("resumen");
    return <Tabs items={items} value={v} onValueChange={setV} aria-label="Secciones" />;
  },
};
export const Segmented: Story = {
  render: () => {
    const [v, setV] = useState("resumen");
    return <Tabs variant="segmented" items={items.slice(0, 3)} value={v} onValueChange={setV} aria-label="Vista" />;
  },
};

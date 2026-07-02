import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tab } from "./Tab";
import { Icon } from "../Icon/Icon";

const meta = {
  title: "Components/Atoms/Tab",
  component: Tab,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=161-43",
      overview: "Pestaña individual de navegación entre vistas. Estilo línea o segmentado.",
      whenToUse: ["Alternar entre vistas del mismo contexto.", "Agrupar varias en un Tabs (molécula)."],
      whenNotToUse: ["Para navegación entre páginas → usá Nav.", "Para filtros → Pill."],
      anatomy: ["Label + ícono opcional.", "Indicador: subrayado (línea) o fondo (segmentado)."],
      accessibility: ["role=tab con aria-selected.", "En grupo: role=tablist + flechas (lo provee Tabs)."],
      dos: ["Marcá la activa con `active`.", "Pocas pestañas, labels cortos."],
      donts: ["No uses tabs para pasos secuenciales → usá Stepper."],
    },
  },
  args: { children: "Pestaña", variant: "line", active: false },
  argTypes: {
    variant: { control: "inline-radio", options: ["line", "segmented"] },
    active: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Line: Story = { args: { active: true } };
export const Segmented: Story = { args: { variant: "segmented", active: true } };
export const WithIcon: Story = { args: { active: true, icon: <Icon glyph="Search" /> } };
export const Closable: Story = {
  name: "Cerrable (trailing)",
  args: { active: true, children: "Documento", trailingIcon: <Icon glyph="Close" /> },
};

export const TabRow: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const tabs = ["Resumen", "Actividad", "Ajustes"];
    const [active, setActive] = useState(0);
    return (
      <div role="tablist" style={{ display: "flex", gap: "var(--space-md)" }}>
        {tabs.map((t, i) => (
          <Tab key={t} active={active === i} onClick={() => setActive(i)}>
            {t}
          </Tab>
        ))}
      </div>
    );
  },
};

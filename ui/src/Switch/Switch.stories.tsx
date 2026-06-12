import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";

const meta = {
  title: "Components/Atoms/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=24-279",
      overview: "Interruptor on/off para un ajuste de efecto inmediato.",
      whenToUse: ["Activar/desactivar una configuración al instante (sin “guardar”).", "Ajustes binarios."],
      whenNotToUse: ["Si requiere confirmar/guardar → usá Checkbox.", "Para elegir entre opciones → Radio/Tabs."],
      anatomy: ["Track (off = strong / on = brand) + thumb.", "Label opcional."],
      accessibility: ["role=switch con aria-checked.", "Foco visible; Enter/Espacio."],
      dos: ["Aplicá el cambio al instante.", "Label que describe el ajuste."],
      donts: ["No lo uses dentro de un form que requiere submit."],
    },
  },
  args: { label: "Notificaciones" },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [on, setOn] = useState(false);
    return <Switch {...args} checked={on} onCheckedChange={setOn} />;
  },
};
export const On: Story = { args: { checked: true } };
export const Disabled: Story = { args: { disabled: true, checked: true } };

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Components/Atoms/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=24-167",
      overview: "Casilla para selección múltiple o binaria, con estado indeterminado.",
      whenToUse: ["Activar/desactivar una opción.", "Seleccionar varias de una lista (indeterminate en el padre)."],
      whenNotToUse: ["Elección única entre opciones → usá Radio.", "Activar algo al instante → considerá Switch."],
      anatomy: ["Caja (radius/xs) + check / barra (indeterminate).", "Label opcional."],
      accessibility: ["<input type=checkbox> nativo; asociá un label.", "Indeterminate es visual (no es un tercer valor enviado).", "Foco visible."],
      dos: ["Usá indeterminate para “algunos seleccionados”.", "Hacé el label clickable."],
      donts: ["No uses checkbox para acciones inmediatas."],
    },
  },
  args: { label: "Acepto los términos" },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [on, setOn] = useState(false);
    return <Checkbox {...args} checked={on} onChange={(e) => setOn(e.target.checked)} />;
  },
};
export const Checked: Story = { args: { defaultChecked: true } };
export const Indeterminate: Story = { args: { indeterminate: true, label: "Selección parcial" } };
export const Disabled: Story = { args: { disabled: true, defaultChecked: true } };

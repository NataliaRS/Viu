import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const meta = {
  title: "Components/Atoms/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=26-293",
      overview: "Selector de una opción de una lista corta, con chevron.",
      whenToUse: ["Elegir 1 entre varias opciones predefinidas (5–15).", "Ahorrar espacio frente a radios."],
      whenNotToUse: ["2–4 opciones visibles → usá Radio.", "Búsqueda/autocompletar → Combobox (futuro)."],
      anatomy: ["Contenedor tipo Input + chevron.", "Opciones nativas (<option>)."],
      accessibility: ["<select> nativo; asociá un label.", "Teclado completo provisto por el navegador."],
      dos: ["Ordená las opciones lógicamente.", "Incluí una opción por defecto."],
      donts: ["No lo uses para selección múltiple."],
    },
  },
  argTypes: { error: { control: "boolean" }, disabled: { control: "boolean" } },
  decorators: [(S) => <div style={{ width: 320 }}>{S()}</div>],
  render: (args) => (
    <Select {...args}>
      <option>Diseño</option>
      <option>Código</option>
      <option>Documentación</option>
    </Select>
  ),
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Error: Story = { args: { error: true } };
export const Disabled: Story = { args: { disabled: true } };

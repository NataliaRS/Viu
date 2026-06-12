import type { Meta, StoryObj } from "@storybook/react";
import { Step } from "./Step";

const meta = {
  title: "Components/Atoms/Step",
  component: Step,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=189-25",
      overview: "Paso individual de un proceso secuencial: completado, actual o pendiente.",
      whenToUse: ["Mostrar avance en un flujo de pasos (wizard, checkout).", "Componer varios en un Stepper."],
      whenNotToUse: ["Para alternar vistas → usá Tab.", "Para progreso continuo → Progress."],
      anatomy: ["Nodo (número o check) + label + conector."],
      accessibility: ["Comunicá el estado con texto/ícono, no solo color.", "El número indica el orden."],
      dos: ["Marcá claramente el paso actual.", "Conector entre pasos."],
      donts: ["No uses Step para navegación libre."],
    },
  },
  args: { status: "current", number: 2, label: "Datos" },
  argTypes: {
    status: { control: "inline-radio", options: ["complete", "current", "upcoming"] },
    connector: { control: "boolean" },
  },
} satisfies Meta<typeof Step>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Current: Story = {};
export const Complete: Story = { args: { status: "complete", number: 1, label: "Cuenta" } };
export const Upcoming: Story = { args: { status: "upcoming", number: 3, label: "Confirmar" } };

export const Stepper: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex" }}>
      <Step status="complete" number={1} label="Cuenta" connector />
      <Step status="current" number={2} label="Datos" connector />
      <Step status="upcoming" number={3} label="Confirmar" />
    </div>
  ),
};

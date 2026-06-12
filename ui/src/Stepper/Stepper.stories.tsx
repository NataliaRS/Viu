import type { Meta, StoryObj } from "@storybook/react";
import { Stepper } from "./Stepper";

const meta = {
  title: "Components/Molecules/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=339-66",
      overview: "Progreso a través de una secuencia de pasos (compone Step), con conectores entre ellos.",
      whenToUse: ["Flujos lineales de varios pasos (onboarding, checkout, wizard).", "Mostrar dónde está y cuánto falta."],
      whenNotToUse: ["Alternar vistas → usá Tabs.", "Progreso continuo → usá Progress."],
      anatomy: ["Varios Step (completado/actual/pendiente).", "Conectores entre pasos (el último sin conector)."],
      accessibility: ["Comunicá el estado con número/ícono y texto, no solo color.", "El paso actual debe ser claro."],
      dos: ["Marcá claramente el paso actual.", "Pocos pasos, labels cortos."],
      donts: ["No uses Stepper para navegación libre."],
    },
  },
  args: {
    steps: [
      { label: "Cuenta", status: "complete" },
      { label: "Plan", status: "complete" },
      { label: "Pago", status: "current" },
      { label: "Listo", status: "upcoming" },
    ],
  },
  decorators: [(S) => <div style={{ width: 620, maxWidth: "100%" }}>{S()}</div>],
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

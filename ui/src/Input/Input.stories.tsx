import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta = {
  title: "Components/Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=26-197",
      overview:
        "Campo de texto de una línea. Captura entradas cortas (nombre, email, búsqueda) con estados claros de foco, error y deshabilitado.",
      whenToUse: [
        "Entrada de texto corta en una línea.",
        "Dentro de un Form field (label + helper/error) para formularios.",
      ],
      whenNotToUse: [
        "Texto largo / multilínea → usá Textarea.",
        "Elegir entre opciones predefinidas → usá Select.",
      ],
      anatomy: [
        "Contenedor — bg/subtle + borde por estado.",
        "Texto — valor (text/primary) y placeholder (text/tertiary), Body/M.",
        "Estado — Default · Hover · Focus · Error · Disabled.",
      ],
      accessibility: [
        "Es un <input> nativo: asociá un <label> (o usalo dentro de Form field).",
        "Estado de error expone aria-invalid; comunicá el motivo en texto, no solo color.",
        "Foco visible con borde de border/focus (2px).",
      ],
      dos: [
        "Acompañalo siempre con un label visible.",
        "Usá placeholder como ejemplo, no como label.",
        "Mostrá el error con texto, no solo el borde rojo.",
      ],
      donts: [
        "No uses el placeholder para instrucciones críticas.",
        "No deshabilites sin explicar por qué.",
      ],
    },
  },
  args: { placeholder: "Escribí algo…" },
  argTypes: { error: { control: "boolean" }, disabled: { control: "boolean" } },
  decorators: [(S) => <div style={{ width: 320 }}>{S()}</div>],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithValue: Story = { args: { defaultValue: "Natalia Rodríguez" } };
export const Error: Story = { args: { error: true, defaultValue: "Valor inválido" } };
export const Disabled: Story = { args: { disabled: true, defaultValue: "No editable" } };

import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta = {
  title: "Components/Atoms/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=26-250",
      overview: "Campo de texto multilínea con estados de foco, error y deshabilitado.",
      whenToUse: ["Entradas largas (comentarios, descripciones).", "Cuando el contenido puede tener saltos de línea."],
      whenNotToUse: ["Texto corto de una línea → usá Input.", "Opciones predefinidas → Select."],
      anatomy: ["Contenedor (bg/subtle + borde por estado), resize vertical.", "Texto Body/M."],
      accessibility: ["<textarea> nativo; asociá un label.", "Error expone aria-invalid + texto del motivo."],
      dos: ["Definí filas iniciales acordes.", "Permití redimensionar si ayuda."],
      donts: ["No lo uses para una sola línea."],
    },
  },
  args: { placeholder: "Escribí un mensaje…", rows: 3 },
  argTypes: { error: { control: "boolean" }, disabled: { control: "boolean" } },
  decorators: [(S) => <div style={{ width: 320 }}>{S()}</div>],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Error: Story = { args: { error: true, defaultValue: "Texto con error" } };
export const Disabled: Story = { args: { disabled: true, defaultValue: "No editable" } };

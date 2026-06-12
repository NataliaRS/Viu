import type { Meta, StoryObj } from "@storybook/react";
import { PasswordInput } from "./PasswordInput";
import { FormField } from "../FormField/FormField";

const meta = {
  title: "Components/Molecules/PasswordInput",
  component: PasswordInput,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=407-6",
      overview: "Campo de contraseña con botón para mostrar/ocultar el valor (Visibility / VisibilityOff).",
      whenToUse: ["Capturar contraseñas u otros datos sensibles.", "Dentro de un FormField en formularios de acceso."],
      whenNotToUse: ["Texto común → usá Input.", "Códigos de un solo uso → considerá un input segmentado."],
      anatomy: ["Input (mismos estados que Input).", "Toggle Visibility/VisibilityOff a la derecha."],
      accessibility: ["El toggle expone aria-pressed y cambia su aria-label (mostrar/ocultar).", "Asociá un label vía FormField; el error usa aria-invalid + texto."],
      dos: ["Permití mostrar la contraseña para reducir errores.", "Comunicá requisitos con texto de ayuda."],
      donts: ["No bloquees pegar.", "No muestres la contraseña por defecto."],
    },
  },
  args: { placeholder: "••••••••" },
  argTypes: { error: { control: "boolean" }, disabled: { control: "boolean" } },
  decorators: [(S) => <div style={{ width: 320 }}>{S()}</div>],
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const InFormField: Story = {
  render: (args) => (
    <FormField label="Contraseña" htmlFor="pw" required helper="Mínimo 8 caracteres.">
      <PasswordInput id="pw" {...args} />
    </FormField>
  ),
};
export const Error: Story = { args: { error: true, defaultValue: "1234" } };

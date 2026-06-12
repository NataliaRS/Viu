import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "./FormField";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";
import { Textarea } from "../Textarea/Textarea";

const meta = {
  title: "Components/Molecules/FormField",
  component: FormField,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=27-255",
      overview: "Envoltorio de formulario: asocia un label (y requerido) a un control, con texto de ayuda o error.",
      whenToUse: ["Cualquier control de formulario (Input, Select, Textarea…).", "Para mostrar ayuda contextual o el motivo de un error."],
      whenNotToUse: ["Controles sin label visible (ej. toolbar) → usá aria-label directo.", "Para agrupar varios campos → un fieldset/sección."],
      anatomy: ["Label (+ asterisco si requerido).", "Control (children).", "Mensaje: ayuda (tertiary) o error (danger)."],
      accessibility: ["Pasá `htmlFor` y el mismo `id` al control para asociar el label.", "El error se comunica con texto, no solo color (marcá el control con `error`)."],
      dos: ["Conectá label y control con htmlFor/id.", "Mostrá el error como mensaje, además del borde."],
      donts: ["No uses el placeholder como label.", "No dejes controles sin label."],
    },
  },
  decorators: [(S) => <div style={{ width: 320 }}>{S()}</div>],
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Nombre", htmlFor: "f1", helper: "Tu nombre completo.", children: <Input id="f1" placeholder="Natalia Rodríguez" /> },
};
export const Required: Story = {
  args: { label: "Email", htmlFor: "f2", required: true, children: <Input id="f2" type="email" placeholder="vos@correo.com" /> },
};
export const WithError: Story = {
  args: { label: "Email", htmlFor: "f3", required: true, error: "Ingresá un email válido.", children: <Input id="f3" error defaultValue="vos@" /> },
};
export const Disabled: Story = {
  args: { label: "Usuario", htmlFor: "f4", disabled: true, helper: "No editable.", children: <Input id="f4" disabled defaultValue="nataliars" /> },
};

/** Field/* = FormField + el control (Input/Select/Textarea/Password). No son componentes aparte. */
export const Fields: Story = {
  args: { label: "", children: null },
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-lg)" }}>
      <FormField label="Nombre" htmlFor="r1" helper="Field/Input">
        <Input id="r1" placeholder="Natalia" />
      </FormField>
      <FormField label="Área" htmlFor="r2" helper="Field/Select">
        <Select id="r2">
          <option>Diseño</option>
          <option>Código</option>
        </Select>
      </FormField>
      <FormField label="Bio" htmlFor="r3" helper="Field/Textarea">
        <Textarea id="r3" rows={3} placeholder="Contanos sobre vos…" />
      </FormField>
    </div>
  ),
};

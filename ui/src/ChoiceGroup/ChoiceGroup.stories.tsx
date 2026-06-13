import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ChoiceGroup, type RadioChoiceGroupProps } from "./ChoiceGroup";

const options = [
  { value: "uno", label: "Opción uno" },
  { value: "dos", label: "Opción dos" },
  { value: "tres", label: "Opción tres" },
];

const meta = {
  title: "Components/Molecules/ChoiceGroup",
  component: ChoiceGroup,
  tags: ["autodocs"],
  // Discriminated union props; type the meta against the radio shape so `args`
  // doesn't collapse to `never`. Stories drive state via `render`.
  args: { type: "radio", label: "Etiqueta del grupo", options, helper: "Texto de ayuda opcional" },
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=728-35",
      overview: "Grupo etiquetado de opciones relacionadas. `type=radio` para selección única, `type=checkbox` para múltiple. Reusa los átomos Radio y Checkbox.",
      whenToUse: ["Elegir una (radio) o varias (checkbox) opciones de una lista corta y visible.", "Cuando conviene ver todas las opciones a la vez."],
      whenNotToUse: ["Muchas opciones → usá Select.", "Alternar vistas → Segmented control / Tabs.", "Una sola opción on/off → un Checkbox o Switch suelto."],
      anatomy: ["Legend (Label/M) — etiqueta del grupo.", "Items — Radio o Checkbox (Body/M) apilados.", "Helper opcional (Body/S, text/tertiary)."],
      accessibility: ["fieldset + legend agrupan los controles.", "Radio: navegación con flechas; el name agrupa.", "El helper se asocia con aria-describedby."],
      dos: ["Etiquetá el grupo con un legend claro.", "Ordená las opciones de forma previsible."],
      donts: ["No mezcles radio y checkbox en un mismo grupo.", "No uses un grupo para una única opción."],
    },
  },
  decorators: [(S) => <div style={{ padding: "var(--space-lg)" }}>{S()}</div>],
} satisfies Meta<RadioChoiceGroupProps>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Single choice. */
export const Radios: Story = {
  render: () => {
    const [v, setV] = useState("uno");
    return (
      <ChoiceGroup
        type="radio"
        label="Plan"
        helper="Podés cambiarlo más tarde."
        options={options}
        value={v}
        onValueChange={setV}
      />
    );
  },
};

/** Multiple choice. */
export const Checkboxes: Story = {
  render: () => {
    const [v, setV] = useState<string[]>(["uno"]);
    return (
      <ChoiceGroup
        type="checkbox"
        label="Notificaciones"
        helper="Elegí uno o más canales."
        options={[
          { value: "uno", label: "Email" },
          { value: "dos", label: "Push" },
          { value: "tres", label: "SMS" },
        ]}
        value={v}
        onValueChange={setV}
      />
    );
  },
};

/** Disabled group. */
export const Disabled: Story = {
  render: () => (
    <ChoiceGroup type="radio" label="Plan" options={options} defaultValue="uno" disabled />
  ),
};

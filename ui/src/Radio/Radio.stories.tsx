import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Radio } from "./Radio";

const meta = {
  title: "Components/Atoms/Radio",
  component: Radio,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=24-227",
      overview: "Botón de opción para elegir UNA entre varias mutuamente excluyentes.",
      whenToUse: ["Elección única entre 2–5 opciones visibles.", "Agrupadas por el mismo `name`."],
      whenNotToUse: ["Selección múltiple → usá Checkbox.", "Muchas opciones → usá Select."],
      anatomy: ["Círculo (radius/pill) + punto interno.", "Label opcional."],
      accessibility: ["<input type=radio> con name compartido; flechas para navegar.", "Foco visible."],
      dos: ["Agrupá con el mismo name.", "Mostrá siempre una opción por defecto."],
      donts: ["No uses radios sueltos sin grupo."],
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Group: Story = {
  render: () => {
    const [value, setValue] = useState("design");
    const options = [
      { value: "design", label: "Diseño" },
      { value: "code", label: "Código" },
      { value: "docs", label: "Documentación" },
    ];
    return (
      <div style={{ display: "grid", gap: "var(--space-sm)" }}>
        {options.map((o) => (
          <Radio
            key={o.value}
            name="area"
            value={o.value}
            label={o.label}
            checked={value === o.value}
            onChange={() => setValue(o.value)}
          />
        ))}
        <Radio name="area2" label="Deshabilitado" disabled />
      </div>
    );
  },
};

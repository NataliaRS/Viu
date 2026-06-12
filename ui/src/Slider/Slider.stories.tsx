import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./Slider";

const meta = {
  title: "Components/Atoms/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "beta",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=225-16",
      overview: "Selector de un valor dentro de un rango continuo. (Modo Único; el Rango/doble thumb está pendiente.)",
      whenToUse: ["Valores aproximados en un rango (volumen, brillo).", "Cuando el ajuste importa más que el valor exacto."],
      whenNotToUse: ["Valor preciso → usá un Input numérico.", "Pocas opciones discretas → Radio/Select."],
      anatomy: ["Track (subtle) + fill (brand) + thumb (18px)."],
      accessibility: ["<input type=range> nativo: flechas, Home/End.", "Foco visible en el thumb."],
      dos: ["Mostrá el valor actual cerca del slider.", "Definí min/max/step claros."],
      donts: ["No lo uses para valores exactos críticos."],
    },
  },
  decorators: [(S) => <div style={{ width: 320 }}>{S()}</div>],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [v, setV] = useState(60);
    return <Slider value={v} onChange={(e) => setV(Number(e.target.value))} />;
  },
};
export const Disabled: Story = { args: { defaultValue: 40, disabled: true } };

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Slider, type SingleSliderProps } from "./Slider";

const meta = {
  title: "Components/Atoms/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=225-16",
      overview: "Selector de valor dentro de un rango continuo. Modo Único (un valor) o Rango (doble thumb, banda entre extremos).",
      whenToUse: ["Valores aproximados en un rango (volumen, brillo).", "Cuando el ajuste importa más que el valor exacto.", "Rango: filtrar entre un mínimo y un máximo (precio, fechas)."],
      whenNotToUse: ["Valor preciso → usá un Input numérico.", "Pocas opciones discretas → Radio/Select."],
      anatomy: ["Track (subtle) + fill/banda (brand) + thumb (18px).", "Rango: dos thumbs sobre el track; la banda brand cubre el intervalo seleccionado."],
      accessibility: ["<input type=range> nativo: flechas, Home/End.", "Foco visible en el thumb.", "Rango: cada thumb es un input con su aria-label (mínimo/máximo)."],
      dos: ["Mostrá el valor actual cerca del slider.", "Definí min/max/step claros."],
      donts: ["No lo uses para valores exactos críticos."],
    },
  },
  decorators: [(S) => <div style={{ width: 320 }}>{S()}</div>],
  // Slider has discriminated-union props (single | range); type the meta against
  // the single shape so `args` doesn't collapse to `never`. Range stories use `render`.
} satisfies Meta<SingleSliderProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [v, setV] = useState(60);
    return <Slider aria-label="Volumen" value={v} onChange={(e) => setV(Number(e.target.value))} />;
  },
};
export const Disabled: Story = { args: { defaultValue: 40, disabled: true, "aria-label": "Volumen" } };

/** Range mode — two thumbs select a `[low, high]` band. */
export const Range: Story = {
  render: () => {
    const [v, setV] = useState<[number, number]>([25, 70]);
    return (
      <div style={{ display: "grid", gap: "var(--space-sm)" }}>
        <Slider range value={v} onValueChange={setV} />
        <span style={{ fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-body-s)", color: "var(--color-text-secondary)" }}>
          {v[0]} – {v[1]}
        </span>
      </div>
    );
  },
};

/** Range, disabled. */
export const RangeDisabled: Story = {
  render: () => <Slider range defaultValue={[30, 60]} disabled />,
};

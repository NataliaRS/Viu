import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DateRangePicker, type DateRange } from "./DateRangePicker";

const meta = {
  title: "Components/Molecules/DateRangePicker",
  component: DateRangePicker,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=732-120",
      overview: "Dos campos (Desde / Hasta) que abren un calendario de rango: extremos en círculo brand, días intermedios en banda brand-subtle. Selección en dos clics.",
      whenToUse: ["Elegir un período (reportes, reservas, filtros por fecha).", "Cuando importan tanto el inicio como el fin."],
      whenNotToUse: ["Una sola fecha → usá Datepicker.", "Rangos relativos (últimos 7 días) → ofrecé presets."],
      anatomy: ["Campos Desde/Hasta (label + trigger estilo Datepicker).", "Calendario: header con mes + navegación, fila de días (L–D), grilla.", "Extremos = círculo bg/brand; intermedios = banda bg/brand-subtle."],
      accessibility: ["Cada campo es un botón con aria-label y aria-expanded.", "El calendario es un dialog; Esc lo cierra; clic afuera también.", "Cada día es un botón con la fecha como nombre accesible y aria-pressed en los extremos."],
      dos: ["Mostrá el rango elegido en los campos.", "Permití navegar meses con las flechas."],
      donts: ["No uses un rango para una única fecha.", "No escondas el día de fin tras demasiados pasos."],
    },
  },
  decorators: [(S) => <div style={{ padding: "var(--space-lg)", minHeight: 460 }}>{S()}</div>],
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange>({ from: null, to: null });
    return <DateRangePicker value={range} onValueChange={setRange} />;
  },
};

export const Preselected: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange>({
      from: new Date(2026, 5, 1),
      to: new Date(2026, 5, 15),
    });
    return <DateRangePicker value={range} onValueChange={setRange} />;
  },
};

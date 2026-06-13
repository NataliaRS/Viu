import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SegmentedControl } from "./SegmentedControl";

const options = [
  { value: "list", label: "Lista" },
  { value: "grid", label: "Grilla" },
  { value: "board", label: "Tablero" },
];

const meta = {
  title: "Components/Molecules/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs"],
  args: { options, "aria-label": "Vista" },
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=724-28",
      overview: "Control de selección única entre opciones excluyentes, con el segmento activo elevado. No es navegación (eso es Tabs).",
      whenToUse: ["Alternar entre vistas/modos de un mismo contenido (lista/grilla, día/semana/mes).", "2–4 opciones cortas, mutuamente excluyentes."],
      whenNotToUse: ["Navegar entre secciones → usá Tabs.", "Muchas opciones o etiquetas largas → usá Select.", "Selección múltiple → usá Choice group (checkbox)."],
      anatomy: ["Track (bg/raised + radius/control).", "Segmentos (Label/M); el activo es un thumb bg/elevated con shadow/raised.", "Texto activo text/primary, inactivo text/secondary."],
      accessibility: ["role=radiogroup sobre radios nativos: flechas mueven y seleccionan.", "Foco visible en el segmento activo.", "Pasale un aria-label al grupo."],
      dos: ["Etiquetas de 1–2 palabras.", "Mantené un ancho estable entre opciones."],
      donts: ["No lo uses para acciones (no es un grupo de botones).", "No mezcles con navegación."],
    },
  },
  decorators: [(S) => <div style={{ padding: "var(--space-lg)" }}>{S()}</div>],
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [v, setV] = useState("list");
    return <SegmentedControl aria-label="Vista" options={options} value={v} onValueChange={setV} />;
  },
};

export const Disabled: Story = {
  render: () => (
    <SegmentedControl aria-label="Vista" options={options} defaultValue="grid" disabled />
  ),
};

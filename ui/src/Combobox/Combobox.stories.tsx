import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Combobox } from "./Combobox";

const countries = [
  { value: "ar", label: "Argentina" },
  { value: "br", label: "Brasil" },
  { value: "cl", label: "Chile" },
  { value: "co", label: "Colombia" },
  { value: "mx", label: "México" },
  { value: "uy", label: "Uruguay" },
];

const meta = {
  title: "Components/Molecules/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  args: { options: countries, "aria-label": "País", placeholder: "Buscar país…" },
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=730-40",
      overview: "Campo de búsqueda que despliega y filtra una lista para elegir una opción. Reusa Search (campo) y MenuItem (opciones).",
      whenToUse: ["Elegir uno de muchos valores buscando por texto (país, usuario, etiqueta).", "Cuando un Select simple es incómodo por la cantidad de opciones."],
      whenNotToUse: ["Pocas opciones fijas → usá Select.", "Selección múltiple → considerá chips + Combobox a medida.", "Acciones (no datos) → usá Menu."],
      anatomy: ["Campo (Search) con ícono de búsqueda.", "Panel (bg/elevated + shadow/overlay) con opciones (MenuItem).", "Opción activa resaltada (bg/hover)."],
      accessibility: ["Patrón WAI-ARIA combobox + listbox: el foco queda en el input.", "Flechas mueven la opción activa (aria-activedescendant), Enter selecciona, Esc cierra.", "aria-expanded refleja el estado del panel."],
      dos: ["Mostrá un estado vacío claro cuando no hay coincidencias.", "Ordená las opciones de forma previsible."],
      donts: ["No lo uses para 2–3 opciones.", "No escondas selección crítica detrás del filtro."],
    },
  },
  decorators: [(S) => <div style={{ width: 300, padding: "var(--space-lg)" }}>{S()}</div>],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [v, setV] = useState<string>();
    return <Combobox {...args} value={v} onValueChange={setV} />;
  },
};

export const Preselected: Story = {
  render: (args) => {
    const [v, setV] = useState<string>("cl");
    return <Combobox {...args} value={v} onValueChange={setV} />;
  },
};

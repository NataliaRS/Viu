import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Search } from "./Search";

const meta = {
  title: "Components/Molecules/Search",
  component: Search,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=26-347",
      overview: "Campo de búsqueda: input con ícono de lupa y botón de limpiar.",
      whenToUse: ["Buscar/filtrar dentro de una vista o lista.", "Como entrada destacada de búsqueda."],
      whenNotToUse: ["Entrada de texto genérica → usá Input.", "Filtros por categoría → usá Pills."],
      anatomy: ["Ícono de búsqueda (leading).", "Input (radius pill).", "Botón de limpiar (cuando hay valor)."],
      accessibility: ["role=searchbox; asociá un label o aria-label.", "El botón de limpiar tiene aria-label."],
      dos: ["Mostrá el botón de limpiar cuando hay texto.", "Debounce de la consulta si filtra en vivo."],
      donts: ["No uses Search para entradas que no son búsqueda."],
    },
  },
  decorators: [(S) => <div style={{ width: 320 }}>{S()}</div>],
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [q, setQ] = useState("");
    return <Search value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ("")} aria-label="Buscar" />;
  },
};
export const Disabled: Story = { args: { disabled: true, "aria-label": "Buscar" } };

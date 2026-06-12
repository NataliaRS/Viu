import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { List } from "./List";
import { ListItem } from "../ListItem/ListItem";
import { Avatar } from "../Avatar/Avatar";

const meta = {
  title: "Components/Molecules/List",
  component: List,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=400-7",
      overview: "Contenedor vertical de filas (ListItem): avatar/ícono, título, subtítulo, meta y chevron.",
      whenToUse: ["Listados de personas, archivos, resultados.", "Filas seleccionables o navegables."],
      whenNotToUse: ["Datos tabulares con columnas → usá Table.", "Navegación → usá Nav."],
      anatomy: ["<ul role=list> con varios ListItem.", "Item: leading + título/subtítulo + meta/chevron."],
      accessibility: ["Filas interactivas son botones (teclado).", "La seleccionada expone aria-current."],
      dos: ["Truncá títulos largos.", "Hacé interactiva toda la fila si es navegable."],
      donts: ["No uses List para datos con muchas columnas."],
    },
  },
  decorators: [(S) => <div style={{ width: 480, maxWidth: "100%" }}>{S()}</div>],
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

const people = [
  { id: "nr", title: "Natalia Rodríguez", subtitle: "Directora de UX", meta: "Hace 2 h", initials: "NR" },
  { id: "jp", title: "Juan Pérez", subtitle: "Ingeniero", meta: "Ayer", initials: "JP" },
  { id: "al", title: "Ana López", subtitle: "Producto", meta: "Hace 3 d", initials: "AL" },
];

export const People: Story = {
  render: () => {
    const [sel, setSel] = useState("nr");
    return (
      <List>
        {people.map((p) => (
          <ListItem
            key={p.id}
            leading={<Avatar size="md" initials={p.initials} />}
            title={p.title}
            subtitle={p.subtitle}
            meta={p.meta}
            chevron
            selected={sel === p.id}
            onSelect={() => setSel(p.id)}
          />
        ))}
      </List>
    );
  },
};

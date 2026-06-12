import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TableRow } from "./TableRow";
import { Avatar } from "../Avatar/Avatar";
import { Badge } from "../Badge/Badge";

const meta = {
  title: "Components/Molecules/TableRow",
  component: TableRow,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=195-58",
      overview: "Fila de una tabla: selección opcional, celdas de contenido y chevron, con estados hover/seleccionado.",
      whenToUse: ["Datos tabulares con columnas (personas, registros).", "Tablas con selección por fila."],
      whenNotToUse: ["Listas de contenido sin columnas → usá List/ListItem."],
      anatomy: ["Checkbox de selección (opcional).", "Celdas de contenido.", "Chevron (opcional).", "Estados: default/hover/seleccionado."],
      accessibility: ["role=row con role=cell; la seleccionada expone aria-selected.", "El checkbox tiene aria-label y no propaga el click de la fila."],
      dos: ["Alineá las columnas con el header de la tabla.", "Hacé interactiva la fila si es navegable."],
      donts: ["No uses TableRow para listas sin estructura de columnas."],
    },
  },
  args: { children: null },
  decorators: [(S) => <div style={{ width: 720, maxWidth: "100%" }}>{S()}</div>],
} satisfies Meta<typeof TableRow>;

export default meta;
type Story = StoryObj<typeof meta>;

const cell = (w: number): React.CSSProperties => ({
  width: w,
  flex: "none",
  padding: "0 var(--space-md)",
  fontFamily: "var(--font-family-body)",
  fontSize: "var(--font-size-body-m)",
  color: "var(--color-text-secondary)",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const People: Story = {
  render: () => {
    const rows = [
      { id: "nr", name: "Natalia Rodríguez", role: "Directora de UX", initials: "NR" },
      { id: "jp", name: "Juan Pérez", role: "Ingeniero", initials: "JP" },
    ];
    const [sel, setSel] = useState<Record<string, boolean>>({ nr: true });
    return (
      <div role="table">
        {rows.map((r) => (
          <TableRow
            key={r.id}
            selectable
            selected={!!sel[r.id]}
            onSelectedChange={(v) => setSel((s) => ({ ...s, [r.id]: v }))}
            chevron
          >
            <div style={{ ...cell(240), display: "flex", alignItems: "center", gap: "var(--space-sm)", color: "var(--color-text-primary)" }}>
              <Avatar size="sm" initials={r.initials} />
              {r.name}
            </div>
            <div style={cell(180)}>{r.role}</div>
            <div style={{ ...cell(140), flex: "1 1 0" }}>
              <Badge tone="neutral">Activo</Badge>
            </div>
          </TableRow>
        ))}
      </div>
    );
  },
};

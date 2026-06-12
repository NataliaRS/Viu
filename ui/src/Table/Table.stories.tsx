import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "./Table";
import { TableRow } from "../TableRow/TableRow";
import { Avatar } from "../Avatar/Avatar";

const meta = {
  title: "Components/Organisms/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=372-6",
      overview: "Contenedor tabular: header de columnas + filas (TableRow), con divisores.",
      whenToUse: ["Datos en columnas comparables.", "Listados con orden/selección."],
      whenNotToUse: ["Contenido sin columnas → usá List."],
      anatomy: ["role=table.", "Header (títulos de columna).", "rowgroup con TableRow."],
      accessibility: ["role=table/row/cell coherentes.", "Alineá header y celdas."],
      dos: ["Mantené anchos de columna consistentes."],
      donts: ["No uses Table para layout."],
    },
  },
  args: { "aria-label": "Equipo", children: null },
  decorators: [(S) => <div style={{ width: 640, maxWidth: "100%" }}>{S()}</div>],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const cellStyle = (w: number | string): React.CSSProperties => ({
  width: w,
  flex: typeof w === "number" ? "none" : "1 1 0",
  padding: "0 var(--space-md)",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const Default: Story = {
  render: (args) => (
    <Table
      {...args}
      header={
        <>
          <div style={cellStyle(48)} />
          <div style={cellStyle(240)}>Nombre</div>
          <div style={cellStyle("auto")}>Rol</div>
        </>
      }
    >
      {[
        { name: "Natalia Rodríguez", role: "Directora de UX", initials: "NR" },
        { name: "Juan Pérez", role: "Ingeniero", initials: "JP" },
      ].map((r) => (
        <TableRow key={r.name} selectable>
          <div style={{ ...cellStyle(240), display: "flex", alignItems: "center", gap: "var(--space-sm)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-body-m)" }}>
            <Avatar size="sm" initials={r.initials} />
            {r.name}
          </div>
          <div style={{ ...cellStyle("auto"), color: "var(--color-text-secondary)", fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-body-m)" }}>{r.role}</div>
        </TableRow>
      ))}
    </Table>
  ),
};

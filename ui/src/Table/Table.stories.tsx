import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Table } from "./Table";
import { TableRow } from "../TableRow/TableRow";
import { Avatar } from "../Avatar/Avatar";
import { Badge, type BadgeTone } from "../Badge/Badge";
import { Pagination } from "../Pagination/Pagination";

const meta = {
  title: "Components/Organisms/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=372-6",
      overview:
        "Contenedor tabular: header de columnas + filas (TableRow) con divisores, y un footer opcional (conteo + Pagination).",
      whenToUse: ["Datos en columnas comparables.", "Listados con orden/selección."],
      whenNotToUse: ["Contenido sin columnas → usá List.", "Con toolbar de búsqueda/filtros → usá el patrón Data table."],
      anatomy: [
        "role=table: header (columnheader) + rowgroup de TableRow, con divisores entre filas.",
        "Fila: checkbox de selección, celdas (Avatar+nombre, Rol, Estado con Badge, Actividad) y chevron.",
        "Footer opcional (hermano de role=table): conteo de resultados + Pagination.",
      ],
      accessibility: [
        "role=table/row/cell/columnheader coherentes; alineá header y celdas.",
        "El footer va fuera de role=table para no romper aria-required-children.",
      ],
      dos: ["Mantené anchos de columna consistentes.", "Comunicá el estado con texto (Badge), no solo color."],
      donts: ["No uses Table para layout.", "No metas la Pagination dentro de role=table."],
    },
  },
  args: { "aria-label": "Personas", children: null },
  decorators: [(S) => <div style={{ width: 824, maxWidth: "100%", overflowX: "auto" }}>{S()}</div>],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Anchos de columna del nodo Figma 372:6 (checkbox 48 + chevron 56 los pone TableRow). */
const COL = { nombre: 240, rol: 180, estado: 140, actividad: 160 } as const;

const cell = (w: number): React.CSSProperties => ({
  width: w,
  flex: "none",
  padding: "0 var(--space-md)",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});
const bodyText = (color: string): React.CSSProperties => ({
  color: `var(${color})`,
  fontFamily: "var(--font-family-body)",
  fontSize: "var(--font-size-body-m)",
});
/** Punto leading del Badge de estado (6px, hereda el color on-soft del tono). */
const dot = (
  <span
    aria-hidden
    style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", display: "inline-block" }}
  />
);

interface Person {
  name: string;
  initials: string;
  role: string;
  estado: { tone: BadgeTone; label: string };
  activity: string;
}
const PEOPLE: Person[] = [
  { name: "Ana Pérez", initials: "AP", role: "Diseño", estado: { tone: "success", label: "Activo" }, activity: "Hace 2 h" },
  { name: "Bruno Díaz", initials: "BD", role: "Ingeniería", estado: { tone: "success", label: "Activo" }, activity: "Hace 5 h" },
  { name: "Carla Ruiz", initials: "CR", role: "Producto", estado: { tone: "warning", label: "Pendiente" }, activity: "Ayer" },
  { name: "Diego Mora", initials: "DM", role: "Marketing", estado: { tone: "neutral", label: "Inactivo" }, activity: "Hace 3 d" },
  { name: "Elena Soto", initials: "ES", role: "Soporte", estado: { tone: "info", label: "Invitado" }, activity: "Hace 1 sem" },
];

function TableExample() {
  const [selected, setSelected] = useState<Record<string, boolean>>({ "Carla Ruiz": true });
  const [page, setPage] = useState(1);
  return (
    <Table
      aria-label="Personas"
      header={
        <>
          {/* Spacers que alinean el header con las celdas de selección (48) y chevron (56) que agrega TableRow. */}
          <div style={{ width: 48, flex: "none" }} />
          <div style={cell(COL.nombre)}>Nombre</div>
          <div style={cell(COL.rol)}>Rol</div>
          <div style={cell(COL.estado)}>Estado</div>
          <div style={cell(COL.actividad)}>Actividad</div>
          <div style={{ width: 56, flex: "none" }} />
        </>
      }
      footer={
        <>
          <span style={{ ...bodyText("--color-text-tertiary"), fontSize: "var(--font-size-body-s)" }}>
            1–5 de 24 personas
          </span>
          <Pagination page={page} total={5} siblingCount={3} onPageChange={setPage} aria-label="Páginas de personas" />
        </>
      }
    >
      {PEOPLE.map((p) => (
        <TableRow
          key={p.name}
          selectable
          chevron
          interactive
          selected={!!selected[p.name]}
          onSelectedChange={(v) => setSelected((s) => ({ ...s, [p.name]: v }))}
        >
          <div style={{ ...cell(COL.nombre), display: "flex", alignItems: "center", gap: "var(--space-sm)", ...bodyText("--color-text-primary") }}>
            <Avatar size="sm" initials={p.initials} />
            {p.name}
          </div>
          <div style={{ ...cell(COL.rol), ...bodyText("--color-text-secondary") }}>{p.role}</div>
          <div style={cell(COL.estado)}>
            <Badge tone={p.estado.tone} icon={dot}>
              {p.estado.label}
            </Badge>
          </div>
          <div style={{ ...cell(COL.actividad), ...bodyText("--color-text-secondary"), fontSize: "var(--font-size-body-s)" }}>
            {p.activity}
          </div>
        </TableRow>
      ))}
    </Table>
  );
}

export const Default: Story = {
  render: () => <TableExample />,
};

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "./DataTable";
import { Search } from "../Search/Search";
import { Button } from "../Button/Button";
import { Checkbox } from "../Checkbox/Checkbox";
import { TableRow } from "../TableRow/TableRow";
import { Avatar } from "../Avatar/Avatar";
import { Tag } from "../Tag/Tag";
import { Pagination } from "../Pagination/Pagination";
import { EmptyState } from "../EmptyState/EmptyState";

const meta = {
  title: "Components/Patterns/Data table",
  component: DataTable,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=285-7",
      overview:
        "Patrón de tabla de datos: toolbar (búsqueda/filtros/acciones) + tabla con filas seleccionables + pie (conteo + paginación). Para explorar y gestionar muchos registros.",
      whenToUse: [
        "Explorar/gestionar muchos registros con metadatos comparables — proyectos, usuarios, transacciones.",
        "Cuando hace falta selección múltiple, orden y paginación.",
      ],
      whenNotToUse: [
        "Pocos elementos visuales → usá tarjetas (Card).",
        "Un solo registro → usá una vista de detalle.",
      ],
      anatomy: [
        "Toolbar — búsqueda, filtros y acción primaria.",
        "Tabla — encabezados de columna (ordenables) + selección con checkbox.",
        "Pie — conteo (“1–5 de 42”) + paginación.",
        "Estados — carga (Skeleton), vacío (EmptyState dentro del cuerpo) y error.",
      ],
      accessibility: [
        "La tabla usa role/landmark con aria-label; encabezados de columna claros.",
        "Selección con checkbox accesible; el estado se comunica con texto, no solo color.",
        "El estado vacío conserva toolbar y encabezado para mantener el contexto.",
      ],
      dos: [
        "Encabezados claros y ordenables; densidad legible.",
        "Selección + acciones masivas cuando aplique.",
        "Siempre resolvé carga, vacío y error.",
      ],
      donts: [
        "No escondas el conteo total ni la paginación.",
        "No uses una tabla para 2–3 ítems visuales.",
        "No dejes el estado vacío sin salida (ofrecé una acción).",
      ],
    },
  },
  args: { "aria-label": "Proyectos" },
  argTypes: { toolbar: { control: false }, header: { control: false }, pagination: { control: false }, empty: { control: false } },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const rows = [
  { id: "1", name: "Natalia R.", role: "Producto", status: <Tag tone="brand">Activo</Tag>, activity: "hace 2 h" },
  { id: "2", name: "Bruno M.", role: "Growth", status: <Tag tone="neutral">En pausa</Tag>, activity: "ayer" },
  { id: "3", name: "Carla S.", role: "Plataforma", status: <Tag tone="brand">Activo</Tag>, activity: "hace 3 d" },
  { id: "4", name: "Diego L.", role: "Backend", status: <Tag tone="neutral">En pausa</Tag>, activity: "hace 1 sem" },
  { id: "5", name: "Eugenia P.", role: "Diseño", status: <Tag tone="brand">Activo</Tag>, activity: "hace 2 sem" },
];

const header = (
  <>
    <span style={{ width: 48, display: "inline-flex", justifyContent: "center" }}>
      <Checkbox aria-label="Seleccionar todo" />
    </span>
    <span style={{ flex: 2 }}>Nombre</span>
    <span style={{ flex: 1 }}>Rol</span>
    <span style={{ flex: 1 }}>Estado</span>
    <span style={{ flex: 1 }}>Actividad</span>
  </>
);

const toolbar = (
  <>
    <Search placeholder="Buscar proyectos…" style={{ flex: 1 }} />
    <Button variant="secondary" size="sm">
      Filtros
    </Button>
    <Button variant="primary" size="sm">
      Nuevo
    </Button>
  </>
);

/** Populated table with selection, count and pagination. */
export const Default: Story = {
  render: (args) => {
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState<Record<string, boolean>>({});
    return (
      <DataTable
        {...args}
        toolbar={toolbar}
        header={header}
        caption="1–5 de 42 proyectos"
        pagination={<Pagination page={page} total={9} onPageChange={setPage} variant="simple" aria-label="Páginas" />}
      >
        {rows.map((r) => (
          <TableRow key={r.id} selectable selected={!!selected[r.id]} onSelectedChange={(v) => setSelected((s) => ({ ...s, [r.id]: v }))}>
            <span style={{ flex: 2, display: "inline-flex", alignItems: "center", gap: "var(--space-sm)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-body-m)" }}>
              <Avatar size="sm" initials={r.name.slice(0, 1)} />
              {r.name}
            </span>
            <span style={{ flex: 1, color: "var(--color-text-secondary)", fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-body-m)" }}>{r.role}</span>
            <span style={{ flex: 1 }}>{r.status}</span>
            <span style={{ flex: 1, color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-body-s)" }}>{r.activity}</span>
          </TableRow>
        ))}
      </DataTable>
    );
  },
};

/** No results — the empty state renders inside the body, keeping toolbar + header. */
export const Empty: Story = {
  render: (args) => (
    <DataTable
      {...args}
      toolbar={toolbar}
      header={header}
      empty={<EmptyState variant="empty" title="Sin resultados" description="Probá con otros términos o quitá filtros." actions={<Button variant="secondary">Limpiar filtros</Button>} />}
    />
  ),
};

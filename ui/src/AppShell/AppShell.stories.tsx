import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AppShell } from "./AppShell";
import { Nav } from "../Nav/Nav";
import { NavItem } from "../NavItem/NavItem";
import { Breadcrumb } from "../Breadcrumb/Breadcrumb";
import { Search } from "../Search/Search";
import { Button } from "../Button/Button";
import { Avatar } from "../Avatar/Avatar";
import { NotificationBadge } from "../NotificationBadge/NotificationBadge";
import { PageHeader } from "../PageHeader/PageHeader";
import { Table } from "../Table/Table";
import { TableRow } from "../TableRow/TableRow";
import { Tag } from "../Tag/Tag";
import { Icon } from "../Icon/Icon";

const meta = {
  title: "Components/Patterns/App shell",
  component: AppShell,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=274-7",
      overview:
        "Marco de aplicación: navegación lateral persistente + barra superior enmarcando un área de contenido con scroll. El shell no cambia al navegar; solo cambia el contenido.",
      whenToUse: [
        "Apps de productividad/escritorio con varias secciones y trabajo sostenido en pantallas grandes.",
        "Cuando hace falta navegación de primer nivel siempre visible.",
      ],
      whenNotToUse: [
        "Sitios de marketing o flujos de un solo paso.",
        "Experiencias mobile-first → la nav va abajo o en un menú/Drawer.",
      ],
      anatomy: [
        "Sidebar — marca, navegación de primer nivel y cuenta. Persistente; marca dónde está el usuario. bg/raised + border/subtle.",
        "Topbar — ubicación (breadcrumb), búsqueda, acción primaria y cuenta/notificaciones.",
        "Área de contenido — page header + el contenido propio de cada vista (KPIs, tablas, formularios). Es lo único que cambia.",
      ],
      accessibility: [
        "La navegación lateral es un landmark <nav aria-label>; la sección activa usa aria-current.",
        "El contenido principal va en <main>; el shell en regiones semánticas (aside/header/main).",
        "Orden de tabulación lógico: sidebar → topbar → contenido.",
      ],
      dos: [
        "Una sola sección activa por vez.",
        "Mantené el shell persistente; cambiá solo el área de contenido.",
        "La acción primaria siempre accesible arriba.",
      ],
      donts: [
        "No multipliques las acciones globales en la topbar.",
        "No metas el contenido de cada vista dentro del shell como markup fijo.",
        "En pantallas chicas, no dejes la nav lateral fija: colapsá a íconos o a un Drawer.",
      ],
    },
  },
  args: {
    sidebar: (
      <Nav aria-label="Principal">
        <NavItem active>Proyectos</NavItem>
      </Nav>
    ),
    children: "Contenido de la página.",
  },
  argTypes: { sidebar: { control: false }, topbar: { control: false } },
  decorators: [(S) => <div style={{ height: 640, border: "1px solid var(--color-border-subtle)", borderRadius: "var(--radius-surface)", overflow: "hidden" }}>{S()}</div>],
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

const Brand = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "var(--space-md) var(--space-md) var(--space-sm)", fontFamily: "var(--font-family-display)", fontWeight: 500, fontSize: 22, color: "var(--color-text-primary)" }}>
    Viu
    <span style={{ width: 7, height: 7, borderRadius: "var(--radius-pill)", background: "var(--color-bg-brand)" }} />
  </div>
);

const Sidebar = () => (
  <>
    <Brand />
    <Nav aria-label="Principal" style={{ flex: 1, padding: "0 var(--space-sm)" }}>
      <NavItem icon={<Icon glyph="Check" size={20} />} active>
        Proyectos
      </NavItem>
      <NavItem icon={<Icon glyph="Search" size={20} />}>Tareas</NavItem>
      <NavItem icon={<Icon glyph="Info" size={20} />}>Equipo</NavItem>
      <NavItem icon={<Icon glyph="Alert" size={20} />}>Informes</NavItem>
      <NavItem icon={<Icon glyph="Plus" size={20} />}>Integraciones</NavItem>
    </Nav>
    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", padding: "var(--space-md)", borderTop: "1px solid var(--color-border-subtle)" }}>
      <Avatar size="md" initials="NR" />
      <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
        <span style={{ fontFamily: "var(--font-family-label)", fontSize: "var(--font-size-label-m)", color: "var(--color-text-primary)" }}>Natalia R.</span>
        <span style={{ fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-body-s)", color: "var(--color-text-tertiary)" }}>Directora de UX</span>
      </div>
    </div>
  </>
);

const Topbar = () => (
  <>
    <Breadcrumb aria-label="Ubicación" items={[{ label: "Inicio", href: "#" }, { label: "Proyectos" }]} />
    <div style={{ flex: 1 }} />
    <Search placeholder="Buscar…" style={{ width: 200 }} />
    <Button size="sm">Nuevo proyecto</Button>
    <span style={{ position: "relative", display: "inline-flex" }}>
      <Avatar size="md" initials="NR" />
      <NotificationBadge count={3} style={{ position: "absolute", top: -4, right: -4 }} />
    </span>
  </>
);

const kpis = [
  { label: "Proyectos activos", value: "12", delta: "▲ 12% vs. mes anterior", tone: "var(--color-feedback-success-text)" },
  { label: "Tareas abiertas", value: "48", delta: "▲ 5% esta semana", tone: "var(--color-feedback-success-text)" },
  { label: "Vencidas", value: "3", delta: "▼ 2 menos que ayer", tone: "var(--color-feedback-danger-text)" },
];

const Kpi = ({ label, value, delta, tone }: (typeof kpis)[number]) => (
  <div style={{ flex: 1, padding: "var(--space-md)", background: "var(--color-bg-raised)", border: "1px solid var(--color-border-subtle)", borderRadius: "var(--radius-control)" }}>
    <div style={{ fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-body-s)", color: "var(--color-text-secondary)" }}>{label}</div>
    <div style={{ fontFamily: "var(--font-family-display)", fontSize: "var(--font-size-headline-m)", color: "var(--color-text-primary)", margin: "var(--space-xs) 0" }}>{value}</div>
    <div style={{ fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-body-s)", color: tone }}>{delta}</div>
  </div>
);

const projects = [
  { name: "Rediseño 2026", role: "Producto", status: <Tag tone="brand">Activo</Tag> },
  { name: "Onboarding v2", role: "Growth", status: <Tag tone="neutral">En pausa</Tag> },
  { name: "Design tokens", role: "Plataforma", status: <Tag tone="brand">Activo</Tag> },
  { name: "Migración API", role: "Backend", status: <Tag tone="neutral">En pausa</Tag> },
];

const cell = (content: ReactNode, flex = 1) => (
  <span style={{ flex, minWidth: 0, fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-body-m)", color: "var(--color-text-primary)" }}>{content}</span>
);

/** Full productivity dashboard inside the shell. */
export const Dashboard: Story = {
  render: () => (
    <AppShell sidebar={<Sidebar />} topbar={<Topbar />}>
      <PageHeader title="Proyectos" subtitle="12 activos · 3 archivados" actions={<Button size="sm">Nuevo</Button>} />
      <div style={{ display: "flex", gap: "var(--space-md)", margin: "var(--space-lg) 0" }}>
        {kpis.map((k) => (
          <Kpi key={k.label} {...k} />
        ))}
      </div>
      <h3 style={{ fontFamily: "var(--font-family-label)", fontSize: "var(--font-size-label-l)", color: "var(--color-text-primary)", margin: "0 0 var(--space-sm)" }}>Proyectos recientes</h3>
      <Table aria-label="Proyectos recientes" header={<><span style={{ flex: 2 }}>Nombre</span><span style={{ flex: 1 }}>Equipo</span><span style={{ flex: 1 }}>Estado</span></>}>
        {projects.map((p) => (
          <TableRow key={p.name} interactive chevron>
            {cell(p.name, 2)}
            {cell(p.role, 1)}
            {cell(p.status, 1)}
          </TableRow>
        ))}
      </Table>
    </AppShell>
  ),
};

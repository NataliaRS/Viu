import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader, type PageHeaderVariant } from "./PageHeader";
import { Breadcrumb } from "../Breadcrumb/Breadcrumb";
import { Button } from "../Button/Button";
import { Tag } from "../Tag/Tag";

/** Friendly playground controls (Card pattern). PageHeader's slots aren't in the
 * global disable list, but they're toggled via show* for clarity; title/subtitle text. */
interface PageHeaderDemoArgs {
  title: string;
  subtitle: string;
  variant: PageHeaderVariant;
  showBreadcrumb: boolean;
  showStatus: boolean;
  showActions: boolean;
  showBack: boolean;
  divider: boolean;
}

const renderPageHeader = (a: PageHeaderDemoArgs) => (
  <PageHeader
    title={a.title}
    subtitle={a.subtitle || undefined}
    variant={a.variant}
    divider={a.divider}
    onBack={a.showBack ? () => {} : undefined}
    breadcrumb={
      a.showBreadcrumb ? (
        <Breadcrumb
          items={[{ label: "Inicio", href: "#" }, { label: "Proyectos", href: "#" }, { label: "Rediseño 2026" }]}
        />
      ) : undefined
    }
    status={a.showStatus ? <Tag tone="brand">En curso</Tag> : undefined}
    actions={
      a.showActions ? (
        <>
          <Button variant="secondary">Compartir</Button>
          <Button variant="primary">Editar</Button>
        </>
      ) : undefined
    }
  />
);

const meta = {
  title: "Components/Organisms/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  render: renderPageHeader,
  args: {
    title: "Rediseño 2026",
    subtitle: "Descripción breve de la página y su propósito para orientar al usuario.",
    variant: "standard",
    showBreadcrumb: true,
    showStatus: false,
    showActions: true,
    showBack: false,
    divider: true,
  },
  argTypes: {
    title: { type: { name: "string" }, control: "text", description: "Título (h1).", table: { category: "Texto" } },
    subtitle: { type: { name: "string" }, control: "text", description: "Subtítulo (opcional). Vaciá para quitarlo.", table: { category: "Texto" } },
    variant: { type: { name: "enum", value: ["standard", "compact", "centered"] }, control: "inline-radio", options: ["standard", "compact", "centered"], description: "Variante de layout.", table: { category: "Variante" } },
    showBreadcrumb: { type: { name: "boolean" }, control: "boolean", description: "Mostrar el breadcrumb.", table: { category: "Estructura" } },
    showStatus: { type: { name: "boolean" }, control: "boolean", description: "Mostrar un status junto al título.", table: { category: "Estructura" } },
    showActions: { type: { name: "boolean" }, control: "boolean", description: "Mostrar las acciones (derecha).", table: { category: "Estructura" } },
    showBack: { type: { name: "boolean" }, control: "boolean", description: "Mostrar el botón volver.", table: { category: "Estructura" } },
    divider: { type: { name: "boolean" }, control: "boolean", description: "Divisor inferior.", table: { category: "Estructura" } },
  },
  parameters: {
    controls: { include: ["title", "subtitle", "variant", "showBreadcrumb", "showStatus", "showActions", "showBack", "divider"] },
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=147-89",
      overview: "Encabezado de página: breadcrumb, título (+ back/status), subtítulo, acciones y tabs. 3 variantes.",
      whenToUse: ["Encabezar una vista o sección.", "Dar contexto + acciones principales de la página."],
      whenNotToUse: ["Navegación lateral → usá Nav.", "Encabezado de una card → no."],
      anatomy: ["Breadcrumb + título (+ back, status).", "Subtítulo.", "Acciones (derecha).", "Tabs + divisor."],
      accessibility: ["Usá <header> con un <h1>.", "El back es un IconButton con aria-label."],
      dos: ["Una acción primaria clara.", "Breadcrumb cuando hay jerarquía."],
      donts: ["No metas demasiadas acciones.", "No uses más de un h1 por página."],
    },
  },
  decorators: [(S) => <div style={{ width: 880, maxWidth: "100%" }}>{S()}</div>],
} satisfies Meta<PageHeaderDemoArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Centered: Story = { args: { variant: "centered", showBreadcrumb: false } };

import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState, type EmptyStateVariant } from "./EmptyState";
import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";

/**
 * Friendly playground controls (Card pattern). `icon` is in the global slot
 * `control:false` list → decoupled as `showIcon`; `actions` is not, so it keeps its
 * real name. The render maps the booleans to the real nodes.
 */
interface EmptyStateDemoArgs {
  variant: EmptyStateVariant;
  title: string;
  description: string;
  showIcon: boolean;
  actions: boolean;
}

const renderEmptyState = (a: EmptyStateDemoArgs) => (
  <EmptyState
    variant={a.variant}
    icon={a.showIcon ? <Icon glyph="Search" size={24} /> : undefined}
    title={a.title}
    description={a.description || undefined}
    actions={
      a.actions ? (
        <>
          <Button variant="primary">Crear proyecto</Button>
          <Button variant="secondary">Importar</Button>
        </>
      ) : undefined
    }
  />
);

const meta = {
  title: "Components/Organisms/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  render: renderEmptyState,
  args: {
    variant: "first",
    title: "Creá tu primer proyecto",
    description: "Organizá tu trabajo en proyectos. Creá el primero o importá uno existente para empezar.",
    showIcon: false,
    actions: true,
  },
  argTypes: {
    variant: { type: { name: "enum", value: ["first", "empty", "error"] }, control: "inline-radio", options: ["first", "empty", "error"], description: "Variante: primer uso / sin resultados / error.", table: { category: "Variante" } },
    title: { type: { name: "string" }, control: "text", description: "Título.", table: { category: "Texto" } },
    description: { type: { name: "string" }, control: "text", description: "Descripción (opcional). Vaciá para quitarla.", table: { category: "Texto" } },
    showIcon: { type: { name: "boolean" }, control: "boolean", description: "Ícono personalizado (si no, usa el de la variante).", table: { category: "Estructura" } },
    actions: { type: { name: "boolean" }, control: "boolean", description: "Mostrar acciones (primaria + secundaria).", table: { category: "Estructura" } },
  },
  parameters: {
    controls: { include: ["variant", "title", "description", "showIcon", "actions"] },
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=157-55",
      overview: "Estado vacío con ícono, título, descripción y acciones. Variantes: primer uso, sin resultados, error.",
      whenToUse: ["Primera vez sin datos (onboarding).", "Búsqueda/filtro sin resultados.", "Error al cargar."],
      whenNotToUse: ["Carga en progreso → usá Skeleton/Spinner."],
      anatomy: ["Ícono en círculo (tinte por variante).", "Título + descripción.", "Acciones (primaria + secundaria)."],
      accessibility: ["El ícono es decorativo; el mensaje explica la situación en texto.", "Ofrecé una acción clara para avanzar."],
      dos: ["Texto que explique qué pasó y qué hacer.", "Una acción primaria evidente."],
      donts: ["No dejes el estado sin salida.", "No uses tono de error para vacíos normales."],
    },
  },
  decorators: [(S) => <div style={{ width: 440, maxWidth: "100%" }}>{S()}</div>],
} satisfies Meta<EmptyStateDemoArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NoResults: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <EmptyState variant="empty" title="Sin resultados" description="Probá con otros términos o quitá filtros." />
  ),
};
export const ErrorState: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <EmptyState
      variant="error"
      title="Algo salió mal"
      description="No pudimos cargar el contenido."
      actions={<Button variant="primary">Reintentar</Button>}
    />
  ),
};

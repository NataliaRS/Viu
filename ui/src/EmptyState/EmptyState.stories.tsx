import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./EmptyState";
import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";

const meta = {
  title: "Components/Organisms/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: {
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
  args: {
    variant: "first",
    title: "Creá tu primer proyecto",
    description: "Organizá tu trabajo en proyectos. Creá el primero o importá uno existente para empezar.",
    icon: false,
    actions: true,
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["first", "empty", "error"], description: "Variante: primer uso / sin resultados / error." },
    title: { control: "text", description: "Título." },
    description: { control: "text", description: "Descripción (opcional). Vaciá para quitarla." },
    // `mapping` overrides the global `icon: control:false`; false = usa el ícono de la variante.
    icon: {
      control: "boolean",
      description: "Ícono personalizado (si no, usa el de la variante).",
      mapping: { true: <Icon glyph="Search" size={24} />, false: undefined },
    },
    actions: {
      control: "boolean",
      description: "Mostrar acciones (primaria + secundaria).",
      mapping: {
        true: (
          <>
            <Button variant="primary">Crear proyecto</Button>
            <Button variant="secondary">Importar</Button>
          </>
        ),
        false: undefined,
      },
    },
  },
  decorators: [(S) => <div style={{ width: 440, maxWidth: "100%" }}>{S()}</div>],
} satisfies Meta<typeof EmptyState>;

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

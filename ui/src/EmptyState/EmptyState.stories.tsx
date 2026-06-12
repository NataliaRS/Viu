import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./EmptyState";
import { Button } from "../Button/Button";

const meta = {
  title: "Components/Organisms/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "stable",
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
  },
  argTypes: { variant: { control: "inline-radio", options: ["first", "empty", "error"] } },
  decorators: [(S) => <div style={{ width: 440, maxWidth: "100%" }}>{S()}</div>],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    actions: (
      <>
        <Button variant="primary">Crear proyecto</Button>
        <Button variant="secondary">Importar</Button>
      </>
    ),
  },
};
export const NoResults: Story = { args: { variant: "empty", title: "Sin resultados", description: "Probá con otros términos o quitá filtros." } };
export const ErrorState: Story = {
  args: { variant: "error", title: "Algo salió mal", description: "No pudimos cargar el contenido.", actions: <Button variant="primary">Reintentar</Button> },
};

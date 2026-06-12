import type { Meta, StoryObj } from "@storybook/react";
import { FileRow } from "./FileRow";

const meta = {
  title: "Components/Molecules/FileRow",
  component: FileRow,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=237-49",
      overview: "Fila de un archivo en carga: tipo, nombre y estado (cargando con progreso, completo o error).",
      whenToUse: ["Listar archivos subidos o en proceso (junto a un Dropzone).", "Mostrar progreso y resultado por archivo."],
      whenNotToUse: ["Listas genéricas de contenido → usá List/ListItem."],
      anatomy: ["Tile de tipo (ej. PDF).", "Nombre + estado: progreso / meta / error+reintentar.", "Quitar (✕); check en completo."],
      accessibility: ["Botones de quitar/reintentar con texto/aria-label.", "El error se comunica con texto, no solo color."],
      dos: ["Mostrá progreso real en carga.", "Ofrecé reintentar ante error."],
      donts: ["No dejes la fila en carga indefinida si falló."],
    },
  },
  args: { name: "informe-trimestral.pdf", ext: "PDF", onRemove: () => {} },
  decorators: [(S) => <div style={{ width: 440, maxWidth: "100%" }}>{S()}</div>],
} satisfies Meta<typeof FileRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = { args: { state: "loading", progress: 60 } };
export const Complete: Story = { args: { state: "complete", meta: "2,4 MB · Completado" } };
export const ErrorState: Story = { args: { state: "error", onRetry: () => {} } };

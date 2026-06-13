import type { Meta, StoryObj } from "@storybook/react";
import { FileRow, type FileRowState } from "./FileRow";

/** Friendly playground controls (Card pattern). No slot props in the global disable
 * list — text/enum/number/boolean. */
interface FileRowDemoArgs {
  name: string;
  ext: string;
  state: FileRowState;
  progress: number;
  meta: string;
  showRemove: boolean;
}

const renderFileRow = (a: FileRowDemoArgs) => (
  <FileRow
    name={a.name}
    ext={a.ext || undefined}
    state={a.state}
    progress={a.progress}
    meta={a.meta || undefined}
    onRemove={a.showRemove ? () => {} : undefined}
    onRetry={a.state === "error" ? () => {} : undefined}
  />
);

const meta = {
  title: "Components/Molecules/FileRow",
  component: FileRow,
  tags: ["autodocs"],
  render: renderFileRow,
  args: {
    name: "informe-trimestral.pdf",
    ext: "PDF",
    state: "complete",
    progress: 60,
    meta: "2,4 MB · Completado",
    showRemove: true,
  },
  argTypes: {
    name: { type: { name: "string" }, control: "text", description: "Nombre del archivo.", table: { category: "Texto" } },
    ext: { type: { name: "string" }, control: "text", description: "Extensión mostrada en el tile (ej. PDF).", table: { category: "Texto" } },
    state: { type: { name: "enum", value: ["loading", "complete", "error"] }, control: "inline-radio", options: ["loading", "complete", "error"], description: "Estado de la carga.", table: { category: "Estado" } },
    progress: { type: { name: "number" }, control: { type: "range", min: 0, max: 100, step: 1 }, description: "Progreso (solo en loading).", table: { category: "Estado" } },
    meta: { type: { name: "string" }, control: "text", description: "Meta (ej. tamaño · estado).", table: { category: "Texto" } },
    showRemove: { type: { name: "boolean" }, control: "boolean", description: "Mostrar el botón de quitar.", table: { category: "Estructura" } },
  },
  parameters: {
    controls: { include: ["name", "ext", "state", "progress", "meta", "showRemove"] },
    viu: {
      status: "Stable",
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
  decorators: [(S) => <div style={{ width: 440, maxWidth: "100%" }}>{S()}</div>],
} satisfies Meta<FileRowDemoArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = { args: { state: "loading", progress: 60, meta: "" } };
export const Complete: Story = { args: { state: "complete", meta: "2,4 MB · Completado" } };
export const ErrorState: Story = { args: { state: "error", meta: "" } };

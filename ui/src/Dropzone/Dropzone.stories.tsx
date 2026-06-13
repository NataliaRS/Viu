import type { Meta, StoryObj } from "@storybook/react";
import { Dropzone } from "./Dropzone";

/** Friendly playground controls (Card pattern). No slot props in the global disable
 * list — all text/boolean. */
interface DropzoneDemoArgs {
  title: string;
  hint: string;
  error: string;
  multiple: boolean;
}

const renderDropzone = (a: DropzoneDemoArgs) => (
  <Dropzone
    title={a.title || undefined}
    hint={a.hint || undefined}
    error={a.error || undefined}
    multiple={a.multiple}
  />
);

const meta = {
  title: "Components/Molecules/Dropzone",
  component: Dropzone,
  tags: ["autodocs"],
  render: renderDropzone,
  args: {
    title: "Arrastrá archivos o hacé click para subir",
    hint: "PNG, JPG o PDF · hasta 10 MB",
    error: "",
    multiple: false,
  },
  argTypes: {
    title: { type: { name: "string" }, control: "text", description: "Texto principal.", table: { category: "Texto" } },
    hint: { type: { name: "string" }, control: "text", description: "Pista (tipos / límite). Vaciá para quitarla.", table: { category: "Texto" } },
    error: { type: { name: "string" }, control: "text", description: "Mensaje de error (activa el estado error).", table: { category: "Estado" } },
    multiple: { type: { name: "boolean" }, control: "boolean", description: "Permitir múltiples archivos.", table: { category: "Estructura" } },
  },
  parameters: {
    controls: { include: ["title", "hint", "error", "multiple"] },
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=235-28",
      overview: "Área para subir archivos arrastrando o haciendo click, con estados default/activo/error.",
      whenToUse: ["Subida de archivos (imágenes, documentos).", "Cuando el drag & drop agrega valor."],
      whenNotToUse: ["Subir un único archivo simple → un botón puede alcanzar.", "Entradas que no son archivos."],
      anatomy: ["Borde punteado + ícono en círculo.", "Texto principal + pista (tipos/limite).", "Estados: default, activo (drag), error."],
      accessibility: ["Es operable por teclado (Enter/Espacio abren el explorador).", "El error se muestra como texto; describí formatos y límites."],
      dos: ["Indicá formatos y tamaño máximo.", "Mostrá feedback al arrastrar."],
      donts: ["No ocultes los límites hasta que falle."],
    },
  },
  decorators: [(S) => <div style={{ width: 480, maxWidth: "100%" }}>{S()}</div>],
} satisfies Meta<DropzoneDemoArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Error: Story = { args: { error: "El archivo supera los 10 MB." } };

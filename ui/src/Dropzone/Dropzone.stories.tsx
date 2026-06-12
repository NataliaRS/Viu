import type { Meta, StoryObj } from "@storybook/react";
import { Dropzone } from "./Dropzone";

const meta = {
  title: "Components/Molecules/Dropzone",
  component: Dropzone,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "stable",
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
  args: {},
  argTypes: { error: { control: "text" } },
  decorators: [(S) => <div style={{ width: 480, maxWidth: "100%" }}>{S()}</div>],
} satisfies Meta<typeof Dropzone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Error: Story = { args: { error: "El archivo supera los 10 MB." } };

import type { Meta, StoryObj } from "@storybook/react";
import { VideoEmbed } from "./VideoEmbed";

const meta = {
  title: "Components/Molecules/VideoEmbed",
  component: VideoEmbed,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=414-7",
      overview: "Reproductor embebido con póster y botón de play (16:9). Al reproducir, cargá el player real.",
      whenToUse: ["Mostrar un video con un póster antes de reproducir.", "Diferir la carga del player pesado hasta el play."],
      whenNotToUse: ["Imágenes → usá Image.", "Audio → un control de audio dedicado."],
      anatomy: ["Póster (cover) sobre superficie strong.", "Botón de play centrado (overlay)."],
      accessibility: ["El play es un <button> con aria-label.", "Definí un alt descriptivo del póster; el player real debe tener controles accesibles."],
      dos: ["Cargá el player real recién al presionar play.", "Póster representativo del contenido."],
      donts: ["No autoreproduzcas con sonido.", "No uses VideoEmbed para imágenes estáticas."],
    },
  },
  args: { poster: "https://picsum.photos/seed/video/640/360", alt: "Vista previa del video" },
  decorators: [(S) => <div style={{ width: 560, maxWidth: "100%" }}>{S()}</div>],
} satisfies Meta<typeof VideoEmbed>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

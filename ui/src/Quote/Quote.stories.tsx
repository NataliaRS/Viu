import type { Meta, StoryObj } from "@storybook/react";
import { Quote } from "./Quote";

const meta = {
  title: "Components/Molecules/Quote",
  component: Quote,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=413-7",
      overview: "Cita destacada con línea de acento y atribución opcional.",
      whenToUse: ["Resaltar un testimonio o cita.", "Dar voz a un autor dentro del contenido."],
      whenNotToUse: ["Mensajes del sistema → usá Banner.", "Texto corrido → usá RichText."],
      anatomy: ["Línea de acento (brand).", "Texto de la cita (Body/XL).", "Atribución: autor · fuente."],
      accessibility: ["Usa <figure>/<blockquote>/<figcaption> semánticos."],
      dos: ["Atribuí la cita cuando corresponda."],
      donts: ["No abuses de citas largas."],
    },
  },
  args: {
    children: "El mejor sistema de diseño es el que el equipo realmente usa todos los días.",
    author: "Natalia Rodríguez",
    source: "Directora de UX",
  },
  decorators: [(S) => <div style={{ maxWidth: 560 }}>{S()}</div>],
} satisfies Meta<typeof Quote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Rating } from "./Rating";

const meta = {
  title: "Components/Atoms/Rating",
  component: Rating,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=410-43",
      overview: "Calificación por estrellas (0–5), de lectura o interactiva.",
      whenToUse: ["Mostrar o capturar una valoración.", "Reseñas, encuestas."],
      whenNotToUse: ["Para progreso → Progress.", "Para selección de opciones → Radio."],
      anatomy: ["N estrellas; llenas (brand) vs vacías (strong)."],
      accessibility: ["Lectura: role=img con label “X de N”.", "Interactiva: botones con aria-pressed (soporta teclado)."],
      dos: ["Indicá el máximo.", "Permití teclado en modo interactivo."],
      donts: ["No uses medias estrellas sin soporte real."],
    },
  },
  args: { value: 3, max: 5 },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ReadOnly: Story = { args: { readOnly: true } };
export const Interactive: Story = {
  render: () => {
    const [v, setV] = useState(3);
    return <Rating value={v} onChange={setV} aria-label="Calificación" />;
  },
};
export const Scale: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-sm)" }}>
      {[0, 1, 2, 3, 4, 5].map((n) => (
        <Rating key={n} value={n} readOnly />
      ))}
    </div>
  ),
};

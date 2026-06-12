import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta = {
  title: "Components/Atoms/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=229-10",
      overview: "Placeholder de carga que anticipa la forma del contenido. text/rect/circle.",
      whenToUse: ["Carga de contenido estructurado (cards, listas).", "Evitar saltos de layout."],
      whenNotToUse: ["Esperas muy cortas → un Spinner alcanza.", "Para progreso medible → Progress."],
      anatomy: ["Bloque con superficie strong + shimmer.", "Variante: text · rect · circle."],
      accessibility: ["Decorativo (aria-hidden).", "Respeta prefers-reduced-motion (sin shimmer)."],
      dos: ["Imitá la forma y proporción del contenido real."],
      donts: ["No lo dejes infinito si la carga falló (mostrá error)."],
    },
  },
  args: { variant: "text", width: 200 },
  argTypes: { variant: { control: "inline-radio", options: ["text", "rect", "circle"] } },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {};
export const Rect: Story = { args: { variant: "rect", width: 240, height: 120 } };
export const Circle: Story = { args: { variant: "circle", width: 48, height: 48 } };

export const Card: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-md)", width: 320, alignItems: "center" }}>
      <Skeleton variant="circle" width={48} height={48} />
      <div style={{ flex: 1, display: "grid", gap: "var(--space-xs)" }}>
        <Skeleton variant="text" width="70%" />
        <Skeleton variant="text" width="40%" />
      </div>
    </div>
  ),
};

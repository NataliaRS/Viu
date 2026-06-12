import type { Meta, StoryObj } from "@storybook/react";
import { Spinner, type SpinnerSize } from "./Spinner";

const sizes: SpinnerSize[] = ["sm", "md", "lg"];

const meta = {
  title: "Components/Atoms/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=20-209",
      overview: "Indicador de carga indeterminado. 3 tamaños.",
      whenToUse: ["Esperas cortas sin progreso conocido.", "Dentro de botones o áreas que cargan."],
      whenNotToUse: ["Si hay progreso medible → usá Progress.", "Para esperas con layout → usá Skeleton."],
      anatomy: ["Anillo con arco de marca girando."],
      accessibility: ["Expone role=status con aria-label.", "Respeta prefers-reduced-motion (gira más lento)."],
      dos: ["Acompañá con texto de estado si la espera es larga."],
      donts: ["No lo uses para esperas con progreso conocido."],
    },
  },
  args: { size: "md" },
  argTypes: { size: { control: "inline-radio", options: sizes } },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AllSizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-lg)", alignItems: "center" }}>
      {sizes.map((s) => (
        <Spinner key={s} size={s} />
      ))}
    </div>
  ),
};

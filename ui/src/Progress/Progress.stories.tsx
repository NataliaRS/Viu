import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./Progress";

const meta = {
  title: "Components/Atoms/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=22-184",
      overview: "Barra de progreso determinada (0–100) o indeterminada. 3 tamaños.",
      whenToUse: ["Mostrar avance medible (carga, pasos %).", "Indeterminado para esperas sin % conocido."],
      whenNotToUse: ["Esperas cortas → Spinner.", "Carga de layout → Skeleton."],
      anatomy: ["Track (subtle) + fill (brand).", "Tamaño sm/md/lg."],
      accessibility: ["role=progressbar con aria-valuenow/min/max.", "Pasá un `label` accesible."],
      dos: ["Usá `value` real cuando lo conozcas."],
      donts: ["No uses indeterminate si tenés el %."],
    },
  },
  args: { value: 60, size: "md", label: "Progreso de carga" },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 } },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    indeterminate: { control: "boolean" },
  },
  decorators: [(S) => <div style={{ width: 320 }}>{S()}</div>],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Indeterminate: Story = { args: { indeterminate: true } };
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-md)" }}>
      <Progress value={40} size="sm" label="Progreso — pequeño" />
      <Progress value={60} size="md" label="Progreso — mediano" />
      <Progress value={80} size="lg" label="Progreso — grande" />
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import { Spinner, type SpinnerSize } from "./Spinner";

const sizes: SpinnerSize[] = ["sm", "md", "lg"];

const meta = {
  title: "Atoms/Spinner",
  component: Spinner,
  tags: ["autodocs"],
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

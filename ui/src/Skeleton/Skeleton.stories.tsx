import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta = {
  title: "Atoms/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
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

import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./Divider";

const meta = {
  title: "Components/Atoms/Divider",
  component: Divider,
  tags: ["autodocs"],
  args: { orientation: "horizontal" },
  argTypes: {
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    label: { control: "text" },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: (args) => (
    <div style={{ width: 320 }}>
      <Divider {...args} />
    </div>
  ),
};

export const WithLabel: Story = {
  args: { label: "o" },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Divider {...args} />
    </div>
  ),
};

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div style={{ display: "flex", height: 24, alignItems: "center", gap: "var(--space-md)" }}>
      <span className="viu-type-body-m">Izquierda</span>
      <Divider {...args} />
      <span className="viu-type-body-m">Derecha</span>
    </div>
  ),
};

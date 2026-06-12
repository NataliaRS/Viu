import type { Meta, StoryObj } from "@storybook/react";
import { Status, type StatusKind } from "./Status";

const kinds: StatusKind[] = ["online", "busy", "away", "offline"];

const meta = {
  title: "Components/Atoms/Status",
  component: Status,
  tags: ["autodocs"],
  args: { status: "online", label: true },
  argTypes: {
    status: { control: "inline-radio", options: kinds },
    label: { control: "boolean" },
  },
} satisfies Meta<typeof Status>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const DotOnly: Story = { args: { label: false } };
export const All: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-lg)", flexWrap: "wrap" }}>
      {kinds.map((k) => (
        <Status key={k} status={k} label />
      ))}
    </div>
  ),
};

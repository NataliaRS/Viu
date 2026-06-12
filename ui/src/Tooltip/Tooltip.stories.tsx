import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button/Button";

const meta = {
  title: "Components/Atoms/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  args: { label: "Información útil", side: "top", children: "trigger" },
  argTypes: { side: { control: "inline-radio", options: ["top", "bottom", "left", "right"] } },
  decorators: [(S) => <div style={{ padding: "var(--space-3xl)" }}>{S()}</div>],
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="secondary">Pasá el mouse</Button>
    </Tooltip>
  ),
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {};
export const Bottom: Story = { args: { side: "bottom" } };

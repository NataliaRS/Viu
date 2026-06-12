import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./Slider";

const meta = {
  title: "Atoms/Slider",
  component: Slider,
  tags: ["autodocs"],
  decorators: [(S) => <div style={{ width: 320 }}>{S()}</div>],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [v, setV] = useState(60);
    return <Slider value={v} onChange={(e) => setV(Number(e.target.value))} />;
  },
};
export const Disabled: Story = { args: { defaultValue: 40, disabled: true } };

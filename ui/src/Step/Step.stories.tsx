import type { Meta, StoryObj } from "@storybook/react";
import { Step } from "./Step";

const meta = {
  title: "Components/Atoms/Step",
  component: Step,
  tags: ["autodocs"],
  args: { status: "current", number: 2, label: "Datos" },
  argTypes: {
    status: { control: "inline-radio", options: ["complete", "current", "upcoming"] },
    connector: { control: "boolean" },
  },
} satisfies Meta<typeof Step>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Current: Story = {};
export const Complete: Story = { args: { status: "complete", number: 1, label: "Cuenta" } };
export const Upcoming: Story = { args: { status: "upcoming", number: 3, label: "Confirmar" } };

export const Stepper: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex" }}>
      <Step status="complete" number={1} label="Cuenta" connector />
      <Step status="current" number={2} label="Datos" connector />
      <Step status="upcoming" number={3} label="Confirmar" />
    </div>
  ),
};

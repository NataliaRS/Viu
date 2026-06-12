import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "./Chip";
import { Avatar } from "../Avatar/Avatar";

const meta = {
  title: "Components/Atoms/Chip",
  component: Chip,
  tags: ["autodocs"],
  args: { variant: "input", label: "Etiqueta" },
  argTypes: {
    variant: { control: "inline-radio", options: ["input", "avatar", "choice"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Input: Story = { args: { onRemove: () => {} } };
export const WithAvatar: Story = {
  args: {
    variant: "avatar",
    label: "Natalia",
    avatar: <Avatar size="xs" initials="NR" />,
    onRemove: () => {},
  },
};
export const Choice: Story = {
  args: { variant: "choice", label: "Opción" },
  render: (args) => {
    const ChoiceDemo = () => {
      const [on, setOn] = useState(false);
      return <Chip {...args} selected={on} onToggle={() => setOn((v) => !v)} />;
    };
    return <ChoiceDemo />;
  },
};
export const Disabled: Story = { args: { disabled: true, onRemove: () => {} } };

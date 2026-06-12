import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta = {
  title: "Components/Atoms/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: { placeholder: "Escribí un mensaje…", rows: 3 },
  argTypes: { error: { control: "boolean" }, disabled: { control: "boolean" } },
  decorators: [(S) => <div style={{ width: 320 }}>{S()}</div>],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Error: Story = { args: { error: true, defaultValue: "Texto con error" } };
export const Disabled: Story = { args: { disabled: true, defaultValue: "No editable" } };

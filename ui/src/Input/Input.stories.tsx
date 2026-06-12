import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  args: { placeholder: "Escribí algo…" },
  argTypes: { error: { control: "boolean" }, disabled: { control: "boolean" } },
  decorators: [(S) => <div style={{ width: 320 }}>{S()}</div>],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithValue: Story = { args: { defaultValue: "Natalia Rodríguez" } };
export const Error: Story = { args: { error: true, defaultValue: "Valor inválido" } };
export const Disabled: Story = { args: { disabled: true, defaultValue: "No editable" } };

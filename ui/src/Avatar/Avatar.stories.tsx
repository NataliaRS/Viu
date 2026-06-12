import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, type AvatarSize } from "./Avatar";

const sizes: AvatarSize[] = ["xs", "sm", "md", "lg", "xl"];

const meta = {
  title: "Atoms/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  args: { size: "md", initials: "NR" },
  argTypes: { size: { control: "inline-radio", options: sizes } },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {};
export const Image: Story = {
  args: { src: "https://i.pravatar.cc/128?img=5", alt: "Retrato" },
};
export const AllSizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
      {sizes.map((s) => (
        <Avatar key={s} size={s} initials="NR" />
      ))}
    </div>
  ),
};

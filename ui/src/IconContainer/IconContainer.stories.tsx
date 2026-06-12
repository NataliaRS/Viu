import type { Meta, StoryObj } from "@storybook/react";
import { IconContainer } from "./IconContainer";
import { Icon } from "../Icon/Icon";

const meta = {
  title: "Atoms/IconContainer",
  component: IconContainer,
  tags: ["autodocs"],
  args: { size: "lg", icon: <Icon glyph="Info" /> },
  argTypes: { size: { control: "inline-radio", options: ["sm", "md", "lg"] } },
} satisfies Meta<typeof IconContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
      <IconContainer size="sm" icon={<Icon glyph="Search" />} />
      <IconContainer size="md" icon={<Icon glyph="Search" />} />
      <IconContainer size="lg" icon={<Icon glyph="Search" />} />
    </div>
  ),
};

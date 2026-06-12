import type { Meta, StoryObj } from "@storybook/react";
import { NotificationBadge } from "./NotificationBadge";
import { IconButton } from "../IconButton/IconButton";
import { Icon } from "../Icon/Icon";

const meta = {
  title: "Atoms/NotificationBadge",
  component: NotificationBadge,
  tags: ["autodocs"],
  args: { count: 5, max: 99, dot: false },
  argTypes: { dot: { control: "boolean" } },
} satisfies Meta<typeof NotificationBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Count: Story = {};
export const Overflow: Story = { args: { count: 128 } };
export const Dot: Story = { args: { dot: true } };

export const OnIcon: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <span style={{ position: "relative", display: "inline-flex" }}>
      <IconButton variant="tertiary" aria-label="Notificaciones" icon={<Icon glyph="Info" />} />
      <span style={{ position: "absolute", top: -2, right: -2 }}>
        <NotificationBadge count={3} />
      </span>
    </span>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./IconButton";
import { Icon } from "../Icon/Icon";

const meta = {
  title: "Atoms/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  args: { variant: "primary", size: "md", "aria-label": "Agregar", icon: <Icon glyph="Plus" /> },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary", "tertiary"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: "secondary" } };
export const Tertiary: Story = { args: { variant: "tertiary", icon: <Icon glyph="Close" /> } };

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-md)" }}>
      {(["primary", "secondary", "tertiary"] as const).map((v) => (
        <div key={v} style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
          {(["sm", "md", "lg"] as const).map((s) => (
            <IconButton key={s} variant={v} size={s} aria-label={`${v} ${s}`} icon={<Icon glyph="Search" />} />
          ))}
          <IconButton variant={v} aria-label="disabled" disabled icon={<Icon glyph="Search" />} />
        </div>
      ))}
    </div>
  ),
};

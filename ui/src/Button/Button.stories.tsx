import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { Icon } from "../Icon/Icon";

const meta = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Button", variant: "primary", size: "md" },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary", "tertiary"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: "primary" } };
export const Secondary: Story = { args: { variant: "secondary" } };
export const Tertiary: Story = { args: { variant: "tertiary" } };

export const WithLeadingIcon: Story = {
  args: { leadingIcon: <Icon glyph="Plus" />, children: "Crear" },
};

export const WithTrailingIcon: Story = {
  args: { trailingIcon: <Icon glyph="Arrow" />, children: "Siguiente" },
};

export const Disabled: Story = { args: { disabled: true } };

const row: React.CSSProperties = {
  display: "flex",
  gap: "var(--space-md)",
  alignItems: "center",
  flexWrap: "wrap",
  marginBottom: "var(--space-md)",
};

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      {(["primary", "secondary", "tertiary"] as const).map((v) => (
        <div key={v} style={row}>
          {(["sm", "md", "lg"] as const).map((s) => (
            <Button key={s} variant={v} size={s}>
              {v} {s}
            </Button>
          ))}
          <Button variant={v} leadingIcon={<Icon glyph="Plus" />}>
            Icono
          </Button>
          <Button variant={v} disabled>
            Disabled
          </Button>
        </div>
      ))}
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";

const meta = {
  title: "Atoms/Link",
  component: Link,
  tags: ["autodocs"],
  args: { children: "Ver más", href: "#" },
  argTypes: { disabled: { control: "boolean" } },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const InText: Story = {
  render: (args) => (
    <p className="viu-type-body-l" style={{ color: "var(--color-text-secondary)" }}>
      Esto es un párrafo con un <Link {...args}>enlace</Link> en medio del texto.
    </p>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import { Badge, type BadgeTone } from "./Badge";

const tones: BadgeTone[] = ["neutral", "brand", "success", "warning", "danger", "info"];

const meta = {
  title: "Components/Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { children: "Nuevo", tone: "neutral" },
  argTypes: { tone: { control: "inline-radio", options: tones } },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AllTones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-sm)", flexWrap: "wrap" }}>
      {tones.map((t) => (
        <Badge key={t} tone={t}>
          {t}
        </Badge>
      ))}
    </div>
  ),
};

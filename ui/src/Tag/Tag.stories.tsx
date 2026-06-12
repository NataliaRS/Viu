import type { Meta, StoryObj } from "@storybook/react";
import { Tag, type TagTone } from "./Tag";

const tones: TagTone[] = ["neutral", "brand", "indigo"];

const meta = {
  title: "Atoms/Tag",
  component: Tag,
  tags: ["autodocs"],
  args: { children: "Etiqueta", tone: "neutral" },
  argTypes: { tone: { control: "inline-radio", options: tones } },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AllTones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-sm)", flexWrap: "wrap" }}>
      {tones.map((t) => (
        <Tag key={t} tone={t}>
          {t}
        </Tag>
      ))}
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./Icon";
import type { GlyphName } from "./glyphs";

const allGlyphs: GlyphName[] = [
  "Plus",
  "Check",
  "Chevron",
  "Close",
  "Arrow",
  "Search",
  "Info",
  "Alert",
];

const meta = {
  title: "Components/Atoms/Icon",
  component: Icon,
  tags: ["autodocs"],
  args: { glyph: "Search", size: 24 },
  argTypes: {
    glyph: { control: "select", options: allGlyphs },
    size: { control: { type: "number", min: 12, max: 64, step: 2 } },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllGlyphs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-lg)" }}>
      {allGlyphs.map((g) => (
        <div
          key={g}
          style={{ display: "grid", placeItems: "center", gap: "var(--space-xs)", width: 72 }}
        >
          <Icon glyph={g} size={28} title={g} />
          <span
            className="viu-type-body-s"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            {g}
          </span>
        </div>
      ))}
    </div>
  ),
};

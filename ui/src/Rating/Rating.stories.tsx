import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Rating } from "./Rating";

const meta = {
  title: "Components/Atoms/Rating",
  component: Rating,
  tags: ["autodocs"],
  args: { value: 3, max: 5 },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ReadOnly: Story = { args: { readOnly: true } };
export const Interactive: Story = {
  render: () => {
    const [v, setV] = useState(3);
    return <Rating value={v} onChange={setV} aria-label="Calificación" />;
  },
};
export const Scale: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-sm)" }}>
      {[0, 1, 2, 3, 4, 5].map((n) => (
        <Rating key={n} value={n} readOnly />
      ))}
    </div>
  ),
};

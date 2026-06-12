import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Pill } from "./Pill";

const meta = {
  title: "Components/Atoms/Pill",
  component: Pill,
  tags: ["autodocs"],
  args: { children: "Filtro", selected: false },
  argTypes: { selected: { control: "boolean" }, disabled: { control: "boolean" } },
} satisfies Meta<typeof Pill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Selected: Story = { args: { selected: true } };
export const Disabled: Story = { args: { disabled: true } };

export const ToggleGroup: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const options = ["Todos", "Diseño", "Código", "Docs"];
    const [active, setActive] = useState("Todos");
    return (
      <div style={{ display: "flex", gap: "var(--space-sm)", flexWrap: "wrap" }}>
        {options.map((o) => (
          <Pill key={o} selected={active === o} onClick={() => setActive(o)}>
            {o}
          </Pill>
        ))}
      </div>
    );
  },
};

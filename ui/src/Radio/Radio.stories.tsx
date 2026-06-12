import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Radio } from "./Radio";

const meta = {
  title: "Components/Atoms/Radio",
  component: Radio,
  tags: ["autodocs"],
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Group: Story = {
  render: () => {
    const [value, setValue] = useState("design");
    const options = [
      { value: "design", label: "Diseño" },
      { value: "code", label: "Código" },
      { value: "docs", label: "Documentación" },
    ];
    return (
      <div style={{ display: "grid", gap: "var(--space-sm)" }}>
        {options.map((o) => (
          <Radio
            key={o.value}
            name="area"
            value={o.value}
            label={o.label}
            checked={value === o.value}
            onChange={() => setValue(o.value)}
          />
        ))}
        <Radio name="area2" label="Deshabilitado" disabled />
      </div>
    );
  },
};

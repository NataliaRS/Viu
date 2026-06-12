import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tab } from "./Tab";
import { Icon } from "../Icon/Icon";

const meta = {
  title: "Atoms/Tab",
  component: Tab,
  tags: ["autodocs"],
  args: { children: "Pestaña", variant: "line", active: false },
  argTypes: {
    variant: { control: "inline-radio", options: ["line", "segmented"] },
    active: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Line: Story = { args: { active: true } };
export const Segmented: Story = { args: { variant: "segmented", active: true } };
export const WithIcon: Story = { args: { active: true, icon: <Icon glyph="Search" /> } };

export const TabRow: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const tabs = ["Resumen", "Actividad", "Ajustes"];
    const [active, setActive] = useState(0);
    return (
      <div role="tablist" style={{ display: "flex", gap: "var(--space-md)" }}>
        {tabs.map((t, i) => (
          <Tab key={t} active={active === i} onClick={() => setActive(i)}>
            {t}
          </Tab>
        ))}
      </div>
    );
  },
};

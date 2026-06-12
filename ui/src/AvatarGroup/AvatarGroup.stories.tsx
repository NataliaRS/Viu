import type { Meta, StoryObj } from "@storybook/react";
import { AvatarGroup } from "./AvatarGroup";

const meta = {
  title: "Components/Molecules/AvatarGroup",
  component: AvatarGroup,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=185-37",
      overview: "Conjunto de avatares solapados que representa un grupo de personas, con resumen +N.",
      whenToUse: ["Mostrar participantes/colaboradores de algo.", "Resumir muchos usuarios en poco espacio."],
      whenNotToUse: ["Un solo usuario → usá Avatar.", "Listado detallado → usá List con avatares."],
      anatomy: ["Avatares solapados con anillo (bg/base).", "Chip +N cuando supera el máximo."],
      accessibility: ["Cada avatar lleva alt/iniciales; el +N expone un aria-label con el resto."],
      dos: ["Limitá con `max` y mostrá +N.", "Mismo tamaño para todos."],
      donts: ["No solapes tanto que no se distingan."],
    },
  },
  args: {
    max: 4,
    size: "md",
    items: [
      { initials: "NR" },
      { initials: "JP" },
      { initials: "AL" },
      { initials: "MG" },
      { initials: "TS" },
      { initials: "RC" },
    ],
  },
  argTypes: { size: { control: "inline-radio", options: ["xs", "sm", "md", "lg", "xl"] } },
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={{ display: "grid", gap: "var(--space-md)" }}>
      {(["xs", "sm", "md", "lg"] as const).map((s) => (
        <AvatarGroup key={s} {...args} size={s} />
      ))}
    </div>
  ),
};

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "./Chip";
import { Avatar } from "../Avatar/Avatar";

const meta = {
  title: "Components/Atoms/Chip",
  component: Chip,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=17-67",
      overview: "Ficha compacta: entrada removible, con avatar, o de selección (choice).",
      whenToUse: ["Tokens de entrada removibles (tags de un input, destinatarios).", "Selección múltiple tipo choice."],
      whenNotToUse: ["Etiqueta no interactiva → Tag/Badge.", "Filtro on/off simple → Pill."],
      anatomy: ["Contenedor pill.", "Avatar opcional (variante).", "Acción de quitar (✕) o check (choice)."],
      accessibility: ["El botón de quitar lleva aria-label.", "Choice expone aria-pressed; foco visible."],
      dos: ["Usá `onRemove` para entradas removibles.", "Choice para selección múltiple."],
      donts: ["No mezcles quitar y choice en el mismo chip."],
    },
  },
  args: { variant: "input", label: "Etiqueta" },
  argTypes: {
    variant: { control: "inline-radio", options: ["input", "avatar", "choice"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Input: Story = { args: { onRemove: () => {} } };
export const WithAvatar: Story = {
  args: {
    variant: "avatar",
    label: "Natalia",
    avatar: <Avatar size="xs" initials="NR" />,
    onRemove: () => {},
  },
};
export const Choice: Story = {
  args: { variant: "choice", label: "Opción" },
  render: (args) => {
    const ChoiceDemo = () => {
      const [on, setOn] = useState(false);
      return <Chip {...args} selected={on} onToggle={() => setOn((v) => !v)} />;
    };
    return <ChoiceDemo />;
  },
};
export const Disabled: Story = { args: { disabled: true, onRemove: () => {} } };

import type { Meta, StoryObj } from "@storybook/react";
import { NavItem } from "./NavItem";
import { Icon } from "../Icon/Icon";

const meta = {
  title: "Components/Molecules/NavItem",
  component: NavItem,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=233-19",
      overview: "Ítem individual de navegación: ícono + label, con estados default/hover/activo.",
      whenToUse: ["Cada destino dentro de un Nav."],
      whenNotToUse: ["Como botón de acción → usá Button/Icon button."],
      anatomy: ["Ícono (20px) + label (Body/M).", "Estado activo: fondo brand-2-subtle + texto primario."],
      accessibility: ["Es un <a>; el activo usa aria-current=page.", "Foco visible."],
      dos: ["Texto claro del destino.", "Ícono que ayuda a reconocerlo."],
      donts: ["No uses NavItem para acciones."],
    },
  },
  args: { children: "Inicio", icon: <Icon glyph="Info" />, href: "#" },
  argTypes: { active: { control: "boolean" } },
  decorators: [(S) => <div style={{ width: 240 }}>{S()}</div>],
} satisfies Meta<typeof NavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Active: Story = { args: { active: true } };

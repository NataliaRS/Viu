import type { Meta, StoryObj } from "@storybook/react";
import { MenuItem } from "./MenuItem";
import { Menu } from "../Menu/Menu";
import { Icon } from "../Icon/Icon";

const meta = {
  title: "Components/Molecules/MenuItem",
  component: MenuItem,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=170-21",
      overview: "Acción individual dentro de un Menu: ícono opcional, label y atajo de teclado.",
      whenToUse: ["Cada comando de un Menu."],
      whenNotToUse: ["Como botón principal → usá Button.", "Opción de un Select → usá <option>."],
      anatomy: ["Ícono (opcional) + label (Body/M) + atajo (Body/S).", "Estados: default/hover/deshabilitado."],
      accessibility: ["role=menuitem; Enter/Espacio lo activan.", "El atajo se muestra como pista (registralo también a nivel app)."],
      dos: ["Verbos claros y cortos.", "Mostrá el atajo si existe."],
      donts: ["No mezcles destinos de navegación con acciones sin distinguir."],
    },
  },
  args: { children: "Opción del menú", icon: <Icon glyph="Search" />, shortcut: "⌘K" },
  argTypes: { disabled: { control: "boolean" } },
  decorators: [(S) => <Menu aria-label="demo" style={{ width: 240 }}>{S()}</Menu>],
} satisfies Meta<typeof MenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };

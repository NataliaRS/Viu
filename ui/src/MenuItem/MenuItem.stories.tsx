import type { Meta, StoryObj } from "@storybook/react";
import { MenuItem } from "./MenuItem";
import { Menu } from "../Menu/Menu";
import { Icon } from "../Icon/Icon";

/** Friendly playground controls (Card pattern). `icon` is in the global slot disable
 * list → decoupled as `showIcon`; `shortcut` and the label stay editable. */
interface MenuItemDemoArgs {
  showIcon: boolean;
  children: string;
  shortcut: string;
  selected: boolean;
  disabled: boolean;
}

const renderMenuItem = (a: MenuItemDemoArgs) => (
  <MenuItem
    icon={a.showIcon ? <Icon glyph="Search" /> : undefined}
    shortcut={a.shortcut || undefined}
    selected={a.selected}
    disabled={a.disabled}
  >
    {a.children}
  </MenuItem>
);

const meta = {
  title: "Components/Molecules/MenuItem",
  component: MenuItem,
  tags: ["autodocs"],
  render: renderMenuItem,
  args: { showIcon: true, children: "Opción del menú", shortcut: "⌘K", selected: false, disabled: false },
  argTypes: {
    showIcon: { type: { name: "boolean" }, control: "boolean", description: "Mostrar el ícono.", table: { category: "Estructura" } },
    children: { name: "label", type: { name: "string" }, control: "text", description: "Etiqueta de la acción.", table: { category: "Texto" } },
    shortcut: { type: { name: "string" }, control: "text", description: "Atajo de teclado (opcional). Vaciá para quitarlo.", table: { category: "Texto" } },
    selected: { type: { name: "boolean" }, control: "boolean", description: "Seleccionado: fondo rojo (bg/brand-subtle) + check a la derecha.", table: { category: "Estado" } },
    disabled: { type: { name: "boolean" }, control: "boolean", description: "Deshabilitado.", table: { category: "Estado" } },
  },
  parameters: {
    controls: { include: ["showIcon", "children", "shortcut", "selected", "disabled"] },
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=170-21",
      overview: "Acción individual dentro de un Menu: ícono opcional, label y atajo de teclado.",
      whenToUse: ["Cada comando de un Menu."],
      whenNotToUse: ["Como botón principal → usá Button.", "Opción de un Select → usá <option>."],
      anatomy: ["Ícono (opcional) + label (Body/M) + atajo (Body/S) o check si está seleccionado.", "Estados: default/hover/seleccionado/deshabilitado."],
      accessibility: ["role=menuitem; Enter/Espacio lo activan.", "El atajo se muestra como pista (registralo también a nivel app)."],
      dos: ["Verbos claros y cortos.", "Mostrá el atajo si existe."],
      donts: ["No mezcles destinos de navegación con acciones sin distinguir."],
    },
  },
  decorators: [(S) => <Menu aria-label="demo" style={{ width: 240 }}>{S()}</Menu>],
} satisfies Meta<MenuItemDemoArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Selected: Story = { args: { selected: true, shortcut: "" } };
export const Disabled: Story = { args: { disabled: true } };

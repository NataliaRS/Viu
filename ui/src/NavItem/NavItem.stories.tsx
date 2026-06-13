import type { Meta, StoryObj } from "@storybook/react";
import { NavItem } from "./NavItem";
import { Icon } from "../Icon/Icon";

/** Friendly playground controls (Card pattern). `icon` is in the global slot disable
 * list → decoupled as `showIcon`; the label stays editable. */
interface NavItemDemoArgs {
  showIcon: boolean;
  children: string;
  active: boolean;
}

const renderNavItem = (a: NavItemDemoArgs) => (
  <NavItem icon={a.showIcon ? <Icon glyph="Info" /> : undefined} active={a.active} href="#">
    {a.children}
  </NavItem>
);

const meta = {
  title: "Components/Molecules/NavItem",
  component: NavItem,
  tags: ["autodocs"],
  render: renderNavItem,
  args: { showIcon: true, children: "Inicio", active: false },
  argTypes: {
    showIcon: { type: { name: "boolean" }, control: "boolean", description: "Mostrar el ícono.", table: { category: "Estructura" } },
    children: { name: "label", type: { name: "string" }, control: "text", description: "Etiqueta del destino.", table: { category: "Texto" } },
    active: { type: { name: "boolean" }, control: "boolean", description: "Estado activo (aria-current=page).", table: { category: "Estado" } },
  },
  parameters: {
    controls: { include: ["showIcon", "children", "active"] },
    viu: {
      status: "Stable",
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
  decorators: [(S) => <div style={{ width: 240 }}>{S()}</div>],
} satisfies Meta<NavItemDemoArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Active: Story = { args: { active: true } };

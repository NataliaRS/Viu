import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from "./Menu";
import { MenuItem } from "../MenuItem/MenuItem";
import { Icon } from "../Icon/Icon";

const meta = {
  title: "Components/Molecules/Menu",
  component: Menu,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=377-6",
      overview: "Superficie flotante con una lista de acciones (MenuItem). El posicionamiento lo maneja quien la usa.",
      whenToUse: ["Acciones contextuales de un disparador (botón “más”, click derecho).", "Comandos rápidos."],
      whenNotToUse: ["Selección de un valor de formulario → usá Select.", "Navegación persistente → usá Nav."],
      anatomy: ["Superficie elevada (bg/elevated + border/subtle + sombra overlay).", "MenuItem: ícono opcional + label + atajo."],
      accessibility: ["role=menu + items role=menuitem.", "Idealmente: foco atrapado y flechas para moverse (lo aporta el disparador/popover)."],
      dos: ["Agrupá acciones relacionadas.", "Mostrá atajos cuando existan."],
      donts: ["No metas formularios largos en un menú."],
    },
  },
  args: { "aria-label": "Acciones" },
  decorators: [(S) => <div style={{ width: 260 }}>{S()}</div>],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Menu {...args}>
      <MenuItem icon={<Icon glyph="Search" />} shortcut="⌘K">
        Buscar
      </MenuItem>
      <MenuItem icon={<Icon glyph="Plus" />}>Nuevo</MenuItem>
      <MenuItem icon={<Icon glyph="Info" />}>Detalles</MenuItem>
      <MenuItem disabled>Archivar</MenuItem>
    </Menu>
  ),
};

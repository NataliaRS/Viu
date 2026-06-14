import type { Meta, StoryObj } from "@storybook/react";
import { TreeItem } from "./TreeItem";
import { Icon } from "../Icon/Icon";

/**
 * Friendly playground controls mirroring the Figma variant axes (411:19):
 * Expansión (Expandido/Colapsado/Hoja) × Estado (Default/Seleccionado/Deshabilitado),
 * plus the Icono/Checkbox booleans. `showIcon` is decoupled (icon is in the global
 * slot-disable list); it maps to the Folder glyph.
 */
interface TreeItemDemoArgs {
  label: string;
  expansion: "Expandido" | "Colapsado" | "Hoja";
  state: "Default" | "Seleccionado" | "Deshabilitado";
  level: number;
  showIcon: boolean;
  checkbox: boolean;
  checked: boolean;
}

const renderTreeItem = (a: TreeItemDemoArgs) => (
  <TreeItem
    label={a.label}
    level={a.level}
    hasChildren={a.expansion !== "Hoja"}
    expanded={a.expansion === "Expandido"}
    onExpandedChange={() => {}}
    selected={a.state === "Seleccionado"}
    disabled={a.state === "Deshabilitado"}
    onSelect={() => {}}
    icon={a.showIcon ? <Icon glyph="Folder" size={16} /> : undefined}
    checkbox={a.checkbox}
    checked={a.checked}
    onCheckedChange={() => {}}
  />
);

const meta = {
  title: "Components/Molecules/TreeItem",
  component: TreeItem,
  tags: ["autodocs"],
  render: renderTreeItem,
  args: {
    label: "Carpeta",
    expansion: "Expandido",
    state: "Default",
    level: 0,
    showIcon: true,
    checkbox: false,
    checked: false,
  },
  argTypes: {
    label: { type: { name: "string" }, control: "text", description: "Etiqueta del nodo.", table: { category: "Texto" } },
    expansion: { type: { name: "enum", value: ["Expandido", "Colapsado", "Hoja"] }, control: "inline-radio", options: ["Expandido", "Colapsado", "Hoja"], description: "Expandido (⌄) / Colapsado (›) / Hoja (sin chevron).", table: { category: "Variante" } },
    state: { type: { name: "enum", value: ["Default", "Seleccionado", "Deshabilitado"] }, control: "inline-radio", options: ["Default", "Seleccionado", "Deshabilitado"], description: "Estado del nodo.", table: { category: "Estado" } },
    level: { type: { name: "number" }, control: { type: "range", min: 0, max: 4, step: 1 }, description: "Nivel de indentación.", table: { category: "Variante" } },
    showIcon: { type: { name: "boolean" }, control: "boolean", description: "Mostrar el ícono (Folder).", table: { category: "Estructura" } },
    checkbox: { type: { name: "boolean" }, control: "boolean", description: "Mostrar un checkbox al inicio.", table: { category: "Estructura" } },
    checked: { type: { name: "boolean" }, control: "boolean", description: "Checkbox marcado (si está visible).", table: { category: "Estado" } },
  },
  parameters: {
    controls: { include: ["label", "expansion", "state", "level", "showIcon", "checkbox", "checked"] },
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=411-19",
      overview: "Nodo de un árbol jerárquico: chevron de expandir/colapsar (o espaciador en hoja), ícono y checkbox opcionales, indentación por nivel y estados.",
      whenToUse: ["Estructuras jerárquicas (carpetas, categorías).", "Componer un TreeView."],
      whenNotToUse: ["Listas planas → usá List/ListItem.", "Navegación principal → usá Nav."],
      anatomy: ["[Checkbox] + Chevron (o espaciador en hoja) + [Ícono] + Label.", "Indentación por `level`."],
      accessibility: ["role=treeitem con aria-expanded/aria-selected/aria-level/aria-disabled.", "Va dentro de un contenedor role=tree (TreeView)."],
      dos: ["Indentá según el nivel.", "Marcá el seleccionado.", "Usá checkbox para selección múltiple."],
      donts: ["No uses TreeItem suelto sin un contenedor role=tree."],
    },
  },
  decorators: [(S) => <div role="tree" style={{ width: 280 }}>{S()}</div>],
} satisfies Meta<TreeItemDemoArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Toggle expansión, estado, ícono y checkbox desde Controls. */
export const Playground: Story = {};

/** The Figma variant matrix: expansion × state, plus icon/checkbox. */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div role="tree" style={{ width: 280, display: "grid", gap: "var(--space-3xs)" }}>
      <TreeItem label="Expandido" hasChildren expanded icon={<Icon glyph="Folder" size={16} />} onExpandedChange={() => {}} />
      <TreeItem label="Colapsado" hasChildren expanded={false} icon={<Icon glyph="Folder" size={16} />} onExpandedChange={() => {}} />
      <TreeItem label="Hoja" />
      <TreeItem label="Seleccionado" hasChildren expanded selected icon={<Icon glyph="Folder" size={16} />} onExpandedChange={() => {}} />
      <TreeItem label="Deshabilitado" hasChildren expanded disabled icon={<Icon glyph="Folder" size={16} />} />
      <TreeItem label="Con checkbox" checkbox checked onCheckedChange={() => {}} />
    </div>
  ),
};

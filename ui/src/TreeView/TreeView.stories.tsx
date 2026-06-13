import { useState, type ReactElement, type ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TreeView } from "./TreeView";
import { TreeItem } from "../TreeItem/TreeItem";
import { Icon } from "../Icon/Icon";

interface Node {
  id: string;
  label: string;
  children?: Node[];
}

/** The Figma example tree (412:7). */
const tree: Node[] = [
  {
    id: "proyectos",
    label: "Proyectos",
    children: [
      {
        id: "producto",
        label: "Producto",
        children: [
          { id: "investigacion", label: "Investigación" },
          { id: "diseno", label: "Diseño" },
        ],
      },
      {
        id: "marketing",
        label: "Marketing",
        children: [{ id: "desarrollo", label: "Desarrollo" }],
      },
      { id: "operaciones", label: "Operaciones" },
    ],
  },
  { id: "equipo", label: "Equipo" },
];

function ProjectsTree({
  ariaLabel,
  checkboxes,
  icons,
}: {
  ariaLabel: string;
  checkboxes: boolean;
  icons: boolean;
}) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["proyectos", "producto", "marketing"]));
  const [selected, setSelected] = useState("diseno");
  const [checked, setChecked] = useState<Set<string>>(new Set(["diseno"]));

  const toggle = (set: Set<string>, id: string) => {
    const next = new Set(set);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  };

  const renderNodes = (nodes: Node[], level: number): ReactElement[] =>
    nodes.flatMap((node) => {
      const hasChildren = !!node.children?.length;
      const isOpen = expanded.has(node.id);
      const row = (
        <TreeItem
          key={node.id}
          label={node.label}
          level={level}
          hasChildren={hasChildren}
          expanded={isOpen}
          onExpandedChange={() => setExpanded((p) => toggle(p, node.id))}
          selected={!checkboxes && selected === node.id}
          onSelect={() => setSelected(node.id)}
          icon={icons ? <Icon glyph={hasChildren ? "Info" : "Search"} size={16} /> : undefined}
          checkbox={checkboxes}
          checked={checked.has(node.id)}
          onCheckedChange={() => setChecked((p) => toggle(p, node.id))}
        />
      );
      return hasChildren && isOpen ? [row, ...renderNodes(node.children!, level + 1)] : [row];
    });

  return <TreeView aria-label={ariaLabel}>{renderNodes(tree, 0)}</TreeView>;
}

interface TreeViewDemoArgs {
  "aria-label": string;
  children: ReactNode;
  showCheckboxes: boolean;
  showIcons: boolean;
}

const meta = {
  title: "Components/Organisms/TreeView",
  component: TreeView,
  tags: ["autodocs"],
  render: (a: TreeViewDemoArgs) => (
    <ProjectsTree ariaLabel={a["aria-label"]} checkboxes={a.showCheckboxes} icons={a.showIcons} />
  ),
  args: { "aria-label": "Proyectos", children: null, showCheckboxes: false, showIcons: false },
  argTypes: {
    "aria-label": { type: { name: "string" }, control: "text", description: "Nombre accesible del árbol.", table: { category: "Accesibilidad" } },
    showCheckboxes: { type: { name: "boolean" }, control: "boolean", description: "Mostrar un checkbox por nodo (árbol seleccionable).", table: { category: "Estructura" } },
    showIcons: { type: { name: "boolean" }, control: "boolean", description: "Mostrar un ícono por nodo.", table: { category: "Estructura" } },
  },
  parameters: {
    controls: { include: ["aria-label", "showCheckboxes", "showIcons"] },
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=412-7",
      overview: "Contenedor de árbol jerárquico. Compone TreeItem con indentación, expandir/colapsar, selección y, opcionalmente, checkbox/ícono por nodo.",
      whenToUse: ["Explorar jerarquías (proyectos, archivos, categorías).", "Selección múltiple en árbol (con checkboxes)."],
      whenNotToUse: ["Listas planas → usá List.", "Navegación principal → usá Nav."],
      anatomy: ["role=tree con varios TreeItem (role=treeitem).", "Cada nodo con hijos muestra un chevron (Expandido/Colapsado); las hojas no.", "Opcional: checkbox y/o ícono por nodo."],
      accessibility: ["role=tree + aria-label; los items exponen aria-expanded/aria-selected/aria-level.", "Navegación por teclado entre nodos."],
      dos: ["Indentá por nivel.", "Marcá el seleccionado.", "Usá checkboxes para selección múltiple."],
      donts: ["No anides demasiado sin colapsar."],
    },
  },
  decorators: [(S) => <div style={{ width: 280 }}>{S()}</div>],
} satisfies Meta<TreeViewDemoArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The Figma example: a hierarchical projects tree. Toggle checkboxes/icons from Controls. */
export const Playground: Story = {};

/** Selectable tree with leading checkboxes. */
export const Checkboxes: Story = { args: { showCheckboxes: true } };

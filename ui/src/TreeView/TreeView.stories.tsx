import { useState, type ReactElement } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TreeView } from "./TreeView";
import { TreeItem } from "../TreeItem/TreeItem";

const meta = {
  title: "Components/Organisms/TreeView",
  component: TreeView,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=412-7",
      overview: "Contenedor de árbol jerárquico. Compone TreeItem con indentación, expandir/colapsar y selección.",
      whenToUse: ["Explorar jerarquías (proyectos, archivos, categorías)."],
      whenNotToUse: ["Listas planas → usá List.", "Navegación principal → usá Nav."],
      anatomy: ["role=tree con varios TreeItem (role=treeitem).", "Cada nodo con hijos muestra un chevron que expande/colapsa."],
      accessibility: ["role=tree + aria-label; los items exponen aria-expanded/aria-selected.", "Navegación por teclado entre nodos."],
      dos: ["Indentá por nivel.", "Marcá el seleccionado."],
      donts: ["No anides demasiado sin colapsar."],
    },
  },
  args: { "aria-label": "Proyectos", children: null },
  decorators: [(S) => <div style={{ width: 280 }}>{S()}</div>],
} satisfies Meta<typeof TreeView>;

export default meta;
type Story = StoryObj<typeof meta>;

interface Node {
  id: string;
  label: string;
  children?: Node[];
}

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

/** A real hierarchical tree: every node with children expands/collapses, and its
 * children only render while it's open. */
function ProjectsTree() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["proyectos", "producto", "marketing"]));
  const [selected, setSelected] = useState("diseno");

  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

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
          onExpandedChange={() => toggle(node.id)}
          selected={selected === node.id}
          onSelect={() => setSelected(node.id)}
        />
      );
      return hasChildren && isOpen ? [row, ...renderNodes(node.children!, level + 1)] : [row];
    });

  return <TreeView aria-label="Proyectos">{renderNodes(tree, 0)}</TreeView>;
}

export const Projects: Story = {
  parameters: { controls: { disable: true } },
  render: () => <ProjectsTree />,
};

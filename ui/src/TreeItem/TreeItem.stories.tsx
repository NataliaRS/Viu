import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TreeItem } from "./TreeItem";

const meta = {
  title: "Components/Molecules/TreeItem",
  component: TreeItem,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=411-19",
      overview: "Nodo de un árbol jerárquico: chevron de expandir, indentación por nivel y selección.",
      whenToUse: ["Estructuras jerárquicas (carpetas, categorías).", "Navegación en árbol (tree view)."],
      whenNotToUse: ["Listas planas → usá List/ListItem.", "Navegación principal → usá Nav."],
      anatomy: ["Chevron (si tiene hijos) o spacer.", "Ícono opcional + label.", "Indentación por `level`."],
      accessibility: ["role=treeitem con aria-expanded/aria-selected.", "Navegable por teclado dentro de un role=tree (lo aporta el contenedor)."],
      dos: ["Indentá según el nivel.", "Marcá el seleccionado."],
      donts: ["No uses TreeItem suelto sin un contenedor role=tree."],
    },
  },
  args: { label: "" },
  decorators: [(S) => <div role="tree" style={{ width: 280 }}>{S()}</div>],
} satisfies Meta<typeof TreeItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tree: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const [sel, setSel] = useState("docs");
    return (
      <>
        <TreeItem
          label="Proyecto"
          hasChildren
          expanded={open}
          onExpandedChange={setOpen}
          selected={sel === "root"}
          onSelect={() => setSel("root")}
        />
        {open ? (
          <>
            <TreeItem label="src" level={1} hasChildren expanded={false} onExpandedChange={() => {}} selected={sel === "src"} onSelect={() => setSel("src")} />
            <TreeItem label="docs" level={1} selected={sel === "docs"} onSelect={() => setSel("docs")} />
            <TreeItem label="README.md" level={1} selected={sel === "readme"} onSelect={() => setSel("readme")} />
          </>
        ) : null}
      </>
    );
  },
};

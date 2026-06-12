import { useState } from "react";
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
      overview: "Contenedor de árbol jerárquico. Compone TreeItem con indentación, expandir y selección.",
      whenToUse: ["Explorar jerarquías (archivos, categorías)."],
      whenNotToUse: ["Listas planas → usá List.", "Navegación principal → usá Nav."],
      anatomy: ["role=tree con varios TreeItem (role=treeitem)."],
      accessibility: ["role=tree + aria-label; los items exponen aria-expanded/aria-selected.", "Navegación por teclado entre nodos."],
      dos: ["Indentá por nivel.", "Marcá el seleccionado."],
      donts: ["No anides demasiado sin colapsar."],
    },
  },
  args: { "aria-label": "Archivos", children: null },
  decorators: [(S) => <div style={{ width: 280 }}>{S()}</div>],
} satisfies Meta<typeof TreeView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Files: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);
    const [sel, setSel] = useState("docs");
    return (
      <TreeView {...args}>
        <TreeItem label="Proyecto" hasChildren expanded={open} onExpandedChange={setOpen} selected={sel === "root"} onSelect={() => setSel("root")} />
        {open ? (
          <>
            <TreeItem label="src" level={1} hasChildren expanded={false} onExpandedChange={() => {}} selected={sel === "src"} onSelect={() => setSel("src")} />
            <TreeItem label="docs" level={1} selected={sel === "docs"} onSelect={() => setSel("docs")} />
          </>
        ) : null}
      </TreeView>
    );
  },
};

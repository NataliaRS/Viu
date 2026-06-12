import figma from "@figma/code-connect";
import { TreeView } from "./TreeView";
import { TreeItem } from "../TreeItem/TreeItem";

figma.connect(
  TreeView,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=412-7",
  {
    example: () => (
      <TreeView aria-label="Archivos">
        <TreeItem label="Proyecto" hasChildren expanded />
        <TreeItem label="docs" level={1} selected />
      </TreeView>
    ),
  },
);

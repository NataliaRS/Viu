import figma from "@figma/code-connect";
import { TableRow } from "./TableRow";
import { Avatar } from "../Avatar/Avatar";

figma.connect(
  TableRow,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=195-58",
  {
    props: {
      name: figma.string("nombre"),
      role: figma.string("rol"),
      selected: figma.enum("estado", { Seleccionado: true }),
    },
    example: ({ name, role, selected }) => (
      <TableRow selectable selected={selected} chevron>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", width: 240, padding: "0 var(--space-md)" }}>
          <Avatar size="sm" initials="NR" />
          {name}
        </div>
        <div style={{ width: 180, padding: "0 var(--space-md)", color: "var(--color-text-secondary)" }}>{role}</div>
      </TableRow>
    ),
  },
);

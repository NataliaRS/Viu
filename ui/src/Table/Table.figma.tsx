import figma from "@figma/code-connect";
import { Table } from "./Table";
import { TableRow } from "../TableRow/TableRow";

figma.connect(
  Table,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=372-6",
  {
    example: () => (
      <Table aria-label="Equipo" header={<div style={{ padding: "0 var(--space-md)" }}>Nombre</div>}>
        <TableRow selectable>
          <div style={{ padding: "0 var(--space-md)" }}>Natalia Rodríguez</div>
        </TableRow>
      </Table>
    ),
  },
);

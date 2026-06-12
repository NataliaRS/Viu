import figma from "@figma/code-connect";
import { DataTable } from "./DataTable";
import { Search } from "../Search/Search";
import { Button } from "../Button/Button";
import { TableRow } from "../TableRow/TableRow";
import { Pagination } from "../Pagination/Pagination";

figma.connect(
  DataTable,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=285-7",
  {
    example: () => (
      <DataTable
        aria-label="Proyectos"
        toolbar={
          <>
            <Search placeholder="Buscar proyectos…" />
            <Button variant="secondary" size="sm">
              Filtros
            </Button>
            <Button variant="primary" size="sm">
              Nuevo
            </Button>
          </>
        }
        header={
          <>
            <span>Nombre</span>
            <span>Rol</span>
            <span>Estado</span>
          </>
        }
        caption="1–5 de 42 proyectos"
        pagination={<Pagination page={1} total={9} onPageChange={() => {}} variant="simple" />}
      >
        <TableRow selectable>Natalia R.</TableRow>
        <TableRow selectable>Bruno M.</TableRow>
      </DataTable>
    ),
  },
);

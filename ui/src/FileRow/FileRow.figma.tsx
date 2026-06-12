import figma from "@figma/code-connect";
import { FileRow } from "./FileRow";

figma.connect(
  FileRow,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=237-49",
  {
    props: {
      state: figma.enum("estado", { Cargando: "loading", Completo: "complete", Error: "error" }),
    },
    example: ({ state }) => (
      <FileRow name="informe-trimestral.pdf" ext="PDF" state={state} progress={60} meta="2,4 MB · Completado" onRemove={() => {}} onRetry={() => {}} />
    ),
  },
);

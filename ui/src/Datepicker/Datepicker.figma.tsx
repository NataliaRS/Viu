import figma from "@figma/code-connect";
import { Datepicker } from "./Datepicker";

figma.connect(
  Datepicker,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=28-386",
  {
    props: {
      error: figma.enum("estado", { Error: "Elegí una fecha válida." }),
      disabled: figma.enum("estado", { Deshabilitado: true }),
    },
    example: ({ error, disabled }) => (
      <Datepicker label="Fecha" error={error} disabled={disabled} htmlFor="dp" />
    ),
  },
);

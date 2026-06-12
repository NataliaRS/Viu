import figma from "@figma/code-connect";
import { TimePicker } from "./TimePicker";

figma.connect(
  TimePicker,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=409-6",
  {
    props: {
      label: figma.boolean("etiqueta", { true: figma.string("textoEtiqueta"), false: undefined }),
      helper: figma.boolean("ayuda", { true: figma.string("textoAyuda"), false: undefined }),
      error: figma.enum("estado", { Error: "Elegí una hora válida." }),
      disabled: figma.enum("estado", { Deshabilitado: true }),
    },
    example: ({ label, helper, error, disabled }) => (
      <TimePicker label={label} helper={helper} error={error} disabled={disabled} htmlFor="tp" />
    ),
  },
);

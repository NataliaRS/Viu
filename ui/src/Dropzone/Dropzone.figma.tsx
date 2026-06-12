import figma from "@figma/code-connect";
import { Dropzone } from "./Dropzone";

figma.connect(
  Dropzone,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=235-28",
  {
    props: { error: figma.enum("estado", { Error: "El archivo supera los 10 MB." }) },
    example: ({ error }) => <Dropzone error={error} onFilesSelected={() => {}} />,
  },
);

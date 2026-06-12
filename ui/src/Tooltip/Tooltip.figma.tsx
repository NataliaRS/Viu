import figma from "@figma/code-connect";
import { Tooltip } from "./Tooltip";

figma.connect(
  Tooltip,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=23-167",
  {
    example: () => (
      <Tooltip label="Información útil">
        <button type="button">Trigger</button>
      </Tooltip>
    ),
  },
);

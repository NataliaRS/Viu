import figma from "@figma/code-connect";
import { DateRangePicker } from "./DateRangePicker";

figma.connect(
  DateRangePicker,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=732-120",
  {
    example: () => (
      <DateRangePicker
        defaultValue={{ from: new Date(2026, 5, 1), to: new Date(2026, 5, 15) }}
      />
    ),
  },
);

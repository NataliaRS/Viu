import figma from "@figma/code-connect";
import { Badge } from "./Badge";

figma.connect(
  Badge,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=14-77",
  {
    props: {
      tone: figma.enum("Tone", {
        Neutral: "neutral",
        Brand: "brand",
        Success: "success",
        Warning: "warning",
        Danger: "danger",
        Info: "info",
      }),
      icon: figma.boolean("Icono"),
      label: figma.string("Label"),
    },
    example: ({ tone, icon, label }) => (
      <Badge tone={tone} icon={icon}>
        {label}
      </Badge>
    ),
  },
);

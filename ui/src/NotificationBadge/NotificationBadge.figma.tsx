import figma from "@figma/code-connect";
import { NotificationBadge } from "./NotificationBadge";

figma.connect(
  NotificationBadge,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=18-75",
  {
    props: {
      count: figma.string("count"),
      dot: figma.enum("Type", { Dot: true }),
    },
    example: ({ dot }) => (dot ? <NotificationBadge dot /> : <NotificationBadge count={5} />),
  },
);

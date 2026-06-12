import figma from "@figma/code-connect";
import { AccordionItem } from "./AccordionItem";

figma.connect(
  AccordionItem,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=174-19",
  {
    props: {
      title: figma.string("titulo"),
      body: figma.string("textoCuerpo"),
      defaultOpen: figma.enum("estado", { Expandido: true }),
    },
    example: ({ title, body, defaultOpen }) => (
      <AccordionItem title={title} defaultOpen={defaultOpen}>
        {body}
      </AccordionItem>
    ),
  },
);

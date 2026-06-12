import figma from "@figma/code-connect";
import { Accordion } from "./Accordion";
import { AccordionItem } from "../AccordionItem/AccordionItem";

figma.connect(
  Accordion,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=399-7",
  {
    example: () => (
      <Accordion>
        <AccordionItem title="¿Cómo funciona la facturación?" defaultOpen>
          Se emite el primer día de cada mes.
        </AccordionItem>
        <AccordionItem title="¿Puedo cancelar cuando quiera?">Sí, sin penalidad.</AccordionItem>
      </Accordion>
    ),
  },
);

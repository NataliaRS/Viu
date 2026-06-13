import type { Meta, StoryObj } from "@storybook/react";
import { AccordionItem } from "./AccordionItem";

/** Friendly playground controls (Card pattern). No slot props in the global disable
 * list — title and body are plain text. */
interface AccordionItemDemoArgs {
  title: string;
  body: string;
  defaultOpen: boolean;
}

const renderAccordionItem = (a: AccordionItemDemoArgs) => (
  <AccordionItem title={a.title} defaultOpen={a.defaultOpen}>
    {a.body}
  </AccordionItem>
);

const meta = {
  title: "Components/Molecules/AccordionItem",
  component: AccordionItem,
  tags: ["autodocs"],
  render: renderAccordionItem,
  args: {
    title: "¿Cómo funciona la facturación?",
    body: "Se emite el primer día de cada mes según tu plan.",
    defaultOpen: false,
  },
  argTypes: {
    title: { type: { name: "string" }, control: "text", description: "Título del header.", table: { category: "Texto" } },
    body: { type: { name: "string" }, control: "text", description: "Contenido que se muestra al expandir.", table: { category: "Texto" } },
    defaultOpen: { type: { name: "boolean" }, control: "boolean", description: "Abierto por defecto (no controlado).", table: { category: "Estado" } },
  },
  parameters: {
    controls: { include: ["title", "body", "defaultOpen"] },
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=174-19",
      overview: "Sección colapsable individual: header con título + chevron y un cuerpo que se muestra al expandir.",
      whenToUse: ["Una unidad de contenido colapsable.", "Componer un Accordion."],
      whenNotToUse: ["Contenido que debe estar siempre visible."],
      anatomy: ["Header (botón) con título + chevron que rota.", "Body (region) visible al expandir."],
      accessibility: ["aria-expanded en el header; body como region con aria-controls.", "Controlado (open/onOpenChange) o no controlado (defaultOpen)."],
      dos: ["Título que resuma el contenido."],
      donts: ["No metas formularios largos sin necesidad."],
    },
  },
  decorators: [(S) => <div style={{ width: 480, maxWidth: "100%" }}>{S()}</div>],
} satisfies Meta<AccordionItemDemoArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {};
export const Expanded: Story = { args: { defaultOpen: true } };

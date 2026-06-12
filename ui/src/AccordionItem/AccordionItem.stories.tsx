import type { Meta, StoryObj } from "@storybook/react";
import { AccordionItem } from "./AccordionItem";

const meta = {
  title: "Components/Molecules/AccordionItem",
  component: AccordionItem,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "stable",
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
  args: { title: "¿Cómo funciona la facturación?", children: "Se emite el primer día de cada mes según tu plan." },
  argTypes: { defaultOpen: { control: "boolean" } },
  decorators: [(S) => <div style={{ width: 480, maxWidth: "100%" }}>{S()}</div>],
} satisfies Meta<typeof AccordionItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {};
export const Expanded: Story = { args: { defaultOpen: true } };

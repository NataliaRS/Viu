import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./Accordion";
import { AccordionItem } from "../AccordionItem/AccordionItem";

const meta = {
  title: "Components/Molecules/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=399-7",
      overview: "Agrupa secciones colapsables (AccordionItem) separadas por divisores.",
      whenToUse: ["FAQ o contenido extenso dividido en secciones.", "Reducir scroll mostrando lo esencial."],
      whenNotToUse: ["Pocas secciones siempre visibles → mostralas abiertas.", "Alternar vistas → usá Tabs."],
      anatomy: ["Lista de AccordionItem con divisores entre sí."],
      accessibility: ["Cada item: header con aria-expanded y body como region (aria-controls)."],
      dos: ["Títulos claros y escaneables."],
      donts: ["No anides accordions en exceso."],
    },
  },
  decorators: [(S) => <div style={{ width: 480, maxWidth: "100%" }}>{S()}</div>],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FAQ: Story = {
  render: () => (
    <Accordion>
      <AccordionItem title="¿Cómo funciona la facturación?" defaultOpen>
        Se emite el primer día de cada mes según tu plan activo. Podés cambiar de plan cuando quieras;
        el ajuste se prorratea.
      </AccordionItem>
      <AccordionItem title="¿Puedo cancelar cuando quiera?">
        Sí, sin penalidad. El acceso continúa hasta el fin del período pago.
      </AccordionItem>
      <AccordionItem title="¿Ofrecen descuentos anuales?">
        Sí, el plan anual tiene dos meses bonificados.
      </AccordionItem>
    </Accordion>
  ),
};

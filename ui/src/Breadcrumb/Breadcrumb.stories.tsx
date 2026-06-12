import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./Breadcrumb";

const meta = {
  title: "Components/Molecules/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=163-19",
      overview: "Ruta de navegación jerárquica hasta la página actual, con separador chevron o barra.",
      whenToUse: ["Mostrar la ubicación dentro de una jerarquía.", "Permitir volver a niveles superiores."],
      whenNotToUse: ["Navegación principal → usá Nav.", "Pasos de un proceso → usá Stepper."],
      anatomy: ["Lista de niveles (links).", "Separadores (› o /).", "Nivel actual (no enlazado, aria-current)."],
      accessibility: ["nav con aria-label “Breadcrumb”.", "El actual usa aria-current=page; los separadores son aria-hidden."],
      dos: ["El último ítem es la página actual (sin link).", "Mantené las etiquetas cortas."],
      donts: ["No incluyas demasiados niveles.", "No enlaces el ítem actual."],
    },
  },
  args: {
    items: [
      { label: "Inicio", href: "#" },
      { label: "Proyectos", href: "#" },
      { label: "Rediseño 2026" },
    ],
  },
  argTypes: { separator: { control: "inline-radio", options: ["chevron", "slash"] } },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Chevron: Story = {};
export const Slash: Story = { args: { separator: "slash" } };

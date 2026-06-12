import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination";

const meta = {
  title: "Components/Molecules/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=168-32",
      overview: "Control para recorrer páginas de un conjunto de resultados. Numerada (con elipsis) o simple.",
      whenToUse: ["Dividir listas/tablas largas en páginas.", "Cuando el total de páginas es conocido."],
      whenNotToUse: ["Carga continua → usá scroll infinito / “cargar más”.", "Pocos ítems → mostralos todos."],
      anatomy: ["Botones anterior/siguiente.", "Celdas de página (actual resaltada) + elipsis.", "Variante simple: “Página X de Y”."],
      accessibility: ["nav con aria-label; la página actual usa aria-current=page.", "Botones con aria-label (anterior/siguiente); deshabilitados en los extremos."],
      dos: ["Resaltá la página actual.", "Deshabilitá anterior/siguiente en los límites."],
      donts: ["No escondas el total si lo conocés.", "No uses celdas demasiado chicas para el dedo."],
    },
  },
  args: { variant: "numbered", total: 10, page: 1, onPageChange: () => {} },
  argTypes: { variant: { control: "inline-radio", options: ["numbered", "simple"] } },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Numbered: Story = {
  render: (args) => {
    const [page, setPage] = useState(3);
    return <Pagination {...args} page={page} onPageChange={setPage} />;
  },
};
export const Simple: Story = {
  args: { variant: "simple" },
  render: (args) => {
    const [page, setPage] = useState(1);
    return <Pagination {...args} page={page} onPageChange={setPage} />;
  },
};

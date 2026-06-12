import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "./PageHeader";
import { Breadcrumb } from "../Breadcrumb/Breadcrumb";
import { Button } from "../Button/Button";

const meta = {
  title: "Components/Organisms/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=147-89",
      overview: "Encabezado de página: breadcrumb, título (+ back/status), subtítulo, acciones y tabs. 3 variantes.",
      whenToUse: ["Encabezar una vista o sección.", "Dar contexto + acciones principales de la página."],
      whenNotToUse: ["Navegación lateral → usá Nav.", "Encabezado de una card → no."],
      anatomy: ["Breadcrumb + título (+ back, status).", "Subtítulo.", "Acciones (derecha).", "Tabs + divisor."],
      accessibility: ["Usá <header> con un <h1>.", "El back es un IconButton con aria-label."],
      dos: ["Una acción primaria clara.", "Breadcrumb cuando hay jerarquía."],
      donts: ["No metas demasiadas acciones.", "No uses más de un h1 por página."],
    },
  },
  args: {
    title: "Rediseño 2026",
    subtitle: "Descripción breve de la página y su propósito para orientar al usuario.",
    variant: "standard",
  },
  argTypes: { variant: { control: "inline-radio", options: ["standard", "compact", "centered"] } },
  decorators: [(S) => <div style={{ width: 880, maxWidth: "100%" }}>{S()}</div>],
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    breadcrumb: (
      <Breadcrumb
        items={[{ label: "Inicio", href: "#" }, { label: "Proyectos", href: "#" }, { label: "Rediseño 2026" }]}
      />
    ),
    actions: (
      <>
        <Button variant="secondary">Compartir</Button>
        <Button variant="primary">Editar</Button>
      </>
    ),
  },
};
export const Centered: Story = { args: { variant: "centered" } };

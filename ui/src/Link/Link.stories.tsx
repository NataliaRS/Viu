import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";

const meta = {
  title: "Components/Atoms/Link",
  component: Link,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=22-137",
      overview: "Enlace de texto inline para navegar a otra página, sección o recurso.",
      whenToUse: ["Navegar a una URL o ancla.", "Acción secundaria de texto dentro de un párrafo."],
      whenNotToUse: ["Para disparar una acción (enviar/guardar) → usá Button.", "Como botón estilado."],
      anatomy: ["Texto (text/link), subrayado en hover.", "Estados: default · hover · disabled · focus."],
      accessibility: ["Es un <a> con href; usá texto descriptivo (no “clic acá”).", "Foco visible; disabled expone aria-disabled."],
      dos: ["Texto que describe el destino.", "Distinguible del texto normal (color + hover)."],
      donts: ["No uses Link para acciones.", "No abuses de “leer más” sin contexto."],
    },
  },
  args: { children: "Ver más", href: "#" },
  argTypes: { disabled: { control: "boolean" } },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const InText: Story = {
  render: (args) => (
    <p className="viu-type-body-l" style={{ color: "var(--color-text-secondary)" }}>
      Esto es un párrafo con un <Link {...args}>enlace</Link> en medio del texto.
    </p>
  ),
};

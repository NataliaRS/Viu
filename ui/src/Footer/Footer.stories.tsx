import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./Footer";
import { Link } from "../Link/Link";

const meta = {
  title: "Components/Organisms/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=415-7",
      overview: "Pie de página con enlaces y aviso de copyright, separado por un borde superior.",
      whenToUse: ["Cerrar una página con links secundarios y legales."],
      whenNotToUse: ["Acciones de un formulario → usá una barra de acciones."],
      anatomy: ["Borde superior.", "Enlaces (children).", "Copyright (texto fino)."],
      accessibility: ["Usá <footer>; links con texto descriptivo."],
      dos: ["Agrupá links por tema si son muchos."],
      donts: ["No metas acciones críticas en el footer."],
    },
  },
  args: { copyright: "© 2026 VIU. Todos los derechos reservados." },
  decorators: [(S) => <div style={{ width: 880, maxWidth: "100%" }}>{S()}</div>],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Footer {...args}>
      <span style={{ display: "flex", gap: "var(--space-lg)" }}>
        <Link href="#">Privacidad</Link>
        <Link href="#">Términos</Link>
        <Link href="#">Contacto</Link>
      </span>
    </Footer>
  ),
};

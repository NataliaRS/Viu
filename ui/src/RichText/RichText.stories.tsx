import type { Meta, StoryObj } from "@storybook/react";
import { RichText } from "./RichText";

const meta = {
  title: "Components/Molecules/RichText",
  component: RichText,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=402-7",
      overview: "Contenedor de prosa que aplica la escala tipográfica VIU a contenido rico (títulos, párrafos, listas, links).",
      whenToUse: ["Contenido editorial o de ayuda con formato.", "Renderizar HTML/Markdown ya convertido."],
      whenNotToUse: ["Texto simple de UI → usá las clases viu-type-*.", "Una sola cita → usá Quote."],
      anatomy: ["Estilos para h2/h3, p, a, ul/ol, blockquote, code, hr."],
      accessibility: ["Usá una jerarquía de headings correcta.", "Si pasás `html`, sanitizalo antes (evitá XSS)."],
      dos: ["Mantené la jerarquía de títulos.", "Sanitizá el HTML de origen."],
      donts: ["No inyectes HTML sin sanitizar."],
    },
  },
  decorators: [(S) => <div style={{ maxWidth: 640 }}>{S()}</div>],
} satisfies Meta<typeof RichText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Article: Story = {
  render: () => (
    <RichText>
      <h2>Guía de estilo</h2>
      <p>
        Este es un párrafo de ejemplo con <strong>texto destacado</strong> y un{" "}
        <a href="#">enlace</a> dentro del flujo.
      </p>
      <h3>Principios</h3>
      <ul>
        <li>Consistencia sobre creatividad innecesaria.</li>
        <li>Accesible por defecto.</li>
        <li>
          Tokens como <code>fuente de verdad</code>.
        </li>
      </ul>
      <blockquote>El detalle es lo que separa lo bueno de lo memorable.</blockquote>
    </RichText>
  ),
};

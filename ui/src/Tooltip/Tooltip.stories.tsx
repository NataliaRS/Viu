import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button/Button";

const meta = {
  title: "Components/Atoms/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Reviewed",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=23-167",
      overview: "Etiqueta flotante con info breve al hover/focus del trigger. (CSS-only, sin colisión/flip.)",
      whenToUse: ["Aclarar un ícono o acción ambigua.", "Mostrar el nombre de un control compacto."],
      whenNotToUse: ["Para contenido esencial → ponelo visible.", "Para contenido interactivo o largo → usá Popover."],
      anatomy: ["Burbuja (bg/elevated + text), 4 lados."],
      accessibility: ["Aparece en hover Y focus (teclado).", "role=tooltip; nunca pongas info crítica solo acá."],
      dos: ["Texto muy corto.", "Asegurá que aparezca con teclado."],
      donts: ["No pongas acciones adentro.", "No lo uses para info imprescindible."],
    },
  },
  args: { label: "Información útil", side: "top", children: "trigger" },
  argTypes: { side: { control: "inline-radio", options: ["top", "bottom", "left", "right"] } },
  decorators: [(S) => <div style={{ padding: "var(--space-3xl)" }}>{S()}</div>],
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="secondary">Pasá el mouse</Button>
    </Tooltip>
  ),
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {};
export const Bottom: Story = { args: { side: "bottom" } };

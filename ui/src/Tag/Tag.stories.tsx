import type { Meta, StoryObj } from "@storybook/react";
import { Tag, type TagTone } from "./Tag";

const tones: TagTone[] = ["neutral", "brand", "indigo"];

const meta = {
  title: "Components/Atoms/Tag",
  component: Tag,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=15-42",
      overview: "Etiqueta de clasificación no interactiva. 3 tonos (neutral/brand/indigo).",
      whenToUse: ["Clasificar o etiquetar contenido (categorías, temas).", "Mostrar metadatos de un ítem."],
      whenNotToUse: ["Si se puede quitar o seleccionar → usá Chip.", "Para estado de feedback → usá Badge."],
      anatomy: ["Contenedor radius/control, tono (subtle + text)."],
      accessibility: ["No interactivo; el significado va por el texto."],
      dos: ["Usalo para taxonomía estable.", "Texto conciso."],
      donts: ["No agregues acciones (✕) → eso es Chip."],
    },
  },
  args: { children: "Etiqueta", tone: "neutral" },
  argTypes: { tone: { control: "inline-radio", options: tones } },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AllTones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-sm)", flexWrap: "wrap" }}>
      {tones.map((t) => (
        <Tag key={t} tone={t}>
          {t}
        </Tag>
      ))}
    </div>
  ),
};

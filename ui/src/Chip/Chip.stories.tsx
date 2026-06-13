import type { Meta, StoryObj } from "@storybook/react";
import { Chip, type ChipVariant } from "./Chip";
import { Avatar } from "../Avatar/Avatar";

/** Friendly playground controls (Card pattern). `avatar` is in the global slot disable
 * list → decoupled as `showAvatar`; functions become `show*` toggles. */
interface ChipDemoArgs {
  variant: ChipVariant;
  label: string;
  disabled: boolean;
  selected: boolean;
  showAvatar: boolean;
  showRemove: boolean;
}

const renderChip = (a: ChipDemoArgs) => (
  <Chip
    variant={a.variant}
    label={a.label}
    disabled={a.disabled}
    selected={a.selected}
    avatar={a.showAvatar ? <Avatar size="xs" initials="NR" /> : undefined}
    onRemove={a.showRemove ? () => {} : undefined}
    onToggle={a.variant === "choice" ? () => {} : undefined}
  />
);

const meta = {
  title: "Components/Atoms/Chip",
  component: Chip,
  tags: ["autodocs"],
  render: renderChip,
  args: {
    variant: "input",
    label: "Etiqueta",
    disabled: false,
    selected: false,
    showAvatar: false,
    showRemove: true,
  },
  argTypes: {
    variant: { type: { name: "enum", value: ["input", "avatar", "choice"] }, control: "inline-radio", options: ["input", "avatar", "choice"], description: "Tipo: input (removible) / avatar / choice (selección).", table: { category: "Variante" } },
    label: { type: { name: "string" }, control: "text", description: "Texto del chip.", table: { category: "Texto" } },
    disabled: { type: { name: "boolean" }, control: "boolean", description: "Deshabilitado.", table: { category: "Estado" } },
    selected: { type: { name: "boolean" }, control: "boolean", description: "Seleccionado (variante choice).", table: { category: "Estado" } },
    showAvatar: { type: { name: "boolean" }, control: "boolean", description: "Mostrar avatar (variante avatar).", table: { category: "Estructura" } },
    showRemove: { type: { name: "boolean" }, control: "boolean", description: "Mostrar el botón de quitar (✕).", table: { category: "Estructura" } },
  },
  parameters: {
    controls: { include: ["variant", "label", "disabled", "selected", "showAvatar", "showRemove"] },
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=17-67",
      overview: "Ficha compacta: entrada removible, con avatar, o de selección (choice).",
      whenToUse: ["Tokens de entrada removibles (tags de un input, destinatarios).", "Selección múltiple tipo choice."],
      whenNotToUse: ["Etiqueta no interactiva → Tag/Badge.", "Filtro on/off simple → Pill."],
      anatomy: ["Contenedor pill.", "Avatar opcional (variante).", "Acción de quitar (✕) o check (choice)."],
      accessibility: ["El botón de quitar lleva aria-label.", "Choice expone aria-pressed; foco visible."],
      dos: ["Usá `onRemove` para entradas removibles.", "Choice para selección múltiple."],
      donts: ["No mezcles quitar y choice en el mismo chip."],
    },
  },
} satisfies Meta<ChipDemoArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Input: Story = {};
export const WithAvatar: Story = { args: { variant: "avatar", label: "Natalia", showAvatar: true } };
export const Choice: Story = { args: { variant: "choice", label: "Opción", selected: true, showRemove: false } };
export const Disabled: Story = { args: { disabled: true } };

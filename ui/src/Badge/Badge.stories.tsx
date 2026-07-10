import type { Meta, StoryObj } from "@storybook/react";
import { Badge, type BadgeTone } from "./Badge";

const tones: BadgeTone[] = ["neutral", "brand", "success", "warning", "danger", "info"];

const meta = {
  title: "Components/Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=14-77",
      overview: "Etiqueta de estado o categoría no interactiva. 6 tonos soft (neutral + feedback), fondo claro + texto on-soft (AA).",
      whenToUse: ["Comunicar estado o conteo categórico (Nuevo, Activo, 3).", "Clasificar un ítem acompañándolo."],
      whenNotToUse: ["Si es accionable → usá Pill/Chip.", "Para notificaciones sobre un ícono → Notification badge."],
      anatomy: ["Contenedor pill, tono soft (fondo *-soft + texto *-on-soft).", "Ícono leading opcional (@xs, glifo default sell); hereda el color del texto.", "Label en micro-mayúscula (Label/S)."],
      accessibility: ["No interactivo; el significado va con texto, no solo color.", "El ícono leading es decorativo (aria-hidden).", "Si el estado cambia en vivo, considerá aria-live en el contenedor."],
      dos: ["Texto corto (1–2 palabras).", "Tono coherente con el significado (danger = error)."],
      donts: ["No lo hagas clickable.", "No comuniques solo por color."],
    },
  },
  args: { children: "Nuevo", tone: "neutral" },
  argTypes: { tone: { control: "inline-radio", options: tones } },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AllTones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-sm)", flexWrap: "wrap" }}>
      {tones.map((t) => (
        <Badge key={t} tone={t}>
          {t}
        </Badge>
      ))}
    </div>
  ),
};
export const WithIcon: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-sm)", flexWrap: "wrap" }}>
      {tones.map((t) => (
        <Badge key={t} tone={t} icon>
          {t}
        </Badge>
      ))}
    </div>
  ),
};

/**
 * VisualParity — story de PARIDAD para la regresión visual (F5). Espeja EXACTAMENTE
 * el contenido del nodo Figma `14:59` (Tone=Neutral: `Punto` 6px + label "Etiqueta",
 * sin `Icono`), no un caso de uso. Regla del manifest de baselines: cada entry de
 * regresión apunta a una story así — el comparador pixel-diffea contenidos idénticos,
 * no "Nuevo" (Default) contra "Etiqueta" (Figma). No la borres ni le cambies el
 * contenido sin re-alinear la baseline.
 */
export const VisualParity: Story = {
  parameters: { controls: { disable: true } },
  // El nodo Figma `14:59` se exporta en tema CLARO (neutral-soft #e8e8eb). El decorator
  // global cae a "dark" por defecto → comparar dark(story) vs light(Figma) infla el diff
  // por fondo/tema, no por render de fuente. Igualamos el tema del nodo para un % justo.
  globals: { theme: "light" },
  args: {
    tone: "neutral",
    children: "Etiqueta",
    // El nodo tiene un `Punto` (ellipse 6px) leading, distinto del slot `Icono`. El
    // componente no expone `punto`, pero `icon` acepta cualquier nodo → replicamos el
    // punto (6px, hereda el color on-soft vía currentColor, decorativo).
    icon: (
      <span
        aria-hidden
        style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", display: "inline-block" }}
      />
    ),
  },
};

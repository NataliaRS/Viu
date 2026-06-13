import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./Icon";
import type { GlyphName } from "./glyphs";

const allGlyphs: GlyphName[] = [
  "Plus",
  "Check",
  "Chevron",
  "Close",
  "Arrow",
  "Search",
  "Info",
  "Alert",
  "Visibility",
  "VisibilityOff",
  "Folder",
];

const meta = {
  title: "Components/Atoms/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=56-431",
      overview:
        "Glifo de 16px con stroke en currentColor. Set del sistema: Plus, Check, Chevron, Close, Arrow, Search, Info, Alert, Visibility, VisibilityOff, Folder.",
      whenToUse: ["Reforzar el significado de una acción o estado.", "Dentro de otros componentes (Button, Input, Tab…)."],
      whenNotToUse: ["Como única forma de comunicar algo crítico → acompañá con texto o `title`.", "Para ilustraciones grandes — no es un sistema ilustrativo."],
      anatomy: ["SVG 16×16, stroke currentColor 1.5.", "Glyph — uno de los 11 del set."],
      accessibility: ["Decorativo por defecto (aria-hidden).", "Con `title` se expone como imagen con nombre accesible.", "Hereda el color del texto (currentColor)."],
      dos: ["Heredá el color del contexto.", "Usá `title` cuando el ícono tiene significado propio."],
      donts: ["No reescales rompiendo la grilla de 16.", "No uses íconos fuera del set sin sumarlos al sistema."],
    },
  },
  args: { glyph: "Search", size: 24 },
  argTypes: {
    glyph: { control: "select", options: allGlyphs },
    size: { control: { type: "number", min: 12, max: 64, step: 2 } },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllGlyphs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-lg)" }}>
      {allGlyphs.map((g) => (
        <div
          key={g}
          style={{ display: "grid", placeItems: "center", gap: "var(--space-xs)", width: 72 }}
        >
          <Icon glyph={g} size={28} title={g} />
          <span
            className="viu-type-body-s"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            {g}
          </span>
        </div>
      ))}
    </div>
  ),
};

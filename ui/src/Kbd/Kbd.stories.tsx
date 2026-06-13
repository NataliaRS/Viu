import type { Meta, StoryObj } from "@storybook/react";
import { Kbd } from "./Kbd";

const meta = {
  title: "Components/Atoms/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=721-7",
      overview: "Keycap monoespaciado para representar una tecla o atajo de teclado. Crece con el texto desde un mínimo cuadrado.",
      whenToUse: ["Mostrar un atajo (⌘K, Esc, Enter).", "Documentar teclas en ayuda o menús."],
      whenNotToUse: ["Para código en línea → usá un `<code>`.", "Para una acción clickeable → usá Button."],
      anatomy: ["Caja (bg/elevated + border/default + radius/control) con sombra inferior.", "Texto JetBrains Mono (code/S), text/secondary."],
      accessibility: ["Renderiza un `<kbd>` semántico.", "El contraste del texto cumple AA."],
      dos: ["Usá el símbolo real de la tecla (⌘, ⇧, ↵).", "Combiná varios Kbd para un atajo (⌘ + K)."],
      donts: ["No lo uses como botón.", "No metas frases largas adentro."],
    },
  },
  args: { children: "K" },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Word: Story = { args: { children: "Esc" } };

export const Shortcut: Story = {
  render: () => (
    <span style={{ display: "inline-flex", gap: "var(--space-2xs)", alignItems: "center", fontFamily: "var(--font-family-body)", color: "var(--color-text-secondary)" }}>
      <Kbd>⌘</Kbd> + <Kbd>K</Kbd>
    </span>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import { TimePicker } from "./TimePicker";

const meta = {
  title: "Components/Molecules/TimePicker",
  component: TimePicker,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=409-6",
      overview: "Campo de hora con dropdown propio de la marca (Figma 409:6, estado Abierto). Reemplaza el selector nativo: lista de horas por `step` (default 30 min); la opción elegida se marca con bg/subtle + text/primary + check Icon.",
      whenToUse: ["Capturar una hora.", "Junto a un Datepicker para fecha + hora."],
      whenNotToUse: ["Texto libre → usá Input.", "Duración/rango → un control específico."],
      anatomy: ["Label.", "Control (valor + chevron ↑ al abrir) sobre bg/subtle.", "Dropdown de opciones (opción elegida con check).", "Ayuda o error."],
      accessibility: ["Control con aria-haspopup=listbox + aria-expanded; opciones role=option con aria-selected.", "Teclado: ↑/↓ mueven, Enter elige, Escape cierra.", "Label asociado por htmlFor; error con aria-invalid + texto."],
      dos: ["Ajustá `step`/`min`/`max` al caso.", "Preseleccioná una hora razonable."],
      donts: ["No uses el picker nativo del navegador (rompe la marca).", "No parsees hora con un Input de texto libre."],
    },
  },
  args: { label: "Hora", htmlFor: "tp", helper: "Formato 24 h.", defaultValue: "14:30" },
  argTypes: { error: { control: "text" }, disabled: { control: "boolean" } },
  decorators: [(S) => <div style={{ width: 320, minHeight: 360 }}>{S()}</div>],
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Error: Story = { args: { error: "Elegí una hora válida." } };
export const Disabled: Story = { args: { disabled: true } };

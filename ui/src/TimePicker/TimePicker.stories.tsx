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
      overview: "Campo de hora: dispara el selector nativo de hora. Incluye label, ayuda/error y estados.",
      whenToUse: ["Capturar una hora.", "Junto a un Datepicker para fecha + hora."],
      whenNotToUse: ["Texto libre → usá Input.", "Duración/rango → un control específico."],
      anatomy: ["Label.", "Control (valor + chevron) sobre bg/elevated.", "Ayuda o error."],
      accessibility: ["Usa <input type=time> nativo (teclado + picker del sistema).", "Asociá el label con htmlFor; el error usa aria-invalid + texto."],
      dos: ["Mostrá el formato esperado en la ayuda.", "Definí min/max si aplica."],
      donts: ["No parsees hora con un Input de texto libre."],
    },
  },
  args: { label: "Hora", htmlFor: "tp", helper: "Formato 24 h.", defaultValue: "14:30" },
  argTypes: { error: { control: "text" }, disabled: { control: "boolean" } },
  decorators: [(S) => <div style={{ width: 320 }}>{S()}</div>],
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Error: Story = { args: { error: "Elegí una hora válida." } };
export const Disabled: Story = { args: { disabled: true } };

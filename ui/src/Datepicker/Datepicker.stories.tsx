import type { Meta, StoryObj } from "@storybook/react";
import { Datepicker } from "./Datepicker";

const meta = {
  title: "Components/Molecules/Datepicker",
  component: Datepicker,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=28-386",
      overview: "Campo de fecha: dispara el selector nativo de fecha. Incluye label, ayuda/error y estados.",
      whenToUse: ["Capturar una fecha.", "Filtros o formularios con fechas."],
      whenNotToUse: ["Rango de fechas → un date range picker (pendiente).", "Texto libre → Input."],
      anatomy: ["Label.", "Control (valor + chevron) sobre bg/elevated.", "Ayuda o error."],
      accessibility: ["Usa <input type=date> nativo (teclado + calendario del sistema).", "Asociá el label con htmlFor; el error usa aria-invalid + texto."],
      dos: ["Mostrá el formato en la ayuda.", "Definí min/max razonables."],
      donts: ["No parsees fechas con un Input de texto libre."],
    },
  },
  args: { label: "Fecha", htmlFor: "dp", helper: "Elegí una fecha." },
  argTypes: { error: { control: "text" }, disabled: { control: "boolean" } },
  decorators: [(S) => <div style={{ width: 320 }}>{S()}</div>],
} satisfies Meta<typeof Datepicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Error: Story = { args: { error: "Elegí una fecha válida." } };
export const Disabled: Story = { args: { disabled: true } };

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
      overview:
        "Campo de fecha con calendario propio de la marca: un disparador que abre un popover con la grilla del mes. El día seleccionado es un círculo de marca y el día de hoy un círculo con borde.",
      whenToUse: ["Capturar una fecha única.", "Filtros o formularios con fechas."],
      whenNotToUse: ["Rango de fechas → DateRangePicker.", "Texto libre → Input."],
      anatomy: [
        "Label.",
        "Campo (valor o placeholder DD / MM / AAAA + chevron) sobre bg/subtle.",
        "Popover de calendario: header con mes y navegación, fila de días de semana, grilla.",
        "Ayuda o error.",
      ],
      accessibility: [
        "El disparador expone aria-haspopup=dialog y aria-expanded.",
        "Cada día es un button con aria-label de la fecha y aria-pressed para el seleccionado.",
        "Escape cierra; un click fuera cierra. El error usa aria-invalid + texto.",
      ],
      dos: ["Preseleccioná una fecha razonable si aplica.", "Usá el label y la ayuda con el formato."],
      donts: ["No parsees fechas con un Input de texto libre.", "No uses el picker nativo del navegador (rompe la marca)."],
    },
  },
  args: { label: "Fecha", htmlFor: "dp", helper: "Elegí una fecha." },
  argTypes: { error: { control: "text" }, disabled: { control: "boolean" } },
  decorators: [(S) => <div style={{ width: 320, minHeight: 420 }}>{S()}</div>],
} satisfies Meta<typeof Datepicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const ConValor: Story = {
  name: "Con valor",
  args: { defaultValue: new Date(2026, 5, 14) },
};
export const Error: Story = { args: { error: "Elegí una fecha válida." } };
export const Disabled: Story = { args: { disabled: true } };

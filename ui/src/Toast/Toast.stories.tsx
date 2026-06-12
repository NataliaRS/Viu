import type { Meta, StoryObj } from "@storybook/react";
import { Toast, type ToastTone } from "./Toast";
import { Button } from "../Button/Button";

const tones: ToastTone[] = ["info", "success", "warning", "danger"];

const meta = {
  title: "Components/Molecules/Toast",
  component: Toast,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=176-101",
      overview: "Notificación transitoria y flotante que confirma una acción o informa un evento. 4 tonos.",
      whenToUse: ["Confirmar una acción (guardado, enviado).", "Avisos breves que se autodescartan."],
      whenNotToUse: ["Mensajes persistentes en el layout → usá Banner.", "Errores de formulario → FormField/error."],
      anatomy: ["Ícono por tono (20px).", "Mensaje (+ título opcional).", "Acción opcional + cierre.", "Superficie elevada con sombra overlay."],
      accessibility: ["role=status + aria-live=polite para anunciarlo sin robar foco.", "El cierre tiene aria-label; mantené el texto corto."],
      dos: ["Texto breve y accionable.", "Autodescartá tras unos segundos (salvo error)."],
      donts: ["No metas contenido largo o crítico.", "No apiles demasiados a la vez."],
    },
  },
  args: { tone: "success", title: "Cambios guardados", children: "Tu información se actualizó correctamente.", onClose: () => {} },
  argTypes: { tone: { control: "inline-radio", options: tones } },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithAction: Story = {
  args: { tone: "info", title: undefined, children: "Se archivó el proyecto.", action: <Button variant="tertiary" size="sm">Deshacer</Button> },
};
export const AllTones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-md)" }}>
      {tones.map((t) => (
        <Toast key={t} tone={t} title={t} onClose={() => {}}>
          Mensaje de ejemplo del tono {t}.
        </Toast>
      ))}
    </div>
  ),
};

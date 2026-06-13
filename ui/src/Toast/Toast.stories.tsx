import type { Meta, StoryObj } from "@storybook/react";
import { Toast, type ToastTone } from "./Toast";

const tones: ToastTone[] = ["info", "success", "warning", "danger"];

/**
 * Friendly playground controls (Card pattern). `onClose` (a function) is toggled via
 * `showClose`. Title is optional (off by default in Figma) — toggle via `showTitle`.
 */
interface ToastDemoArgs {
  tone: ToastTone;
  showTitle: boolean;
  title: string;
  children: string;
  showClose: boolean;
}

const renderToast = (a: ToastDemoArgs) => (
  <Toast
    tone={a.tone}
    title={a.showTitle ? a.title || undefined : undefined}
    onClose={a.showClose ? () => {} : undefined}
  >
    {a.children}
  </Toast>
);

const meta = {
  title: "Components/Molecules/Toast",
  component: Toast,
  tags: ["autodocs"],
  render: renderToast,
  args: {
    tone: "success",
    showTitle: false,
    title: "Cambios guardados",
    children: "Tu información se actualizó correctamente.",
    showClose: true,
  },
  argTypes: {
    tone: { type: { name: "enum", value: tones }, control: "inline-radio", options: tones, description: "Tono (info/success/warning/danger).", table: { category: "Variante" } },
    showTitle: { type: { name: "boolean" }, control: "boolean", description: "Mostrar el título (off por defecto).", table: { category: "Texto" } },
    title: { type: { name: "string" }, control: "text", description: "Texto del título.", table: { category: "Texto" } },
    children: { type: { name: "string" }, control: "text", description: "Mensaje.", table: { category: "Texto" } },
    showClose: { type: { name: "boolean" }, control: "boolean", description: "Mostrar el botón de cierre.", table: { category: "Estructura" } },
  },
  parameters: {
    controls: { include: ["tone", "showTitle", "title", "children", "showClose"] },
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=176-101",
      overview: "Notificación transitoria y flotante que confirma una acción o informa un evento. 4 tonos.",
      whenToUse: ["Confirmar una acción (guardado, enviado).", "Avisos breves que se autodescartan."],
      whenNotToUse: ["Mensajes persistentes en el layout → usá Banner.", "Errores de formulario → FormField/error."],
      anatomy: ["Ícono por tono (20px).", "Mensaje (+ título opcional).", "Botón de cierre.", "Superficie elevada con sombra overlay."],
      accessibility: ["role=status + aria-live=polite para anunciarlo sin robar foco.", "El cierre tiene aria-label; mantené el texto corto."],
      dos: ["Texto breve y accionable.", "Autodescartá tras unos segundos (salvo error)."],
      donts: ["No metas contenido largo o crítico.", "No apiles demasiados a la vez."],
    },
  },
} satisfies Meta<ToastDemoArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithTitle: Story = { args: { tone: "info", showTitle: true, title: "Proyecto archivado", children: "Lo podés restaurar desde la papelera." } };
export const AllTones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-md)" }}>
      {tones.map((t) => (
        <Toast key={t} tone={t} onClose={() => {}}>
          Mensaje de ejemplo del tono {t}.
        </Toast>
      ))}
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import { Toast, type ToastTone } from "./Toast";
import { Button } from "../Button/Button";

const tones: ToastTone[] = ["info", "success", "warning", "danger"];

/**
 * Friendly playground controls (Card pattern). `action` is in the global slot
 * `control:false` list → decoupled as `showAction`; `onClose` (function) → `showClose`.
 */
interface ToastDemoArgs {
  tone: ToastTone;
  title: string;
  children: string;
  showAction: boolean;
  showClose: boolean;
}

const renderToast = (a: ToastDemoArgs) => (
  <Toast
    tone={a.tone}
    title={a.title || undefined}
    action={
      a.showAction ? (
        <Button variant="tertiary" size="sm">
          Deshacer
        </Button>
      ) : undefined
    }
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
    title: "Cambios guardados",
    children: "Tu información se actualizó correctamente.",
    showAction: false,
    showClose: true,
  },
  argTypes: {
    tone: { type: { name: "enum", value: tones }, control: "inline-radio", options: tones, description: "Tono (info/success/warning/danger).", table: { category: "Variante" } },
    title: { type: { name: "string" }, control: "text", description: "Título (opcional). Vaciá para quitarlo.", table: { category: "Texto" } },
    children: { type: { name: "string" }, control: "text", description: "Mensaje.", table: { category: "Texto" } },
    showAction: { type: { name: "boolean" }, control: "boolean", description: "Mostrar una acción (ej. Deshacer).", table: { category: "Estructura" } },
    showClose: { type: { name: "boolean" }, control: "boolean", description: "Mostrar el botón de cierre.", table: { category: "Estructura" } },
  },
  parameters: {
    controls: { include: ["tone", "title", "children", "showAction", "showClose"] },
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
} satisfies Meta<ToastDemoArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithAction: Story = { args: { tone: "info", title: "", children: "Se archivó el proyecto.", showAction: true } };
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

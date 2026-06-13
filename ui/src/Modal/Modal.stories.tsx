import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Modal, type ModalSize } from "./Modal";
import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";
import { Input } from "../Input/Input";
import { FormField } from "../FormField/FormField";

/**
 * Friendly playground controls (Card pattern). The overlay portals to <body> with a
 * scrim, so it's opened via a trigger (not always-on) to keep the Docs page usable;
 * `open` is kept in args to satisfy the required prop but is driven by state and
 * excluded from the controls panel. `icon` (global disable list) → showIcon.
 */
interface ModalDemoArgs {
  open: boolean;
  size: ModalSize;
  title: string;
  showSubtitle: boolean;
  subtitle: string;
  showIcon: boolean;
  showClose: boolean;
  showFooter: boolean;
  body: string;
}

const confirmFooter = (
  <>
    <Button variant="secondary">Cancelar</Button>
    <Button variant="primary">Eliminar</Button>
  </>
);

const meta = {
  title: "Components/Organisms/Modal",
  component: Modal,
  tags: ["autodocs"],
  render: (a: ModalDemoArgs) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          size={a.size}
          title={a.title}
          subtitle={a.showSubtitle ? a.subtitle || undefined : undefined}
          icon={a.showIcon ? <Icon glyph="Alert" size={16} /> : undefined}
          showClose={a.showClose}
          footer={a.showFooter ? confirmFooter : undefined}
        >
          {a.body}
        </Modal>
      </>
    );
  },
  args: {
    open: true,
    size: "md",
    title: "¿Eliminar proyecto?",
    showSubtitle: true,
    subtitle: "Esta acción no se puede deshacer.",
    showIcon: false,
    showClose: true,
    showFooter: true,
    body: "Se eliminarán el proyecto y todos sus archivos asociados. Los colaboradores perderán el acceso de inmediato.",
  },
  argTypes: {
    size: { type: { name: "enum", value: ["sm", "md", "lg"] }, control: "inline-radio", options: ["sm", "md", "lg"], description: "Ancho: SM/MD/LG (400/520/680).", table: { category: "Variante" } },
    title: { type: { name: "string" }, control: "text", description: "Título del diálogo.", table: { category: "Texto" } },
    showSubtitle: { type: { name: "boolean" }, control: "boolean", description: "Mostrar el subtítulo.", table: { category: "Texto" } },
    subtitle: { type: { name: "string" }, control: "text", description: "Texto del subtítulo.", table: { category: "Texto" } },
    body: { type: { name: "string" }, control: "text", description: "Contenido del cuerpo.", table: { category: "Texto" } },
    showIcon: { type: { name: "boolean" }, control: "boolean", description: "Ícono en el header.", table: { category: "Estructura" } },
    showClose: { type: { name: "boolean" }, control: "boolean", description: "Botón de cierre.", table: { category: "Estructura" } },
    showFooter: { type: { name: "boolean" }, control: "boolean", description: "Footer con acciones.", table: { category: "Estructura" } },
  },
  parameters: {
    controls: { include: ["size", "title", "showSubtitle", "subtitle", "body", "showIcon", "showClose", "showFooter"] },
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=140-57",
      overview:
        "Diálogo modal centrado sobre un scrim. Atrapa el foco, cierra con Esc o clic en el fondo, y vuelve el foco al disparador al cerrar.",
      whenToUse: [
        "Confirmar una acción importante o destructiva.",
        "Pedir una decisión o un dato corto sin abandonar el contexto.",
        "Mostrar contenido focalizado que requiere atención completa.",
      ],
      whenNotToUse: [
        "Mensajes no bloqueantes → usá Toast o Banner.",
        "Tareas largas o con mucho contenido → usá Drawer o una página.",
        "Acción contextual anclada a un control → usá Popover.",
      ],
      anatomy: [
        "Scrim — alpha/black-72, capa z/modal.",
        "Diálogo — bg/elevated + border/subtle + shadow/overlay + radius/surface.",
        "Header — ícono opcional + título (Title/M) + subtítulo opcional + botón cerrar.",
        "Body — contenido (Body/M), scroll si excede el alto.",
        "Footer — acciones alineadas a la derecha (secundaria + primaria).",
      ],
      accessibility: [
        "role=dialog + aria-modal; aria-labelledby al título y aria-describedby al subtítulo.",
        "Foco atrapado mientras está abierto; Tab/Shift+Tab ciclan dentro.",
        "Esc cierra; el foco vuelve al elemento que lo abrió.",
        "El botón cerrar tiene aria-label; el scrim es clickeable para cerrar.",
      ],
      dos: ["Título claro que nombre la acción.", "Una acción primaria evidente; secundaria para cancelar.", "Mantené el contenido breve y focalizado."],
      donts: ["No anides modales.", "No lo uses para contenido extenso (preferí Drawer/página).", "No quites la salida (siempre Esc + cerrar)."],
    },
  },
} satisfies Meta<ModalDemoArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** SM / MD / LG widths (400 / 520 / 680). Shown inline (always open). */
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} style={{ position: "relative", minHeight: 220 }}>
          <Modal open size={size} title={`Tamaño ${size.toUpperCase()}`} subtitle="Subtítulo opcional con contexto." footer={confirmFooter}>
            Contenido del diálogo: explicá la acción, sus consecuencias y qué se espera del usuario.
          </Modal>
        </div>
      ))}
    </div>
  ),
};

/** A short form inside the body. */
export const FormDialog: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Nuevo proyecto"
        subtitle="Dale un nombre para empezar."
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>Crear</Button>
          </>
        }
      >
        <FormField label="Nombre del proyecto" htmlFor="modal-proj">
          <Input id="modal-proj" placeholder="Ej. Rediseño 2026" />
        </FormField>
      </Modal>
    );
  },
};

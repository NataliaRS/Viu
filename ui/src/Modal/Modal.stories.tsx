import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";
import { Input } from "../Input/Input";
import { FormField } from "../FormField/FormField";

const meta = {
  title: "Components/Organisms/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
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
      dos: [
        "Título claro que nombre la acción.",
        "Una acción primaria evidente; secundaria para cancelar.",
        "Mantené el contenido breve y focalizado.",
      ],
      donts: [
        "No anides modales.",
        "No lo uses para contenido extenso (preferí Drawer/página).",
        "No quites la salida (siempre Esc + cerrar).",
      ],
    },
  },
  args: {
    open: true,
    size: "md",
    title: "¿Eliminar proyecto?",
    showClose: true,
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    icon: { control: false },
    footer: { control: false },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const confirmFooter = (
  <>
    <Button variant="secondary">Cancelar</Button>
    <Button variant="primary">Eliminar</Button>
  </>
);

/** Open/close driven by a trigger, with focus return on close. */
export const Playground: Story = {
  args: {
    subtitle: "Esta acción no se puede deshacer.",
    children:
      "Se eliminarán el proyecto y todos sus archivos asociados. Los colaboradores perderán el acceso de inmediato.",
    footer: confirmFooter,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Eliminar proyecto</Button>
        <Modal {...args} open={open} onClose={() => setOpen(false)} footer={confirmFooter} />
      </>
    );
  },
};

/** SM / MD / LG widths (400 / 520 / 680). Shown inline (always open). */
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} style={{ position: "relative", minHeight: 220 }}>
          <Modal
            open
            size={size}
            title={`Tamaño ${size.toUpperCase()}`}
            subtitle="Subtítulo opcional con contexto."
            footer={confirmFooter}
          >
            Contenido del diálogo: explicá la acción, sus consecuencias y qué se espera del usuario.
          </Modal>
        </div>
      ))}
    </div>
  ),
};

/** Header with a leading icon. */
export const WithIcon: Story = {
  args: {
    icon: <Icon glyph="Alert" size={16} />,
    title: "Atención",
    subtitle: "Revisá antes de continuar.",
    children: "Algunos cambios pendientes se descartarán si salís ahora.",
    footer: (
      <>
        <Button variant="secondary">Volver</Button>
        <Button variant="primary">Descartar</Button>
      </>
    ),
  },
};

/** A short form inside the body. */
export const FormDialog: Story = {
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
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Crear
            </Button>
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

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Drawer, type DrawerSide } from "./Drawer";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Textarea } from "../Textarea/Textarea";
import { FormField } from "../FormField/FormField";

/**
 * Friendly playground controls (Card pattern). Opened via a trigger (portals to
 * <body>); `open` satisfies the required prop but is state-driven and excluded from
 * the controls panel.
 */
interface DrawerDemoArgs {
  open: boolean;
  side: DrawerSide;
  title: string;
  showClose: boolean;
  showFooter: boolean;
  body: string;
}

const editFooter = (
  <>
    <Button variant="secondary">Cancelar</Button>
    <Button variant="primary">Guardar cambios</Button>
  </>
);

const editBody = (
  <>
    <FormField label="Nombre" htmlFor="drawer-name">
      <Input id="drawer-name" defaultValue="Rediseño 2026" />
    </FormField>
    <FormField label="Descripción" htmlFor="drawer-desc">
      <Textarea id="drawer-desc" defaultValue="Rework del onboarding y la home." />
    </FormField>
  </>
);

const meta = {
  title: "Components/Organisms/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  render: (a: DrawerDemoArgs) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir drawer</Button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          side={a.side}
          title={a.title}
          showClose={a.showClose}
          footer={a.showFooter ? editFooter : undefined}
        >
          {a.body}
        </Drawer>
      </>
    );
  },
  args: {
    open: true,
    side: "right",
    title: "Editar proyecto",
    showClose: true,
    showFooter: true,
    body: "Contenido del panel: formularios, detalle o filtros que no justifican una página entera.",
  },
  argTypes: {
    side: { type: { name: "enum", value: ["right", "left"] }, control: "inline-radio", options: ["right", "left"], description: "Lado de entrada.", table: { category: "Variante" } },
    title: { type: { name: "string" }, control: "text", description: "Título del panel.", table: { category: "Texto" } },
    body: { type: { name: "string" }, control: "text", description: "Contenido del cuerpo.", table: { category: "Texto" } },
    showClose: { type: { name: "boolean" }, control: "boolean", description: "Botón de cierre.", table: { category: "Estructura" } },
    showFooter: { type: { name: "boolean" }, control: "boolean", description: "Footer con acciones.", table: { category: "Estructura" } },
  },
  parameters: {
    controls: { include: ["side", "title", "body", "showClose", "showFooter"] },
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=227-53",
      overview:
        "Panel lateral que entra desde el borde sobre un scrim. Atrapa el foco y cierra con Esc o clic en el fondo. Para flujos y contenido más extensos que un Modal.",
      whenToUse: [
        "Editar o crear con un formulario de mediano tamaño.",
        "Mostrar detalle o filtros sin abandonar la vista de fondo.",
        "Flujos de varios campos que no justifican una página entera.",
      ],
      whenNotToUse: [
        "Confirmaciones cortas → usá Modal.",
        "Acción contextual anclada a un control → usá Popover.",
        "Mensajes no bloqueantes → usá Toast/Banner.",
      ],
      anatomy: [
        "Scrim — alpha/black-72, capa z/modal.",
        "Panel — bg/elevated + shadow/overlay, alto completo, 420px.",
        "Header — título (Title/M) + botón cerrar.",
        "Divisores — border/subtle separando header / body / footer.",
        "Body — contenido con scroll (gap space/md).",
        "Footer — acciones alineadas a la derecha.",
      ],
      accessibility: [
        "role=dialog + aria-modal; aria-labelledby al título.",
        "Foco atrapado mientras está abierto; Tab/Shift+Tab ciclan dentro.",
        "Esc cierra; el foco vuelve al disparador.",
        "El botón cerrar tiene aria-label; el scrim cierra al clickear.",
      ],
      dos: ["Título que nombre la tarea.", "Acciones persistentes en el footer (guardar / cancelar).", "Permití scroll del body sin perder header/footer."],
      donts: ["No metas flujos de varios pasos sin progreso visible.", "No quites la salida (Esc + cerrar + scrim).", "No lo uses para mensajes efímeros."],
    },
  },
} satisfies Meta<DrawerDemoArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** A form inside the body, sliding in from the left. */
export const FromLeft: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <Drawer open={open} onClose={() => setOpen(false)} side="left" title="Filtros" footer={editFooter}>
        {editBody}
      </Drawer>
    );
  },
};

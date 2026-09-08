import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Drawer, type DrawerSide } from "./Drawer";
import { Button } from "../Button/Button";
import { Select } from "../Select/Select";
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
}

const MAX_COMMENTS = 280;

/** Contenido del nodo Figma 227:53: un Select "Rol" + un Textarea "Comentarios"
 *  con helper y contador. El contador es vivo (component → useState). */
function EditProjectBody() {
  const [comments, setComments] = useState(
    "Me encantó la nueva experiencia de onboarding. Lo único confuso fue el segundo paso.",
  );
  return (
    <>
      <FormField label="Rol" htmlFor="drawer-rol" helper="Elegí tu rol principal en el equipo.">
        <Select id="drawer-rol" defaultValue="Diseño de producto">
          <option>Diseño de producto</option>
          <option>Ingeniería</option>
          <option>Producto</option>
          <option>Marketing</option>
          <option>Soporte</option>
        </Select>
      </FormField>
      <FormField
        label="Comentarios"
        htmlFor="drawer-comentarios"
        helper={
          <span style={{ display: "flex", justifyContent: "space-between", gap: "var(--space-sm)" }}>
            <span>Contanos qué te pareció.</span>
            <span>
              {comments.length}/{MAX_COMMENTS}
            </span>
          </span>
        }
      >
        <Textarea
          id="drawer-comentarios"
          rows={3}
          maxLength={MAX_COMMENTS}
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </FormField>
    </>
  );
}

const editFooter = (
  <>
    <Button variant="secondary">Cancelar</Button>
    <Button variant="primary">Guardar cambios</Button>
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
          <EditProjectBody />
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
  },
  argTypes: {
    side: { type: { name: "enum", value: ["right", "left"] }, control: "inline-radio", options: ["right", "left"], description: "Lado de entrada.", table: { category: "Variante" } },
    title: { type: { name: "string" }, control: "text", description: "Título del panel.", table: { category: "Texto" } },
    showClose: { type: { name: "boolean" }, control: "boolean", description: "Botón de cierre.", table: { category: "Estructura" } },
    showFooter: { type: { name: "boolean" }, control: "boolean", description: "Footer con acciones.", table: { category: "Estructura" } },
  },
  parameters: {
    controls: { include: ["side", "title", "showClose", "showFooter"] },
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

/** El mismo formulario, entrando desde la izquierda. */
export const FromLeft: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <Drawer open={open} onClose={() => setOpen(false)} side="left" title="Editar proyecto" footer={editFooter}>
        <EditProjectBody />
      </Drawer>
    );
  },
};

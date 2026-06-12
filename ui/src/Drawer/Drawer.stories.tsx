import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Drawer } from "./Drawer";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Textarea } from "../Textarea/Textarea";
import { FormField } from "../FormField/FormField";

const meta = {
  title: "Components/Organisms/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  parameters: {
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
      dos: [
        "Título que nombre la tarea.",
        "Acciones persistentes en el footer (guardar / cancelar).",
        "Permití scroll del body sin perder header/footer.",
      ],
      donts: [
        "No metas flujos de varios pasos sin progreso visible.",
        "No quites la salida (Esc + cerrar + scrim).",
        "No lo uses para mensajes efímeros.",
      ],
    },
  },
  args: {
    open: true,
    side: "right",
    title: "Editar proyecto",
    showClose: true,
  },
  argTypes: {
    side: { control: "inline-radio", options: ["right", "left"] },
    footer: { control: false },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

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

/** Open/close driven by a trigger, with focus return on close. */
export const Playground: Story = {
  args: { children: editBody, footer: editFooter },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Editar proyecto</Button>
        <Drawer {...args} open={open} onClose={() => setOpen(false)} footer={editFooter}>
          {editBody}
        </Drawer>
      </>
    );
  },
};

/** Slides in from either edge. */
export const FromLeft: Story = {
  args: { side: "left", title: "Filtros", children: editBody, footer: editFooter },
};

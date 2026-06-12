import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Popover } from "./Popover";
import { Button } from "../Button/Button";

const meta = {
  title: "Components/Organisms/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=187-69",
      overview:
        "Superficie flotante anclada a un disparador, con caret. Para contenido contextual breve y acciones. Cierra con Esc, clic afuera o el botón cerrar.",
      whenToUse: [
        "Mostrar detalle o controles contextuales junto a un botón.",
        "Confirmaciones livianas o ajustes rápidos in-situ.",
        "Filtros guardados, opciones secundarias, ayuda contextual.",
      ],
      whenNotToUse: [
        "Decisiones bloqueantes o críticas → usá Modal.",
        "Formularios largos → usá Drawer.",
        "Lista de acciones de un menú → usá Menu.",
        "Solo texto descriptivo al hover → usá Tooltip.",
      ],
      anatomy: [
        "Disparador — el control anclado (slot trigger).",
        "Superficie — bg/elevated + shadow/overlay + radius/surface, capa z/popover.",
        "Caret — apunta al disparador según Posición (Abajo/Arriba).",
        "Header opcional — título (Label/L) + botón cerrar.",
        "Body — texto o contenido (Body/M).",
        "Acciones opcionales — botones SM alineados a la derecha.",
      ],
      accessibility: [
        "role=dialog; aria-labelledby al título cuando existe.",
        "Foco entra a la superficie al abrir y vuelve al disparador al cerrar.",
        "Esc cierra; un clic fuera del ancla + superficie también cierra.",
        "El botón cerrar tiene aria-label.",
      ],
      dos: [
        "Anclá la superficie al control que la origina.",
        "Contenido breve y accionable.",
        "Elegí Posición según el espacio disponible.",
      ],
      donts: [
        "No metas flujos largos ni muchos campos.",
        "No lo uses para mensajes globales del sistema.",
        "No abuses de acciones; una primaria alcanza.",
      ],
    },
  },
  args: {
    open: true,
    side: "bottom",
    title: "Filtros guardados",
    showClose: true,
    trigger: <Button variant="secondary">Filtros</Button>,
    children: "Aplicá uno de tus filtros guardados o creá uno nuevo a partir de la vista actual.",
  },
  argTypes: {
    side: { control: "inline-radio", options: ["bottom", "top"] },
    trigger: { control: false },
    actions: { control: false },
  },
  decorators: [(S) => <div style={{ padding: "var(--space-4xl) 0", textAlign: "center" }}>{S()}</div>],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

const savedFilterActions = (
  <>
    <Button size="sm" variant="secondary">
      Después
    </Button>
    <Button size="sm" variant="primary">
      Aplicar
    </Button>
  </>
);

/** Controlled, anchored to a trigger, with caret + actions. */
export const Playground: Story = {
  args: {
    children: "Aplicá uno de tus filtros guardados o creá uno nuevo a partir de la vista actual.",
    actions: savedFilterActions,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <Popover
        {...args}
        open={open}
        onOpenChange={setOpen}
        trigger={<Button variant="secondary">Filtros</Button>}
        actions={savedFilterActions}
      >
        Aplicá uno de tus filtros guardados o creá uno nuevo a partir de la vista actual.
      </Popover>
    );
  },
};

/** Caret above (Abajo) vs below (Arriba) the trigger. */
export const Positions: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-4xl)", justifyContent: "center" }}>
      {(["bottom", "top"] as const).map((side) => (
        <Popover
          key={side}
          open
          side={side}
          title={side === "bottom" ? "Abajo" : "Arriba"}
          onOpenChange={() => {}}
          trigger={<Button variant="secondary">{side}</Button>}
          actions={savedFilterActions}
        >
          Contenido contextual breve con una acción a mano.
        </Popover>
      ))}
    </div>
  ),
};

/** Body only — no header, no actions. */
export const BodyOnly: Story = {
  args: { title: undefined, showClose: false, actions: undefined },
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <Popover
        {...args}
        open={open}
        onOpenChange={setOpen}
        trigger={<Button variant="secondary">Ayuda</Button>}
      >
        Este campo acepta hasta 280 caracteres y admite menciones con @.
      </Popover>
    );
  },
};

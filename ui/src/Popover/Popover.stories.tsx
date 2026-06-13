import { useState, type ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Popover, type PopoverSide } from "./Popover";
import { Button } from "../Button/Button";

/**
 * Friendly playground controls (Card pattern). Popover is anchored (no full-screen
 * scrim), so the trigger toggles it open in place. `open`/`trigger` satisfy the
 * required props but are state-driven / fixed and excluded from the controls panel.
 */
interface PopoverDemoArgs {
  open: boolean;
  trigger: ReactNode;
  side: PopoverSide;
  showTitle: boolean;
  title: string;
  showClose: boolean;
  showActions: boolean;
  children: string;
}

const savedFilterActions = (
  <>
    <Button size="sm" variant="secondary">Después</Button>
    <Button size="sm" variant="primary">Aplicar</Button>
  </>
);

const meta = {
  title: "Components/Organisms/Popover",
  component: Popover,
  tags: ["autodocs"],
  render: (a: PopoverDemoArgs) => {
    const [open, setOpen] = useState(false);
    return (
      <Popover
        open={open}
        onOpenChange={setOpen}
        side={a.side}
        title={a.showTitle ? a.title || undefined : undefined}
        showClose={a.showClose}
        trigger={<Button variant="secondary">Filtros</Button>}
        actions={a.showActions ? savedFilterActions : undefined}
      >
        {a.children}
      </Popover>
    );
  },
  args: {
    open: true,
    trigger: <Button variant="secondary">Filtros</Button>,
    side: "bottom",
    showTitle: true,
    title: "Filtros guardados",
    showClose: true,
    showActions: true,
    children: "Aplicá uno de tus filtros guardados o creá uno nuevo a partir de la vista actual.",
  },
  argTypes: {
    side: { type: { name: "enum", value: ["bottom", "top"] }, control: "inline-radio", options: ["bottom", "top"], description: "Lado del disparador (voltea si no entra).", table: { category: "Variante" } },
    showTitle: { type: { name: "boolean" }, control: "boolean", description: "Mostrar el header con título.", table: { category: "Texto" } },
    title: { type: { name: "string" }, control: "text", description: "Texto del título.", table: { category: "Texto" } },
    children: { name: "body", type: { name: "string" }, control: "text", description: "Contenido del cuerpo.", table: { category: "Texto" } },
    showClose: { type: { name: "boolean" }, control: "boolean", description: "Botón de cierre (requiere título).", table: { category: "Estructura" } },
    showActions: { type: { name: "boolean" }, control: "boolean", description: "Acciones (botones SM a la derecha).", table: { category: "Estructura" } },
  },
  parameters: {
    controls: { include: ["side", "showTitle", "title", "children", "showClose", "showActions"] },
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
        "Caret — apunta al disparador según Posición (Abajo/Arriba); voltea al lado opuesto si no entra en el viewport.",
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
      dos: ["Anclá la superficie al control que la origina.", "Contenido breve y accionable.", "Elegí Posición según el espacio disponible."],
      donts: ["No metas flujos largos ni muchos campos.", "No lo uses para mensajes globales del sistema.", "No abuses de acciones; una primaria alcanza."],
    },
  },
  decorators: [(S) => <div style={{ padding: "var(--space-4xl) 0", textAlign: "center" }}>{S()}</div>],
} satisfies Meta<PopoverDemoArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

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

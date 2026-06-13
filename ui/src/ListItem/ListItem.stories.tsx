import type { Meta, StoryObj } from "@storybook/react";
import { ListItem } from "./ListItem";
import { List } from "../List/List";
import { Avatar } from "../Avatar/Avatar";

/** Friendly playground controls (Card pattern). `leading` is not in the global slot
 * disable list, so it keeps its real name as a boolean toggle. */
interface ListItemDemoArgs {
  leading: boolean;
  title: string;
  subtitle: string;
  meta: string;
  chevron: boolean;
  selected: boolean;
  disabled: boolean;
  interactive: boolean;
}

const renderListItem = (a: ListItemDemoArgs) => (
  <ListItem
    leading={a.leading ? <Avatar size="md" initials="NR" /> : undefined}
    title={a.title}
    subtitle={a.subtitle || undefined}
    meta={a.meta || undefined}
    chevron={a.chevron}
    selected={a.selected}
    disabled={a.disabled}
    onSelect={a.interactive ? () => {} : undefined}
  />
);

const meta = {
  title: "Components/Molecules/ListItem",
  component: ListItem,
  tags: ["autodocs"],
  render: renderListItem,
  args: {
    leading: true,
    title: "Natalia Rodríguez",
    subtitle: "Directora de UX",
    meta: "Hace 2 h",
    chevron: true,
    selected: false,
    disabled: false,
    interactive: true,
  },
  argTypes: {
    leading: { type: { name: "boolean" }, control: "boolean", description: "Mostrar el leading (avatar/ícono).", table: { category: "Estructura" } },
    title: { type: { name: "string" }, control: "text", description: "Título.", table: { category: "Texto" } },
    subtitle: { type: { name: "string" }, control: "text", description: "Subtítulo (opcional). Vaciá para quitarlo.", table: { category: "Texto" } },
    meta: { type: { name: "string" }, control: "text", description: "Meta trailing (opcional).", table: { category: "Texto" } },
    chevron: { type: { name: "boolean" }, control: "boolean", description: "Mostrar el chevron trailing.", table: { category: "Estructura" } },
    selected: { type: { name: "boolean" }, control: "boolean", description: "Estado seleccionado (aria-current).", table: { category: "Estado" } },
    disabled: { type: { name: "boolean" }, control: "boolean", description: "Deshabilitado.", table: { category: "Estado" } },
    interactive: { type: { name: "boolean" }, control: "boolean", description: "Fila navegable (botón con onSelect).", table: { category: "Estado" } },
  },
  parameters: {
    controls: { include: ["leading", "title", "subtitle", "meta", "chevron", "selected", "disabled", "interactive"] },
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=165-41",
      overview: "Fila de una lista: contenido principal (título/subtítulo) con leading y trailing opcionales.",
      whenToUse: ["Cada elemento de un List.", "Filas con avatar/ícono, meta y chevron."],
      whenNotToUse: ["Celdas de una tabla → usá Table row."],
      anatomy: ["Leading (avatar/ícono).", "Título + subtítulo.", "Trailing: meta + chevron.", "Estados: default/hover/seleccionado/deshabilitado."],
      accessibility: ["Si es navegable, la fila es un botón (Enter/Espacio).", "Seleccionada expone aria-current."],
      dos: ["Truncá texto largo con ellipsis."],
      donts: ["No metas demasiados elementos en el trailing."],
    },
  },
  decorators: [(S) => <List style={{ width: 480, maxWidth: "100%" }}>{S()}</List>],
} satisfies Meta<ListItemDemoArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Selected: Story = { args: { selected: true } };
export const Disabled: Story = { args: { disabled: true } };

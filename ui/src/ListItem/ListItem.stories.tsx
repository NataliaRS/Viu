import type { Meta, StoryObj } from "@storybook/react";
import { ListItem } from "./ListItem";
import { List } from "../List/List";
import { Avatar } from "../Avatar/Avatar";

const meta = {
  title: "Components/Molecules/ListItem",
  component: ListItem,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "stable",
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
  args: { title: "Natalia Rodríguez", subtitle: "Directora de UX", meta: "Hace 2 h", chevron: true },
  argTypes: { selected: { control: "boolean" }, disabled: { control: "boolean" }, chevron: { control: "boolean" } },
  decorators: [(S) => <List style={{ width: 480, maxWidth: "100%" }}>{S()}</List>],
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { leading: <Avatar size="md" initials="NR" />, onSelect: () => {} } };
export const Selected: Story = { args: { leading: <Avatar size="md" initials="NR" />, selected: true, onSelect: () => {} } };
export const Disabled: Story = { args: { leading: <Avatar size="md" initials="NR" />, disabled: true, onSelect: () => {} } };

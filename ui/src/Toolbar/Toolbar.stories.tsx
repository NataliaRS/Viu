import type { Meta, StoryObj } from "@storybook/react";
import { Toolbar } from "./Toolbar";
import { IconButton } from "../IconButton/IconButton";
import { Divider } from "../Divider/Divider";
import { Icon } from "../Icon/Icon";

const meta = {
  title: "Components/Molecules/Toolbar",
  component: Toolbar,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=172-29",
      overview: "Agrupación horizontal de acciones (Icon button / Button), con divisores opcionales.",
      whenToUse: ["Barras de acciones de un editor o vista.", "Agrupar controles relacionados."],
      whenNotToUse: ["Navegación entre vistas → usá Tabs.", "Menú contextual → usá Menu."],
      anatomy: ["Superficie (bg/raised + border/subtle).", "Acciones + Divider vertical para separar grupos."],
      accessibility: ["role=toolbar con aria-label; navegación por flechas recomendada para conjuntos largos."],
      dos: ["Agrupá acciones afines y separá con divisores.", "Usá Tooltips en los icon buttons."],
      donts: ["No mezcles demasiadas acciones sin agrupar."],
    },
  },
  args: { "aria-label": "Formato" },
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <IconButton variant="tertiary" aria-label="Buscar" icon={<Icon glyph="Search" />} />
      <IconButton variant="tertiary" aria-label="Agregar" icon={<Icon glyph="Plus" />} />
      <Divider orientation="vertical" />
      <IconButton variant="tertiary" aria-label="Info" icon={<Icon glyph="Info" />} />
    </Toolbar>
  ),
};

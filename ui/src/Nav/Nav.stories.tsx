import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Nav } from "./Nav";
import { NavItem } from "../NavItem/NavItem";
import { Icon } from "../Icon/Icon";

const meta = {
  title: "Components/Molecules/Nav",
  component: Nav,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=401-7",
      overview: "Landmark de navegación vertical. Agrupa varios NavItem (con ícono, label y estado activo).",
      whenToUse: ["Navegación lateral de una app o sección.", "Listas de destinos persistentes."],
      whenNotToUse: ["Alternar vistas de un mismo panel → usá Tabs.", "Ruta jerárquica → usá Breadcrumb."],
      anatomy: ["<nav> con aria-label.", "NavItem: ícono + label, estado activo (aria-current)."],
      accessibility: ["Pasá un aria-label al Nav.", "El ítem activo usa aria-current=page."],
      dos: ["Marcá el destino actual.", "Íconos consistentes y opcionales."],
      donts: ["No mezcles acciones (botones) con destinos sin distinguirlas."],
    },
  },
  args: { "aria-label": "Principal" },
} satisfies Meta<typeof Nav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sidebar: Story = {
  decorators: [(S) => <div style={{ width: 240 }}>{S()}</div>],
  render: (args) => {
    const [active, setActive] = useState("inicio");
    const items = [
      { value: "inicio", label: "Inicio", icon: <Icon glyph="Info" /> },
      { value: "buscar", label: "Buscar", icon: <Icon glyph="Search" /> },
      { value: "alertas", label: "Alertas", icon: <Icon glyph="Alert" /> },
    ];
    return (
      <Nav {...args}>
        {items.map((it) => (
          <NavItem
            key={it.value}
            href="#"
            icon={it.icon}
            active={active === it.value}
            onClick={(e) => {
              e.preventDefault();
              setActive(it.value);
            }}
          >
            {it.label}
          </NavItem>
        ))}
      </Nav>
    );
  },
};

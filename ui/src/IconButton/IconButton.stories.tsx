import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./IconButton";
import { Icon } from "../Icon/Icon";

const meta = {
  title: "Components/Atoms/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=393-190",
      overview: "Botón cuadrado de solo ícono. Misma jerarquía que Button (primary/secondary/tertiary) en 3 tamaños.",
      whenToUse: ["Acción reconocible sin texto (cerrar, buscar, más).", "Toolbars o áreas con espacio limitado."],
      whenNotToUse: ["Si el ícono no es inequívoco → usá Button con label.", "Para navegación → Link / Nav."],
      anatomy: ["Contenedor cuadrado (variante + tamaño).", "Ícono centrado (16/20/24)."],
      accessibility: ["`aria-label` es OBLIGATORIO (no hay texto visible).", "Foco visible; Enter/Espacio nativos.", "Sumá un Tooltip para descubrir su función."],
      dos: ["Siempre pasá `aria-label`.", "Usá íconos inequívocos."],
      donts: ["No lo dejes sin nombre accesible.", "No uses tertiary para la acción principal."],
    },
  },
  args: { variant: "primary", size: "md", "aria-label": "Agregar", icon: <Icon glyph="Plus" /> },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary", "tertiary"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: "secondary" } };
export const Tertiary: Story = { args: { variant: "tertiary", icon: <Icon glyph="Close" /> } };

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-md)" }}>
      {(["primary", "secondary", "tertiary"] as const).map((v) => (
        <div key={v} style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
          {(["sm", "md", "lg"] as const).map((s) => (
            <IconButton key={s} variant={v} size={s} aria-label={`${v} ${s}`} icon={<Icon glyph="Search" />} />
          ))}
          <IconButton variant={v} aria-label="disabled" disabled icon={<Icon glyph="Search" />} />
        </div>
      ))}
    </div>
  ),
};

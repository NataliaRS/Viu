import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { Icon } from "../Icon/Icon";

const meta = {
  title: "Components/Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=8-53",
      overview:
        "Acción de una interfaz. Comunica la operación de un contexto y la jerarquiza por variante (primary → secondary → tertiary).",
      whenToUse: [
        "Disparar una acción: enviar, guardar, crear, confirmar.",
        "Jerarquizar acciones: una primaria por vista, el resto secundarias/terciarias.",
      ],
      whenNotToUse: [
        "Para navegar a otra página o URL → usá Link.",
        "Para acciones solo-icono → usá Icon button.",
      ],
      anatomy: [
        "Contenedor — variante (color) + tamaño (alto).",
        "Label — General Sans Medium.",
        "Icono opcional — leading y/o trailing (16px).",
      ],
      accessibility: [
        "Es un <button> nativo: foco, Enter y Espacio funcionan solos.",
        "Foco visible con outline de border/focus.",
        "Disabled quita interacción y baja el contraste (no usar para ocultar acciones críticas).",
      ],
      dos: [
        "Una sola acción primaria por vista.",
        "Label corto y accionable (un verbo).",
        "Icono que refuerza el significado, no decorativo.",
      ],
      donts: [
        "No uses tertiary para la acción principal.",
        "No pongas oraciones largas como label.",
        "No combines 3 botones primarios compitiendo.",
      ],
    },
  },
  args: { children: "Button", variant: "primary", size: "md" },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary", "tertiary"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: "primary" } };
export const Secondary: Story = { args: { variant: "secondary" } };
export const Tertiary: Story = { args: { variant: "tertiary" } };

export const WithLeadingIcon: Story = {
  args: { leadingIcon: <Icon glyph="Plus" />, children: "Crear" },
};

export const WithTrailingIcon: Story = {
  args: { trailingIcon: <Icon glyph="Arrow" />, children: "Siguiente" },
};

export const Disabled: Story = { args: { disabled: true } };

const row: React.CSSProperties = {
  display: "flex",
  gap: "var(--space-md)",
  alignItems: "center",
  flexWrap: "wrap",
  marginBottom: "var(--space-md)",
};

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      {(["primary", "secondary", "tertiary"] as const).map((v) => (
        <div key={v} style={row}>
          {(["sm", "md", "lg"] as const).map((s) => (
            <Button key={s} variant={v} size={s}>
              {v} {s}
            </Button>
          ))}
          <Button variant={v} leadingIcon={<Icon glyph="Plus" />}>
            Icono
          </Button>
          <Button variant={v} disabled>
            Disabled
          </Button>
        </div>
      ))}
    </div>
  ),
};

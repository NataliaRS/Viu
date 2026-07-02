import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, type AvatarSize } from "./Avatar";

const sizes: AvatarSize[] = ["xs", "sm", "md", "lg", "xl"];

const meta = {
  title: "Components/Atoms/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=19-90",
      overview: "Representación de un usuario: imagen o iniciales sobre superficie de marca. 5 tamaños.",
      whenToUse: ["Identificar a una persona o entidad.", "Listas, comentarios, headers."],
      whenNotToUse: ["Para íconos de sistema → Icon / Icon container.", "Para logos de producto."],
      anatomy: ["Contenedor circular (radius/pill).", "Imagen (cover) o iniciales (1–2)."],
      accessibility: ["La imagen lleva alt descriptivo.", "Iniciales: contraste asegurado sobre brand-2."],
      dos: ["Usá iniciales como fallback de imagen.", "Tamaño acorde a la densidad."],
      donts: ["No metas más de 2 iniciales.", "No uses imágenes sin alt."],
    },
  },
  args: { size: "md", initials: "NR" },
  argTypes: { size: { control: "inline-radio", options: sizes } },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {};
export const Image: Story = {
  args: { src: "https://i.pravatar.cc/128?img=5", alt: "Retrato" },
};
export const Icono: Story = {
  name: "Ícono (placeholder)",
  args: { initials: "" },
};
export const AllSizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
      {sizes.map((s) => (
        <Avatar key={s} size={s} initials="NR" />
      ))}
    </div>
  ),
};

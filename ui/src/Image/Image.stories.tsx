import type { Meta, StoryObj } from "@storybook/react";
import { Image } from "./Image";

const meta = {
  title: "Components/Atoms/Image",
  component: Image,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=543-62",
      overview: "Media con relación de aspecto fija y estados de carga/error. 5 ratios.",
      whenToUse: ["Mostrar imágenes manteniendo proporción.", "Galerías, cards, thumbnails (ratio chico)."],
      whenNotToUse: ["Íconos → Icon.", "Avatares → Avatar."],
      anatomy: ["Contenedor (radius/control, overflow).", "Default: imagen cover · Loading: Spinner · Error: ícono + “Sin imagen”."],
      accessibility: ["`alt` descriptivo (vacío si es decorativa).", "El estado de error es visible y textual."],
      dos: ["Elegí el ratio acorde al contexto.", "Definí un alt significativo."],
      donts: ["No deformes la imagen (object-fit cover lo evita)."],
    },
  },
  args: { ratio: "16:9", src: "https://picsum.photos/480/270" },
  argTypes: {
    ratio: { control: "inline-radio", options: ["16:9", "4:3", "1:1", "3:2", "free"] },
    state: { control: "inline-radio", options: [undefined, "default", "loading", "error"] },
  },
  decorators: [(S) => <div style={{ width: 240 }}>{S()}</div>],
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Loading: Story = { args: { state: "loading" } };
export const ErrorState: Story = { args: { state: "error", src: undefined } };
export const Ratios: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 160px)", gap: "var(--space-md)" }}>
      {(["16:9", "4:3", "1:1", "3:2"] as const).map((r) => (
        <Image key={r} ratio={r} src={`https://picsum.photos/seed/${r}/320`} alt={r} />
      ))}
    </div>
  ),
};

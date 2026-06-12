import type { Meta, StoryObj } from "@storybook/react";
import { Image } from "./Image";

const meta = {
  title: "Atoms/Image",
  component: Image,
  tags: ["autodocs"],
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

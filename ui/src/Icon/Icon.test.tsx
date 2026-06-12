import { render } from "@testing-library/react";
import { Icon } from "./Icon";

describe("Icon", () => {
  it("renders an svg with the default 16px size", () => {
    const { container } = render(<Icon glyph="Search" />);
    const svg = container.querySelector("svg")!;
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("width", "16");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("is exposed as an image when titled", () => {
    const { getByRole } = render(<Icon glyph="Info" title="Información" />);
    expect(getByRole("img", { name: "Información" })).toBeInTheDocument();
  });

  it("honors a custom size", () => {
    const { container } = render(<Icon glyph="Check" size={24} />);
    expect(container.querySelector("svg")).toHaveAttribute("width", "24");
  });
});

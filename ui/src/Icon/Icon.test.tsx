import { render } from "@testing-library/react";
import { Icon } from "./Icon";

describe("Icon", () => {
  it("renders an svg (Material Symbol), decorative by default, 16px", () => {
    const { container } = render(<Icon glyph="Search" />);
    const svg = container.querySelector("svg")!;
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("width", "16");
    expect(svg).toHaveAttribute("data-icon", "search");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg.querySelector("path")).toBeInTheDocument();
  });

  it("maps direction glyphs to right-pointing Material Symbols", () => {
    const { container } = render(<Icon glyph="Chevron" />);
    expect(container.querySelector("svg")).toHaveAttribute("data-icon", "chevron_right");
  });

  it("accepts a raw Material Symbol name", () => {
    const { container } = render(<Icon glyph="error" />);
    const svg = container.querySelector("svg")!;
    expect(svg).toHaveAttribute("data-icon", "error");
    expect(svg.querySelector("path")).toBeInTheDocument();
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

import { render } from "@testing-library/react";
import { Icon } from "./Icon";

describe("Icon", () => {
  it("renders the mapped Material Symbol, decorative by default", () => {
    const { container } = render(<Icon glyph="Search" />);
    const el = container.querySelector("[data-icon]")!;
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute("data-icon", "search");
    expect(el).toHaveTextContent("search");
    expect(el).toHaveAttribute("aria-hidden", "true");
  });

  it("maps direction glyphs to right-pointing Material Symbols", () => {
    const { container } = render(<Icon glyph="Chevron" />);
    expect(container.querySelector("[data-icon]")).toHaveAttribute("data-icon", "chevron_right");
  });

  it("passes through a raw Material Symbol name", () => {
    const { container } = render(<Icon glyph="calendar_month" />);
    expect(container.querySelector("[data-icon]")).toHaveAttribute("data-icon", "calendar_month");
  });

  it("is exposed as an image when titled", () => {
    const { getByRole } = render(<Icon glyph="Info" title="Información" />);
    expect(getByRole("img", { name: "Información" })).toBeInTheDocument();
  });

  it("honors a custom size via font-size", () => {
    const { container } = render(<Icon glyph="Check" size={24} />);
    expect(container.querySelector("[data-icon]")).toHaveStyle({ fontSize: "24px" });
  });
});

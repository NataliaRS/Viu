import { render, screen } from "@testing-library/react";
import { Button } from "./Button";
import { Icon } from "../Icon/Icon";

describe("Button", () => {
  it("renders its label", () => {
    render(<Button>Guardar</Button>);
    expect(screen.getByRole("button", { name: "Guardar" })).toBeInTheDocument();
  });

  it("defaults to type=button and primary/md classes", () => {
    render(<Button>Hola</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("type", "button");
    expect(btn.className).toMatch(/primary/);
    expect(btn.className).toMatch(/md/);
  });

  it("applies variant and size", () => {
    render(
      <Button variant="secondary" size="lg">
        X
      </Button>,
    );
    const btn = screen.getByRole("button");
    expect(btn.className).toMatch(/secondary/);
    expect(btn.className).toMatch(/lg/);
  });

  it("renders leading and trailing icons", () => {
    render(
      <Button leadingIcon={<Icon glyph="Plus" />} trailingIcon={<Icon glyph="Arrow" />}>
        Crear
      </Button>,
    );
    expect(screen.getByRole("button").querySelectorAll("[data-icon]")).toHaveLength(2);
  });

  it("forwards disabled", () => {
    render(<Button disabled>No</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});

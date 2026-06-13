import { render, screen, fireEvent } from "@testing-library/react";
import { Card } from "./Card";

describe("Card", () => {
  it("renders the structured anatomy (eyebrow, title, subtitle, body, author)", () => {
    render(
      <Card
        eyebrow="Categoría"
        title="Título"
        subtitle="Subtítulo"
        body="Cuerpo de la card"
        author={{ name: "Natalia", meta: "hoy" }}
      />,
    );
    expect(screen.getByRole("heading", { name: "Título" })).toBeInTheDocument();
    expect(screen.getByText("Categoría")).toBeInTheDocument();
    expect(screen.getByText("Subtítulo")).toBeInTheDocument();
    expect(screen.getByText("Cuerpo de la card")).toBeInTheDocument();
    expect(screen.getByText("Natalia")).toBeInTheDocument();
    expect(screen.getByText("hoy")).toBeInTheDocument();
  });

  it("is keyboard-operable when interactive", () => {
    const onClick = vi.fn();
    render(<Card interactive title="Clickable" onClick={onClick} />);
    const card = screen.getByRole("button");
    expect(card).toHaveAttribute("tabindex", "0");
    fireEvent.keyDown(card, { key: "Enter" });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", () => {
    const onClick = vi.fn();
    render(<Card interactive disabled title="Off" onClick={onClick} />);
    // disabled cards are not buttons and ignore activation
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("Off"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders only the slots provided (minimal)", () => {
    render(<Card title="Solo título" />);
    expect(screen.getByRole("heading", { name: "Solo título" })).toBeInTheDocument();
    expect(screen.queryByRole("separator")).not.toBeInTheDocument();
  });
});

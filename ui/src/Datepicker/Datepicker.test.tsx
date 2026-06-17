import { render, screen, fireEvent } from "@testing-library/react";
import { Datepicker } from "./Datepicker";

describe("Datepicker", () => {
  it("shows the placeholder when there is no value", () => {
    render(<Datepicker label="Fecha" htmlFor="dp" />);
    expect(screen.getByText("DD / MM / AAAA")).toBeInTheDocument();
  });

  it("opens the calendar on trigger click", () => {
    render(<Datepicker label="Fecha" htmlFor="dp" defaultValue={new Date(2026, 5, 1)} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Fecha" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Junio 2026")).toBeInTheDocument();
  });

  it("selects a day, reflects it in the field and closes", () => {
    const onValueChange = vi.fn();
    render(<Datepicker label="Fecha" htmlFor="dp" defaultValue={new Date(2026, 5, 1)} onValueChange={onValueChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Fecha" }));
    fireEvent.click(screen.getByRole("button", { name: "14 / 06 / 2026" }));
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByText("14 / 06 / 2026")).toBeInTheDocument();
  });

  it("navigates months", () => {
    render(<Datepicker label="Fecha" htmlFor="dp" defaultValue={new Date(2026, 5, 1)} />);
    fireEvent.click(screen.getByRole("button", { name: "Fecha" }));
    fireEvent.click(screen.getByRole("button", { name: "Mes siguiente" }));
    expect(screen.getByText("Julio 2026")).toBeInTheDocument();
  });

  it("shows the error message with aria-invalid", () => {
    render(<Datepicker label="Fecha" htmlFor="dp" error="Elegí una fecha válida." />);
    expect(screen.getByText("Elegí una fecha válida.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Fecha" })).toHaveAttribute("aria-invalid", "true");
  });

  it("does not open when disabled", () => {
    render(<Datepicker label="Fecha" htmlFor="dp" disabled />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

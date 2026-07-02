import { render, screen, fireEvent } from "@testing-library/react";
import { TimePicker } from "./TimePicker";

describe("TimePicker", () => {
  it("shows the placeholder when there is no value", () => {
    render(<TimePicker label="Hora" htmlFor="tp" />);
    expect(screen.getByText("HH:MM")).toBeInTheDocument();
  });

  it("opens the listbox on control click and lists step-based options", () => {
    render(<TimePicker label="Hora" htmlFor="tp" defaultValue="14:30" />);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Hora" }));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "14:00" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "14:30" })).toHaveAttribute("aria-selected", "true");
  });

  it("selects an option, reflects it and closes", () => {
    const onValueChange = vi.fn();
    render(<TimePicker label="Hora" htmlFor="tp" defaultValue="14:30" onValueChange={onValueChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Hora" }));
    fireEvent.click(screen.getByRole("option", { name: "16:00" }));
    expect(onValueChange).toHaveBeenCalledWith("16:00");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.getByText("16:00")).toBeInTheDocument();
  });

  it("respects a custom step", () => {
    render(<TimePicker label="Hora" htmlFor="tp" step={60} />);
    fireEvent.click(screen.getByRole("button", { name: "Hora" }));
    expect(screen.getByRole("option", { name: "01:00" })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: "01:30" })).not.toBeInTheDocument();
  });

  it("shows the error message with aria-invalid", () => {
    render(<TimePicker label="Hora" htmlFor="tp" error="Elegí una hora válida." />);
    expect(screen.getByText("Elegí una hora válida.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Hora" })).toHaveAttribute("aria-invalid", "true");
  });

  it("does not open when disabled", () => {
    render(<TimePicker label="Hora" htmlFor="tp" disabled />);
    fireEvent.click(screen.getByRole("button", { name: "Hora" }));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});

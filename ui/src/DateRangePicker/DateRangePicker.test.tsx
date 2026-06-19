import { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { DateRangePicker, type DateRange } from "./DateRangePicker";

function Controlled({ initial }: { initial: DateRange }) {
  const [range, setRange] = useState<DateRange>(initial);
  return <DateRangePicker value={range} onValueChange={setRange} />;
}

describe("DateRangePicker", () => {
  it("renders the two trigger fields", () => {
    render(<Controlled initial={{ from: null, to: null }} />);
    expect(screen.getByRole("button", { name: /Desde/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Hasta/ })).toBeInTheDocument();
  });

  it("opens the calendar on a field click", () => {
    render(<Controlled initial={{ from: new Date(2026, 5, 1), to: null }} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Desde/ }));
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    // header shows the month of the existing "from"
    expect(screen.getByText("Junio 2026")).toBeInTheDocument();
  });

  it("selects an end date and reflects it in the Hasta field", () => {
    render(<Controlled initial={{ from: new Date(2026, 5, 1), to: null }} />);
    fireEvent.click(screen.getByRole("button", { name: /Desde/ }));
    fireEvent.click(screen.getByRole("button", { name: "10 / 06 / 2026" }));
    // both field values are shown
    expect(screen.getByText("01 / 06 / 2026")).toBeInTheDocument();
    expect(screen.getByText("10 / 06 / 2026")).toBeInTheDocument();
    // endpoints are pressed
    expect(screen.getByRole("button", { name: "01 / 06 / 2026" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "10 / 06 / 2026" })).toHaveAttribute("aria-pressed", "true");
  });

  it("clicking before the start resets the start", () => {
    render(<Controlled initial={{ from: new Date(2026, 5, 10), to: null }} />);
    fireEvent.click(screen.getByRole("button", { name: /Desde/ }));
    fireEvent.click(screen.getByRole("button", { name: "05 / 06 / 2026" }));
    expect(screen.getByText("05 / 06 / 2026")).toBeInTheDocument();
    // the Hasta field falls back to the placeholder
    expect(screen.getByText("DD / MM / AAAA")).toBeInTheDocument();
  });

  it("navigates months", () => {
    render(<Controlled initial={{ from: new Date(2026, 5, 1), to: null }} />);
    fireEvent.click(screen.getByRole("button", { name: /Desde/ }));
    fireEvent.click(screen.getByRole("button", { name: "Mes siguiente" }));
    expect(screen.getByText("Julio 2026")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Mes anterior" }));
    fireEvent.click(screen.getByRole("button", { name: "Mes anterior" }));
    expect(screen.getByText("Mayo 2026")).toBeInTheDocument();
  });

  it("closes on Escape", () => {
    render(<Controlled initial={{ from: new Date(2026, 5, 1), to: null }} />);
    fireEvent.click(screen.getByRole("button", { name: /Desde/ }));
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

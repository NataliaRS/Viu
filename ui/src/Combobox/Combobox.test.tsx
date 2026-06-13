import { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Combobox } from "./Combobox";

const options = [
  { value: "ar", label: "Argentina" },
  { value: "br", label: "Brasil" },
  { value: "cl", label: "Chile" },
];

function Controlled() {
  const [v, setV] = useState<string>();
  return <Combobox aria-label="País" options={options} value={v} onValueChange={setV} />;
}

describe("Combobox", () => {
  it("opens on focus and lists the options", () => {
    render(<Controlled />);
    const input = screen.getByRole("combobox");
    expect(input).toHaveAttribute("aria-expanded", "false");
    fireEvent.focus(input);
    expect(input).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(3);
  });

  it("filters the options as you type", () => {
    render(<Controlled />);
    const input = screen.getByRole("combobox");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "bra" } });
    const opts = screen.getAllByRole("option");
    expect(opts).toHaveLength(1);
    expect(opts[0]).toHaveTextContent("Brasil");
  });

  it("selects an option on click and reflects it in the closed field", () => {
    render(<Controlled />);
    const input = screen.getByRole("combobox");
    fireEvent.focus(input);
    fireEvent.click(screen.getByText("Chile"));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(input).toHaveValue("Chile");
  });

  it("selects the active option with the keyboard (ArrowDown + Enter)", () => {
    render(<Controlled />);
    const input = screen.getByRole("combobox");
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: "ArrowDown" }); // active -> index 1 (Brasil)
    fireEvent.keyDown(input, { key: "Enter" });
    expect(input).toHaveValue("Brasil");
  });

  it("closes on Escape without selecting", () => {
    render(<Controlled />);
    const input = screen.getByRole("combobox");
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: "Escape" });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(input).toHaveValue("");
  });
});

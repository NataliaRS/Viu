import { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SegmentedControl } from "./SegmentedControl";

const options = [
  { value: "list", label: "Lista" },
  { value: "grid", label: "Grilla" },
];

describe("SegmentedControl", () => {
  it("exposes a radiogroup with one checked radio per the value", () => {
    render(<SegmentedControl aria-label="Vista" options={options} defaultValue="grid" />);
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    expect(screen.getByDisplayValue("grid")).toBeChecked();
    expect(screen.getByDisplayValue("list")).not.toBeChecked();
  });

  it("selects on click and fires onValueChange (uncontrolled)", () => {
    const onValueChange = vi.fn();
    render(
      <SegmentedControl aria-label="Vista" options={options} onValueChange={onValueChange} />,
    );
    // first option selected by default
    expect(screen.getByDisplayValue("list")).toBeChecked();
    fireEvent.click(screen.getByText("Grilla"));
    expect(onValueChange).toHaveBeenCalledWith("grid");
    expect(screen.getByDisplayValue("grid")).toBeChecked();
  });

  it("honors the controlled value (does not self-update)", () => {
    function Controlled() {
      const [v] = useState("list");
      return <SegmentedControl aria-label="Vista" options={options} value={v} />;
    }
    render(<Controlled />);
    fireEvent.click(screen.getByText("Grilla"));
    // value is pinned by the parent, so list stays checked
    expect(screen.getByDisplayValue("list")).toBeChecked();
  });

  it("disables every segment when disabled", () => {
    render(<SegmentedControl aria-label="Vista" options={options} disabled />);
    expect(screen.getByDisplayValue("list")).toBeDisabled();
    expect(screen.getByDisplayValue("grid")).toBeDisabled();
  });
});

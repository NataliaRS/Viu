import { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ChoiceGroup } from "./ChoiceGroup";

const options = [
  { value: "uno", label: "Opción uno" },
  { value: "dos", label: "Opción dos" },
];

describe("ChoiceGroup", () => {
  it("renders a labelled group of radios", () => {
    render(<ChoiceGroup type="radio" label="Plan" options={options} defaultValue="uno" />);
    expect(screen.getByText("Plan").tagName).toBe("LEGEND");
    expect(screen.getByLabelText("Opción uno")).toBeChecked();
  });

  it("radio: selecting one fires the single value and unchecks the rest", () => {
    const onValueChange = vi.fn();
    render(
      <ChoiceGroup type="radio" label="Plan" options={options} onValueChange={onValueChange} />,
    );
    fireEvent.click(screen.getByLabelText("Opción dos"));
    expect(onValueChange).toHaveBeenCalledWith("dos");
    expect(screen.getByLabelText("Opción dos")).toBeChecked();
    expect(screen.getByLabelText("Opción uno")).not.toBeChecked();
  });

  it("checkbox: toggling accumulates an array of values", () => {
    function Controlled() {
      const [v, setV] = useState<string[]>([]);
      return <ChoiceGroup type="checkbox" label="Canales" options={options} value={v} onValueChange={setV} />;
    }
    render(<Controlled />);
    // role-based name (excludes the aria-hidden check icon, unlike getByLabelText)
    fireEvent.click(screen.getByRole("checkbox", { name: "Opción uno" }));
    fireEvent.click(screen.getByRole("checkbox", { name: "Opción dos" }));
    expect(screen.getByRole("checkbox", { name: "Opción uno" })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "Opción dos" })).toBeChecked();
    // untoggle one
    fireEvent.click(screen.getByRole("checkbox", { name: "Opción uno" }));
    expect(screen.getByRole("checkbox", { name: "Opción uno" })).not.toBeChecked();
  });

  it("disables every control via the fieldset", () => {
    render(<ChoiceGroup type="radio" label="Plan" options={options} disabled />);
    expect(screen.getByLabelText("Opción uno")).toBeDisabled();
  });
});

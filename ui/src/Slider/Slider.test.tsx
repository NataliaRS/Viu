import { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Slider } from "./Slider";

describe("Slider", () => {
  it("renders a single range input by default", () => {
    render(<Slider defaultValue={40} aria-label="Volumen" />);
    const input = screen.getByRole("slider");
    expect(input).toHaveAttribute("type", "range");
    expect(input).toHaveValue("40");
  });

  it("renders two labelled thumbs in range mode", () => {
    render(<Slider range defaultValue={[20, 80]} />);
    expect(screen.getByLabelText("Valor mínimo")).toHaveValue("20");
    expect(screen.getByLabelText("Valor máximo")).toHaveValue("80");
  });

  it("clamps the low thumb so it never passes the high thumb", () => {
    function Controlled() {
      const [v, setV] = useState<[number, number]>([20, 50]);
      return <Slider range value={v} onValueChange={setV} />;
    }
    render(<Controlled />);
    const low = screen.getByLabelText("Valor mínimo");
    // Try to drag low past high (50) — it should clamp to 50, not 70.
    fireEvent.change(low, { target: { value: "70" } });
    expect(low).toHaveValue("50");
    expect(screen.getByLabelText("Valor máximo")).toHaveValue("50");
  });

  it("clamps the high thumb so it never drops below the low thumb", () => {
    function Controlled() {
      const [v, setV] = useState<[number, number]>([40, 80]);
      return <Slider range value={v} onValueChange={setV} />;
    }
    render(<Controlled />);
    const high = screen.getByLabelText("Valor máximo");
    fireEvent.change(high, { target: { value: "10" } });
    expect(high).toHaveValue("40");
    expect(screen.getByLabelText("Valor mínimo")).toHaveValue("40");
  });
});

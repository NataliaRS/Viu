import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "./Modal";
import { Button } from "../Button/Button";

describe("Modal", () => {
  it("renders nothing while closed", () => {
    render(
      <Modal open={false} title="Hola">
        Cuerpo
      </Modal>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders a labelled modal dialog when open", () => {
    render(
      <Modal open title="¿Eliminar?" subtitle="No se puede deshacer.">
        Cuerpo
      </Modal>,
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAccessibleName("¿Eliminar?");
  });

  it("closes on Escape", () => {
    const onClose = vi.fn();
    render(
      <Modal open title="X" onClose={onClose}>
        Cuerpo
      </Modal>,
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not close on Escape when closeOnEsc is false", () => {
    const onClose = vi.fn();
    render(
      <Modal open title="X" onClose={onClose} closeOnEsc={false}>
        Cuerpo
      </Modal>,
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("fires onClose from the close button", () => {
    const onClose = vi.fn();
    render(
      <Modal open title="X" onClose={onClose}>
        Cuerpo
      </Modal>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Cerrar" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders footer actions", () => {
    render(
      <Modal open title="X" footer={<Button variant="primary">Eliminar</Button>}>
        Cuerpo
      </Modal>,
    );
    expect(screen.getByRole("button", { name: "Eliminar" })).toBeInTheDocument();
  });
});

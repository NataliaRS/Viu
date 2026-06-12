import figma from "@figma/code-connect";
import { Form } from "./Form";
import { FormField } from "../FormField/FormField";
import { Input } from "../Input/Input";
import { Banner } from "../Banner/Banner";
import { Button } from "../Button/Button";

figma.connect(
  Form,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=282-7",
  {
    example: () => (
      <Form
        title="Crear proyecto"
        description="Completá la información para crear un nuevo proyecto."
        banner={<Banner tone="danger" title="Revisá los campos marcados">Falta 1 campo obligatorio.</Banner>}
        actions={
          <>
            <Button variant="secondary">Cancelar</Button>
            <Button variant="primary">Crear</Button>
          </>
        }
      >
        <FormField label="Nombre del proyecto" htmlFor="name" required error="El nombre es obligatorio.">
          <Input id="name" aria-invalid />
        </FormField>
      </Form>
    ),
  },
);

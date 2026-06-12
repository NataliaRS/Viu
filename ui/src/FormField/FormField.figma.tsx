import figma from "@figma/code-connect";
import { FormField } from "./FormField";
import { Input } from "../Input/Input";

figma.connect(
  FormField,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=27-255",
  {
    props: {
      label: figma.string("label"),
      helper: figma.string("ayuda"),
      required: figma.boolean("requerido"),
      error: figma.enum("State", { Error: "Revisá este campo." }),
      disabled: figma.enum("State", { Disabled: true }),
    },
    example: ({ label, helper, required, error, disabled }) => (
      <FormField label={label} helper={helper} required={required} error={error} disabled={disabled} htmlFor="field">
        <Input id="field" error={!!error} disabled={disabled} />
      </FormField>
    ),
  },
);

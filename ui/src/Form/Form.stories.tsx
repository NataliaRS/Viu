import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Form } from "./Form";
import { FormField } from "../FormField/FormField";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";
import { Textarea } from "../Textarea/Textarea";
import { Radio } from "../Radio/Radio";
import { Checkbox } from "../Checkbox/Checkbox";
import { Switch } from "../Switch/Switch";
import { Banner } from "../Banner/Banner";
import { Button } from "../Button/Button";

const meta = {
  title: "Components/Patterns/Form",
  component: Form,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "Stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=282-7",
      overview:
        "Patrón de formulario: superficie con título, banner opcional, una columna de campos y un pie de acciones a la derecha. Para crear/editar entidades, configuración, checkout u onboarding.",
      whenToUse: [
        "Crear o editar entidades, configuración, checkout, onboarding.",
        "Capturar varios datos relacionados en una vista.",
      ],
      whenNotToUse: [
        "Una sola decisión → usá un diálogo (Modal).",
        "Filtros → controles inline sin “guardar”.",
      ],
      anatomy: [
        "Encabezado — título (Title/L) + descripción.",
        "Banner — resumen de errores (tone danger), opcional.",
        "Campos — una columna; pares cortos en 2 columnas (categoría + fecha).",
        "Acciones — al pie, a la derecha: primaria (Crear) + secundaria (Cancelar).",
      ],
      accessibility: [
        "Cada control tiene label asociado (htmlFor/id) siempre visible arriba.",
        "El error reemplaza a la ayuda, como texto + aria-invalid (no solo color).",
        "Soporte completo de teclado y foco visible; preservá lo ingresado ante un error.",
      ],
      dos: [
        "Agrupá campos relacionados; pedí lo mínimo necesario.",
        "Validá al enviar y al salir del campo (on blur), no en cada tecla.",
        "Mensajes claros y accionables (“El nombre es obligatorio”).",
      ],
      donts: [
        "No deshabilites la primaria por errores: al intentar, mostralos.",
        "No uses códigos ni jerga en los mensajes.",
        "No pongas todo en una sola fila ancha; una columna salvo pares cortos.",
      ],
    },
  },
  args: { children: null },
  decorators: [(S) => <div style={{ maxWidth: 600 }}>{S()}</div>],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

const priorities = ["Baja", "Media", "Alta", "Muy Alta", "Crítica"];

const Fields = ({ priority, setPriority, notify, setNotify }: { priority: string; setPriority: (v: string) => void; notify: boolean; setNotify: (v: boolean) => void }) => (
  <>
    <FormField label="Nombre del proyecto" htmlFor="f-name" required error="El nombre es obligatorio.">
      <Input id="f-name" aria-invalid placeholder="Ej. Rediseño 2026" />
    </FormField>
    <div style={{ display: "flex", gap: "var(--space-md)" }}>
      <FormField label="Categoría" htmlFor="f-cat" style={{ flex: 1 }}>
        <Select id="f-cat" defaultValue="">
          <option value="" disabled>
            Elegí una…
          </option>
          <option>Producto</option>
          <option>Growth</option>
          <option>Plataforma</option>
        </Select>
      </FormField>
      <FormField label="Fecha de entrega" htmlFor="f-date" style={{ flex: 1 }}>
        <Input id="f-date" type="date" />
      </FormField>
    </div>
    <FormField label="Descripción" htmlFor="f-desc" helper="Contanos de qué se trata el proyecto.">
      <Textarea id="f-desc" placeholder="Resumen breve…" />
    </FormField>
    <FormField label="Prioridad" htmlFor="f-prio">
      <div role="radiogroup" aria-label="Prioridad" style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-lg)" }}>
        {priorities.map((p) => (
          <Radio key={p} name="prioridad" label={p} checked={priority === p} onChange={() => setPriority(p)} />
        ))}
      </div>
    </FormField>
    <Checkbox label="Visible para todo el equipo" defaultChecked />
    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-body-m)", color: "var(--color-text-primary)" }}>Notificar al equipo al crear</div>
        <div style={{ fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-body-s)", color: "var(--color-text-tertiary)" }}>Se enviará un aviso a los miembros.</div>
      </div>
      <Switch checked={notify} onCheckedChange={setNotify} aria-label="Notificar al equipo" />
    </div>
  </>
);

/** Create-entity form with an error summary and an inline field error. */
export const CreateProject: Story = {
  render: () => {
    const [priority, setPriority] = useState("Media");
    const [notify, setNotify] = useState(true);
    return (
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
        <Fields priority={priority} setPriority={setPriority} notify={notify} setNotify={setNotify} />
      </Form>
    );
  },
};

/** Clean state — no banner, no errors. */
export const Clean: Story = {
  render: () => {
    const [notify, setNotify] = useState(false);
    return (
      <Form
        title="Crear proyecto"
        description="Completá la información para crear un nuevo proyecto."
        actions={
          <>
            <Button variant="secondary">Cancelar</Button>
            <Button variant="primary">Crear</Button>
          </>
        }
      >
        <FormField label="Nombre del proyecto" htmlFor="c-name" required>
          <Input id="c-name" placeholder="Ej. Rediseño 2026" />
        </FormField>
        <FormField label="Descripción" htmlFor="c-desc" helper="Contanos de qué se trata el proyecto.">
          <Textarea id="c-desc" placeholder="Resumen breve…" />
        </FormField>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
          <div style={{ flex: 1, fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-body-m)", color: "var(--color-text-primary)" }}>Notificar al equipo al crear</div>
          <Switch checked={notify} onCheckedChange={setNotify} aria-label="Notificar al equipo" />
        </div>
      </Form>
    );
  },
};

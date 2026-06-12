import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Wizard, type WizardStep } from "./Wizard";
import { FormField } from "../FormField/FormField";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";
import { Textarea } from "../Textarea/Textarea";

const meta = {
  title: "Components/Patterns/Wizard",
  component: Wizard,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=288-7",
      overview:
        "Patrón de flujo multipaso: un Stepper marca el progreso, se muestra el paso actual y un pie con Atrás/Continuar. Para tareas largas o ramificadas.",
      whenToUse: [
        "Tareas largas o ramificadas — onboarding, configuración inicial, checkout, alta de entidades complejas.",
        "Cuando conviene dividir un objetivo grande en pasos digeribles.",
      ],
      whenNotToUse: [
        "Tareas cortas (un formulario de una pantalla).",
        "Flujos no lineales donde el orden no importa.",
      ],
      anatomy: [
        "Stepper — pasos completados (✓), el actual y los pendientes; numerados y etiquetados.",
        "Paso actual — el contenido del paso (su título + campos).",
        "Pie — progreso (“Paso X de N”) + Atrás/Continuar; el último paso finaliza.",
      ],
      accessibility: [
        "El stepper comunica progreso con texto e ícono, no solo color.",
        "“Atrás” siempre disponible salvo en el primer paso; los pasos completados son revisitables.",
        "Foco al inicio del nuevo paso; los errores se muestran al intentar continuar.",
      ],
      dos: [
        "Idealmente 3–5 pasos, un objetivo por paso.",
        "Validá cada paso antes de avanzar; preservá lo cargado al volver.",
        "El último paso es un resumen/confirmación antes de finalizar.",
      ],
      donts: [
        "No muestres errores antes de intentar continuar.",
        "No pierdas lo ya cargado al navegar entre pasos.",
        "No abuses de la cantidad de pasos; en flujos largos permití guardar y retomar.",
      ],
    },
  },
  args: { steps: [], current: 0 },
  argTypes: { steps: { control: false } },
} satisfies Meta<typeof Wizard>;

export default meta;
type Story = StoryObj<typeof meta>;

const steps: WizardStep[] = [
  {
    label: "Detalles",
    content: (
      <>
        <div>
          <h3 style={{ margin: 0, fontFamily: "var(--font-family-display)", fontSize: "var(--font-size-title-m)", color: "var(--color-text-primary)" }}>Detalles del proyecto</h3>
          <p style={{ margin: "var(--space-2xs) 0 0", fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-body-m)", color: "var(--color-text-secondary)" }}>Contanos de qué se trata el proyecto.</p>
        </div>
        <FormField label="Nombre del proyecto" htmlFor="w-name" required>
          <Input id="w-name" placeholder="Ej. Rediseño 2026" />
        </FormField>
        <FormField label="Categoría" htmlFor="w-cat">
          <Select id="w-cat" defaultValue="">
            <option value="" disabled>
              Elegí una…
            </option>
            <option>Producto</option>
            <option>Growth</option>
          </Select>
        </FormField>
        <FormField label="Descripción" htmlFor="w-desc">
          <Textarea id="w-desc" placeholder="Resumen breve…" />
        </FormField>
      </>
    ),
  },
  { label: "Equipo", content: <FormField label="Invitar por email" htmlFor="w-team"><Input id="w-team" type="email" placeholder="nombre@empresa.com" /></FormField> },
  { label: "Ajustes", content: <FormField label="Visibilidad" htmlFor="w-vis"><Select id="w-vis" defaultValue="Equipo"><option>Equipo</option><option>Privado</option></Select></FormField> },
  { label: "Resumen", content: <p style={{ margin: 0, fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-body-m)", color: "var(--color-text-secondary)" }}>Revisá los datos y confirmá para crear el proyecto.</p> },
];

/** Controlled 4-step flow. Back/Next move between steps; the last finishes. */
export const CreateProject: Story = {
  render: () => {
    const [current, setCurrent] = useState(1);
    return <Wizard steps={steps} current={current} onStepChange={setCurrent} onFinish={() => setCurrent(0)} />;
  },
  decorators: [(S) => <div style={{ maxWidth: 640 }}>{S()}</div>],
};

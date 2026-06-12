import type { Meta, StoryObj } from "@storybook/react";
import { Banner, type BannerTone } from "./Banner";
import { Link } from "../Link/Link";

const tones: BannerTone[] = ["info", "success", "warning", "danger", "neutral"];

const meta = {
  title: "Components/Molecules/Banner",
  component: Banner,
  tags: ["autodocs"],
  parameters: {
    viu: {
      status: "stable",
      figma: "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=135-84",
      overview: "Mensaje contextual persistente dentro del layout. 5 tonos, con acción y cierre opcionales.",
      whenToUse: ["Comunicar un estado del sistema o de la página (info, error, éxito).", "Avisos que permanecen hasta que el usuario actúa."],
      whenNotToUse: ["Notificaciones transitorias → usá Toast.", "Validación de un campo → usá FormField/error."],
      anatomy: ["Ícono por tono.", "Título (opcional) + mensaje.", "Link inline opcional + cierre (opcional)."],
      accessibility: ["role=status; el ícono es decorativo (el tono no es la única señal — usá texto claro).", "El cierre tiene aria-label."],
      dos: ["Texto que explique qué pasó y qué hacer.", "Tono acorde al significado."],
      donts: ["No lo uses para mensajes efímeros.", "No dependas solo del color del tono."],
    },
  },
  args: { tone: "info", title: "Título del mensaje", children: "Descripción con el detalle que el usuario necesita para entender y actuar.", link: false },
  argTypes: {
    tone: { control: "inline-radio", options: tones },
    // Boolean toggle that maps to the actual link node (override the global slot disable).
    link: {
      control: "boolean",
      mapping: {
        true: (
          <Link href="#" style={{ textDecoration: "underline" }}>
            Más información
          </Link>
        ),
        false: undefined,
      },
    },
  },
  decorators: [(S) => <div style={{ width: 560, maxWidth: "100%" }}>{S()}</div>],
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithLinkAndClose: Story = {
  args: { tone: "warning", link: true, onClose: () => {} },
};
export const AllTones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-md)" }}>
      {tones.map((t) => (
        <Banner key={t} tone={t} title={t} onClose={() => {}}>
          Mensaje de ejemplo para el tono {t}.
        </Banner>
      ))}
    </div>
  ),
};

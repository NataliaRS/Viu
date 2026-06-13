import type { Meta, StoryObj } from "@storybook/react";
import { Banner, type BannerTone } from "./Banner";
import { Link } from "../Link/Link";

const tones: BannerTone[] = ["info", "success", "warning", "danger", "neutral"];

/**
 * Friendly playground controls (same pattern as Card — proven to work). Slot props
 * whose name is in the global `preview.tsx` `control:false` list (here `link`) use a
 * decoupled `show*` key; the render maps it to the real node. `onClose` (a function)
 * is toggled via `showClose`. Real text props stay editable.
 */
interface BannerDemoArgs {
  tone: BannerTone;
  title: string;
  children: string;
  showLink: boolean;
  showClose: boolean;
}

const renderBanner = (a: BannerDemoArgs) => (
  <Banner
    tone={a.tone}
    title={a.title || undefined}
    link={
      a.showLink ? (
        <Link href="#" style={{ textDecoration: "underline" }}>
          Más información
        </Link>
      ) : undefined
    }
    onClose={a.showClose ? () => {} : undefined}
  >
    {a.children}
  </Banner>
);

const meta = {
  title: "Components/Molecules/Banner",
  component: Banner,
  tags: ["autodocs"],
  render: renderBanner,
  args: {
    tone: "info",
    title: "Título del mensaje",
    children: "Descripción con el detalle que el usuario necesita para entender y actuar.",
    showLink: false,
    showClose: false,
  },
  argTypes: {
    tone: { type: { name: "enum", value: tones }, control: "inline-radio", options: tones, description: "Tono del mensaje (info/success/warning/danger/neutral).", table: { category: "Variante" } },
    title: { type: { name: "string" }, control: "text", description: "Título (opcional). Vaciá para quitarlo.", table: { category: "Texto" } },
    children: { type: { name: "string" }, control: "text", description: "Mensaje del banner.", table: { category: "Texto" } },
    showLink: { type: { name: "boolean" }, control: "boolean", description: "Mostrar un link inline.", table: { category: "Estructura" } },
    showClose: { type: { name: "boolean" }, control: "boolean", description: "Mostrar el botón de cierre.", table: { category: "Estructura" } },
  },
  parameters: {
    controls: { include: ["tone", "title", "children", "showLink", "showClose"] },
    viu: {
      status: "Stable",
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
  decorators: [(S) => <div style={{ width: 560, maxWidth: "100%" }}>{S()}</div>],
} satisfies Meta<BannerDemoArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithLinkAndClose: Story = { args: { tone: "warning", showLink: true, showClose: true } };
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

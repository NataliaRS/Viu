import { useLocale } from "./i18n";

/**
 * Contenido de la página "Get started / Introduction", bilingüe (EN default / ES).
 * Se renderiza desde Introduction.mdx. Lee el locale de la toolbar vía useLocale.
 */

const heroBox: React.CSSProperties = {
  background: "var(--gradient-hero)",
  border: "1px solid var(--color-border-subtle)",
  borderRadius: "var(--radius-surface)",
  padding: "var(--space-3xl) var(--space-2xl)",
  marginBottom: "var(--space-xl)",
};
const h2: React.CSSProperties = { color: "var(--color-text-primary)", marginTop: "var(--space-2xl)" };
const body: React.CSSProperties = { color: "var(--color-text-secondary)", maxWidth: "72ch" };
const ul: React.CSSProperties = { color: "var(--color-text-secondary)", maxWidth: "72ch", display: "grid", gap: "var(--space-2xs)", paddingLeft: "var(--space-md)" };
const pre: React.CSSProperties = {
  background: "var(--color-bg-raised)",
  border: "1px solid var(--color-border-subtle)",
  borderRadius: "var(--radius-control)",
  padding: "var(--space-md)",
  overflowX: "auto",
  fontFamily: "var(--font-family-mono)",
  fontSize: "var(--font-size-code-s)",
  color: "var(--color-text-secondary)",
};

const INSTALL = `npm install @viu/design-tokens @viu/ui`;
const USAGE = (createLabel: string) => `// 1) Tokens (CSS variables + themes) — once, at app level
import "@viu/design-tokens/css";
// 2) Component styles
import "@viu/ui/styles";

import { Button, Icon } from "@viu/ui";

export function Example() {
  return (
    <Button variant="primary" leadingIcon={<Icon glyph="Plus" />}>
      ${createLabel}
    </Button>
  );
}`;
const THEMING_HTML = `<html data-theme="light"> … </html>`;

export function IntroContent() {
  const L = useLocale();
  const es = L === "es";

  return (
    <div>
      <div style={heroBox}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-xs)", marginBottom: "var(--space-md)" }}>
          <strong className="viu-type-title-m" style={{ color: "var(--color-text-primary)" }}>VIU</strong>
          <span style={{ width: 10, height: 10, borderRadius: 9999, background: "var(--color-bg-brand)" }} />
        </div>
        <h1 className="viu-type-display-s" style={{ margin: 0, color: "var(--color-text-primary)" }}>Design System</h1>
        <p className="viu-type-body-l" style={{ color: "var(--color-text-secondary)", maxWidth: "60ch", marginTop: "var(--space-sm)" }}>
          {es ? (
            <>
              Sistema de diseño <strong>black-first</strong> de VIU: premium, editorial y construido sobre una
              filosofía de <strong>simplicidad radical</strong>. Cada elemento debe justificar su existencia.
              Ante la duda, se elimina.
            </>
          ) : (
            <>
              VIU's <strong>black-first</strong> design system: premium, editorial, and built on a philosophy of
              <strong> radical simplicity</strong>. Every element must justify its existence. When in doubt, remove it.
            </>
          )}
        </p>
        <p className="viu-type-body-m" style={{ color: "var(--color-text-tertiary)", maxWidth: "60ch", marginTop: "var(--space-sm)" }}>
          {es
            ? "Creado por Natalia Rodríguez junto a Claude, con una única fuente de verdad entre diseño y código."
            : "Created by Natalia Rodríguez together with Claude, with a single source of truth between design and code."}
        </p>
      </div>

      <h2 className="viu-type-title-m" style={h2}>{es ? "Qué es" : "What it is"}</h2>
      <p className="viu-type-body-m" style={body}>
        {es ? (
          <>
            VIU es la <strong>fuente única de verdad</strong> del producto: tokens (primitivos → semánticos →
            temas) y una biblioteca de componentes que los consumen. Lo que ves acá se genera desde las mismas
            variables que viven en Figma, así que <strong>diseño y código no se desincronizan</strong>. No es un
            catálogo de piezas sueltas: es un criterio compartido para construir con la misma voz.
          </>
        ) : (
          <>
            VIU is the product's <strong>single source of truth</strong>: tokens (primitives → semantic → themes)
            and a component library that consumes them. What you see here is generated from the same variables that
            live in Figma, so <strong>design and code never drift apart</strong>. It's not a catalog of loose
            pieces: it's a shared standard for building with one voice.
          </>
        )}
      </p>
      <ul className="viu-type-body-m" style={ul}>
        <li>{es
          ? <><strong>Foundations</strong> — colores, tipografía, espaciado, radios, efectos y grid, leídos de los tokens.</>
          : <><strong>Foundations</strong> — colors, typography, spacing, radii, effects and grid, read from the tokens.</>}</li>
        <li>{es
          ? <><strong>Components</strong> — un sistema de átomos, moléculas, organismos y patrones, cada uno con sus variantes, estados, accesibilidad verificada y mapeo a Figma vía Code Connect.</>
          : <><strong>Components</strong> — a system of atoms, molecules, organisms and patterns, each with its variants, states, verified accessibility and mapping to Figma via Code Connect.</>}</li>
      </ul>

      <h2 className="viu-type-title-m" style={h2}>{es ? "Principios que lo gobiernan" : "Guiding principles"}</h2>
      <p className="viu-type-body-m" style={body}>
        {es ? "Cinco reglas, en voz propia, detrás de cada decisión del sistema." : "Five rules, in the system's own voice, behind every decision."}
      </p>
      <ul className="viu-type-body-m" style={ul}>
        {(es
          ? [
              <><strong>El sistema desaparece.</strong> La mejor interfaz no se nota: lógica clara y cero fricción. Si una pieza llama la atención sobre sí misma, sobra.</>,
              <><strong>Autoridad, no novedad.</strong> Calidad editorial y contención antes que adorno o tendencia; nada lee como tentativo.</>,
              <><strong>Cada elemento comunica — o se quita.</strong> Retícula, jerarquía y un solo acento por superficie.</>,
              <><strong>Accesible y humana, sin excepción.</strong> WCAG 2.2 AA verificado con números (4.5:1 texto, 3:1 grande/UI), foco siempre visible, estado por color + información. Es piso, no un extra.</>,
              <><strong>Específica, nunca genérica.</strong> Si una decisión podría aparecer igual en cualquier otro sistema, se replantea.</>,
            ]
          : [
              <><strong>The system disappears.</strong> The best interface goes unnoticed: clear logic and zero friction. If a piece calls attention to itself, it's superfluous.</>,
              <><strong>Authority, not novelty.</strong> Editorial quality and restraint before ornament or trend; nothing reads as tentative.</>,
              <><strong>Every element communicates — or it goes.</strong> Grid, hierarchy and a single accent per surface.</>,
              <><strong>Accessible and human, without exception.</strong> WCAG 2.2 AA verified with numbers (4.5:1 text, 3:1 large/UI), focus always visible, state by color + information. It's the floor, not an extra.</>,
              <><strong>Specific, never generic.</strong> If a decision could show up identically in any other system, we rethink it.</>,
            ]
        ).map((li, i) => <li key={i}>{li}</li>)}
      </ul>

      <h2 className="viu-type-title-m" style={h2}>{es ? "Instalación y uso" : "Installation & usage"}</h2>
      <pre style={pre}><code>{INSTALL}</code></pre>
      <pre style={pre}><code>{USAGE(es ? "Crear" : "Create")}</code></pre>

      <h2 className="viu-type-title-m" style={h2}>Theming</h2>
      <p className="viu-type-body-m" style={body}>
        {es ? (
          <>El tema por defecto es <strong>dark</strong> (black-first). Para tema claro, seteá <code>data-theme</code> en la raíz:</>
        ) : (
          <>The default theme is <strong>dark</strong> (black-first). For a light theme, set <code>data-theme</code> on the root:</>
        )}
      </p>
      <pre style={pre}><code>{THEMING_HTML}</code></pre>
      <p className="viu-type-body-m" style={body}>
        {es ? (
          <>Sin <code>data-theme</code>, el sistema sigue el modo del sistema operativo (<code>prefers-color-scheme</code>). En este Storybook podés cambiar el tema con el control <strong>Tema</strong> en la barra superior ↑.</>
        ) : (
          <>Without <code>data-theme</code>, the system follows the OS mode (<code>prefers-color-scheme</code>). In this Storybook you can switch the theme with the <strong>Tema</strong> control in the top toolbar ↑.</>
        )}
      </p>

      <h2 className="viu-type-title-m" style={h2}>{es ? "Reglas del sistema" : "System rules"}</h2>
      <ul className="viu-type-body-m" style={ul}>
        {(es
          ? [
              <>Los componentes consumen <strong>solo</strong> tokens semánticos / escalas / tipografía / motion — nunca hex ni valores sueltos.</>,
              <>El color semántico (<code>--color-bg|text|border|feedback-*</code>) es la única capa de color que se usa en componentes.</>,
              <>Tipografía responsive: Mobile por defecto, Desktop ≥ 1024px.</>,
            ]
          : [
              <>Components consume <strong>only</strong> semantic tokens / scales / typography / motion — never hex or loose values.</>,
              <>Semantic color (<code>--color-bg|text|border|feedback-*</code>) is the only color layer used in components.</>,
              <>Responsive typography: Mobile by default, Desktop ≥ 1024px.</>,
            ]
        ).map((li, i) => <li key={i}>{li}</li>)}
      </ul>

      <h2 className="viu-type-title-m" style={h2}>{es ? "Recursos" : "Resources"}</h2>
      <table style={{ borderCollapse: "collapse", marginTop: "var(--space-sm)" }} className="viu-type-body-m">
        <tbody style={{ color: "var(--color-text-secondary)" }}>
          <tr><td style={{ padding: "var(--space-2xs) var(--space-md) var(--space-2xs) 0" }}>🎨 Figma · Tokens & Foundations</td><td><code>o4tzMPcZIWMzVc67dW6dWW</code></td></tr>
          <tr><td style={{ padding: "var(--space-2xs) var(--space-md) var(--space-2xs) 0" }}>🧩 Figma · {es ? "Componentes" : "Components"}</td><td><code>kjEg0KpLID4cH00DruERTN</code></td></tr>
          <tr><td style={{ padding: "var(--space-2xs) var(--space-md) var(--space-2xs) 0" }}>📖 Storybook</td><td><a href="https://nataliars.github.io/Viu/" style={{ color: "var(--color-text-link)" }}>nataliars.github.io/Viu</a></td></tr>
          <tr><td style={{ padding: "var(--space-2xs) var(--space-md) var(--space-2xs) 0" }}>💻 Repo</td><td><a href="https://github.com/NataliaRS/Viu" style={{ color: "var(--color-text-link)" }}>github.com/NataliaRS/Viu</a></td></tr>
        </tbody>
      </table>

      <hr style={{ border: "none", borderTop: "1px solid var(--color-border-subtle)", margin: "var(--space-2xl) 0 var(--space-md)" }} />
      <p style={{ color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-label)", fontSize: "var(--font-size-label-s)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase" }}>
        {es ? (
          <>Empezá por <strong>Foundations</strong> · luego explorá <strong>Atoms</strong></>
        ) : (
          <>Start with <strong>Foundations</strong> · then explore <strong>Atoms</strong></>
        )}
      </p>
    </div>
  );
}

export default IntroContent;

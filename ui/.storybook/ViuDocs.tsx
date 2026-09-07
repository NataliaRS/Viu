import { Title, Description, Primary, Controls, Stories, Markdown, useOf } from "@storybook/blocks";
import { useLocale, CHROME } from "./i18n";
import { VIU_EN } from "./viu-en";

/**
 * VIU custom Docs page — a single, reusable template so every component gets the
 * same rich documentation (mirrors the Figma canonical doc: Overview / When to use
 * / Anatomy / States / Accessibility / Do & Don't). A component opts in by adding a
 * `parameters.viu` block to its meta; missing fields degrade gracefully.
 */
export interface ViuMeta {
  /** Madurez — escala única del sistema (A1): Draft → Reviewed → Stable → Deprecated. */
  status?: "Draft" | "Reviewed" | "Stable" | "Deprecated";
  /** Figma node URL — renders a "View in Figma" link. */
  figma?: string;
  /** Markdown overview. */
  overview?: string;
  whenToUse?: string[];
  whenNotToUse?: string[];
  anatomy?: string[];
  accessibility?: string[];
  dos?: string[];
  donts?: string[];
}

const STATUS: Record<NonNullable<ViuMeta["status"]>, { label: string; surface: string; text: string }> = {
  Draft: { label: "Draft", surface: "var(--color-feedback-warning-surface)", text: "var(--color-feedback-warning-text)" },
  Reviewed: { label: "Reviewed", surface: "var(--color-feedback-info-surface)", text: "var(--color-feedback-info-text)" },
  Stable: { label: "Stable", surface: "var(--color-feedback-success-surface)", text: "var(--color-feedback-success-text)" },
  Deprecated: { label: "Deprecated", surface: "var(--color-feedback-danger-surface)", text: "var(--color-feedback-danger-text)" },
};

const h2: React.CSSProperties = {
  fontFamily: "var(--font-family-label)",
  fontSize: "var(--font-size-label-s)",
  fontWeight: 500,
  letterSpacing: "var(--tracking-wide)",
  textTransform: "uppercase",
  color: "var(--color-text-secondary)",
  margin: "var(--space-2xl) 0 var(--space-sm)",
};
const list: React.CSSProperties = {
  margin: 0,
  paddingLeft: "var(--space-md)",
  display: "grid",
  gap: "var(--space-2xs)",
  color: "var(--color-text-secondary)",
  fontFamily: "var(--font-family-body)",
  fontSize: "var(--font-size-body-m)",
  lineHeight: "var(--line-height-relaxed)",
};
const cols: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "var(--space-lg)",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <h3 style={h2}>{title}</h3>
      {children}
    </>
  );
}

function Card({ accent, title, items }: { accent: string; title: string; items: string[] }) {
  return (
    <div
      style={{
        border: "1px solid var(--color-border-subtle)",
        borderRadius: "var(--radius-surface)",
        padding: "var(--space-md)",
        borderTop: `2px solid ${accent}`,
      }}
    >
      <div style={{ color: accent, fontFamily: "var(--font-family-label)", fontWeight: 500, marginBottom: "var(--space-xs)" }}>
        {title}
      </div>
      <ul style={list}>
        {items.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

export function ViuDocs() {
  const locale = useLocale();
  const C = CHROME[locale];
  let es: ViuMeta = {};
  let title = "";
  try {
    const resolved = useOf("meta") as { preparedMeta?: { title?: string; parameters?: { viu?: ViuMeta } } };
    es = resolved?.preparedMeta?.parameters?.viu ?? {};
    title = resolved?.preparedMeta?.title ?? "";
  } catch {
    es = {};
  }
  // locale en: overlay inglés sobre el español (fallback donde falte). status/figma vienen del ES.
  const en = locale === "en" && title ? VIU_EN[title] : undefined;
  const viu: ViuMeta = en ? { ...es, ...en } : es;
  const status = viu.status ? STATUS[viu.status] : undefined;

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)", flexWrap: "wrap" }}>
        <Title />
        {status ? (
          <span
            style={{
              background: status.surface,
              color: status.text,
              fontFamily: "var(--font-family-label)",
              fontSize: "var(--font-size-label-s)",
              fontWeight: 500,
              letterSpacing: "var(--tracking-wide)",
              textTransform: "uppercase",
              padding: "var(--space-3xs) var(--space-xs)",
              borderRadius: "var(--radius-pill)",
            }}
          >
            {status.label}
          </span>
        ) : null}
        {viu.figma ? (
          <a
            href={viu.figma}
            target="_blank"
            rel="noreferrer"
            style={{ marginLeft: "auto", color: "var(--color-text-link)", fontFamily: "var(--font-family-label)", fontSize: "var(--font-size-label-m)" }}
          >
            {C.viewInFigma}
          </a>
        ) : null}
      </div>

      {viu.overview ? <Markdown>{viu.overview}</Markdown> : <Description />}

      {viu.whenToUse || viu.whenNotToUse ? (
        <Section title={C.whenToUse}>
          <div style={cols}>
            {viu.whenToUse ? <Card accent="var(--color-feedback-success-text)" title={C.useWhen} items={viu.whenToUse} /> : null}
            {viu.whenNotToUse ? <Card accent="var(--color-feedback-danger-text)" title={C.avoidWhen} items={viu.whenNotToUse} /> : null}
          </div>
        </Section>
      ) : null}

      <Section title={C.overview}>
        <Primary />
      </Section>

      <Section title={C.properties}>
        <Controls />
      </Section>

      {viu.anatomy ? (
        <Section title={C.anatomy}>
          <ul style={list}>
            {viu.anatomy.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </Section>
      ) : null}

      {viu.accessibility ? (
        <Section title={C.accessibility}>
          <ul style={list}>
            {viu.accessibility.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </Section>
      ) : null}

      {viu.dos || viu.donts ? (
        <Section title={C.doAndDont}>
          <div style={cols}>
            {viu.dos ? <Card accent="var(--color-feedback-success-text)" title={C.do} items={viu.dos} /> : null}
            {viu.donts ? <Card accent="var(--color-feedback-danger-text)" title={C.dont} items={viu.donts} /> : null}
          </div>
        </Section>
      ) : null}

      <Section title={C.examples}>
        <Stories includePrimary={false} />
      </Section>
    </>
  );
}

export default ViuDocs;

import { Banner, Button, Card, PageHeader, Tag } from "@viu/ui";

/**
 * Plantilla de prototipo: TODO se arma con componentes de @viu/ui y, para el layout
 * propio, SOLO con tokens (var(--space-*), var(--color-*), clases viu-type-*). Cero
 * hex/px hardcodeados → así respeta la marca.
 */
const proyectos = [
  { eyebrow: "Producto", title: "Rediseño 2026", body: "Rework del onboarding y la home con el nuevo sistema." },
  { eyebrow: "Investigación", title: "Estudio de usuarios", body: "Entrevistas y síntesis para el próximo trimestre." },
  { eyebrow: "Marketing", title: "Campaña Q3", body: "Lanzamiento y piezas para redes y email." },
];

export function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-bg-base)",
        color: "var(--color-text-primary)",
        fontFamily: "var(--font-family-body)",
        padding: "var(--space-2xl)",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gap: "var(--space-xl)" }}>
        <PageHeader
          title="Mis proyectos"
          subtitle="Un prototipo armado 100% con componentes y tokens de VIU."
          actions={
            <>
              <Button variant="secondary">Importar</Button>
              <Button variant="primary">Nuevo proyecto</Button>
            </>
          }
        />

        <Banner tone="info" title="Estás usando el design system">
          Componé solo con <code>@viu/ui</code> y consumí los tokens; nunca hardcodees colores ni tamaños.
        </Banner>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "var(--space-lg)",
          }}
        >
          {proyectos.map((p) => (
            <Card
              key={p.title}
              surface="elevated"
              eyebrow={p.eyebrow}
              title={p.title}
              titleSize="title-m"
              body={p.body}
              tags={<Tag tone="brand">Activo</Tag>}
              primaryAction={
                <Button variant="primary" size="sm">
                  Abrir
                </Button>
              }
              secondaryAction={
                <Button variant="secondary" size="sm">
                  Compartir
                </Button>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

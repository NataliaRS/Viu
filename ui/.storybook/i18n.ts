import { useEffect, useReducer } from "react";
import { addons } from "@storybook/preview-api";

/**
 * i18n del Storybook VIU — toggle EN/ES en la toolbar, **inglés default**.
 *
 * No hay API pública para leer un global de la toolbar dentro de una Docs page (SB8), pero
 * la Docs page **se re-renderiza de cero** cuando cambia un global. Así que leemos el valor
 * sincrónicamente del canal del preview (`addons.getChannel().last("updateGlobals")`), con
 * fallback a la URL (`?globals=locale:es`, sobrevive reload/deep-link) y a `en` por defecto.
 * Además nos suscribimos al evento del canal para forzar el re-render (cinturón + tirantes).
 */
export type Locale = "en" | "es";
export const DEFAULT_LOCALE: Locale = "en";

function readLocale(): Locale {
  try {
    const ch = addons.getChannel();
    const last = ch?.last?.("updateGlobals");
    const g = last?.[0]?.globals;
    if (g?.locale === "en" || g?.locale === "es") return g.locale;
  } catch {
    /* canal no disponible: seguimos con URL/default */
  }
  try {
    const q = decodeURIComponent(`${window.location.search}${window.location.hash}`);
    const m = /(?:^|[;&,])locale:(en|es)\b/.exec(q) ?? /\blocale:(en|es)\b/.exec(q);
    if (m) return m[1] as Locale;
  } catch {
    /* sin window: default */
  }
  return DEFAULT_LOCALE;
}

/** Lee el locale actual y re-renderiza el componente cuando la toolbar lo cambia. */
export function useLocale(): Locale {
  const [, force] = useReducer((x: number) => x + 1, 0);
  useEffect(() => {
    let ch: ReturnType<typeof addons.getChannel> | undefined;
    try {
      ch = addons.getChannel();
    } catch {
      return;
    }
    const h = () => force();
    ch.on("updateGlobals", h);
    ch.on("globalsUpdated", h);
    return () => {
      ch?.off("updateGlobals", h);
      ch?.off("globalsUpdated", h);
    };
  }, []);
  return readLocale();
}

/** Elige una de dos según el locale (helper para copy suelto en stories/foundations). */
export function t<T>(locale: Locale, en: T, es: T): T {
  return locale === "es" ? es : en;
}

/** Etiquetas del chrome de ViuDocs (secciones, tarjetas, links). */
export const CHROME: Record<Locale, Record<string, string>> = {
  en: {
    viewInFigma: "View in Figma ↗",
    whenToUse: "When to use",
    useWhen: "Use it when",
    avoidWhen: "Avoid it when",
    overview: "Overview",
    properties: "Properties",
    anatomy: "Anatomy",
    accessibility: "Accessibility",
    doAndDont: "Do & Don't",
    do: "✓ Do",
    dont: "✗ Don't",
    examples: "Examples",
  },
  es: {
    viewInFigma: "Ver en Figma ↗",
    whenToUse: "Cuándo usar",
    useWhen: "Usalo cuando",
    avoidWhen: "Evitalo cuando",
    overview: "Vista general",
    properties: "Propiedades",
    anatomy: "Anatomía",
    accessibility: "Accesibilidad",
    doAndDont: "Do & Don't",
    do: "✓ Hacé",
    dont: "✗ No hagas",
    examples: "Ejemplos",
  },
};

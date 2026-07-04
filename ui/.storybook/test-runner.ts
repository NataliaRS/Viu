import type { TestRunnerConfig } from "@storybook/test-runner";
import { injectAxe, checkA11y } from "axe-playwright";

/**
 * F5 · a11y continua: axe corre sobre CADA story en CI (storybook-verify.yml).
 * "0 fallas WCAG" pasa de auditoría puntual a invariante por commit.
 * Nota: la excepción documentada del sistema (contraste de borde, WCAG 1.4.11) no
 * requiere exclusión acá — axe-core no evalúa non-text contrast por defecto; si algún
 * día se habilita esa regla, la excepción se codifica en este archivo, no se ignora
 * el run (regla §5: las excepciones viven en config versionada, no en memoria).
 *
 * Exclusión acotada (regla, no atajo): la foundation `Foundations/Colors` renderiza una
 * MATRIZ de contraste que muestra a propósito combinaciones sub-AA (celdas "2.63 ✗") para
 * enseñar cuáles pasan y cuáles no — evaluarla con axe da falsos positivos sobre su propio
 * material didáctico. Se saltea SOLO esa story, documentado acá y en el skill; NO se
 * deshabilita la regla color-contrast globalmente. Cualquier otra story sigue auditada.
 */
const SKIP_A11Y = new Set(["foundations-colors"]); // title "Foundations/Colors"

const config: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page);
  },
  async postVisit(page, context) {
    if (SKIP_A11Y.has(context.title.replace(/\//g, "-").toLowerCase())) return;
    await checkA11y(page, "#storybook-root", {
      detailedReport: true,
      detailedReportOptions: { html: true },
    });
  },
};

export default config;

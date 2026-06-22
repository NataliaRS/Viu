import figma from "@figma/code-connect";
import { Icon } from "./Icon";

/**
 * Code Connect — mapea el wrapper «Icon» de Material Symbols al `<Icon/>`.
 * El set local viejo (56:431, 11 glifos) se migró y eliminó; el wrapper vive en
 * el archivo Icon (`5rV8Ad6qqHx5mocSpObi0k`, local 944:6) con property `Size` y
 * una «Glyph» anidada swappeable. La `glyph` del código acepta el nombre Material
 * directamente (snake_case) o un nombre legacy (que se resuelve internamente).
 * Publish con `npx figma connect publish` (necesita token de Figma).
 */
figma.connect(
  Icon,
  "https://www.figma.com/design/5rV8Ad6qqHx5mocSpObi0k/Icon?node-id=944-6",
  {
    props: {
      size: figma.enum("Size", {
        xs: 16,
        sm: 20,
        md: 24,
        lg: 32,
        xl: 40,
        "2xl": 48,
      }),
    },
    example: ({ size }) => <Icon glyph="search" size={size} />,
  },
);

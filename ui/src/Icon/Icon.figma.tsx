import figma from "@figma/code-connect";
import { Icon } from "./Icon";

/**
 * Code Connect — maps the Figma Icon (set 56:431) to <Icon/>.
 * Publish with: `npx figma connect publish` (needs a Figma access token).
 */
figma.connect(
  Icon,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=56-431",
  {
    props: {
      glyph: figma.enum("Glyph", {
        Plus: "Plus",
        Check: "Check",
        Chevron: "Chevron",
        Close: "Close",
        Arrow: "Arrow",
        Search: "Search",
        Info: "Info",
        Alert: "Alert",
        Visibility: "Visibility",
        Visibility_off: "VisibilityOff",
        Folder: "Folder",
      }),
    },
    example: ({ glyph }) => <Icon glyph={glyph} />,
  },
);

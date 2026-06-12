import figma from "@figma/code-connect";
import { Footer } from "./Footer";
import { Link } from "../Link/Link";

figma.connect(
  Footer,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=415-7",
  {
    example: () => (
      <Footer copyright="© 2026 VIU.">
        <span style={{ display: "flex", gap: "var(--space-lg)" }}>
          <Link href="#">Privacidad</Link>
          <Link href="#">Términos</Link>
        </span>
      </Footer>
    ),
  },
);

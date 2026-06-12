import figma from "@figma/code-connect";
import { AvatarGroup } from "./AvatarGroup";

figma.connect(
  AvatarGroup,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=185-37",
  {
    example: () => (
      <AvatarGroup
        max={4}
        items={[{ initials: "NR" }, { initials: "JP" }, { initials: "AL" }, { initials: "MG" }, { initials: "TS" }]}
      />
    ),
  },
);

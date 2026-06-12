import figma from "@figma/code-connect";
import { ListItem } from "./ListItem";
import { Avatar } from "../Avatar/Avatar";

figma.connect(
  ListItem,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=165-41",
  {
    props: {
      title: figma.string("titulo"),
      subtitle: figma.string("textoSubtitulo"),
      meta: figma.string("textoMeta"),
      chevron: figma.boolean("chevron"),
      selected: figma.enum("estado", { Seleccionado: true }),
      disabled: figma.enum("estado", { Deshabilitado: true }),
    },
    example: ({ title, subtitle, meta, chevron, selected, disabled }) => (
      <ListItem
        leading={<Avatar size="md" initials="NR" />}
        title={title}
        subtitle={subtitle}
        meta={meta}
        chevron={chevron}
        selected={selected}
        disabled={disabled}
        onSelect={() => {}}
      />
    ),
  },
);

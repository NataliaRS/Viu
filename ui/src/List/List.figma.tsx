import figma from "@figma/code-connect";
import { List } from "./List";
import { ListItem } from "../ListItem/ListItem";

figma.connect(
  List,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=400-7",
  {
    example: () => (
      <List>
        <ListItem title="Natalia Rodríguez" subtitle="Directora de UX" meta="Hace 2 h" chevron />
        <ListItem title="Juan Pérez" subtitle="Ingeniero" meta="Ayer" chevron />
      </List>
    ),
  },
);

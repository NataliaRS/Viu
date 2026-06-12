import figma from "@figma/code-connect";
import { VideoEmbed } from "./VideoEmbed";

figma.connect(
  VideoEmbed,
  "https://www.figma.com/design/kjEg0KpLID4cH00DruERTN/Componentes?node-id=414-7",
  {
    example: () => <VideoEmbed poster="https://picsum.photos/seed/video/640/360" alt="Vista previa" onPlay={() => {}} />,
  },
);

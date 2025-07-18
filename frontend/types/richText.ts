import { Styles } from "./styles";
import { PortableTextBlock } from "@portabletext/types";

export interface RichTextBlockProps {
  text: PortableTextBlock[];
  styleOptions: Styles;
}

import { Styles } from "./styles";
import { PortableTextBlock } from "@portabletext/types";

export interface QuoteBlockProps {
  quote: PortableTextBlock[];
  author?: string;
  style?: string;
  styleOptions: Styles;
}

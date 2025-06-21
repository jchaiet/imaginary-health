import { Styles } from "./styles";
import { PortableTextBlock } from "@portabletext/types";

export interface DisclaimerBlockProps {
  disclaimer: PortableTextBlock[];
  styleOptions: Styles;
}

import { PortableTextBlock } from "@portabletext/types";

export type MetricType = {
  _key: string;
  _type: string;
  metricValue?: string;
  metricDescription?: PortableTextBlock[];
};

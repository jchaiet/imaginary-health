import { ReactNode } from "react";
import Layout from "@/components/layout/Layout";

type PageTemplateProps = {
  children: ReactNode;
  layoutType?: "default" | "minimal" | "dashboard";
  hideHeader?: boolean;
  hideFooter?: boolean;
};

export default async function PageTemplate({
  children,
  layoutType = "default",
  hideHeader = false,
  hideFooter = false,
}: PageTemplateProps) {
  //Layout variants
  if (layoutType === "minimal") {
    return <div>{children}</div>;
  }

  return (
    <Layout hideHeader={hideHeader} hideFooter={hideFooter}>
      {children}
    </Layout>
  );
}

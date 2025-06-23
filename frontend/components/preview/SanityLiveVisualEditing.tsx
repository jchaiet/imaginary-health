"use client";
import { SanityLive } from "@/sanity/live";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function SanityLiveVisualEditing() {
  const [isInIframe, setIsInIframe] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsInIframe(window.parent !== window);
  }, []);

  useEffect(() => {
    if (isInIframe && window.parent.location.pathname !== pathname) {
      router.refresh();
    }
  }, [isInIframe, pathname, router]);

  if (!isInIframe) return null;

  return <SanityLive />;
}

"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    fetch("/api/visit", {
      method: "POST",
      credentials: "same-origin",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ path: pathname }),
      keepalive: true,
    }).catch((error) => {
      console.warn("Visitor tracking request failed", error);
    });
  }, [pathname]);

  return null;
}

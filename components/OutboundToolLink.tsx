"use client";

import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type OutboundToolLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick"> & {
  children: ReactNode;
  href: string;
  toolSlug: string;
};

function recordOutboundClick(toolSlug: string, sourcePath: string) {
  const url = "/api/visit";
  const body = JSON.stringify({ event: "outbound_click", toolSlug, sourcePath });

  // Beacon is deliberately best-effort. The destination link must never wait
  // for analytics, so a blocked or unavailable endpoint cannot break a visit.
  if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
    const sent = navigator.sendBeacon(url, new Blob([body], { type: "application/json" }));
    if (sent) return;
  }

  void fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "content-type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => undefined);
}

export default function OutboundToolLink({ children, href, toolSlug, ...props }: OutboundToolLinkProps) {
  const pathname = usePathname();

  return (
    <a {...props} href={href} onClick={() => recordOutboundClick(toolSlug, pathname)}>
      {children}
    </a>
  );
}

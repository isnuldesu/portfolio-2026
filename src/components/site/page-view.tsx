"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Records one view per path change. Fire and forget; failures are ignored. */
export function PageView() {
  const pathname = usePathname();

  useEffect(() => {
    const locale = pathname.split("/")[1] ?? "";
    const body = JSON.stringify({
      path: pathname,
      locale,
      referrer: document.referrer || null,
    });

    // sendBeacon survives the page being closed mid-request.
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
      return;
    }
    void fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}

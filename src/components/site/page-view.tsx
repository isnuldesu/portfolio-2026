"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const OPT_OUT_KEY = "isnul-no-track";

/**
 * Records one view per path change, unless this browser has opted out.
 *
 * Opting out is a single local flag, not an identifier: nothing is stored that
 * could recognise the same person on another visit or another device. It is
 * set from the dashboard, or by visiting any page with ?notrack=1.
 */
export function PageView() {
  const pathname = usePathname();

  useEffect(() => {
    // Read the query inside the effect: useSearchParams would force every
    // page that renders this into a Suspense boundary at build time.
    if (new URLSearchParams(window.location.search).get("notrack") === "1") {
      window.localStorage.setItem(OPT_OUT_KEY, "1");
    }

    const optedOut = window.localStorage.getItem(OPT_OUT_KEY) === "1";
    // Browsers that ask not to be tracked are not counted either.
    const doNotTrack = navigator.doNotTrack === "1" || navigator.doNotTrack === "yes";
    if (optedOut || doNotTrack) return;

    const body = JSON.stringify({
      path: pathname,
      locale: pathname.split("/")[1] ?? "",
      referrer: document.referrer || null,
    });

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

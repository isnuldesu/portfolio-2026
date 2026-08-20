"use client";

import { useCallback, useSyncExternalStore } from "react";

import { OPT_OUT_KEY } from "@/components/site/page-view";

/**
 * Turns counting on and off for this browser only. Reading a browser store
 * during render is what useSyncExternalStore is for; setting state from an
 * effect would render the wrong answer first and correct it a frame later.
 */
function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener("isnul:tracking", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("isnul:tracking", onChange);
  };
}

export function TrackingToggle() {
  const optedOut = useSyncExternalStore(
    subscribe,
    () => window.localStorage.getItem(OPT_OUT_KEY) === "1",
    () => false,
  );

  const toggle = useCallback(() => {
    if (window.localStorage.getItem(OPT_OUT_KEY) === "1") {
      window.localStorage.removeItem(OPT_OUT_KEY);
    } else {
      window.localStorage.setItem(OPT_OUT_KEY, "1");
    }
    window.dispatchEvent(new Event("isnul:tracking"));
  }, []);

  return (
    <div
      className="rule-left mt-12"
      style={{ "--rule": "var(--teal)" } as React.CSSProperties}
    >
      <p className="label-mono text-muted-foreground">Your own visits</p>
      <p className="mt-2 max-w-[60ch] text-sm text-muted-foreground">
        {optedOut
          ? "This browser is not being counted."
          : "This browser is being counted like any other visitor."}
      </p>
      <button
        type="button"
        onClick={toggle}
        className="mt-4 h-11 border-2 border-border px-6 text-sm font-medium"
      >
        {optedOut ? "Start counting this browser" : "Stop counting this browser"}
      </button>
      <p className="mt-3 text-xs text-muted-foreground">
        Per browser. On your phone, open any page with ?notrack=1 once.
      </p>
    </div>
  );
}

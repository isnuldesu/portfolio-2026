"use client";

import { useState } from "react";

export function DashboardLogin() {
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const password = new FormData(event.currentTarget).get("password");
    setBusy(true);
    setError(false);

    const response = await fetch("/api/dashboard-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      window.location.reload();
      return;
    }
    setBusy(false);
    setError(true);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm">
      <p className="label-mono text-muted-foreground">Dashboard</p>
      <h1 className="font-display mt-3 text-3xl font-medium tracking-tight">Locked</h1>

      <label htmlFor="password" className="mt-8 block text-sm font-medium">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoFocus
        autoComplete="current-password"
        className="mt-2 w-full border-b-2 border-border bg-transparent py-2 text-sm outline-none focus-visible:border-foreground"
      />

      {error ? (
        <p role="alert" className="mt-3 text-sm text-destructive">
          That is not the password.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={busy}
        className="mt-6 h-11 bg-primary px-6 text-sm font-medium text-primary-foreground disabled:opacity-50"
      >
        {busy ? "Checking" : "Unlock"}
      </button>
    </form>
  );
}

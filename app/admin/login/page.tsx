"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        window.location.href = "/admin";
        return;
      }
      setError(data.error || "Could not sign in.");
    } catch {
      setError("Network problem. Please try again.");
    }
    setBusy(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-xl bg-white p-8 shadow-sm"
      >
        <p className="text-3xl font-bold text-[#1E3B2F]">daya.</p>
        <p className="mt-1 text-xs tracking-widest text-[#6B635C]">ADMIN</p>

        <label className="mt-8 block text-sm font-semibold text-[#1E3B2F]" htmlFor="pw">
          Password
        </label>
        <input
          id="pw"
          type="password"
          autoFocus
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-lg border border-[#1E3B2F]/20 px-4 py-3 text-sm"
        />

        {error && <p className="mt-3 text-sm text-[#B4472F]">{error}</p>}

        <button
          type="submit"
          disabled={busy}
          className="mt-6 w-full rounded-md bg-[#1E3B2F] px-6 py-3 text-xs font-semibold tracking-wide text-white disabled:opacity-60"
        >
          {busy ? "SIGNING IN..." : "SIGN IN"}
        </button>
      </form>
    </main>
  );
}

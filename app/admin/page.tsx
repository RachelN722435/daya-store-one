"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import type { SiteContent, Look } from "@/lib/content";

type Tab = "text" | "occasions" | "looks" | "bodytypes";

const TABS: { id: Tab; label: string }[] = [
  { id: "text", label: "Page text" },
  { id: "occasions", label: "Occasions" },
  { id: "looks", label: "Looks & prices" },
  { id: "bodytypes", label: "Body types" },
];

const input =
  "w-full rounded-lg border border-[#1E3B2F]/20 bg-white px-3 py-2.5 text-sm";

/* ---------- small building blocks ---------- */

function Field({
  label,
  value,
  onChange,
  rows,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-[#1E3B2F]">{label}</span>
      {rows ? (
        <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} className={input} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={input} />
      )}
      {hint && <span className="mt-1 block text-xs text-[#6B635C]">{hint}</span>}
    </label>
  );
}

function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function upload(file: File) {
    setBusy(true);
    setErr("");
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Upload failed.");
      onChange(data.url);
    } catch (e: any) {
      setErr(e.message || "Upload failed.");
    }
    setBusy(false);
  }

  return (
    <div>
      <span className="mb-1 block text-xs font-semibold text-[#1E3B2F]">{label}</span>
      <div className="flex gap-3">
        {value ? (
          <img src={value} alt="" className="h-20 w-16 flex-none rounded-md object-cover" />
        ) : (
          <div className="h-20 w-16 flex-none rounded-md bg-[#1E3B2F]/10" />
        )}
        <div className="min-w-0 flex-1 space-y-2">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste an image link, or upload below"
            className={input}
          />
          <label className="inline-block cursor-pointer rounded-md border border-[#1E3B2F]/30 px-3 py-1.5 text-xs font-semibold text-[#1E3B2F] hover:bg-white">
            {busy ? "Uploading..." : "Upload image"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={busy}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) upload(f);
                e.target.value = "";
              }}
            />
          </label>
          {err && <p className="text-xs text-[#B4472F]">{err}</p>}
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl bg-white p-5 shadow-sm">
      {title && <h2 className="mb-4 font-semibold text-[#1E3B2F]">{title}</h2>}
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function RowTools({
  index,
  count,
  onMove,
  onRemove,
}: {
  index: number;
  count: number;
  onMove: (dir: -1 | 1) => void;
  onRemove: () => void;
}) {
  const btn = "rounded border border-[#1E3B2F]/25 px-2 py-1 text-xs disabled:opacity-30";
  return (
    <div className="flex gap-1">
      <button type="button" className={btn} disabled={index === 0} onClick={() => onMove(-1)} aria-label="Move up">
        ↑
      </button>
      <button type="button" className={btn} disabled={index === count - 1} onClick={() => onMove(1)} aria-label="Move down">
        ↓
      </button>
      <button
        type="button"
        className="rounded border border-[#B4472F]/40 px-2 py-1 text-xs text-[#B4472F]"
        onClick={() => {
          if (confirm("Remove this item?")) onRemove();
        }}
      >
        Remove
      </button>
    </div>
  );
}

function move<T>(arr: T[], i: number, dir: -1 | 1): T[] {
  const j = i + dir;
  if (j < 0 || j >= arr.length) return arr;
  const copy = [...arr];
  [copy[i], copy[j]] = [copy[j], copy[i]];
  return copy;
}

/* ---------- main page ---------- */

export default function AdminPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [storageOk, setStorageOk] = useState(true);
  const [tab, setTab] = useState<Tab>("text");
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((d) => {
        setContent(d.content);
        setStorageOk(d.storageConfigured);
      })
      .catch(() => setStatus({ kind: "error", text: "Could not load content." }));
  }, []);

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  if (!content) {
    return <p className="p-8 text-sm text-[#6B635C]">{status?.text || "Loading..."}</p>;
  }

  const update = (patch: Partial<SiteContent>) => {
    setContent({ ...content, ...patch });
    setDirty(true);
    setStatus(null);
  };

  async function save() {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not save.");
      setDirty(false);
      setStatus({ kind: "ok", text: "Saved. Your site is updated." });
    } catch (e: any) {
      setStatus({ kind: "error", text: e.message || "Could not save." });
    }
    setSaving(false);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  /* list helpers */
  const setLook = (i: number, patch: Partial<Look>) =>
    update({ looks: content.looks.map((l, idx) => (idx === i ? { ...l, ...patch } : l)) });

  const renameBodyType = (i: number, name: string) => {
    const old = content.bodyTypes[i].name;
    update({
      bodyTypes: content.bodyTypes.map((b, idx) => (idx === i ? { ...b, name } : b)),
      looks: content.looks.map((l) => ({
        ...l,
        bodyTypes: l.bodyTypes.map((n) => (n === old ? name : n)),
      })),
    });
  };

  const renameOccasion = (i: number, name: string) => {
    const old = content.occasions[i];
    update({
      occasions: content.occasions.map((o, idx) => (idx === i ? name : o)),
      looks: content.looks.map((l) => (l.occasion === old ? { ...l, occasion: name } : l)),
      occasionCards: content.occasionCards.map((c) => (c.name === old ? { ...c, name } : c)),
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-5 pb-32 pt-6">
      {/* Top bar */}
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-3xl font-bold text-[#1E3B2F]">daya.</p>
          <p className="text-xs tracking-widest text-[#6B635C]">ADMIN</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <a href="/" target="_blank" rel="noopener noreferrer" className="underline">
            View site ↗
          </a>
          <button onClick={logout} className="text-[#B4472F] underline">
            Sign out
          </button>
        </div>
      </header>

      {!storageOk && (
        <p className="mt-5 rounded-lg border border-[#B4472F]/40 bg-white p-4 text-sm text-[#B4472F]">
          Storage is not connected yet, so you can look around but saving will not work. Follow
          ADMIN_SETUP.md to add your Supabase keys in Vercel.
        </p>
      )}

      {/* Tabs */}
      <nav className="mt-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium ${
              tab === t.id
                ? "border-[#1E3B2F] bg-[#1E3B2F] text-white"
                : "border-[#1E3B2F]/25 bg-white text-[#1E3B2F]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <div className="mt-6 space-y-6">
        {/* ---------------- PAGE TEXT ---------------- */}
        {tab === "text" && (
          <>
            <Card title="Header and footer">
              <Field label="Brand name" value={content.brandName} onChange={(v) => update({ brandName: v })} />
              <Field label="Tagline under the brand" value={content.brandTagline} onChange={(v) => update({ brandTagline: v })} />
              <Field label="Header button text" value={content.navButton} onChange={(v) => update({ navButton: v })} />
              <Field label="Footer text" value={content.footer} onChange={(v) => update({ footer: v })} />
            </Card>

            <Card title="Hero (top of the page)">
              <Field label="Small line above the headline" value={content.heroEyebrow} onChange={(v) => update({ heroEyebrow: v })} />
              <Field label="Headline, first part" value={content.heroTitleStart} onChange={(v) => update({ heroTitleStart: v })} />
              <Field label="Headline, highlighted part" value={content.heroTitleHighlight} onChange={(v) => update({ heroTitleHighlight: v })} />
              <Field label="Paragraph" rows={3} value={content.heroText} onChange={(v) => update({ heroText: v })} />
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="First button" value={content.heroButtonPrimary} onChange={(v) => update({ heroButtonPrimary: v })} />
                <Field label="Second button" value={content.heroButtonSecondary} onChange={(v) => update({ heroButtonSecondary: v })} />
              </div>
              <ImageField label="Hero image" value={content.heroImage} onChange={(v) => update({ heroImage: v })} />
            </Card>

            <Card title="Four-point strip under the hero">
              {content.strip.map((s, i) => (
                <div key={i} className="grid gap-3 md:grid-cols-2">
                  <Field
                    label={`Point ${i + 1}, bold part`}
                    value={s.bold}
                    onChange={(v) => update({ strip: content.strip.map((x, k) => (k === i ? { ...x, bold: v } : x)) })}
                  />
                  <Field
                    label={`Point ${i + 1}, rest`}
                    value={s.rest}
                    onChange={(v) => update({ strip: content.strip.map((x, k) => (k === i ? { ...x, rest: v } : x)) })}
                  />
                </div>
              ))}
            </Card>

            <Card title="Section headings">
              <Field label="Occasions heading" value={content.occasionsTitle} onChange={(v) => update({ occasionsTitle: v })} />
              <Field label="Occasions subtext" value={content.occasionsSubtitle} onChange={(v) => update({ occasionsSubtitle: v })} />
              <Field label="Outfit finder heading" value={content.finderTitle} onChange={(v) => update({ finderTitle: v })} />
              <Field
                label="Note under the looks"
                rows={2}
                value={content.finderNote}
                onChange={(v) => update({ finderNote: v })}
                hint='A "size guide" link is added automatically at the end of this note.'
              />
            </Card>

            <Card title="Three journey cards">
              <Field label="Section heading" value={content.journeysTitle} onChange={(v) => update({ journeysTitle: v })} />
              {content.journeys.map((j, i) => (
                <div key={i} className="space-y-3 rounded-lg border border-[#1E3B2F]/15 p-4">
                  <p className="text-xs font-semibold text-[#6B635C]">Card {i + 1}</p>
                  <Field
                    label="Title"
                    value={j.title}
                    onChange={(v) => update({ journeys: content.journeys.map((x, k) => (k === i ? { ...x, title: v } : x)) })}
                  />
                  <Field
                    label="Text"
                    value={j.text}
                    onChange={(v) => update({ journeys: content.journeys.map((x, k) => (k === i ? { ...x, text: v } : x)) })}
                  />
                  <label className="block">
                    <span className="mb-1 block text-xs font-semibold text-[#1E3B2F]">When tapped, go to</span>
                    <select
                      value={j.action}
                      onChange={(e) =>
                        update({
                          journeys: content.journeys.map((x, k) =>
                            k === i ? { ...x, action: e.target.value as typeof j.action } : x
                          ),
                        })
                      }
                      className={input}
                    >
                      <option value="finder">The outfit finder</option>
                      <option value="calculator">The size guide page</option>
                      <option value="book">The stylist booking form</option>
                    </select>
                  </label>
                  <ImageField
                    label="Image"
                    value={j.image}
                    onChange={(v) => update({ journeys: content.journeys.map((x, k) => (k === i ? { ...x, image: v } : x)) })}
                  />
                </div>
              ))}
            </Card>

            <Card title="Red banner">
              <Field label="Banner heading" value={content.bannerTitle} onChange={(v) => update({ bannerTitle: v })} />
              {content.bannerItems.map((b, i) => (
                <Field
                  key={i}
                  label={`Banner point ${i + 1}`}
                  value={b}
                  onChange={(v) => update({ bannerItems: content.bannerItems.map((x, k) => (k === i ? v : x)) })}
                />
              ))}
            </Card>

            <Card title="Stylist booking section">
              <Field label="Heading" value={content.bookTitle} onChange={(v) => update({ bookTitle: v })} />
              <Field label="Paragraph" rows={3} value={content.bookText} onChange={(v) => update({ bookText: v })} />
              <Field label="Message shown after the form is sent" value={content.bookThanks} onChange={(v) => update({ bookThanks: v })} />
            </Card>
          </>
        )}

        {/* ---------------- OCCASIONS ---------------- */}
        {tab === "occasions" && (
          <>
            <Card title="Photo cards under “Looks for every occasion”">
              <p className="text-sm text-[#6B635C]">
                The card name must match an occasion in the filter list below, so tapping a card
                filters the looks.
              </p>
              {content.occasionCards.map((c, i) => (
                <div key={i} className="space-y-3 rounded-lg border border-[#1E3B2F]/15 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-[#6B635C]">Card {i + 1}</p>
                    <RowTools
                      index={i}
                      count={content.occasionCards.length}
                      onMove={(d) => update({ occasionCards: move(content.occasionCards, i, d) })}
                      onRemove={() => update({ occasionCards: content.occasionCards.filter((_, k) => k !== i) })}
                    />
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-1 block text-xs font-semibold text-[#1E3B2F]">Occasion</span>
                      <select
                        value={c.name}
                        onChange={(e) =>
                          update({ occasionCards: content.occasionCards.map((x, k) => (k === i ? { ...x, name: e.target.value } : x)) })
                        }
                        className={input}
                      >
                        {!content.occasions.includes(c.name) && <option value={c.name}>{c.name}</option>}
                        {content.occasions.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </label>
                    <Field
                      label="Short note"
                      value={c.note}
                      onChange={(v) =>
                        update({ occasionCards: content.occasionCards.map((x, k) => (k === i ? { ...x, note: v } : x)) })
                      }
                    />
                  </div>
                  <ImageField
                    label="Image"
                    value={c.image}
                    onChange={(v) =>
                      update({ occasionCards: content.occasionCards.map((x, k) => (k === i ? { ...x, image: v } : x)) })
                    }
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  update({
                    occasionCards: [
                      ...content.occasionCards,
                      { name: content.occasions[0] || "New occasion", note: "", image: "" },
                    ],
                  })
                }
                className="rounded-md border border-[#1E3B2F] px-4 py-2 text-xs font-semibold text-[#1E3B2F]"
              >
                + Add card
              </button>
            </Card>

            <Card title="Occasion filter buttons (outfit finder)">
              {content.occasions.map((o, i) => (
                <div key={i} className="flex items-center gap-3">
                  <input value={o} onChange={(e) => renameOccasion(i, e.target.value)} className={input} />
                  <RowTools
                    index={i}
                    count={content.occasions.length}
                    onMove={(d) => update({ occasions: move(content.occasions, i, d) })}
                    onRemove={() => update({ occasions: content.occasions.filter((_, k) => k !== i) })}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => update({ occasions: [...content.occasions, "New occasion"] })}
                className="rounded-md border border-[#1E3B2F] px-4 py-2 text-xs font-semibold text-[#1E3B2F]"
              >
                + Add occasion
              </button>
            </Card>
          </>
        )}

        {/* ---------------- LOOKS ---------------- */}
        {tab === "looks" && (
          <Card title={`Looks (${content.looks.length})`}>
            {content.looks.map((l, i) => (
              <div key={l.id} className="space-y-3 rounded-lg border border-[#1E3B2F]/15 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={l.visible}
                      onChange={(e) => setLook(i, { visible: e.target.checked })}
                    />
                    Show on site
                  </label>
                  <RowTools
                    index={i}
                    count={content.looks.length}
                    onMove={(d) => update({ looks: move(content.looks, i, d) })}
                    onRemove={() => update({ looks: content.looks.filter((_, k) => k !== i) })}
                  />
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <Field label="Name" value={l.name} onChange={(v) => setLook(i, { name: v })} />
                  <Field label="Price (e.g. ₦65,000)" value={l.price} onChange={(v) => setLook(i, { price: v })} />
                  <label className="block">
                    <span className="mb-1 block text-xs font-semibold text-[#1E3B2F]">Occasion</span>
                    <select value={l.occasion} onChange={(e) => setLook(i, { occasion: e.target.value })} className={input}>
                      {!content.occasions.includes(l.occasion) && <option value={l.occasion}>{l.occasion}</option>}
                      {content.occasions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </label>
                  <Field
                    label="Shop link"
                    value={l.link}
                    onChange={(v) => setLook(i, { link: v })}
                    hint="Where this look goes when tapped. Use # for none."
                  />
                </div>

                <div>
                  <span className="mb-2 block text-xs font-semibold text-[#1E3B2F]">Suits these body types</span>
                  <div className="flex flex-wrap gap-2">
                    {content.bodyTypes.map((b) => {
                      const on = l.bodyTypes.includes(b.name);
                      return (
                        <button
                          type="button"
                          key={b.name}
                          onClick={() =>
                            setLook(i, {
                              bodyTypes: on ? l.bodyTypes.filter((n) => n !== b.name) : [...l.bodyTypes, b.name],
                            })
                          }
                          className={`rounded-full border px-3 py-1 text-xs ${
                            on
                              ? "border-[#1E3B2F] bg-[#1E3B2F] text-white"
                              : "border-[#1E3B2F]/25 bg-white text-[#1E3B2F]"
                          }`}
                          aria-pressed={on}
                        >
                          {b.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <ImageField label="Image" value={l.image} onChange={(v) => setLook(i, { image: v })} />
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                update({
                  looks: [
                    {
                      id: `look-${Date.now()}`,
                      name: "New look",
                      occasion: content.occasions[0] || "",
                      price: "₦0",
                      bodyTypes: [],
                      image: "",
                      link: "#",
                      visible: true,
                    },
                    ...content.looks,
                  ],
                })
              }
              className="rounded-md border border-[#1E3B2F] px-4 py-2 text-xs font-semibold text-[#1E3B2F]"
            >
              + Add look (goes to the top)
            </button>
          </Card>
        )}

        {/* ---------------- BODY TYPES ---------------- */}
        {tab === "bodytypes" && (
          <Card title="Body types and styling tips">
            {content.bodyTypes.map((b, i) => (
              <div key={i} className="space-y-3 rounded-lg border border-[#1E3B2F]/15 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-[#6B635C]">Body type {i + 1}</p>
                  <RowTools
                    index={i}
                    count={content.bodyTypes.length}
                    onMove={(d) => update({ bodyTypes: move(content.bodyTypes, i, d) })}
                    onRemove={() => {
                      const name = content.bodyTypes[i].name;
                      update({
                        bodyTypes: content.bodyTypes.filter((_, k) => k !== i),
                        looks: content.looks.map((l) => ({ ...l, bodyTypes: l.bodyTypes.filter((n) => n !== name) })),
                      });
                    }}
                  />
                </div>
                <Field label="Name" value={b.name} onChange={(v) => renameBodyType(i, v)} />
                <Field
                  label="Styling tip"
                  rows={2}
                  value={b.tip}
                  onChange={(v) => update({ bodyTypes: content.bodyTypes.map((x, k) => (k === i ? { ...x, tip: v } : x)) })}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => update({ bodyTypes: [...content.bodyTypes, { name: "New body type", tip: "" }] })}
              className="rounded-md border border-[#1E3B2F] px-4 py-2 text-xs font-semibold text-[#1E3B2F]"
            >
              + Add body type
            </button>
          </Card>
        )}
      </div>

      {/* Sticky save bar */}
      <div className="fixed inset-x-0 bottom-0 border-t border-[#1E3B2F]/15 bg-[#FFF8F3]/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-5 py-3">
          <p
            className={`text-sm ${
              status?.kind === "error" ? "text-[#B4472F]" : status?.kind === "ok" ? "text-[#1E3B2F]" : "text-[#6B635C]"
            }`}
          >
            {status?.text || (dirty ? "You have unsaved changes." : "No changes yet.")}
          </p>
          <button
            onClick={save}
            disabled={saving || !dirty}
            className="rounded-md bg-[#1E3B2F] px-6 py-3 text-xs font-semibold tracking-wide text-white disabled:opacity-50"
          >
            {saving ? "SAVING..." : "SAVE CHANGES"}
          </button>
        </div>
      </div>
    </div>
  );
}

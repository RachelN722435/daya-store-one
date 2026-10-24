"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import Link from "next/link";
import type { SiteContent } from "@/lib/content";

const goTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function HomeClient({ content }: { content: SiteContent }) {
  const [bodyType, setBodyType] = useState<string | null>(null);
  const [occasion, setOccasion] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const selectedTip = content.bodyTypes.find((b) => b.name === bodyType)?.tip;

  const results = content.looks.filter(
    (look) =>
      look.visible !== false &&
      (!bodyType || look.bodyTypes.includes(bodyType)) &&
      (!occasion || look.occasion === occasion)
  );

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
      active
        ? "border-[#1E3B2F] bg-[#1E3B2F] text-white"
        : "border-[#1E3B2F]/25 bg-white text-[#1E3B2F] hover:border-[#1E3B2F]"
    }`;

  const field =
    "w-full rounded-lg border border-[#1E3B2F]/20 bg-white px-4 py-3 text-sm";

  return (
    <main className="font-body min-h-screen bg-[#FBEFE6] text-[#2B2A27]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Playfair+Display:ital,wght@0,500;0,700;1,500;1,700&display=swap');
        html { scroll-behavior: smooth; }
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Montserrat', sans-serif; }
      `}</style>

      {/* Header */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <a href="#top">
          <span className="font-display text-3xl font-bold text-[#1E3B2F]">{content.brandName}</span>
          <span className="block text-[10px] tracking-widest text-[#6B635C]">
            {content.brandTagline}
          </span>
        </a>
        <nav className="flex items-center gap-6 text-sm">
          <a href="#occasions" className="hidden md:inline">Discover</a>
          <a href="#finder" className="hidden md:inline">Outfit finder</a>
          <Link href="/calculator" className="hidden md:inline">Size guide</Link>
          <a
            href="#book"
            className="rounded-md bg-[#1E3B2F] px-4 py-2.5 text-xs font-semibold tracking-wide text-white"
          >
            {content.navButton}
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section id="top" className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-14 pt-6 md:grid-cols-2">
        <div>
          <p className="mb-4 text-[11px] tracking-widest text-[#B4472F]">
            {content.heroEyebrow}
          </p>
          <h1 className="font-display text-5xl leading-[1.05] text-[#1E3B2F] md:text-7xl">
            {content.heroTitleStart}{" "}
            <em className="text-[#B4472F]">{content.heroTitleHighlight}</em>
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-[#6B635C]">
            {content.heroText}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#finder"
              className="rounded-md bg-[#1E3B2F] px-6 py-3 text-xs font-semibold tracking-wide text-white"
            >
              {content.heroButtonPrimary}
            </a>
            <a
              href="#book"
              className="rounded-md border border-[#B4472F] px-6 py-3 text-xs font-semibold tracking-wide text-[#B4472F]"
            >
              {content.heroButtonSecondary}
            </a>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md">
          {content.heroImage && (
            <img
              src={content.heroImage}
              alt="Woman in an elegant outfit"
              className="aspect-[4/5] w-full rounded-t-[999px] object-cover"
            />
          )}
        </div>
      </section>

      {/* Feature strip */}
      <section className="border-y border-[#1E3B2F]/10 bg-[#FFF8F3]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-6 text-sm md:grid-cols-4">
          {content.strip.map((s, i) => (
            <p key={i} className="text-[#6B635C]">
              <span className="font-semibold text-[#1E3B2F]">{s.bold}</span> {s.rest}
            </p>
          ))}
        </div>
      </section>

      {/* Looks for every occasion */}
      <section id="occasions" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-display text-3xl text-[#1E3B2F] md:text-4xl">
          {content.occasionsTitle}
        </h2>
        <p className="mt-2 text-sm text-[#6B635C]">{content.occasionsSubtitle}</p>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
          {content.occasionCards.map((o, i) => (
            <button
              key={`${o.name}-${i}`}
              onClick={() => {
                setOccasion(o.name);
                goTo("finder");
              }}
              className="group text-left"
            >
              {o.image && (
                <img
                  src={o.image}
                  alt={o.name}
                  className="aspect-[3/4] w-full rounded-lg object-cover"
                />
              )}
              <p className="mt-3 text-sm font-semibold text-[#1E3B2F] group-hover:underline">
                {o.name}
              </p>
              <p className="text-xs text-[#6B635C]">{o.note}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Outfit finder */}
      <section id="finder" className="bg-[#F7E3D6] py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="font-display text-3xl text-[#1E3B2F] md:text-4xl">
            {content.finderTitle}
          </h2>

          <div className="mt-8 space-y-8">
            <div>
              <p className="mb-3 text-sm font-semibold text-[#1E3B2F]">1. Your body type</p>
              <div className="flex flex-wrap gap-2">
                {content.bodyTypes.map((b) => (
                  <button
                    key={b.name}
                    onClick={() => setBodyType(bodyType === b.name ? null : b.name)}
                    className={chip(bodyType === b.name)}
                    aria-pressed={bodyType === b.name}
                  >
                    {b.name}
                  </button>
                ))}
              </div>
              {selectedTip && (
                <p className="mt-3 max-w-xl text-sm text-[#6B635C]">
                  {selectedTip} Your shape is a guide, never a limit.
                </p>
              )}
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold text-[#1E3B2F]">2. Your occasion</p>
              <div className="flex flex-wrap gap-2">
                {content.occasions.map((o) => (
                  <button
                    key={o}
                    onClick={() => setOccasion(occasion === o ? null : o)}
                    className={chip(occasion === o)}
                    aria-pressed={occasion === o}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 flex items-baseline justify-between">
            <p className="text-sm font-semibold text-[#1E3B2F]">
              3. Your looks ({results.length})
            </p>
            {(bodyType || occasion) && (
              <button
                onClick={() => {
                  setBodyType(null);
                  setOccasion(null);
                }}
                className="text-sm text-[#B4472F] underline"
              >
                Clear choices
              </button>
            )}
          </div>

          {results.length === 0 ? (
            <p className="mt-6 text-[#6B635C]">
              No looks for that mix yet. Try another occasion or clear your choices.
            </p>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
              {results.map((look) => (
                <a
                  key={look.id}
                  href={look.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  {look.image && (
                    <img
                      src={look.image}
                      alt={look.name}
                      className="aspect-[3/4] w-full rounded-lg object-cover"
                    />
                  )}
                  <p className="mt-3 text-sm font-semibold text-[#1E3B2F] group-hover:underline">
                    {look.name}
                  </p>
                  <p className="text-sm text-[#6B635C]">
                    {look.occasion}, {look.price}
                  </p>
                </a>
              ))}
            </div>
          )}

          <p className="mt-10 text-xs text-[#6B635C]">
            {content.finderNote}{" "}
            <Link href="/calculator" className="underline">
              size guide
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Different journeys */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-display text-3xl text-[#1E3B2F] md:text-4xl">
          {content.journeysTitle}
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {content.journeys.map((c, i) => {
            const inner = (
              <>
                {c.image && (
                  <img src={c.image} alt={c.title} className="aspect-[4/3] w-full object-cover" />
                )}
                <div className="p-5">
                  <p className="font-display text-xl text-[#1E3B2F]">{c.title}</p>
                  <p className="mt-1 text-sm text-[#6B635C]">{c.text}</p>
                </div>
              </>
            );
            const cls = "block overflow-hidden rounded-xl bg-white text-left";
            return c.action === "calculator" ? (
              <Link key={i} href="/calculator" className={cls}>{inner}</Link>
            ) : (
              <button key={i} onClick={() => goTo(c.action)} className={cls}>{inner}</button>
            );
          })}
        </div>
      </section>

      {/* Banner */}
      <section className="bg-[#B4472F] py-14 text-center text-white">
        <div className="mx-auto max-w-4xl px-5">
          <h2 className="font-display text-3xl md:text-4xl">{content.bannerTitle}</h2>
          <div className="mt-8 grid grid-cols-2 gap-6 text-sm md:grid-cols-4">
            {content.bannerItems.map((b, i) => (
              <p key={i}>{b}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Book a stylist */}
      <section id="book" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl text-[#1E3B2F] md:text-4xl">
              {content.bookTitle}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#6B635C]">
              {content.bookText}
            </p>
          </div>

          {sent ? (
            <p className="self-center text-lg font-semibold text-[#1E3B2F]">
              {content.bookThanks}
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-4"
            >
              <input required placeholder="Your name" className={field} />
              <input required type="email" placeholder="Email" className={field} />
              <textarea placeholder="What are you dressing for?" rows={3} className={field} />
              <button
                type="submit"
                className="rounded-md bg-[#1E3B2F] px-7 py-3 text-xs font-semibold tracking-wide text-white"
              >
                REQUEST A STYLIST
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1E3B2F]/15 py-8 text-center text-sm text-[#6B635C]">
        {content.footer}
      </footer>
    </main>
  );
}

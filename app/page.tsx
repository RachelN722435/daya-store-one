"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import Link from "next/link";

const BODY_TYPES = [
  { name: "Hourglass", tip: "Define the waist. Fitted and wrap shapes work well." },
  { name: "Pear", tip: "Add structure on top with strong shoulders or bolder necklines." },
  { name: "Apple", tip: "Choose A-line and empire cuts that skim the waist." },
  { name: "Rectangle", tip: "Create shape with belts, peplums and layers." },
  { name: "Inverted triangle", tip: "Balance the shoulders with wide-leg trousers or fuller skirts." },
];

const OCCASIONS = ["Work", "Weddings", "Date night", "Everyday", "Events"];

const LOOKS = [
  {
    name: "Tailored blazer set",
    occasion: "Work",
    price: "₦65,000",
    bodyTypes: ["Rectangle", "Pear", "Hourglass"],
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=700&q=80",
    link: "#",
  },
  {
    name: "Wide-leg trousers and shirt",
    occasion: "Work",
    price: "₦55,000",
    bodyTypes: ["Pear", "Apple", "Inverted triangle"],
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&q=80",
    link: "#",
  },
  {
    name: "Statement dress",
    occasion: "Weddings",
    price: "₦85,000",
    bodyTypes: ["Hourglass", "Pear", "Rectangle"],
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=700&q=80",
    link: "#",
  },
  {
    name: "Evening look",
    occasion: "Date night",
    price: "₦70,000",
    bodyTypes: ["Hourglass", "Apple", "Pear"],
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=700&q=80",
    link: "#",
  },
  {
    name: "Relaxed everyday set",
    occasion: "Everyday",
    price: "₦35,000",
    bodyTypes: ["Apple", "Rectangle", "Inverted triangle"],
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&q=80",
    link: "#",
  },
  {
    name: "Layered casual look",
    occasion: "Everyday",
    price: "₦45,000",
    bodyTypes: ["Rectangle", "Pear", "Inverted triangle", "Apple"],
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=700&q=80",
    link: "#",
  },
  {
    name: "Structured event dress",
    occasion: "Events",
    price: "₦90,000",
    bodyTypes: ["Hourglass", "Inverted triangle", "Rectangle"],
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=700&q=80",
    link: "#",
  },
];

export default function Home() {
  const [bodyType, setBodyType] = useState<string | null>(null);
  const [occasion, setOccasion] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const selectedTip = BODY_TYPES.find((b) => b.name === bodyType)?.tip;

  const results = LOOKS.filter(
    (look) =>
      (!bodyType || look.bodyTypes.includes(bodyType)) &&
      (!occasion || look.occasion === occasion)
  );

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
      active
        ? "border-[#3A1B3F] bg-[#3A1B3F] text-white"
        : "border-[#3A1B3F]/25 bg-white text-[#3A1B3F] hover:border-[#3A1B3F]"
    }`;

  return (
    <main className="font-body min-h-screen bg-white text-[#3A1B3F]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Playfair+Display:wght@500;700&display=swap');
        html { scroll-behavior: smooth; }
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Montserrat', sans-serif; }
      `}</style>

      {/* Header */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <a href="#top" className="font-display text-2xl font-bold">
          daya.
        </a>
        <nav className="flex items-center gap-5 text-sm font-medium">
          <a href="#finder" className="hidden sm:inline">Outfit finder</a>
          <Link href="/calculator" className="hidden sm:inline">Size guide</Link>
          <a href="#book" className="rounded-full bg-[#F4B63F] px-4 py-2 text-[#3A1B3F]">
            Book a stylist
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section id="top" className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-6 md:grid-cols-2 md:pb-24">
        <div>
          <h1 className="font-display text-4xl font-bold leading-tight md:text-6xl">
            Outfits chosen for your body and your occasion.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[#4A4350]">
            Pick your body type, pick where you are going, and see looks that
            fit. Every body is a Daya body.
          </p>
          <a
            href="#finder"
            className="mt-8 inline-block rounded-full bg-[#3A1B3F] px-7 py-3 text-sm font-semibold text-white"
          >
            Find my look
          </a>
        </div>
        <img
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1000&q=85"
          alt="Woman in an elegant outfit"
          className="aspect-[4/5] w-full rounded-2xl object-cover"
        />
      </section>

      {/* Outfit finder */}
      <section id="finder" className="bg-[#F6EEF7] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Find your look</h2>

          <div className="mt-8 space-y-8">
            <div>
              <p className="mb-3 text-sm font-semibold">1. Your body type</p>
              <div className="flex flex-wrap gap-2">
                {BODY_TYPES.map((b) => (
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
                <p className="mt-3 max-w-xl text-sm text-[#4A4350]">
                  {selectedTip} Your shape is a guide, never a limit.
                </p>
              )}
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold">2. Your occasion</p>
              <div className="flex flex-wrap gap-2">
                {OCCASIONS.map((o) => (
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
            <p className="text-sm font-semibold">3. Your looks ({results.length})</p>
            {(bodyType || occasion) && (
              <button
                onClick={() => {
                  setBodyType(null);
                  setOccasion(null);
                }}
                className="text-sm underline"
              >
                Clear choices
              </button>
            )}
          </div>

          {results.length === 0 ? (
            <p className="mt-6 text-[#4A4350]">
              No looks for that mix yet. Try another occasion or clear your choices.
            </p>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
              {results.map((look) => (
                <a key={look.name} href={look.link} className="group block">
                  <img
                    src={look.image}
                    alt={look.name}
                    className="aspect-[3/4] w-full rounded-lg object-cover"
                  />
                  <p className="mt-3 text-sm font-semibold group-hover:underline">
                    {look.name}
                  </p>
                  <p className="text-sm text-[#4A4350]">
                    {look.occasion}, {look.price}
                  </p>
                </a>
              ))}
            </div>
          )}

          <p className="mt-10 text-xs text-[#4A4350]">
            Sample looks and prices. Sizes vary by brand, so check the
            retailer&apos;s own size chart or use our{" "}
            <Link href="/calculator" className="underline">
              size guide
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Book a stylist */}
      <section id="book" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Want a stylist to help?
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-[#4A4350]">
              Tell us what you are dressing for and we will get back to you
              with options that fit.
            </p>
          </div>

          {sent ? (
            <p className="self-center text-lg font-semibold">
              Thank you. We will be in touch soon.
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-4"
            >
              <input
                required
                placeholder="Your name"
                className="w-full rounded-lg border border-[#3A1B3F]/25 px-4 py-3 text-sm"
              />
              <input
                required
                type="email"
                placeholder="Email"
                className="w-full rounded-lg border border-[#3A1B3F]/25 px-4 py-3 text-sm"
              />
              <textarea
                placeholder="What are you dressing for?"
                rows={3}
                className="w-full rounded-lg border border-[#3A1B3F]/25 px-4 py-3 text-sm"
              />
              <button
                type="submit"
                className="rounded-full bg-[#3A1B3F] px-7 py-3 text-sm font-semibold text-white"
              >
                Request a stylist
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#3A1B3F]/15 py-8 text-center text-sm text-[#4A4350]">
        daya. Style for your real life.
      </footer>
    </main>
  );
}

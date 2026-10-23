"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import Link from "next/link";

/* ---------------- EDIT THIS PART ---------------- */

const BODY_TYPES = [
  { name: "Hourglass", tip: "Define the waist. Fitted and wrap shapes work well." },
  { name: "Pear", tip: "Add structure on top with strong shoulders or bolder necklines." },
  { name: "Apple", tip: "Choose A-line and empire cuts that skim the waist." },
  { name: "Rectangle", tip: "Create shape with belts, peplums and layers." },
  { name: "Inverted triangle", tip: "Balance the shoulders with wide-leg trousers or fuller skirts." },
  { name: "Athletic", tip: "Add softness with draping and flowing fabrics, or define the waist." },
  { name: "Petite", tip: "Keep lines streamlined: high waists, cropped jackets, one-colour outfits." },
  { name: "Tall", tip: "Lean into length with maxi hemlines, wide-leg trousers and bold belts." },
  { name: "Plus size", tip: "Choose fabrics that hold their shape, and tailor where needed." },
  { name: "Full bust", tip: "Look for V-necks, wrap styles and structured support." },
];

const OCCASIONS = [
  "Workwear", "Suits", "Modest", "Evening gowns", "Beachwear", "Weddings",
  "Date night", "Everyday", "Events", "Party", "Church", "Brunch",
];

// Updated editorial-style fashion photography.
const IMG = {
  hero: "https://images.unsplash.com/photo-1609216690633-61604ac68559?auto=format&fit=crop&w=1000&q=85",
  browse: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=85",
  body: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85",
  stylist: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=85",
};

// The photo row under "Looks for every occasion". Clicking one filters the finder.
const OCCASION_CARDS = [
  { name: "Workwear", note: "Polished and powerful", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=85" },
  { name: "Weddings", note: "Celebrate in style", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=85" },
  { name: "Date night", note: "Elegant and unforgettable", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=85" },
  { name: "Everyday", note: "Effortless and refined", image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=600&q=85" },
  { name: "Events", note: "Make an impression", image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=600&q=85" },
];

const LOOKS = [
  {
    name: "Tailored blazer set",
    occasion: "Suits",
    price: "₦65,000",
    bodyTypes: ["Rectangle", "Pear", "Hourglass", "Tall"],
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=700&q=85",
    link: "#",
  },
  {
    name: "Wide-leg trousers and shirt",
    occasion: "Workwear",
    price: "₦55,000",
    bodyTypes: ["Pear", "Apple", "Inverted triangle", "Plus size"],
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=85",
    link: "#",
  },
  {
    name: "Statement dress",
    occasion: "Weddings",
    price: "₦85,000",
    bodyTypes: ["Hourglass", "Pear", "Rectangle", "Full bust"],
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=85",
    link: "#",
  },
  {
    name: "Evening look",
    occasion: "Date night",
    price: "₦70,000",
    bodyTypes: ["Hourglass", "Apple", "Pear", "Petite"],
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=700&q=85",
    link: "#",
  },
  {
    name: "Relaxed everyday set",
    occasion: "Everyday",
    price: "₦35,000",
    bodyTypes: ["Apple", "Rectangle", "Inverted triangle", "Athletic"],
    image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=700&q=85",
    link: "#",
  },
  {
    name: "Layered casual look",
    occasion: "Brunch",
    price: "₦45,000",
    bodyTypes: ["Rectangle", "Pear", "Inverted triangle", "Apple", "Petite"],
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=85",
    link: "#",
  },
  {
    name: "Structured event dress",
    occasion: "Events",
    price: "₦90,000",
    bodyTypes: ["Hourglass", "Inverted triangle", "Rectangle", "Tall"],
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=700&q=85",
    link: "#",
  },
];

/* ------------------------------------------------- */

const goTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

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
          <span className="font-display text-3xl font-bold text-[#1E3B2F]">daya.</span>
          <span className="block text-[10px] tracking-widest text-[#6B635C]">
            YOUR STYLE. YOUR LIFE.
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
            BOOK A STYLIST
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section id="top" className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-14 pt-6 md:grid-cols-2">
        <div>
          <p className="mb-4 text-[11px] tracking-widest text-[#B4472F]">
            CONFIDENT STYLE FOR EVERY CHAPTER
          </p>
          <h1 className="font-display text-5xl leading-[1.05] text-[#1E3B2F] md:text-7xl">
            Every body is{" "}
            <em className="text-[#B4472F]">Daya body.</em>
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-[#6B635C]">
            Discover looks for your real life. Get expert guidance. Shop from
            trusted brands. Because style is for every woman.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#finder"
              className="rounded-md bg-[#1E3B2F] px-6 py-3 text-xs font-semibold tracking-wide text-white"
            >
              FIND YOUR LOOK
            </a>
            <a
              href="#book"
              className="rounded-md border border-[#B4472F] px-6 py-3 text-xs font-semibold tracking-wide text-[#B4472F]"
            >
              BOOK A STYLIST
            </a>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md">
          <img
            src={IMG.hero}
            alt="Woman in an elegant outfit"
            className="aspect-[4/5] w-full rounded-t-[999px] object-cover"
          />
        </div>
      </section>

      {/* Feature strip */}
      <section className="border-y border-[#1E3B2F]/10 bg-[#FFF8F3]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-6 text-sm md:grid-cols-4">
          {[
            ["Curated looks", "for every occasion"],
            ["Guidance for", "every body"],
            ["Shop from", "trusted brands"],
            ["Personal", "styling support"],
          ].map(([a, b]) => (
            <p key={a} className="text-[#6B635C]">
              <span className="font-semibold text-[#1E3B2F]">{a}</span> {b}
            </p>
          ))}
        </div>
      </section>

      {/* Looks for every occasion */}
      <section id="occasions" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-display text-3xl text-[#1E3B2F] md:text-4xl">
          Looks for every occasion
        </h2>
        <p className="mt-2 text-sm text-[#6B635C]">
          Tap an occasion to see matching looks.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
          {OCCASION_CARDS.map((o) => (
            <button
              key={o.name}
              onClick={() => {
                setOccasion(o.name);
                goTo("finder");
              }}
              className="group text-left"
            >
              <img
                src={o.image}
                alt={o.name}
                className="aspect-[3/4] w-full rounded-lg object-cover"
              />
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
            Find your look
          </h2>

          <div className="mt-8 space-y-8">
            <div>
              <p className="mb-3 text-sm font-semibold text-[#1E3B2F]">1. Your body type</p>
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
                <p className="mt-3 max-w-xl text-sm text-[#6B635C]">
                  {selectedTip} Your shape is a guide, never a limit.
                </p>
              )}
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold text-[#1E3B2F]">2. Your occasion</p>
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
                  key={look.name}
                  href={look.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <img
                    src={look.image}
                    alt={look.name}
                    className="aspect-[3/4] w-full rounded-lg object-cover"
                  />
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
            Sample looks and prices. Sizes vary by brand, so check the
            retailer&apos;s own size chart or use our{" "}
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
          Different journeys. The same Daya experience.
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            { title: "Browse looks", text: "Explore curated outfits for every occasion.", image: IMG.browse, onClick: () => goTo("finder") },
            { title: "Find your body type", text: "Get a personalised guide and size in US, UK or EU.", image: IMG.body, href: "/calculator" },
            { title: "Get a personal stylist", text: "Personal support when you need guidance.", image: IMG.stylist, onClick: () => goTo("book") },
          ].map((c) => {
            const inner = (
              <>
                <img src={c.image} alt={c.title} className="aspect-[4/3] w-full object-cover" />
                <div className="p-5">
                  <p className="font-display text-xl text-[#1E3B2F]">{c.title}</p>
                  <p className="mt-1 text-sm text-[#6B635C]">{c.text}</p>
                </div>
              </>
            );
            const cls = "block overflow-hidden rounded-xl bg-white text-left";
            return c.href ? (
              <Link key={c.title} href={c.href} className={cls}>{inner}</Link>
            ) : (
              <button key={c.title} onClick={c.onClick} className={cls}>{inner}</button>
            );
          })}
        </div>
      </section>

      {/* Banner */}
      <section className="bg-[#B4472F] py-14 text-center text-white">
        <div className="mx-auto max-w-4xl px-5">
          <h2 className="font-display text-3xl md:text-4xl">
            More than outfits. A more confident you.
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-6 text-sm md:grid-cols-4">
            <p>Understand your style</p>
            <p>Discover what suits you</p>
            <p>Learn and grow your wardrobe</p>
            <p>Get expert guidance</p>
          </div>
        </div>
      </section>

      {/* Book a stylist */}
      <section id="book" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl text-[#1E3B2F] md:text-4xl">
              Want a stylist to help?
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#6B635C]">
              Tell us what you are dressing for and we will get back to you
              with options that fit.
            </p>
          </div>

          {sent ? (
            <p className="self-center text-lg font-semibold text-[#1E3B2F]">
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
        daya. Style for your real life.
      </footer>
    </main>
  );
}

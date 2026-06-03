import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  CheckCircle2,
  ChevronRight,
  Facebook,
  Gem,
  Hammer,
  Image as ImageIcon,
  Instagram,
  Layers,
  Menu,
  Move,
  Package,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  X,
} from "lucide-react";

import logoAsset from "@/assets/asd-logo.png.asset.json";
import heroHome from "@/assets/hero-home.jpg";
import stoneTexture from "@/assets/stone-texture.jpg";
import stoneFace from "@/assets/stone-face.jpg";
import stoneRise from "@/assets/stone-rise.jpg";
import stoneInset from "@/assets/stone-inset.jpg";
import stoneContour from "@/assets/stone-contour.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import StonePreview from "@/components/StonePreview";
import {
  COLOR_META,
  DesignProvider,
  SIZE_META,
  useDesign,
  type ColorKey,
  type SizeKey,
} from "@/lib/design-context";

const Visualizer = lazy(() => import("@/components/Visualizer"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Address Stone Direct — Custom Cast Address Stones, Designed Online" },
      {
        name: "description",
        content:
          "Design, visualize, and order premium custom address stones online. Architectural-grade cast stone crafted in the USA, previewed live on your home before you buy.",
      },
      { property: "og:title", content: "Address Stone Direct — Custom Cast Address Stones" },
      {
        property: "og:description",
        content:
          "Design. Visualize. Customize. Order. Premium cast address stones, made in the USA.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { label: "Collections", href: "#collections" },
    { label: "Configurator", href: "#configurator" },
    { label: "Visualize", href: "#visualize" },
    { label: "Gallery", href: "#gallery" },
    { label: "Process", href: "#process" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/75 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_30px_-15px_rgba(0,0,0,0.6)]"
          : "bg-gradient-to-b from-black/60 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#" className="group flex items-center gap-3">
          <div className="relative">
            <div className="absolute -inset-2 -z-10 rounded-full bg-white/5 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
            <img
              src={logoAsset.url}
              alt="Address Stone Direct"
              className="h-14 w-auto object-contain drop-shadow-[0_4px_18px_rgba(220,225,235,0.25)] transition-transform duration-500 group-hover:scale-105 lg:h-16"
            />
          </div>
        </a>

        <nav className="hidden items-center gap-10 lg:flex">
          {nav.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="group relative text-sm font-medium uppercase tracking-[0.18em] text-stone-700 transition-colors hover:text-foreground"
            >
              {n.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gradient-to-r from-transparent via-white to-transparent transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#configurator"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/95 px-6 py-3 text-sm font-medium uppercase tracking-wider text-primary-foreground shadow-luxe transition-all hover:bg-white hover:shadow-luxe-lg"
          >
            Start Designing
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="rounded-full border border-white/15 bg-white/5 p-2.5 backdrop-blur lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-background/95 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3.5 text-base font-medium uppercase tracking-[0.18em] text-stone-700 hover:bg-white/5"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#configurator"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-white py-3.5 text-sm font-medium uppercase tracking-wider text-primary-foreground"
            >
              Start Designing <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* StonePreview moved to src/components/StonePreview.tsx */

/* -------------------------------------------------------------------------- */
/*                                    Hero                                    */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroHome}
          alt=""
          width={1920}
          height={1200}
          className="h-full w-full object-cover opacity-70"
        />
        {/* Cinematic vignette + dark gradient for readability */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(8,10,14,0.55)_55%,rgba(6,8,12,0.95)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
        {/* Subtle accent glow */}
        <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[24rem] w-[24rem] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-10 lg:px-10">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-foreground/80 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Design · Visualize · Order
          </span>

          <h1 className="mt-6 font-serif text-5xl leading-[1.02] tracking-tight text-foreground text-balance sm:text-6xl lg:text-7xl drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
            Custom Address Stones,{" "}
            <span className="gradient-text-bronze italic">Built to Last.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/75">
            Design, customize, and visualize a premium cast address stone on your
            own home—then order in minutes. Architectural-grade craftsmanship,
            made in the USA.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#configurator"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-medium text-primary-foreground shadow-luxe transition-all hover:shadow-luxe-lg"
            >
              Start Designing
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#gallery"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-medium text-foreground backdrop-blur transition-all hover:border-accent hover:text-accent"
            >
              View Gallery
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            {[
              { icon: ShieldCheck, label: "Made in USA" },
              { icon: Gem, label: "Premium Cast Stone" },
              { icon: Award, label: "Built to Last" },
              { icon: Truck, label: "Fast Shipping" },
            ].map((t) => (
              <div key={t.label} className="flex items-center gap-2">
                <t.icon className="h-4 w-4 text-accent" />
                <span className="text-xs font-medium uppercase tracking-wider text-foreground/70">
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </div>


        {/* Mini live configurator card */}
        <div className="relative animate-fade-up delay-200 lg:pl-6">
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-accent/15 via-transparent to-accent/10 blur-2xl" />
          <div className="rounded-[2rem] border border-stone-200 bg-card/90 p-5 shadow-luxe-lg backdrop-blur-xl sm:p-7">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-bronze-soft" />
                <div className="h-2.5 w-2.5 rounded-full bg-stone-300" />
              </div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Live Preview
              </div>
            </div>

            <div className="mt-5 animate-float-soft">
              <StonePreview
                number="4521"
                street="Maple Ridge Drive"
                font="serif"
                border="classic"
                profile="face"
                color="limestone"
                size="medium"
                numberScale={1}
                streetScale={1}
              />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
              {[
                ["Number", "4521"],
                ["Street", "Maple Ridge"],
                ["Font", "Garamond"],
                ["Border", "Classic"],
                ["Profile", "Monolithic Face"],
                ["Size", '18" × 10"'],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="rounded-xl border border-stone-200 bg-background/60 px-3 py-2.5"
                >
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {k}
                  </div>
                  <div className="mt-0.5 text-sm font-medium text-stone-900">{v}</div>
                </div>
              ))}
            </div>

            <a
              href="#configurator"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground transition hover:bg-stone-700"
            >
              Customize this design <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Trust Bar                                 */
/* -------------------------------------------------------------------------- */

function TrustBar() {
  const items = [
    { icon: ShieldCheck, label: "Made in USA" },
    { icon: Gem, label: "Premium Materials" },
    { icon: Hammer, label: "Precision Crafted" },
    { icon: CheckCircle2, label: "Secure Checkout" },
    { icon: Sparkles, label: "Fast Production" },
    { icon: Truck, label: "Nationwide Shipping" },
  ];
  return (
    <section className="border-y border-stone-200 bg-stone-100/60 py-6">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 lg:px-10">
        {items.map((i) => (
          <div key={i.label} className="flex items-center gap-2.5">
            <i.icon className="h-4 w-4 text-accent" />
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-stone-700">
              {i.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Section heading                               */
/* -------------------------------------------------------------------------- */

function SectionHead({
  eyebrow,
  title,
  subtitle,
  center,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-accent">
        <span className="h-px w-8 bg-accent/60" />
        {eyebrow}
      </span>
      <h2 className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight text-stone-900 text-balance sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Why Choose Us                               */
/* -------------------------------------------------------------------------- */

function WhyChoose() {
  const features = [
    {
      icon: Gem,
      title: "Premium Materials",
      desc: "Crafted from durable architectural-grade cast stone, built to withstand years of exposure.",
    },
    {
      icon: Hammer,
      title: "Custom Crafted",
      desc: "Every address stone is individually manufactured to your exact specifications.",
    },
    {
      icon: Layers,
      title: "Precision Manufacturing",
      desc: "Sharp engraving, precise dimensions, and exceptional consistency across every piece.",
    },
    {
      icon: Truck,
      title: "Fast & Secure Shipping",
      desc: "Professionally packaged in custom crates and delivered safely to your door.",
    },
  ];
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Stone texture backdrop */}
      <div className="absolute inset-0 -z-10">
        <img
          src={stoneTexture}
          alt=""
          className="h-full w-full object-cover opacity-[0.12] mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.05] blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHead
          eyebrow="Why Address Stone Direct"
          title={
            <>
              An uncompromising standard,{" "}
              <span className="italic gradient-text-bronze">stone by stone.</span>
            </>
          }
          subtitle="We design, manufacture, and ship every address stone in-house—giving you full creative control and the quality of a true architectural product."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-white/15 via-white/5 to-transparent transition-all duration-500 hover:from-accent/60 hover:via-accent/20"
            >
              <div className="relative h-full overflow-hidden rounded-2xl bg-card/60 p-7 backdrop-blur-xl">
                {/* Stone texture layer per card */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-screen transition-opacity duration-500 group-hover:opacity-[0.18]"
                  style={{
                    backgroundImage: `url(${stoneTexture})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                {/* Accent glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 blur-2xl transition-all duration-700 group-hover:scale-150 group-hover:bg-accent/20" />
                {/* Top hairline */}
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

                <div className="relative">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-white/10 to-white/[0.02] ring-1 ring-white/15 backdrop-blur-md transition-all duration-500 group-hover:ring-accent/60 group-hover:shadow-[0_0_30px_-5px_var(--accent)]">
                    <f.icon className="h-6 w-6 text-accent transition-transform duration-500 group-hover:scale-110" />
                  </div>

                  <div className="mt-8 flex items-center gap-3">
                    <span className="font-serif text-xs tracking-[0.3em] text-accent/70">
                      0{i + 1}
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                  </div>

                  <h3 className="mt-3 font-serif text-2xl text-foreground tracking-tight">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/65">
                    {f.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* -------------------------------------------------------------------------- */
/*                              Collections                                   */
/* -------------------------------------------------------------------------- */

function Collections() {
  const items = [
    {
      title: "Monolithic Face",
      desc: "Flat-front classic. Clean, formal, timeless.",
      img: stoneFace,
    },
    {
      title: "Monolithic Rise",
      desc: "Elegant arched crown for a stately silhouette.",
      img: stoneRise,
    },
    {
      title: "Monolithic Inset",
      desc: "Recessed face panel for refined depth.",
      img: stoneInset,
    },
    {
      title: "Monolithic Contour",
      desc: "Soft sculpted edges, modern and architectural.",
      img: stoneContour,
    },
  ];
  return (
    <section id="collections" className="bg-stone-100/60 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHead
            eyebrow="Collections"
            title={
              <>
                Four signature profiles,{" "}
                <span className="italic gradient-text-bronze">infinite combinations.</span>
              </>
            }
          />
          <a
            href="#configurator"
            className="hidden items-center gap-2 text-sm font-medium text-stone-900 hover:text-accent md:inline-flex"
          >
            Explore all profiles <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <a
              key={it.title}
              href="#configurator"
              className="lift group block overflow-hidden rounded-2xl border border-stone-200 bg-card shadow-luxe"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={it.img}
                  alt={it.title}
                  loading="lazy"
                  width={1200}
                  height={1500}
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl text-stone-900">{it.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  Explore Collection
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Configurator                                */
/* -------------------------------------------------------------------------- */

function Configurator() {
  const { design, update } = useDesign();
  const { number, street, font, border, profile, color, size, numberScale, streetScale } = design;

  const Tile = ({
    active,
    onClick,
    children,
  }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition-all ${
        active
          ? "border-accent bg-accent/10 text-stone-900 shadow-[inset_0_0_0_1px_var(--bronze)]"
          : "border-stone-200 bg-background text-stone-700 hover:border-stone-300 hover:bg-stone-50"
      }`}
    >
      {children}
    </button>
  );

  return (
    <section id="configurator" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHead
          center
          eyebrow="Online Configurator"
          title={
            <>
              Design your address stone{" "}
              <span className="italic gradient-text-bronze">in real time.</span>
            </>
          }
          subtitle="Adjust every detail—number, street, font, border, profile, color, and size—and watch your stone update instantly. Your design carries straight into the home visualizer."
        />

        <div className="mx-auto mt-16 max-w-6xl overflow-hidden rounded-[2rem] border border-stone-200 bg-card shadow-luxe-lg">
          <div className="flex items-center justify-between border-b border-stone-200 bg-stone-100/70 px-5 py-3">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-bronze-soft" />
              <div className="h-2.5 w-2.5 rounded-full bg-stone-300" />
            </div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              ASD Configurator · v2.0
            </div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-accent">● Live</div>
          </div>

          <div className="grid gap-0 lg:grid-cols-[360px_1fr]">
            {/* Left panel */}
            <div className="space-y-6 border-stone-200 bg-stone-50/60 p-6 lg:border-r">
              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Address Number
                </label>
                <input
                  value={number}
                  onChange={(e) => update("number", e.target.value)}
                  className="mt-2 w-full rounded-lg border border-stone-200 bg-background px-4 py-3 font-serif text-2xl text-stone-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Street Name
                </label>
                <input
                  value={street}
                  onChange={(e) => update("street", e.target.value.toUpperCase())}
                  className="mt-2 w-full rounded-lg border border-stone-200 bg-background px-4 py-3 text-sm tracking-[0.2em] text-stone-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    Number Size
                  </label>
                  <span className="text-[10px] tabular-nums text-muted-foreground">
                    {Math.round(numberScale * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0.6}
                  max={1.6}
                  step={0.05}
                  value={numberScale}
                  onChange={(e) => update("numberScale", parseFloat(e.target.value))}
                  className="mt-2 w-full accent-[var(--bronze,theme(colors.accent.DEFAULT))]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    Street Size
                  </label>
                  <span className="text-[10px] tabular-nums text-muted-foreground">
                    {Math.round(streetScale * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0.6}
                  max={1.8}
                  step={0.05}
                  value={streetScale}
                  onChange={(e) => update("streetScale", parseFloat(e.target.value))}
                  className="mt-2 w-full accent-[var(--bronze,theme(colors.accent.DEFAULT))]"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Font
                </label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <Tile active={font === "serif"} onClick={() => update("font", "serif")}>
                    <span className="font-serif text-base">Garamond</span>
                  </Tile>
                  <Tile active={font === "sans"} onClick={() => update("font", "sans")}>
                    <span className="font-sans font-semibold">Helvetica</span>
                  </Tile>
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Border Style
                </label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {(["classic", "beveled", "double", "none"] as const).map((b) => (
                    <Tile key={b} active={border === b} onClick={() => update("border", b)}>
                      <span className="capitalize">{b}</span>
                    </Tile>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Stone Profile
                </label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {([
                    ["face", "Face"],
                    ["rise", "Rise"],
                    ["inset", "Inset"],
                    ["contour", "Contour"],
                  ] as const).map(([key, label]) => (
                    <Tile
                      key={key}
                      active={profile === key}
                      onClick={() => update("profile", key)}
                    >
                      {label}
                    </Tile>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Stone Color
                </label>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {(Object.keys(COLOR_META) as ColorKey[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => update("color", c)}
                      title={COLOR_META[c].label}
                      className={`group relative h-12 overflow-hidden rounded-xl border transition-all ${
                        color === c
                          ? "border-accent ring-2 ring-accent/40"
                          : "border-stone-200 hover:border-stone-300"
                      }`}
                      style={{ background: COLOR_META[c].swatch }}
                    >
                      <span className="sr-only">{COLOR_META[c].label}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-2 text-[11px] text-muted-foreground">
                  {COLOR_META[color].label}
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Dimensions
                </label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {(Object.keys(SIZE_META) as SizeKey[]).map((key) => (
                    <Tile
                      key={key}
                      active={size === key}
                      onClick={() => update("size", key)}
                    >
                      <div className="flex flex-col items-center">
                        <span>{SIZE_META[key].label}</span>
                        <span className="mt-0.5 text-[10px] text-muted-foreground">
                          {SIZE_META[key].dims}
                        </span>
                      </div>
                    </Tile>
                  ))}
                </div>
              </div>
            </div>

            {/* Right preview */}
            <div className="relative flex flex-col bg-gradient-to-br from-stone-100/80 to-stone-50 p-8 lg:p-12">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Live Stone Preview
                </span>
                <span className="rounded-full border border-stone-200 bg-background/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-stone-700 backdrop-blur">
                  Render quality · 4K
                </span>
              </div>
              <div className="my-auto py-10">
                <StonePreview {...design} />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-stone-200 pt-5">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    Starting from
                  </div>
                  <div className="font-serif text-3xl text-stone-900">$249</div>
                </div>
                <a
                  href="#visualize"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-luxe transition hover:bg-stone-700"
                >
                  Preview On My Home <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* -------------------------------------------------------------------------- */
/*                                Visualization                               */
/* -------------------------------------------------------------------------- */

function Visualization() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const steps = [
    { icon: Sparkles, title: "Design In Configurator", desc: "Every change you make above syncs into the visualizer instantly." },
    { icon: ImageIcon, title: "Upload Your Home", desc: "Snap or upload a photo of your entry, pillar, or mailbox." },
    { icon: Move, title: "Drag · Resize · Rotate", desc: "Position your custom stone exactly where it will be installed." },
    { icon: ShieldCheck, title: "Save & Order", desc: "Capture a preview, download, or continue straight to checkout." },
  ];

  return (
    <section id="visualize" className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 -z-10 opacity-30">
        <img src={stoneTexture} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/90 via-background/95 to-background" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-start gap-14 lg:grid-cols-[1fr_1.45fr]">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-bronze-soft">
              <span className="h-px w-8 bg-bronze-soft/60" />
              Address Stone Visualizer
            </span>
            <h2 className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
              See it on your home{" "}
              <span className="italic text-bronze-soft">before you buy.</span>
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Upload a photo of your home and preview your exact custom design—
              live from the configurator—right where it will be installed.
            </p>

            <ol className="mt-10 space-y-5">
              {steps.map((s, i) => (
                <li key={s.title} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-bronze/40 bg-bronze/10 text-bronze-soft">
                    <s.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-bronze-soft/80">
                      Step 0{i + 1}
                    </div>
                    <div className="mt-0.5 font-serif text-xl text-foreground">{s.title}</div>
                    <div className="text-sm text-muted-foreground">{s.desc}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Real interactive visualizer */}
          <div className="relative">
            <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-gradient-to-tr from-accent/30 via-transparent to-accent/20 blur-3xl" />
            {mounted ? (
              <Suspense
                fallback={
                  <div className="flex aspect-[4/3] w-full items-center justify-center rounded-[2rem] border border-white/10 bg-stone-900/60 text-sm text-muted-foreground">
                    Loading visualizer…
                  </div>
                }
              >
                <Visualizer defaultHouseSrc={heroHome} />
              </Suspense>
            ) : (
              <div className="flex aspect-[4/3] w-full items-center justify-center rounded-[2rem] border border-white/10 bg-stone-900/60 text-sm text-muted-foreground">
                Loading visualizer…
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


/* -------------------------------------------------------------------------- */
/*                             Quality Difference                             */
/* -------------------------------------------------------------------------- */

function Quality() {
  const points = [
    "Architectural-grade aggregate blend",
    "Higher-density cast for superior strength",
    "Precision CNC engraving technology",
    "Weather-resistant manufacturing process",
    "UV- and fade-resistant pigment system",
    "Sealed surface for decades of durability",
  ];
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-10">
        <div className="relative">
          <div className="overflow-hidden rounded-2xl shadow-luxe-lg">
            <img
              src={stoneTexture}
              alt="Premium stone macro texture"
              loading="lazy"
              width={1400}
              height={1400}
              className="aspect-[4/5] h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden w-56 rounded-2xl border border-stone-200 bg-card p-5 shadow-luxe-lg sm:block">
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Density rating
            </div>
            <div className="mt-1 font-serif text-3xl text-stone-900">142 lb/ft³</div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-stone-200">
              <div className="h-full w-[92%] rounded-full bg-accent" />
            </div>
            <div className="mt-2 text-[10px] text-muted-foreground">+22% vs. industry avg.</div>
          </div>
        </div>

        <div>
          <SectionHead
            eyebrow="The Quality Difference"
            title={
              <>
                Why our stones <span className="italic gradient-text-bronze">stand apart.</span>
              </>
            }
            subtitle="Behind every Address Stone Direct piece is a process refined for one purpose—creating an architectural product that lasts a lifetime."
          />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {points.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 rounded-xl border border-stone-200 bg-card p-4 shadow-luxe"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm text-stone-700">{p}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            {["Lifetime Color", "Frost-Proof", "Hand-Finished", "USA Crafted"].map((b) => (
              <span
                key={b}
                className="rounded-full border border-stone-300 bg-stone-100 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-stone-700"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Gallery                                   */
/* -------------------------------------------------------------------------- */

function Gallery() {
  const items = [
    { src: gallery1, span: "row-span-2", alt: "Estate entrance pillar with cast address stone" },
    { src: gallery2, span: "", alt: "Modern home entry with address stone" },
    { src: gallery4, span: "row-span-2", alt: "Grand gated estate at dusk" },
    { src: gallery3, span: "", alt: "Brick mailbox with engraved stone plaque" },
    { src: gallery5, span: "", alt: "Stone craftsmanship in the workshop" },
    { src: gallery6, span: "", alt: "Luxury home at twilight with illuminated address stone" },
  ];
  return (
    <section id="gallery" className="bg-stone-100/60 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHead
            eyebrow="Customer Gallery"
            title={
              <>
                Installed on real homes,{" "}
                <span className="italic gradient-text-bronze">across the country.</span>
              </>
            }
          />
          <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-stone-900 hover:text-accent">
            View full gallery <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-14 grid auto-rows-[14rem] grid-cols-2 gap-4 sm:auto-rows-[18rem] lg:grid-cols-4">
          {items.map((it, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-2xl shadow-luxe ${it.span}`}
            >
              <img
                src={it.src}
                alt={it.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-stone-900/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-4 left-4 translate-y-3 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <div className="text-[10px] uppercase tracking-[0.25em] text-bronze-soft">View larger</div>
                <div className="font-serif text-lg">A custom ASD installation</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Testimonials                                */
/* -------------------------------------------------------------------------- */

function Testimonials() {
  const reviews = [
    {
      name: "Marisa & David K.",
      location: "Greenwich, CT",
      text: "The visualization tool sold us immediately. We could see the stone on our pillars before placing the order — it arrived flawless.",
    },
    {
      name: "James W.",
      location: "Scottsdale, AZ",
      text: "Genuinely an architectural product. The cast quality and crispness of the engraving is on another level.",
    },
    {
      name: "The Whitaker Family",
      location: "Charleston, SC",
      text: "Beautiful, heavy, and exactly what we designed online. Installed in 20 minutes and changed the whole curb appeal.",
    },
    {
      name: "Sandra L.",
      location: "Lake Oswego, OR",
      text: "I rarely leave reviews, but this is the most premium thing we've added to our home in years. Worth every penny.",
    },
  ];
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHead
          center
          eyebrow="Testimonials"
          title={
            <>
              Loved by homeowners who{" "}
              <span className="italic gradient-text-bronze">care about the details.</span>
            </>
          }
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="lift relative flex h-full flex-col rounded-2xl border border-stone-200 bg-card p-7 shadow-luxe"
            >
              <Quote className="h-7 w-7 text-accent/60" />
              <div className="mt-4 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="mt-4 grow font-serif text-lg leading-snug text-stone-900">
                "{r.text}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-stone-200 pt-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 font-serif text-stone-700">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium text-stone-900">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.location}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Process                                   */
/* -------------------------------------------------------------------------- */

function Process() {
  const steps = [
    { icon: Sparkles, title: "Design Your Stone", desc: "Customize every detail in our online configurator." },
    { icon: ImageIcon, title: "Visualize On Your Home", desc: "Upload a photo and preview your stone in place." },
    { icon: Package, title: "Place Your Order", desc: "We craft your stone to your exact specifications." },
    { icon: ShieldCheck, title: "Install & Enjoy", desc: "Mount it in minutes. Built to last for decades." },
  ];
  return (
    <section id="process" className="bg-stone-100/60 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHead
          center
          eyebrow="Simple Process"
          title={
            <>
              From design{" "}
              <span className="italic gradient-text-bronze">to installation.</span>
            </>
          }
        />
        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent lg:block" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.title} className="relative text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-stone-200 bg-card shadow-luxe">
                  <s.icon className="h-7 w-7 text-accent" />
                </div>
                <div className="mt-5 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Step 0{i + 1}
                </div>
                <h3 className="mt-2 font-serif text-2xl text-stone-900">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Final CTA                                   */
/* -------------------------------------------------------------------------- */

function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 -z-10">
        <img src={heroHome} alt="" className="h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-black/85" />
      </div>
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-bronze-soft">
          <span className="h-px w-8 bg-bronze-soft/60" />
          Ready When You Are
        </span>
        <h2 className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
          Ready to create your{" "}
          <span className="italic text-bronze-soft">custom address stone?</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Design a premium address stone tailored specifically to your home—then visualize it on your house before you order.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#configurator"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-medium text-accent-foreground shadow-luxe-lg transition hover:brightness-110"
          >
            Start Designing <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-4 text-sm font-medium text-foreground backdrop-blur transition hover:bg-white/10"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Footer                                   */
/* -------------------------------------------------------------------------- */

function Footer() {
  const nav = [
    { label: "Collections", href: "#collections" },
    { label: "Configurator", href: "#configurator" },
    { label: "Visualize", href: "#visualize" },
    { label: "Gallery", href: "#gallery" },
    { label: "Process", href: "#process" },
  ];
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-background to-black">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-white/[0.04] blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-20 text-center lg:px-10 lg:py-24">
        {/* Centered logo only — clear and visible */}
        <a href="#" className="group inline-block">
          <img
            src={logoAsset.url}
            alt="Address Stone Direct"
            className="h-24 w-auto object-contain drop-shadow-[0_8px_30px_rgba(220,225,235,0.35)] transition-transform duration-700 group-hover:scale-105 sm:h-28 lg:h-32"
          />
        </a>

        <div className="mt-6 text-[11px] uppercase tracking-[0.5em] text-muted-foreground">
          Custom Cast Stone · Made in USA
        </div>

        <nav className="mt-10 flex flex-wrap items-center justify-center gap-x-9 gap-y-3">
          {nav.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="text-sm font-medium uppercase tracking-[0.22em] text-stone-700 transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="mt-10 flex items-center gap-3">
          {[Instagram, Facebook].map((Icon, i) => (
            <a
              key={i}
              href="#"
              aria-label="Social link"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-stone-700 transition hover:border-white/40 hover:bg-white/10 hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-muted-foreground sm:flex-row lg:px-10">
          <div>© {new Date().getFullYear()} Address Stone Direct LLC. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Returns</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    Home                                    */
/* -------------------------------------------------------------------------- */

function Home() {
  return (
    <DesignProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <Hero />
          <TrustBar />
          <WhyChoose />
          <Collections />
          <Configurator />
          <Visualization />
          <Quality />
          <Gallery />
          <Testimonials />
          <Process />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </DesignProvider>
  );
}

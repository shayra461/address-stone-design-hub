import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
  Mail,
  MapPin,
  Menu,
  Move,
  Package,
  Phone,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  Upload,
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
          ? "bg-background/80 backdrop-blur-xl border-b border-stone-200/70"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#" className="flex items-center gap-3">
          <img
            src={logoAsset.url}
            alt="Address Stone Direct"
            className="h-11 w-auto object-contain"
          />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-serif text-lg tracking-tight text-stone-900">
              Address Stone Direct
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Custom Cast Stone · USA
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {nav.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="text-sm font-medium text-stone-700 transition-colors hover:text-accent"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#configurator"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-luxe transition-all hover:bg-stone-700 hover:shadow-luxe-lg"
          >
            Start Designing <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="rounded-full border border-stone-200 bg-background p-2 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-stone-200 bg-background/95 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-stone-700 hover:bg-stone-100"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#configurator"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
            >
              Start Designing <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Stone Preview                               */
/* -------------------------------------------------------------------------- */

interface PreviewProps {
  number: string;
  street: string;
  font: "serif" | "sans";
  border: "classic" | "beveled" | "double" | "none";
  profile: "face" | "rise" | "inset" | "contour";
}

function StonePreview({ number, street, font, border, profile }: PreviewProps) {
  const radius =
    profile === "contour"
      ? "rounded-[28px]"
      : profile === "rise"
        ? "rounded-t-[80px] rounded-b-xl"
        : "rounded-xl";

  const inset =
    profile === "inset"
      ? "inset-5 shadow-[inset_0_0_30px_rgba(60,45,30,0.18)]"
      : "inset-3";

  const borderStyle =
    border === "classic"
      ? "border-[3px] border-stone-700/30"
      : border === "beveled"
        ? "border-[5px] border-stone-700/25 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.15)]"
        : border === "double"
          ? "border-[3px] border-stone-700/30 outline outline-2 outline-offset-[6px] outline-stone-700/20"
          : "";

  return (
    <div
      className={`relative aspect-[16/9] w-full overflow-hidden ${radius} shadow-luxe-lg`}
      style={{
        backgroundImage: `url(${stoneTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/15" />
      <div
        className={`absolute ${inset} flex flex-col items-center justify-center ${borderStyle} ${radius}`}
      >
        <div
          className={`${
            font === "serif" ? "font-serif" : "font-sans font-semibold"
          } text-[14vw] leading-none sm:text-7xl md:text-8xl`}
          style={{
            color: "rgba(28,22,16,0.88)",
            textShadow: "0 1px 0 rgba(255,255,255,0.55), 0 -1px 2px rgba(0,0,0,0.25)",
          }}
        >
          {number || "0000"}
        </div>
        {street && (
          <div
            className={`${
              font === "serif" ? "font-serif" : "font-sans"
            } mt-2 text-xs uppercase tracking-[0.3em] sm:text-sm`}
            style={{ color: "rgba(28,22,16,0.7)" }}
          >
            {street}
          </div>
        )}
      </div>
    </div>
  );
}

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
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-10 lg:px-10">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-background/70 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-stone-700 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Design · Visualize · Order
          </span>

          <h1 className="mt-6 font-serif text-5xl leading-[1.02] tracking-tight text-stone-900 text-balance sm:text-6xl lg:text-7xl">
            Custom Address Stones,{" "}
            <span className="gradient-text-bronze italic">Built to Last.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
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
              className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-background/60 px-7 py-4 text-sm font-medium text-stone-900 backdrop-blur transition-all hover:border-accent hover:text-accent"
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
                <span className="text-xs font-medium uppercase tracking-wider text-stone-700">
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
    <section className="py-24 lg:py-32">
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
              className="lift group relative overflow-hidden rounded-2xl border border-stone-200 bg-card p-7 shadow-luxe"
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent/5 transition-all duration-500 group-hover:scale-150 group-hover:bg-accent/10" />
              <div className="relative">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100 ring-1 ring-stone-200 transition group-hover:bg-accent group-hover:text-accent-foreground">
                  <f.icon className="h-5 w-5" />
                </div>
                <div className="mt-6 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  0{i + 1}
                </div>
                <h3 className="mt-2 font-serif text-2xl text-stone-900">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
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
  const [number, setNumber] = useState("4521");
  const [street, setStreet] = useState("MAPLE RIDGE DRIVE");
  const [font, setFont] = useState<"serif" | "sans">("serif");
  const [border, setBorder] = useState<PreviewProps["border"]>("classic");
  const [profile, setProfile] = useState<PreviewProps["profile"]>("face");
  const [size, setSize] = useState("medium");

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
          subtitle="Adjust every detail—number, street, font, border, profile, and size—and watch your stone update instantly."
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
                  onChange={(e) => setNumber(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-stone-200 bg-background px-4 py-3 font-serif text-2xl text-stone-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Street Name
                </label>
                <input
                  value={street}
                  onChange={(e) => setStreet(e.target.value.toUpperCase())}
                  className="mt-2 w-full rounded-lg border border-stone-200 bg-background px-4 py-3 text-sm tracking-[0.2em] text-stone-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Font
                </label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <Tile active={font === "serif"} onClick={() => setFont("serif")}>
                    <span className="font-serif text-base">Garamond</span>
                  </Tile>
                  <Tile active={font === "sans"} onClick={() => setFont("sans")}>
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
                    <Tile key={b} active={border === b} onClick={() => setBorder(b)}>
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
                      onClick={() => setProfile(key)}
                    >
                      {label}
                    </Tile>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Size
                </label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {[
                    ["small", '14"'],
                    ["medium", '18"'],
                    ["large", '24"'],
                  ].map(([key, label]) => (
                    <Tile
                      key={key}
                      active={size === key}
                      onClick={() => setSize(key as string)}
                    >
                      {label}
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
                <StonePreview
                  number={number}
                  street={street}
                  font={font}
                  border={border}
                  profile={profile}
                />
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
                  Launch Full Configurator <ArrowRight className="h-4 w-4" />
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
  const steps = [
    { icon: Upload, title: "Upload Your Home", desc: "Snap or upload a photo of your entry, mailbox, or pillar." },
    { icon: ImageIcon, title: "Stone Auto-Appears", desc: "Your custom stone is instantly placed onto your home." },
    { icon: Move, title: "Drag & Reposition", desc: "Move, resize and rotate to find the perfect placement." },
    { icon: Sparkles, title: "Preview the Look", desc: "See exactly how your stone will look—before you buy." },
    { icon: ShieldCheck, title: "Order with Confidence", desc: "Place your order knowing the result will be just right." },
  ];

  return (
    <section id="visualize" className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 -z-10 opacity-30">
        <img src={stoneTexture} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/90 via-background/95 to-background" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-10">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-bronze-soft">
            <span className="h-px w-8 bg-bronze-soft/60" />
            Visualization Tool
          </span>
          <h2 className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
            See it on your home{" "}
            <span className="italic text-bronze-soft">before you buy.</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Upload a photo of your home and preview your custom address stone
            exactly where it will be installed—down to the placement and scale.
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

          <a
            href="#configurator"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-medium text-accent-foreground shadow-luxe-lg transition hover:brightness-110"
          >
            Try Visualization Tool <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Mockup */}
        <div className="relative">
          <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-gradient-to-tr from-accent/30 via-transparent to-accent/20 blur-3xl" />
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-stone-800/50 shadow-luxe-lg backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-bronze-soft" />
                <div className="h-2.5 w-2.5 rounded-full bg-stone-300" />
              </div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-stone-400">
                yourhome.jpg · 1920×1080
              </div>
            </div>
            <div className="relative aspect-[4/3]">
              <img src={heroHome} alt="Your home preview" className="absolute inset-0 h-full w-full object-cover" />
              {/* Overlay stone */}
              <div className="absolute left-[18%] top-[55%] w-[28%] -rotate-2 animate-float-soft">
                <div className="relative">
                  <div className="absolute -inset-2 rounded-xl border-2 border-dashed border-accent/80" />
                  <StonePreview
                    number="4521"
                    street="MAPLE RIDGE"
                    font="serif"
                    border="classic"
                    profile="face"
                  />
                  <div className="absolute -bottom-3 -right-3 rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground shadow-luxe">
                    Drag me
                  </div>
                </div>
              </div>
              <div className="absolute right-4 top-4 rounded-lg border border-white/20 bg-black/60 px-3 py-2 text-xs text-white backdrop-blur">
                <div className="flex items-center gap-2">
                  <Move className="h-3.5 w-3.5" /> Reposition · Resize · Rotate
                </div>
              </div>
              <div className="absolute bottom-4 left-4 rounded-lg border border-white/20 bg-black/60 px-3 py-2 text-xs text-white backdrop-blur">
                Scale 78% · Tilt −2°
              </div>
            </div>
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
  const cols = [
    {
      title: "Products",
      links: ["Monolithic Face", "Monolithic Rise", "Monolithic Inset", "Monolithic Contour"],
    },
    { title: "Company", links: ["About Us", "Gallery", "Reviews", "Contact"] },
    { title: "Resources", links: ["FAQs", "Installation Guide", "Shipping Information", "Care & Warranty"] },
  ];
  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr] lg:px-10">
        <div>
          <div className="flex items-center gap-3">
            <img src={logoAsset.url} alt="Address Stone Direct" className="h-12 w-auto" />
            <div className="leading-tight">
              <div className="font-serif text-lg text-stone-900">Address Stone Direct</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Custom Cast Stone · USA
              </div>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Premium custom address stones, designed online and crafted in the
            USA. Built to elevate your curb appeal—and last a lifetime.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {[Instagram, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 text-stone-700 transition hover:border-accent hover:text-accent"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-stone-900">{c.title}</h4>
            <ul className="mt-5 space-y-3">
              {c.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-muted-foreground transition hover:text-accent">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="text-[11px] uppercase tracking-[0.25em] text-stone-900">Contact</h4>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-accent" />
              <span>(888) 555-0142</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent" />
              <span>hello@addressstonedirect.com</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-accent" />
              <span>
                Address Stone Direct LLC
                <br />
                United States
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-muted-foreground sm:flex-row lg:px-10">
          <div>© {new Date().getFullYear()} Address Stone Direct LLC. All rights reserved.</div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-accent">Privacy</a>
            <a href="#" className="hover:text-accent">Terms</a>
            <a href="#" className="hover:text-accent">Returns</a>
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
  );
}

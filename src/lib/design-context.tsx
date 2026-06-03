import { createContext, useContext, useState, type ReactNode } from "react";

export type FontKey = "serif" | "sans";
export type BorderKey = "classic" | "beveled" | "double" | "none";
export type ProfileKey = "face" | "rise" | "inset" | "contour";
export type ColorKey = "limestone" | "sandstone" | "slate" | "charcoal";
export type SizeKey = "small" | "medium" | "large";

export interface StoneDesign {
  number: string;
  street: string;
  font: FontKey;
  border: BorderKey;
  profile: ProfileKey;
  color: ColorKey;
  size: SizeKey;
  numberScale: number;
  streetScale: number;
}

export const COLOR_META: Record<ColorKey, { label: string; swatch: string; tint: string }> = {
  limestone: { label: "Limestone", swatch: "#d8cdb8", tint: "rgba(216,205,184,0)" },
  sandstone: { label: "Sandstone", swatch: "#c9a87a", tint: "rgba(170,120,60,0.28)" },
  slate: { label: "Slate", swatch: "#4d5560", tint: "rgba(40,50,65,0.55)" },
  charcoal: { label: "Charcoal", swatch: "#2a2a2a", tint: "rgba(20,20,20,0.7)" },
};

export const SIZE_META: Record<SizeKey, { label: string; dims: string; w: number; h: number }> = {
  small: { label: "Small", dims: '14" × 8"', w: 14, h: 8 },
  medium: { label: "Medium", dims: '18" × 10"', w: 18, h: 10 },
  large: { label: "Large", dims: '24" × 14"', w: 24, h: 14 },
};

interface Ctx {
  design: StoneDesign;
  setDesign: React.Dispatch<React.SetStateAction<StoneDesign>>;
  update: <K extends keyof StoneDesign>(k: K, v: StoneDesign[K]) => void;
}

const DesignCtx = createContext<Ctx | null>(null);

export function DesignProvider({ children }: { children: ReactNode }) {
  const [design, setDesign] = useState<StoneDesign>({
    number: "4521",
    street: "MAPLE RIDGE DRIVE",
    font: "serif",
    border: "classic",
    profile: "face",
    color: "limestone",
    size: "medium",
    numberScale: 1,
    streetScale: 1,
  });
  const update: Ctx["update"] = (k, v) => setDesign((d) => ({ ...d, [k]: v }));
  return <DesignCtx.Provider value={{ design, setDesign, update }}>{children}</DesignCtx.Provider>;
}

export function useDesign() {
  const ctx = useContext(DesignCtx);
  if (!ctx) throw new Error("useDesign must be used within DesignProvider");
  return ctx;
}

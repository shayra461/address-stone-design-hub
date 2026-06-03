import stoneTexture from "@/assets/stone-texture.jpg";
import { COLOR_META, type StoneDesign } from "@/lib/design-context";

export default function StonePreview({
  number,
  street,
  font,
  border,
  profile,
  color,
  numberScale = 1,
  streetScale = 1,
}: StoneDesign) {
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

  const tint = COLOR_META[color].tint;
  const isDark = color === "slate" || color === "charcoal";
  const textColor = isDark ? "rgba(245,240,230,0.95)" : "rgba(28,22,16,0.88)";
  const subColor = isDark ? "rgba(235,225,205,0.78)" : "rgba(28,22,16,0.7)";
  const textShadow = isDark
    ? "0 1px 0 rgba(0,0,0,0.55), 0 -1px 2px rgba(255,255,255,0.15)"
    : "0 1px 0 rgba(255,255,255,0.55), 0 -1px 2px rgba(0,0,0,0.25)";

  return (
    <div
      className={`relative aspect-[16/9] w-full overflow-hidden ${radius} shadow-luxe-lg`}
      style={{
        backgroundImage: `url(${stoneTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0" style={{ background: tint }} />
      <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/20" />
      <div
        className={`absolute ${inset} flex flex-col items-center justify-center ${borderStyle} ${radius}`}
      >
        <div
          className={`${
            font === "serif" ? "font-serif" : "font-sans font-semibold"
          } leading-none`}
          style={{
            color: textColor,
            textShadow,
            fontSize: `clamp(2.5rem, ${14 * numberScale}vw, ${8 * numberScale}rem)`,
          }}
        >
          {number || "0000"}
        </div>
        {street && (
          <div
            className={`${
              font === "serif" ? "font-serif" : "font-sans"
            } mt-2 uppercase tracking-[0.3em]`}
            style={{
              color: subColor,
              fontSize: `clamp(0.625rem, ${1.5 * streetScale}vw, ${1.25 * streetScale}rem)`,
            }}
          >
            {street}
          </div>
        )}
      </div>
    </div>
  );
}

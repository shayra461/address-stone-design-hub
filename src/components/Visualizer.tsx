import { useEffect, useRef, useState, useCallback } from "react";
import { Stage, Layer, Image as KImage, Transformer, Rect, Text as KText } from "react-konva";
import Konva from "konva";
import { toPng } from "html-to-image";
import {
  Upload,
  RotateCcw,
  Crosshair,
  Save,
  Download,
  ShoppingCart,
  Image as ImageIcon,
} from "lucide-react";
import { useDesign, COLOR_META, SIZE_META } from "@/lib/design-context";
import StonePreview from "@/components/StonePreview";

type StoneState = { x: number; y: number; scale: number; rotation: number };

interface Props {
  defaultHouseSrc: string;
}

export default function Visualizer({ defaultHouseSrc }: Props) {
  const { design } = useDesign();
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const stoneRef = useRef<Konva.Image>(null);
  const trRef = useRef<Konva.Transformer>(null);
  const hiddenRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState({ w: 800, h: 600 });
  const [houseImg, setHouseImg] = useState<HTMLImageElement | null>(null);
  const [stoneImg, setStoneImg] = useState<HTMLImageElement | null>(null);
  const [selected, setSelected] = useState(true);
  const [savedPreview, setSavedPreview] = useState<string | null>(null);
  const [houseSrc, setHouseSrc] = useState<string>(defaultHouseSrc);

  const aspect = SIZE_META[design.size].w / SIZE_META[design.size].h;
  const [stone, setStone] = useState<StoneState>({
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0,
  });

  // Responsive stage size
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      const h = Math.round((w * 3) / 4); // 4:3
      setSize({ w, h });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Load house image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => setHouseImg(img);
    img.src = houseSrc;
  }, [houseSrc]);

  // Regenerate stone PNG whenever design changes
  const regenerateStone = useCallback(async () => {
    if (!hiddenRef.current) return;
    try {
      const dataUrl = await toPng(hiddenRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "transparent",
      });
      const img = new Image();
      img.onload = () => setStoneImg(img);
      img.src = dataUrl;
    } catch (e) {
      console.error("stone render failed", e);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(regenerateStone, 60);
    return () => clearTimeout(t);
  }, [design, regenerateStone]);

  // Auto-center stone whenever size or stoneImg changes initially
  useEffect(() => {
    if (size.w && stone.x === 0 && stone.y === 0) {
      setStone((s) => ({ ...s, x: size.w * 0.5, y: size.h * 0.55, scale: 1 }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size.w, size.h]);

  // Attach transformer
  useEffect(() => {
    if (selected && stoneRef.current && trRef.current) {
      trRef.current.nodes([stoneRef.current]);
      trRef.current.getLayer()?.batchDraw();
    } else if (trRef.current) {
      trRef.current.nodes([]);
    }
  }, [selected, stoneImg]);

  const stoneWidth = 240; // base width
  const stoneHeight = stoneWidth / aspect;

  const resetPosition = () => {
    setStone({ x: size.w * 0.5, y: size.h * 0.55, scale: 1, rotation: 0 });
    setSelected(true);
  };
  const centerStone = () =>
    setStone((s) => ({ ...s, x: size.w / 2, y: size.h / 2 }));

  const exportPng = () => {
    const stage = stageRef.current;
    if (!stage) return null;
    trRef.current?.nodes([]);
    stage.draw();
    const url = stage.toDataURL({ pixelRatio: 2, mimeType: "image/png" });
    if (selected) {
      trRef.current?.nodes([stoneRef.current!]);
      stage.draw();
    }
    return url;
  };

  const savePreview = () => {
    const url = exportPng();
    if (url) setSavedPreview(url);
  };

  const downloadImage = () => {
    const url = exportPng();
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = `address-stone-preview-${design.number}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setHouseSrc(reader.result as string);
    reader.readAsDataURL(f);
  };

  return (
    <div className="w-full">
      {/* Hidden rasterization source - matches the configurator design exactly */}
      <div
        style={{
          position: "fixed",
          left: -9999,
          top: 0,
          width: 800,
          pointerEvents: "none",
          opacity: 0,
        }}
        aria-hidden
      >
        <div ref={hiddenRef} style={{ width: 800, padding: 0 }}>
          <StonePreview {...design} />
        </div>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-stone-900/60 shadow-luxe-lg backdrop-blur-xl">
        {/* Toolbar header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-bronze-soft" />
            <div className="h-2.5 w-2.5 rounded-full bg-stone-300" />
            <span className="ml-3 text-[10px] uppercase tracking-[0.25em] text-stone-400">
              ASD Visualizer · Live Design
            </span>
          </div>
          <div className="flex items-center gap-2">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-foreground transition hover:bg-white/10">
              <Upload className="h-3.5 w-3.5" />
              Upload House
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onUpload}
              />
            </label>
          </div>
        </div>

        {/* Canvas */}
        <div
          ref={containerRef}
          className="relative w-full bg-stone-950"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelected(false);
          }}
        >
          {size.w > 0 && (
            <Stage
              ref={stageRef}
              width={size.w}
              height={size.h}
              onMouseDown={(e) => {
                if (e.target === e.target.getStage()) setSelected(false);
              }}
              onTouchStart={(e) => {
                if (e.target === e.target.getStage()) setSelected(false);
              }}
            >
              <Layer>
                {houseImg ? (
                  <KImage
                    image={houseImg}
                    x={0}
                    y={0}
                    width={size.w}
                    height={size.h}
                  />
                ) : (
                  <>
                    <Rect x={0} y={0} width={size.w} height={size.h} fill="#1a1a1a" />
                    <KText
                      x={0}
                      y={size.h / 2 - 12}
                      width={size.w}
                      align="center"
                      text="Upload a photo of your home to begin"
                      fontSize={16}
                      fill="#888"
                    />
                  </>
                )}

                {stoneImg && (
                  <KImage
                    ref={stoneRef}
                    image={stoneImg}
                    x={stone.x}
                    y={stone.y}
                    width={stoneWidth}
                    height={stoneHeight}
                    offsetX={stoneWidth / 2}
                    offsetY={stoneHeight / 2}
                    scaleX={stone.scale}
                    scaleY={stone.scale}
                    rotation={stone.rotation}
                    draggable
                    shadowColor="black"
                    shadowBlur={20}
                    shadowOpacity={0.45}
                    shadowOffsetX={0}
                    shadowOffsetY={8}
                    onClick={() => setSelected(true)}
                    onTap={() => setSelected(true)}
                    onDragEnd={(e) =>
                      setStone((s) => ({ ...s, x: e.target.x(), y: e.target.y() }))
                    }
                    onTransformEnd={() => {
                      const node = stoneRef.current;
                      if (!node) return;
                      // Keep aspect ratio by using uniform scale
                      const newScale = Math.max(node.scaleX(), node.scaleY());
                      node.scaleX(newScale);
                      node.scaleY(newScale);
                      setStone({
                        x: node.x(),
                        y: node.y(),
                        scale: newScale,
                        rotation: node.rotation(),
                      });
                    }}
                  />
                )}

                <Transformer
                  ref={trRef}
                  rotateEnabled
                  keepRatio
                  enabledAnchors={[
                    "top-left",
                    "top-right",
                    "bottom-left",
                    "bottom-right",
                  ]}
                  boundBoxFunc={(oldBox, newBox) => {
                    if (newBox.width < 40 || newBox.height < 25) return oldBox;
                    return newBox;
                  }}
                  borderStroke="#c9a87a"
                  anchorStroke="#c9a87a"
                  anchorFill="#1a1a1a"
                  anchorSize={10}
                  rotateAnchorOffset={28}
                />
              </Layer>
            </Stage>
          )}

          {/* HUD */}
          <div className="pointer-events-none absolute left-3 top-3 rounded-md border border-white/15 bg-black/55 px-2.5 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/80 backdrop-blur">
            {SIZE_META[design.size].dims} · {COLOR_META[design.color].label}
          </div>
          <div className="pointer-events-none absolute right-3 top-3 rounded-md border border-white/15 bg-black/55 px-2.5 py-1.5 text-[10px] text-white/80 backdrop-blur">
            Scale {(stone.scale * 100).toFixed(0)}% · Tilt {stone.rotation.toFixed(0)}°
          </div>
        </div>

        {/* Controls bar — solid dark surface */}
        <div className="grid grid-cols-2 gap-2.5 border-t border-white/10 bg-[#0d0d0f] p-4 sm:grid-cols-4">
          {[
            { onClick: resetPosition, Icon: RotateCcw, label: "Reset Position" },
            { onClick: centerStone, Icon: Crosshair, label: "Center Stone" },
            { onClick: savePreview, Icon: Save, label: "Save Preview" },
            { onClick: downloadImage, Icon: Download, label: "Download" },
          ].map(({ onClick, Icon, label }) => (
            <button
              key={label}
              onClick={onClick}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-accent/40 bg-[#1a1a1d] px-4 py-2.5 text-sm font-semibold text-white transition hover:border-accent hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
            >
              <Icon className="h-4 w-4 text-accent transition group-hover:text-accent-foreground" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Checkout bar — solid dark, bronze CTA */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-accent/20 bg-stone-950 px-5 py-4">
          <div className="text-[11px] uppercase tracking-[0.25em] text-foreground/70">
            Ready to order this design?
          </div>
          <a
            href="#checkout"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-xs font-bold uppercase tracking-wider text-accent-foreground shadow-luxe transition hover:brightness-110"
          >
            <ShoppingCart className="h-4 w-4" /> Continue to Checkout
          </a>
        </div>
      </div>

      {savedPreview && (
        <div className="mt-5 flex items-center gap-4 rounded-2xl border border-white/10 bg-stone-900/60 p-4 backdrop-blur">
          <div className="h-20 w-28 shrink-0 overflow-hidden rounded-md border border-white/10">
            <img src={savedPreview} alt="Saved preview" className="h-full w-full object-cover" />
          </div>
          <div className="flex-1 text-sm">
            <div className="flex items-center gap-2 text-foreground">
              <ImageIcon className="h-4 w-4 text-accent" /> Preview saved
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              Your current placement has been captured. Download or continue to
              checkout to lock in this design.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

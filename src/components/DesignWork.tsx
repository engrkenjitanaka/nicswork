"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { collections, imagesOf, type Collection } from "@/content";
import { Reveal } from "./Reveal";
import { ExternalIcon } from "./icons";
import { LightboxArrow, LightboxFrame } from "./Lightbox";

type Shot = { src: string; alt: string };

/** Pile geometry, top card first. Behind cards peek, then fan on hover. */
const LAYERS = [
  { rot: "0deg", tx: "0%", ty: "0%", dim: "1", rotOpen: "-2.5deg", txOpen: "-6%", tyOpen: "0%" },
  { rot: "3deg", tx: "2%", ty: "-2%", dim: "0.55", rotOpen: "9deg", txOpen: "13%", tyOpen: "-5%" },
  { rot: "6deg", tx: "4%", ty: "-4%", dim: "0.38", rotOpen: "18deg", txOpen: "26%", tyOpen: "-10%" },
];

export function DesignWork() {
  const [open, setOpen] = useState<{ c: Collection; shots: Shot[]; i: number } | null>(null);

  return (
    <section id="design" className="py-24 sm:py-32">
      <div className="shell">
        <h2
          className="max-w-[16ch] font-light leading-tight tracking-[-0.02em]"
          style={{ fontSize: "var(--step-h2)" }}
        >
          Graphic design and brand work
        </h2>
        <p className="mt-4 max-w-[68ch] text-[0.92rem] font-light leading-relaxed text-mute">
          Seven collections. Open one to page through it here, or follow through
          to the full archive.
        </p>

        {/* 7 over 4 columns fills row one and leaves row two three-wide, so
            no orphan needs centring. */}
        <Reveal className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-10">
          {collections.map((c, idx) => {
            const shots = imagesOf(c);
            return (
              <div key={c.slug} style={{ "--i": idx } as React.CSSProperties}>
                <button
                  type="button"
                  onClick={() => setOpen({ c, shots, i: 0 })}
                  className="stack-tile block w-full cursor-pointer text-left"
                  aria-label={`Open ${c.title} — ${c.count} pieces`}
                >
                  <div
                    className="stack"
                    style={{ "--ratio": "3 / 4" } as React.CSSProperties}
                  >
                    {LAYERS.map((l, li) => {
                      const shot = shots[li];
                      if (!shot) return null;
                      return (
                        <div
                          key={shot.src}
                          className="stack-card"
                          style={
                            {
                              zIndex: LAYERS.length - li,
                              "--rot": l.rot,
                              "--tx": l.tx,
                              "--ty": l.ty,
                              "--dim": l.dim,
                              "--rot-open": l.rotOpen,
                              "--tx-open": l.txOpen,
                              "--ty-open": l.tyOpen,
                            } as React.CSSProperties
                          }
                        >
                          <Image
                            src={shot.src}
                            alt={li === 0 ? shot.alt : ""}
                            fill
                            sizes="(max-width: 640px) 44vw, (max-width: 1024px) 40vw, 300px"
                            className="object-contain"
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-5 flex items-baseline justify-between gap-3 border-t border-line pt-3">
                    <span className="tracked text-[0.64rem] text-chalk sm:text-[0.68rem]">
                      {c.title}
                    </span>
                    <span className="text-[0.7rem] font-light tabular-nums text-mute">
                      {c.count}
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </Reveal>
      </div>

      {open && (
        <GalleryDialog
          collection={open.c}
          shots={open.shots}
          startIndex={open.i}
          onClose={() => setOpen(null)}
        />
      )}
    </section>
  );
}

function GalleryDialog({
  collection,
  shots,
  startIndex,
  onClose,
}: {
  collection: Collection;
  shots: Shot[];
  startIndex: number;
  onClose: () => void;
}) {
  const touchX = useRef<number | null>(null);
  const [i, setI] = useState(startIndex);

  const go = useCallback(
    (step: number) => setI((n) => (n + step + shots.length) % shots.length),
    [shots.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [go]);

  const shot = shots[i];

  return (
    <LightboxFrame
      label={`${collection.title} gallery`}
      title={collection.title}
      subtitle={`${i + 1} / ${shots.length}`}
      onClose={onClose}
      action={
        <a
          href={collection.driveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-full border border-line px-4 py-2 text-[0.68rem] uppercase tracking-[0.14em] text-mute transition-colors hover:border-amber hover:text-amber sm:inline-flex"
        >
          Full archive
          <ExternalIcon className="h-3.5 w-3.5" />
        </a>
      }
      footer={
        <div className="flex justify-center gap-2 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2">
          {shots.map((s, n) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setI(n)}
              aria-label={`Go to piece ${n + 1}`}
              aria-current={n === i ? "true" : undefined}
              className={`h-1.5 cursor-pointer rounded-full transition-all duration-400 ${
                n === i ? "w-7 bg-amber" : "w-1.5 bg-line hover:bg-mute"
              }`}
            />
          ))}
        </div>
      }
    >
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center p-4 sm:p-10"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <Image
          key={shot.src}
          src={shot.src}
          alt={shot.alt}
          fill
          sizes="100vw"
          className="object-contain p-2 sm:p-8"
        />

        {shots.length > 1 && (
          <>
            <LightboxArrow side="left" label="Previous piece" onClick={() => go(-1)} />
            <LightboxArrow side="right" label="Next piece" onClick={() => go(1)} />
          </>
        )}
      </div>
    </LightboxFrame>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { collections, imagesOf, type Collection } from "@/content";
import { Reveal } from "./Reveal";
import { ChevronIcon, CloseIcon, ExternalIcon } from "./icons";

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
  const ref = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  const [i, setI] = useState(startIndex);

  const go = useCallback(
    (step: number) => setI((n) => (n + step + shots.length) % shots.length),
    [shots.length],
  );

  useEffect(() => {
    const el = ref.current;
    if (el && !el.open) el.showModal();
  }, []);

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
    <dialog
      ref={ref}
      onClose={onClose}
      onCancel={onClose}
      aria-label={`${collection.title} gallery`}
      className="m-0 h-full max-h-none w-full max-w-none bg-ink/97 p-0 text-chalk backdrop:bg-ink/85 open:flex open:flex-col"
    >
      <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-8">
        <div className="min-w-0">
          <h3 className="tracked truncate text-[0.68rem] text-chalk">
            {collection.title}
          </h3>
          <p className="mt-1 text-[0.7rem] font-light tabular-nums text-mute">
            {i + 1} / {shots.length}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={collection.driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full border border-line px-4 py-2 text-[0.68rem] tracking-[0.14em] uppercase text-mute transition-colors hover:border-amber hover:text-amber sm:inline-flex"
          >
            Full archive
            <ExternalIcon className="h-3.5 w-3.5" />
          </a>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label="Close gallery"
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-line text-mute transition-colors hover:border-chalk hover:text-chalk"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

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
            <GalleryArrow side="left" onClick={() => go(-1)} />
            <GalleryArrow side="right" onClick={() => go(1)} />
          </>
        )}
      </div>

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
    </dialog>
  );
}

function GalleryArrow({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous piece" : "Next piece"}
      className={`absolute top-1/2 grid h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-line bg-ink/70 text-mute backdrop-blur-sm transition-colors hover:border-chalk hover:text-chalk ${
        side === "left" ? "left-2 sm:left-6" : "right-2 sm:right-6"
      }`}
    >
      <ChevronIcon className={`h-5 w-5 ${side === "right" ? "rotate-180" : ""}`} />
    </button>
  );
}

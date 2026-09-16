"use client";

import { useCallback, useEffect, useState } from "react";
import { VideoPoster } from "./LiteYouTube";
import { LightboxArrow, LightboxFrame } from "./Lightbox";
import { Reveal } from "./Reveal";
import type { Video } from "@/content";

export function VideoGrid({
  videos,
  orientation,
  className,
}: {
  videos: Video[];
  orientation: "vertical" | "horizontal";
  className: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const vertical = orientation === "vertical";

  const go = useCallback(
    (step: number) =>
      setOpen((n) => (n === null ? null : (n + step + videos.length) % videos.length)),
    [videos.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, go]);

  const video = open === null ? null : videos[open];

  return (
    <>
      <Reveal className={className}>
        {videos.map((v, i) => (
          <div key={v.youtubeId} style={{ "--i": i } as React.CSSProperties}>
            <VideoPoster video={v} orientation={orientation} onOpen={() => setOpen(i)} />
          </div>
        ))}
      </Reveal>

      {video && (
        <LightboxFrame
          label={`${video.category} — ${video.detail}`}
          title={video.category}
          subtitle={`${video.detail}   ·   ${(open ?? 0) + 1} / ${videos.length}`}
          onClose={() => setOpen(null)}
        >
          <div className="relative p-2 sm:p-3">
            {/* Sized off whichever axis runs out first, so the frame is always
                the piece's true shape and the panel hugs it. */}
            <div
              className="overflow-hidden rounded-xl bg-ink"
              style={
                vertical
                  ? {
                      aspectRatio: "9 / 16",
                      height: "min(74dvh, calc(88vw * 16 / 9), 800px)",
                    }
                  : {
                      aspectRatio: "16 / 9",
                      width: "min(88vw, 1060px, calc(74dvh * 16 / 9))",
                    }
              }
            >
              <iframe
                key={video.youtubeId}
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&playsinline=1`}
                title={`${video.category} — ${video.detail}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            {videos.length > 1 && (
              <>
                <LightboxArrow side="left" label="Previous video" onClick={() => go(-1)} />
                <LightboxArrow side="right" label="Next video" onClick={() => go(1)} />
              </>
            )}
          </div>
        </LightboxFrame>
      )}
    </>
  );
}

"use client";

import { useCallback, useEffect, useRef } from "react";
import { ChevronIcon, CloseIcon } from "./icons";

/** Must match the .is-closing animation duration in globals.css. */
const EXIT_MS = 300;

/**
 * The page's one modal shell, shared by the video player and the print
 * gallery. A native <dialog>, so focus trapping, Esc and the top layer are the
 * platform's job; the open/close animation is CSS via @starting-style.
 */
export function LightboxFrame({
  label,
  title,
  subtitle,
  action,
  footer,
  panelClassName = "",
  onClose,
  children,
}: {
  label: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  footer?: React.ReactNode;
  panelClassName?: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const closing = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (el && !el.open) el.showModal();
  }, []);

  /**
   * Play the exit before anything leaves: the dialog stays open and marked
   * `.is-closing` for the length of the animation, then closes and unmounts.
   */
  const requestClose = useCallback(() => {
    const el = ref.current;
    if (!el || closing.current) return;
    closing.current = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.classList.add("is-closing");
    window.setTimeout(() => {
      el.close();
      onClose();
    }, reduced ? 0 : EXIT_MS);
  }, [onClose]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      className="lightbox"
      onCancel={(e) => {
        e.preventDefault(); // let the animation run instead of a hard close
        requestClose();
      }}
      onClose={requestClose}
      onClick={(e) => {
        // Only a click on the backdrop area itself, never inside the panel.
        if (e.target === ref.current) requestClose();
      }}
    >
      <div
        className={`lightbox-panel flex max-h-[92dvh] max-w-[95vw] flex-col overflow-hidden rounded-2xl border border-chalk/15 bg-panel/45 shadow-[0_40px_120px_-30px_rgb(0_0_0/0.95)] backdrop-blur-2xl ${panelClassName}`}
      >
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-chalk/10 px-4 py-3.5 sm:px-6">
          <div className="min-w-0">
            <h3 className="truncate text-[0.66rem] uppercase tracking-[0.2em] text-chalk">
              {title}
            </h3>
            {subtitle && (
              <p className="mt-1 truncate text-[0.7rem] font-light text-mute">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {action}
            <button
              type="button"
              onClick={requestClose}
              aria-label="Close"
              className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-chalk/20 text-mute transition-colors duration-300 hover:border-amber hover:text-amber"
            >
              <CloseIcon className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>

        {children}
        {footer}
      </div>
    </dialog>
  );
}

export function LightboxArrow({
  side,
  label,
  onClick,
}: {
  side: "left" | "right";
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-chalk/20 bg-ink/50 text-mute backdrop-blur-md transition-colors duration-300 hover:border-amber hover:text-amber ${
        side === "left" ? "left-2 sm:left-3" : "right-2 sm:right-3"
      }`}
    >
      <ChevronIcon className={`h-5 w-5 ${side === "right" ? "rotate-180" : ""}`} />
    </button>
  );
}

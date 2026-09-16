"use client";

import { useEffect, useRef } from "react";
import { ChevronIcon, CloseIcon } from "./icons";

/**
 * The page's one modal shell, shared by the video player and the print
 * gallery. A native <dialog> so focus trapping, Esc and the backdrop are the
 * platform's job, not ours.
 */
export function LightboxFrame({
  label,
  title,
  subtitle,
  action,
  footer,
  onClose,
  children,
}: {
  label: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  footer?: React.ReactNode;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el && !el.open) el.showModal();
  }, []);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onCancel={onClose}
      aria-label={label}
      className="m-0 h-full max-h-none w-full max-w-none bg-ink/97 p-0 text-chalk backdrop:bg-ink/85 open:flex open:flex-col"
    >
      <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-8">
        <div className="min-w-0">
          <h3 className="truncate text-[0.68rem] uppercase tracking-[0.2em] text-chalk">
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
            onClick={() => ref.current?.close()}
            aria-label="Close"
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-line text-mute transition-colors hover:border-chalk hover:text-chalk"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {children}
      {footer}
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
      className={`absolute top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-line bg-ink/70 text-mute backdrop-blur-sm transition-colors hover:border-chalk hover:text-chalk ${
        side === "left" ? "left-2 sm:left-6" : "right-2 sm:right-6"
      }`}
    >
      <ChevronIcon className={`h-5 w-5 ${side === "right" ? "rotate-180" : ""}`} />
    </button>
  );
}
